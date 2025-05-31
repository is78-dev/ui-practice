import CurveEditor from "./_components/CurveEditor";
import styles from "./style.module.scss";
import CurveControl from "./_components/CurveControl";
import SavedCurveList from "./_components/SavedCurveList";
import { BezierHandlesProvider } from "./_context/BezierHandlesContext";
import { SavedCurvesProvider } from "./_context/SavedCurvesContext";

export default function App() {
  return (
    <BezierHandlesProvider>
      <SavedCurvesProvider>
        <div className={styles.root}>
          <div className={styles.container}>
            <h1 className={styles.title}>EASING EDITOR</h1>
            <div className={styles.controllBox}>
              <CurveEditor />
              <CurveControl />
            </div>
            <SavedCurveList />
          </div>
        </div>
      </SavedCurvesProvider>
    </BezierHandlesProvider>
  );
}
