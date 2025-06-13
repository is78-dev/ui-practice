import { useState } from "react";
import { mv } from "./_utils/mv";

export default function App() {
  const [list, setList] = useState<string[]>(["A", "B", "C", "D", "E"]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleSelectItem = (index: number) => {
    // 移動元が選択されていない->移動元選択
    if (selectedIndex < 0) {
      setSelectedIndex(index);
      return;
    }
    // 移動元を選択済み->移動実行
    setList((prev) => mv(prev, selectedIndex, index));
    setSelectedIndex(-1);
  };

  return (
    <div className="p-10 border space-y-4">
      {list.map((item, key) => (
        <div
          key={key}
          className={
            "border w-20 h-10 grid place-items-center" +
            (selectedIndex === key ? " bg-blue-200" : "")
          }
          onClick={() => handleSelectItem(key)}
        >
          {item} ({key})
        </div>
      ))}
    </div>
  );
}
