import { Link } from "react-router-dom";

const items = [
  { label: "Study Abroad", href: "/destinations" },
  { label: "PTE", href: "/test-prep/pte" },
  { label: "IELTS", href: "/test-prep/ielts" },
  { label: "Duolingo", href: "/test-prep/duolingo" },
  { label: "Universities", href: "/universities" },
  { label: "Scholarships", href: "/destinations" },
];

export default function QuickAccessBar() {
  return (
    <div className="border-y border-line">
      <div className="container-px mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-8 gap-y-3 py-5">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            data-cursor="view"
            className="underline-sweep font-display text-sm font-semibold uppercase tracking-wide text-paper/80"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
