import { Plus, Trash2 } from "lucide-react";

export default function StringListEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((value, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="input"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            aria-label="Remove"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-red-400 hover:border-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-paper hover:border-lime hover:text-lime"
      >
        <Plus className="h-4 w-4" />
        Add item
      </button>
    </div>
  );
}
