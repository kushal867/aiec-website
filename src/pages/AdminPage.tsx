import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Lock, LogOut } from "lucide-react";
import GenericArrayEditor from "../components/admin/GenericArrayEditor";
import StringListEditor from "../components/admin/StringListEditor";
import contentJson from "../data/content.json";

const REPO_OWNER = "kushal867";
const REPO_NAME = "aiec-website";
const FILE_PATH = "src/data/content.json";
const BRANCH = "main";

// A basic access gate for this internal tool — not meant to replace real
// auth, just to keep casual visitors from stumbling onto the editor.
// Publishing still requires the site owner's own GitHub token, which is
// the actual permission check that matters.
const ADMIN_PASSWORD = "globaltimes2026";

type ContentState = typeof contentJson;

const emptyTemplates = {
  stats: { value: 0, suffix: "", label: "" },
  services: { icon: "Compass", title: "", desc: "" },
  destinations: { name: "", code: "", universities: 0, flag: "" },
  process: { step: "", title: "", desc: "" },
  whyUs: { icon: "BadgeCheck", title: "", desc: "" },
  team: { name: "", role: "", initials: "", note: "" },
  faqs: { q: "", a: "" },
  testimonials: { name: "", dest: "", quote: "" },
  successJourneys: { name: "", test: "", score: "", university: "", country: "", quote: "" },
  events: { id: "", title: "", type: "", date: "", time: "", mode: "", desc: "" },
  galleryItems: { id: 0, caption: "", tone: "from-ink-soft to-ink" },
};

function Section({
  title,
  help,
  children,
}: {
  title: string;
  help: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-display text-lg font-semibold text-paper">{title}</span>
        <span className="text-sm text-muted">{open ? "Hide" : "Edit"}</span>
      </button>
      {open && (
        <div className="pb-8">
          <p className="mb-4 text-xs text-muted">{help}</p>
          {children}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [token, setToken] = useState("");
  const [content, setContent] = useState<ContentState>(contentJson);
  const [status, setStatus] = useState<"idle" | "publishing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("gte-admin-unlocked") === "1") setUnlocked(true);
    const savedToken = localStorage.getItem("gte-admin-token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleUnlock = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("gte-admin-unlocked", "1");
      setUnlocked(true);
    } else {
      setErrorMsg("Wrong password.");
    }
  };

  const saveToken = (t: string) => {
    setToken(t);
    localStorage.setItem("gte-admin-token", t);
  };

  const update = <K extends keyof ContentState>(key: K, value: ContentState[K]) => {
    setContent((c) => ({ ...c, [key]: value }));
  };

  const publish = async () => {
    if (!token) {
      setErrorMsg("Paste your GitHub token first.");
      return;
    }
    setStatus("publishing");
    setErrorMsg("");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      };

      const getRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
        { headers }
      );
      if (!getRes.ok) {
        throw new Error(`Couldn't read the current file (${getRes.status}). Check your token has 'repo' access.`);
      }
      const getData = await getRes.json();
      const sha = getData.sha;

      const jsonString = JSON.stringify(content, null, 2) + "\n";
      const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

      const putRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
          method: "PUT",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "Update site content via /admin",
            content: base64Content,
            sha,
            branch: BRANCH,
          }),
        }
      );
      if (!putRes.ok) {
        const errBody = await putRes.json().catch(() => ({}));
        throw new Error(errBody.message || `Publish failed (${putRes.status}).`);
      }

      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <Lock className="h-6 w-6 text-lime" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-paper">
            Content manager
          </h1>
          <p className="mt-2 text-sm text-muted">
            Internal tool — enter the site password to continue.
          </p>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            placeholder="Password"
            className="input mt-6"
            autoFocus
          />
          {errorMsg && <p className="mt-2 text-xs text-red-400">{errorMsg}</p>}
          <button
            onClick={handleUnlock}
            className="mt-4 w-full rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-paper">
              Content manager
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Edit the text shown across the site below, then hit Publish.
              Changes go live automatically in about a minute (Vercel
              redeploys whenever this file changes on GitHub).
            </p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("gte-admin-unlocked");
              setUnlocked(false);
            }}
            className="flex shrink-0 items-center gap-1.5 text-xs text-muted hover:text-paper"
          >
            <LogOut className="h-3.5 w-3.5" />
            Lock
          </button>
        </div>

        <div className="mt-8 rounded-lg border border-line p-5">
          <h2 className="font-display text-sm font-semibold text-paper">
            GitHub access token
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Needed once to publish. Generate one at{" "}
            <a
              href="https://github.com/settings/personal-access-tokens/new"
              target="_blank"
              rel="noreferrer"
              className="text-lime underline"
            >
              github.com/settings/personal-access-tokens/new
            </a>{" "}
            — scope it to the <code>{REPO_NAME}</code> repository only, with
            "Contents: Read and write" permission. It's saved only in this
            browser, never sent anywhere except GitHub.
          </p>
          <input
            type="password"
            value={token}
            onChange={(e) => saveToken(e.target.value)}
            placeholder="github_pat_..."
            className="input mt-3"
          />
        </div>

        <div className="mt-4">
          <Section title="Stats (homepage numbers)" help="The four big numbers on the homepage.">
            <GenericArrayEditor
              items={content.stats}
              onChange={(v) => update("stats", v as ContentState["stats"])}
              emptyItemTemplate={emptyTemplates.stats}
            />
          </Section>

          <Section title="Services" help="The numbered service list.">
            <GenericArrayEditor
              items={content.services}
              onChange={(v) => update("services", v as ContentState["services"])}
              emptyItemTemplate={emptyTemplates.services}
            />
          </Section>

          <Section title="Destinations" help="Country name, 2-letter code (used in URLs, e.g. /destinations/AU), university count, flag emoji.">
            <GenericArrayEditor
              items={content.destinations}
              onChange={(v) => update("destinations", v as ContentState["destinations"])}
              emptyItemTemplate={emptyTemplates.destinations}
            />
          </Section>

          <Section title="How it works (process steps)" help="The 4-step process shown on the homepage.">
            <GenericArrayEditor
              items={content.process}
              onChange={(v) => update("process", v as ContentState["process"])}
              emptyItemTemplate={emptyTemplates.process}
            />
          </Section>

          <Section title="Why Us" help="The differentiators shown on the About/Why Us section.">
            <GenericArrayEditor
              items={content.whyUs}
              onChange={(v) => update("whyUs", v as ContentState["whyUs"])}
              emptyItemTemplate={emptyTemplates.whyUs}
            />
          </Section>

          <Section title="Team" help="Counsellor bios shown on the About page.">
            <GenericArrayEditor
              items={content.team}
              onChange={(v) => update("team", v as ContentState["team"])}
              emptyItemTemplate={emptyTemplates.team}
            />
          </Section>

          <Section title="FAQ" help="Frequently asked questions (homepage preview + full FAQ page).">
            <GenericArrayEditor
              items={content.faqs}
              onChange={(v) => update("faqs", v as ContentState["faqs"])}
              emptyItemTemplate={emptyTemplates.faqs}
            />
          </Section>

          <Section title="Testimonials" help="Homepage rotating quotes.">
            <GenericArrayEditor
              items={content.testimonials}
              onChange={(v) => update("testimonials", v as ContentState["testimonials"])}
              emptyItemTemplate={emptyTemplates.testimonials}
            />
          </Section>

          <Section title="Success stories" help="Full journey cards on the Success Stories page.">
            <GenericArrayEditor
              items={content.successJourneys}
              onChange={(v) => update("successJourneys", v as ContentState["successJourneys"])}
              emptyItemTemplate={emptyTemplates.successJourneys}
            />
          </Section>

          <Section title="Trust signals" help="Short credibility lines on the About page.">
            <StringListEditor
              items={content.trustSignals}
              onChange={(v) => update("trustSignals", v)}
            />
          </Section>

          <Section title="Partner university names" help="Scrolling logo marquee text.">
            <StringListEditor
              items={content.partnerLogos}
              onChange={(v) => update("partnerLogos", v)}
            />
          </Section>

          <Section title="Events" help="Upcoming sessions/workshops list. Date format: YYYY-MM-DD.">
            <GenericArrayEditor
              items={content.events}
              onChange={(v) => update("events", v as ContentState["events"])}
              emptyItemTemplate={emptyTemplates.events}
            />
          </Section>

          <Section title="Gallery captions" help="Photo grid captions (photos themselves are placeholders for now).">
            <GenericArrayEditor
              items={content.galleryItems}
              onChange={(v) => update("galleryItems", v as ContentState["galleryItems"])}
              emptyItemTemplate={emptyTemplates.galleryItems}
            />
          </Section>
        </div>

        <div className="sticky bottom-4 mt-10 flex items-center gap-4 rounded-lg border border-line bg-ink/95 p-4 backdrop-blur">
          <button
            onClick={publish}
            disabled={status === "publishing"}
            className="flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink disabled:opacity-60"
          >
            {status === "publishing" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "publishing" ? "Publishing…" : "Publish changes"}
          </button>
          {status === "done" && (
            <span className="flex items-center gap-1.5 text-sm text-lime">
              <CheckCircle2 className="h-4 w-4" />
              Published — live in about a minute.
            </span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-400">{errorMsg}</span>
          )}
        </div>
      </div>
    </div>
  );
}
