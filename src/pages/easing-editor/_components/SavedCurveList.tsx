import styles from "../style.module.scss";
import type { BezierHandles } from "../_types/bezierTypes";
import { useBezierHandles } from "../_context/BezierHandlesContext";
import { useSavedCurves } from "../_context/SavedCurvesContext";
import { PointConverter } from "../_utils/point";

const height = 100;
const width = 100;
const pc = new PointConverter(width, height);

export default function SavedCurveList() {
  const { setP1, setP2 } = useBezierHandles();
  const { savedCurves, remove } = useSavedCurves();

  const handleLoadCurve = (curve: BezierHandles) => {
    setP1(curve.p1);
    setP2(curve.p2);
  };

  return (
    <div className={styles.savedCurveList}>
      {savedCurves.map(({ p1, p2 }, index) => {
        const previewPath = `M 0,${height} C ${pc.p2s(p1).x},${pc.p2s(p1).y} ${pc.p2s(p2).x},${pc.p2s(p2).y} ${width},0`;
        return (
          <div key={index} className={styles.savedCurveItem}>
            <svg
              viewBox={`0 0 ${width} ${height}`}
              onClick={() => handleLoadCurve({ p1, p2 })}
            >
              <path d={previewPath} />
              <line x1={0} y1={height} x2={pc.p2s(p1).x} y2={pc.p2s(p1).y} />
              <line x1={width} y1={0} x2={pc.p2s(p2).x} y2={pc.p2s(p2).y} />
              <circle cx={pc.p2s(p1).x} cy={pc.p2s(p1).y} />
              <circle cx={pc.p2s(p2).x} cy={pc.p2s(p2).y} />
            </svg>
            <button
              className={styles.deleteButton}
              onClick={() => remove(index)}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
