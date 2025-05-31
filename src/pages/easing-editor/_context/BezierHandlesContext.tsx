import { createContext, useContext, useState, type ReactNode } from "react";
import type { Point } from "../_types/bezierTypes";

type BezierHandlesContextType = {
  p1: Point;
  setP1: React.Dispatch<React.SetStateAction<Point>>;
  p2: Point;
  setP2: React.Dispatch<React.SetStateAction<Point>>;
  reset: () => void;
};

const BezierHandlesContext = createContext<
  BezierHandlesContextType | undefined
>(undefined);

export const BezierHandlesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [p1, setP1] = useState<Point>({ x: 0.25, y: 0.75 });
  const [p2, setP2] = useState<Point>({ x: 0.75, y: 0.25 });

  const reset = () => {
    setP1({ x: 0.25, y: 0.75 });
    setP2({ x: 0.75, y: 0.25 });
  };

  return (
    <BezierHandlesContext.Provider value={{ p1, setP1, p2, setP2, reset }}>
      {children}
    </BezierHandlesContext.Provider>
  );
};

export const useBezierHandles = () => {
  const context = useContext(BezierHandlesContext);

  if (context === undefined) {
    throw new Error(
      "useBezierHandles must be used within a BezierHandlesProvider",
    );
  }

  return context;
};
