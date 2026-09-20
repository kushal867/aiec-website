import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, X, Send, Sparkles } from "lucide-react";
import { useMagnetic } from "../lib/useMagnetic";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SESSION_STORAGE_KEY = "aiec_chat_session_id";

function getOrCreateSessionId(): string {
  const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;
  const created = crypto.randomUUID();
  sessionStorage.setItem(SESSION_STORAGE_KEY, created);
  return created;
}

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I can help you explore study-abroad options — ask about a field (e.g. \"nursing courses\"), a country (e.g. \"universities in Canada\"), or your budget, and I'll show you what we actually have on file.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggle = useMagnetic(0.2);

  if (!sessionIdRef.current) {
    sessionIdRef.current = getOrCreateSessionId();
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const apiUrl = import.meta.env.VITE_CHAT_API_URL;

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;
    if (!apiUrl) {
      setError("Chat is not configured yet — VITE_CHAT_API_URL is missing.");
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data: { reply: string } = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Something went wrong — please try again, or reach out to a counsellor directly.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-cursor="talk"
        style={toggle.style}
        onMouseMove={toggle.onMouseMove}
        onMouseLeave={toggle.onMouseLeave}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-20 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-lime text-ink shadow-lg shadow-lime/20 sm:bottom-6"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="h-5 w-5" /> : <MessageSquareText className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-36 left-4 right-4 z-50 flex h-[70vh] max-h-[560px] flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft shadow-2xl shadow-black/40 sm:bottom-24 sm:left-6 sm:right-auto sm:h-[560px] sm:w-96"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <Sparkles className="h-4 w-4 text-lime" />
              <div>
                <p className="text-sm font-semibold text-paper">AIEC Assistant</p>
                <p className="text-[11px] text-muted">Courses, universities &amp; visa info</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-lime text-ink"
                        : "border border-line bg-ink text-paper"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-line bg-ink px-3.5 py-2.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                  </div>
                </div>
              )}
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            <div className="flex items-center gap-2 border-t border-line p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about courses, fees, visas..."
                className="flex-1 rounded-full border border-line bg-ink px-4 py-2.5 text-sm text-paper placeholder:text-muted focus:border-lime focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-ink disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
