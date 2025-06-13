// from < to のとき、toの後に挿入
// from > to のとき、toの前に挿入
export const mv = <T>(list: T[], from: number, to: number): T[] => {
  const clonedList = list.slice();
  const source = clonedList.splice(from, 1);
  if (source.length === 0) return list;
  clonedList.splice(to, 0, ...source);
  return clonedList;
};
