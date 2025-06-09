import { FlickeringGrid } from "./components/magicui/flickering-grid";

export function FlickeringGridDemo() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <FlickeringGrid
        className="absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={5000}
        width={5000}
      />
    </div>
  );
}
