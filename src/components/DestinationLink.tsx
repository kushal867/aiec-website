import type { ReactNode } from "react";
import { useFlight } from "../lib/flightContext";

export default function DestinationLink({
  to,
  destination,
  flag,
  className,
  dataCursor = "explore",
  children,
}: {
  to: string;
  destination: string;
  flag: string;
  className?: string;
  dataCursor?: string;
  children: ReactNode;
}) {
  const { flyTo } = useFlight();

  return (
    <a
      href={to}
      data-cursor={dataCursor}
      onClick={(e) => {
        e.preventDefault();
        flyTo(to, destination, flag);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
