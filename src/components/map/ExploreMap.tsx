"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Mine } from "@/types";
import { Target, Drillhole, GeologyUnit } from "@/types";
import { LayerState } from "@/store/useUIStore";
import { prospectivityColor } from "@/lib/colors";
import { centroid } from "@/components/map/mapUtils";

const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const SATELLITE_TILES =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

interface ExploreMapProps {
  mine: Mine;
  targets: Target[];
  drillholes: Drillhole[];
  geologyUnits: GeologyUnit[];
  layers: LayerState;
  theme: "light" | "dark";
  selectedTargetId: string | null;
  onSelectTarget: (id: string) => void;
  resetSignal: number;
}

function FlyToController({
  mine,
  targets,
  selectedTargetId,
  resetSignal,
}: {
  mine: Mine;
  targets: Target[];
  selectedTargetId: string | null;
  resetSignal: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(mine.center, mine.zoom, { duration: 0.6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mine.id, resetSignal]);

  useEffect(() => {
    if (!selectedTargetId) return;
    const target = targets.find((t) => t.id === selectedTargetId);
    if (!target) return;
    map.flyTo(centroid(target.polygon), Math.max(map.getZoom(), mine.zoom + 1), {
      duration: 0.5,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTargetId]);

  return null;
}

function LocateControl() {
  const map = useMap();
  return (
    <button
      type="button"
      onClick={() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            map.flyTo([pos.coords.latitude, pos.coords.longitude], 15);
          },
          () => {
            // location unavailable — no-op
          },
          { timeout: 4000 },
        );
      }}
      className="h-8 w-8 flex items-center justify-center rounded bg-bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-bg-subtle shadow-sm"
      title="Locate me"
      aria-label="Locate me"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    </button>
  );
}

export default function ExploreMap({
  mine,
  targets,
  drillholes,
  geologyUnits,
  layers,
  theme,
  selectedTargetId,
  onSelectTarget,
  resetSignal,
}: ExploreMapProps) {
  const tileUrl = layers.satellite ? SATELLITE_TILES : theme === "dark" ? DARK_TILES : LIGHT_TILES;

  const dashForConfidence = useMemo(
    () => ({ high: undefined, medium: "6 4", low: "2 5" }) as Record<string, string | undefined>,
    [],
  );

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={mine.center}
        zoom={mine.zoom}
        className="h-full w-full"
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          key={tileUrl}
          url={tileUrl}
          attribution={
            layers.satellite
              ? "Tiles &copy; Esri"
              : '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap contributors'
          }
        />

        <FlyToController
          mine={mine}
          targets={targets}
          selectedTargetId={selectedTargetId}
          resetSignal={resetSignal}
        />

        {layers.geology &&
          geologyUnits.map((unit) => (
            <Polygon
              key={unit.id}
              positions={unit.polygon}
              pathOptions={{
                color: "transparent",
                fillColor: "#8A928E",
                fillOpacity: 0.14,
                weight: 0,
              }}
            >
              <Tooltip sticky>{unit.name}</Tooltip>
            </Polygon>
          ))}

        {layers.prospectivity &&
          targets.map((target) => {
            const isSelected = target.id === selectedTargetId;
            const fill = prospectivityColor(target.prospectivity, theme);
            return (
              <Polygon
                key={target.id}
                positions={target.polygon}
                eventHandlers={{ click: () => onSelectTarget(target.id) }}
                pathOptions={{
                  color: isSelected ? "#0B5F63" : fill,
                  weight: isSelected ? 3 : 1.5,
                  fillColor: fill,
                  fillOpacity: isSelected ? 0.75 : 0.55,
                  dashArray: layers.confidence ? dashForConfidence[target.confidence] : undefined,
                }}
              >
                <Tooltip sticky direction="top" opacity={0.95}>
                  <div className="text-xs">
                    <div className="font-semibold">{target.label}</div>
                    <div>Prospectivity {target.prospectivity.toFixed(2)}</div>
                  </div>
                </Tooltip>
              </Polygon>
            );
          })}

        {layers.drillholes &&
          drillholes.map((hole) => (
            <CircleMarker
              key={hole.id}
              center={hole.position}
              radius={4}
              pathOptions={{
                color: "#151B19",
                weight: 1.5,
                fillColor: "#EDF2EF",
                fillOpacity: 1,
              }}
            >
              <Tooltip direction="top" offset={[0, -4]}>
                <div className="text-xs">
                  <div className="font-semibold">{hole.id}</div>
                  <div>Depth {hole.depthM} m</div>
                  <div>Grade {hole.gradePctMn}% Mn</div>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}

        <div className="absolute top-3 right-3 z-[500] flex flex-col gap-1.5">
          <LocateControl />
        </div>
      </MapContainer>
    </div>
  );
}
