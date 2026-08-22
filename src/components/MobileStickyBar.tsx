import { Phone, MessageCircle, Headset } from "lucide-react";

export default function MobileStickyBar({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-ink/95 backdrop-blur sm:hidden">
      <a
        href="tel:+97714971529"
        className="flex flex-col items-center gap-1 border-r border-line py-3 text-paper"
      >
        <Phone className="h-4 w-4" />
        <span className="text-[10px] uppercase tracking-widest">Call</span>
      </a>
      <a
        href="https://wa.me/9771XXXXXXX"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1 border-r border-line py-3 text-paper"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="text-[10px] uppercase tracking-widest">WhatsApp</span>
      </a>
      <button
        onClick={onOpenContact}
        className="flex flex-col items-center gap-1 py-3 text-lime"
      >
        <Headset className="h-4 w-4" />
        <span className="text-[10px] uppercase tracking-widest">Book</span>
      </button>
    </div>
  );
}
