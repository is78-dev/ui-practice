import { useCallback } from "react";
import styles from "../style.module.scss";
import { useBezierHandles } from "../_context/BezierHandlesContext";
import type { Point } from "../_types/bezierTypes";
import { PointConverter } from "../_utils/point";

const height = 500;
const width = 500;
const pc = new PointConverter(width, height);

export default function CurveEditor() {
  const { p1, p2, setP1, setP2 } = useBezierHandles();

  const path = `M 0,${height} C ${pc.p2s(p1).x},${pc.p2s(p1).y} ${pc.p2s(p2).x},${pc.p2s(p2).y} ${width},0`;

  const handleDragPoint = useCallback(
    (set: React.Dispatch<React.SetStateAction<Point>>) =>
      (e: React.MouseEvent<SVGCircleElement>) => {
        e.preventDefault();
        const svg = (e.target as SVGElement).ownerSVGElement!;

        const onMove = (move: MouseEvent) => {
          const rect = svg.getBoundingClientRect();
          const x = move.clientX - rect.left;
          const y = move.clientY - rect.top;

          // SVGのviewBoxを考慮した座標変換
          const svgX = (x / rect.width) * width;
          const svgY = (y / rect.height) * height;

          set(pc.s2p(svgX, svgY));
        };

        const onUp = () => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onUp);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);

        // 初回のマウス位置でも更新
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const svgX = (x / rect.width) * width;
        const svgY = (y / rect.height) * height;
        set(pc.s2p(svgX, svgY));
      },
    [],
  );

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={styles.curveEditor}>
      <path d={path} />
      <line x1={0} y1={height} x2={pc.p2s(p1).x} y2={pc.p2s(p1).y} />
      <line x1={width} y1={0} x2={pc.p2s(p2).x} y2={pc.p2s(p2).y} />
      <circle
        cx={pc.p2s(p1).x}
        cy={pc.p2s(p1).y}
        onMouseDown={handleDragPoint(setP1)}
      />
      <circle
        cx={pc.p2s(p2).x}
        cy={pc.p2s(p2).y}
        onMouseDown={handleDragPoint(setP2)}
      />
    </svg>
  );
}
