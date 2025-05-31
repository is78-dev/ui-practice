import styles from "../style.module.scss";
import { useBezierHandles } from "../_context/BezierHandlesContext";
import { useSavedCurves } from "../_context/SavedCurvesContext";

export default function CurveControl() {
  const { p1, p2, reset } = useBezierHandles();
  const { add, clear } = useSavedCurves();
  const bezierStr = `cubic-bezier(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(bezierStr);
  };

  const handleSaveCurve = () => add({ p1, p2 });

  return (
    <div className={styles.curveControl}>
      <code>{bezierStr}</code>
      <div>
        <h2>Curve</h2>
        <div className="flex gap-3">
          <button onClick={handleCopyToClipboard}>COPY</button>
          <button onClick={reset} className={styles.outline}>
            RESET
          </button>
        </div>
      </div>

      <div>
        <h2>Library</h2>
        <div className="flex gap-3">
          <button onClick={handleSaveCurve}>SAVE</button>
          <button onClick={clear} className={styles.destructive}>
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}
