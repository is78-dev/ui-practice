import type { Point } from "../_types/bezierTypes";

/**
 * PointConverter クラス
 * - 正規化された Point 座標（0〜1の範囲）と、SVG座標（ピクセル単位）との相互変換を行う。
 * - SVG座標系では y 軸が下に正のため、y 座標は反転する。
 */
export class PointConverter {
  constructor(
    private width: number,
    private height: number,
  ) {}

  /**
   * 正規化された Point を SVG 座標に変換する
   * @param p - 変換対象の Point（x, y は 0〜1 の範囲）
   * @returns SVG座標（x: 0〜width, y: 0〜height）
   */
  p2s(p: Point): { x: number; y: number } {
    return {
      x: p.x * this.width,
      y: (1 - p.y) * this.height,
    };
  }

  /**
   * SVG 座標を正規化された Point に変換する
   * @param x - SVG の x 座標（ピクセル）
   * @param y - SVG の y 座標（ピクセル）
   * @returns 正規化された Point（x, y は 0〜1 にクリップされる）
   */
  s2p(x: number, y: number): Point {
    return {
      x: Math.min(1, Math.max(0, x / this.width)),
      y: Math.min(1, Math.max(0, 1 - y / this.height)),
    };
  }
}
