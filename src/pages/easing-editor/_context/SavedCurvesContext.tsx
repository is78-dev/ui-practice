import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { BezierHandles } from "../_types/bezierTypes";
import { STORAGE_KEY } from "../_constants/keys";

type SavedCurvesContextType = {
  savedCurves: BezierHandles[];
  add: (bezierHandles: BezierHandles) => void;
  remove: (index: number) => void;
  clear: () => void;
};

const SavedCurvesContext = createContext<SavedCurvesContextType | undefined>(
  undefined,
);

export const SavedCurvesProvider = ({ children }: { children: ReactNode }) => {
  const [savedCurves, setSavedCurves] = useState<BezierHandles[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsedData = JSON.parse(raw);
        if (Array.isArray(parsedData)) {
          setSavedCurves(parsedData);
        }
      }
    } catch (error) {
      console.error("Failed to load saved curves from localStorage", error);
    }
  }, []);

  const add = (bezierHandles: BezierHandles) => {
    setSavedCurves((prev) => {
      const newList = [...prev, bezierHandles];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      return newList;
    });
  };

  const remove = (index: number) => {
    setSavedCurves((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      return newList;
    });
  };

  const clear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedCurves([]);
  };

  return (
    <SavedCurvesContext.Provider value={{ savedCurves, add, remove, clear }}>
      {children}
    </SavedCurvesContext.Provider>
  );
};

export const useSavedCurves = () => {
  const context = useContext(SavedCurvesContext);

  if (context === undefined) {
    throw new Error(
      "useSavedCurves must be used within a BezierHandlesProvider",
    );
  }

  return context;
};
