import { Plus, Trash2 } from "lucide-react";

type Item = Record<string, string | number>;

const LONG_TEXT_FIELDS = new Set(["desc", "quote", "a", "note", "why", "tuition", "livingCost"]);
const NUMBER_FIELDS = new Set(["value", "universities", "id"]);

function fieldLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

export default function GenericArrayEditor({
  items,
  onChange,
  emptyItemTemplate,
}: {
  items: Item[];
  onChange: (items: Item[]) => void;
  emptyItemTemplate: Item;
}) {
  const updateField = (index: number, key: string, raw: string) => {
    const next = items.map((item, i) => {
      if (i !== index) return item;
      const value = NUMBER_FIELDS.has(key) ? Number(raw) || 0 : raw;
      return { ...item, [key]: value };
    });
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, { ...emptyItemTemplate }]);
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const keys = Object.keys(emptyItemTemplate);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-line p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs text-muted">#{i + 1}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveItem(i, -1)}
                disabled={i === 0}
                className="text-xs text-muted hover:text-paper disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveItem(i, 1)}
                disabled={i === items.length - 1}
                className="text-xs text-muted hover:text-paper disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {keys.map((key) => {
              const isLong = LONG_TEXT_FIELDS.has(key);
              return (
                <label
                  key={key}
                  className={isLong ? "sm:col-span-2 block" : "block"}
                >
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {fieldLabel(key)}
                  </span>
                  {isLong ? (
                    <textarea
                      value={String(item[key] ?? "")}
                      onChange={(e) => updateField(i, key, e.target.value)}
                      rows={3}
                      className="input"
                    />
                  ) : (
                    <input
                      value={String(item[key] ?? "")}
                      onChange={(e) => updateField(i, key, e.target.value)}
                      className="input"
                    />
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-paper hover:border-lime hover:text-lime"
      >
        <Plus className="h-4 w-4" />
        Add item
      </button>
    </div>
  );
}
