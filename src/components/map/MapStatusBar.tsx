export function MapStatusBar({
  left,
  targetCount,
  modelVersion,
}: {
  left: string;
  targetCount: number;
  modelVersion: string;
}) {
  return (
    <div className="h-6 shrink-0 flex items-center justify-between px-4 bg-[#12211E] text-[#9DAEA8] text-[11px] font-mono">
      <span>{left}</span>
      <span>
        {targetCount} targets · model {modelVersion}
      </span>
    </div>
  );
}
