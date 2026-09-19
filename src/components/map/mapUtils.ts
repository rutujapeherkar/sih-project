export function centroid(polygon: [number, number][]): [number, number] {
  const n = polygon.length;
  const lat = polygon.reduce((sum, p) => sum + p[0], 0) / n;
  const lng = polygon.reduce((sum, p) => sum + p[1], 0) / n;
  return [lat, lng];
}
