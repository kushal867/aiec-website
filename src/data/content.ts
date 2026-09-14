import cms from "./content.json";

// The collections below come from content.json — the file the /admin
// content manager edits and publishes directly to GitHub. Keeping the
// same export names/shapes here means every component that already
// imports from "content.ts" picks up admin edits automatically, with
// no changes needed anywhere else in the app.
export const stats: { value: number; suffix: string; label: string }[] = cms.stats;
export const services: { icon: string; title: string; desc: string }[] = cms.services;
export const destinations: { name: string; code: string; universities: number; flag: string }[] = cms.destinations;
export const process: { step: string; title: string; desc: string }[] = cms.process;
export const whyUs: { icon: string; title: string; desc: string }[] = cms.whyUs;
export const team: { name: string; role: string; initials: string; note: string }[] = cms.team;
export const faqs: { q: string; a: string }[] = cms.faqs;
export const testimonials: { name: string; dest: string; quote: string }[] = cms.testimonials;
export const successJourneys: { name: string; test: string; score: string; university: string; country: string; quote: string }[] = cms.successJourneys;
export const trustSignals: string[] = cms.trustSignals;
export const partnerLogos: string[] = cms.partnerLogos;
export const events: { id: string; title: string; type: string; date: string; time: string; mode: string; desc: string }[] = cms.events;
export const galleryItems: { id: number; caption: string; tone: string }[] = cms.galleryItems;

export const nav = [
  { label: "Destinations", href: "#destinations" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#process" },
  { label: "Why Us", href: "#why-us" },
  { label: "Success Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#apply" },
];

export const routeNav = [
  { n: "01", label: "Study Abroad", href: "/destinations" },
  { n: "02", label: "Test Preparation", href: "/test-prep" },
  { n: "03", label: "University Finder", href: "/universities" },
  { n: "04", label: "Learning Hub", href: "/learning-hub" },
  { n: "05", label: "Events", href: "/events" },
  { n: "06", label: "Gallery", href: "/gallery" },
  { n: "07", label: "Success Stories", href: "/success-stories" },
  { n: "08", label: "About", href: "/about" },
  { n: "09", label: "Contact", href: "/contact" },
];

export type CountryDetail = {
  code: string;
  name: string;
  flag: string;
  why: string;
  popularAreas: string[];
  intakes: string;
  tuition: string;
  livingCost: string;
  englishRequirements: string;
  popularUniversities: string[];
  scholarships: string;
  admissionRequirements: string[];
  faqs: { q: string; a: string }[];
};

const genericProcessNote =
  "Tuition, living-cost and admission figures below are indicative ranges for planning purposes — your counsellor will confirm current, university-specific numbers before you apply.";

export const countryDetails: Record<string, CountryDetail> = {
  AU: {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    why: "Strong post-study work rights, globally ranked universities and a large South Asian student community make Australia one of the most requested destinations we work with.",
    popularAreas: ["IT & Data", "Business", "Engineering", "Nursing", "Hospitality"],
    intakes: "Two main intakes — February and July, with limited November intake at some institutions.",
    tuition: `Roughly AUD 20,000–45,000/year depending on course and university. ${genericProcessNote}`,
    livingCost: "Government guidance typically estimates AUD 24,000–30,000/year for living costs — confirm current figures with your counsellor.",
    englishRequirements: "Most bachelor programs ask for IELTS 6.0–6.5 or PTE 50–58 overall; competitive postgraduate programs may ask higher. Duolingo is accepted by a growing number of institutions — we'll confirm per university.",
    popularUniversities: ["University of Melbourne", "Monash University", "UNSW Sydney", "University of Queensland"],
    scholarships: "Merit-based tuition reductions and destination-specific scholarships are available at many partner universities — your counsellor will screen your profile against current offers.",
    admissionRequirements: [
      "Academic transcripts and certificates",
      "English test score (IELTS / PTE / Duolingo)",
      "Statement of purpose",
      "Letters of recommendation (postgraduate)",
      "Proof of funds for visa filing",
    ],
    faqs: [
      { q: "Can I work while studying in Australia?", a: "Student visa holders are generally permitted to work part-time during term and full-time during scheduled breaks, subject to current visa conditions — we'll confirm the latest rules at your consultation." },
      { q: "Do I need PTE or IELTS for Australia?", a: "Either is accepted by most universities; some also accept Duolingo. Which one suits you depends on your speaking/writing strengths — we cover this in our test comparison." },
    ],
  },
  UK: {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    why: "One-year master's programs, historic institutions and the Graduate Route post-study work visa make the UK attractive for students who want a faster, focused qualification.",
    popularAreas: ["Business & Finance", "Engineering", "Computer Science", "Law", "Health Sciences"],
    intakes: "Primary intake in September/October, with a smaller January intake at many universities.",
    tuition: `Typically GBP 13,000–28,000/year depending on course and university. ${genericProcessNote}`,
    livingCost: "London and non-London living costs differ significantly — UK visa guidance sets indicative minimum funds; your counsellor will walk through current figures.",
    englishRequirements: "Most programs ask for IELTS 6.0–6.5 (UKVI) or equivalent PTE Academic score; some universities also accept Duolingo for direct entry.",
    popularUniversities: ["University of Manchester", "University of Leeds", "University of Birmingham", "Coventry University"],
    scholarships: "A number of partner universities offer international-student tuition discounts and merit scholarships — availability changes by intake.",
    admissionRequirements: [
      "Academic transcripts and certificates",
      "English test score meeting UKVI requirements",
      "Personal statement",
      "Reference letter",
      "Proof of financial support (CAS requirement)",
    ],
    faqs: [
      { q: "How long does a UK student visa take?", a: "Processing times vary by season and location — we track current timelines and plan your application backwards from your intake date." },
      { q: "Can I stay in the UK after graduating?", a: "The Graduate Route currently allows eligible graduates to stay and work for a period after completing their course — your counsellor will explain current eligibility." },
    ],
  },
  CA: {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    why: "Affordable tuition relative to other English-speaking destinations, strong co-op programs and a clear pathway toward permanent residence draw many of our students to Canada.",
    popularAreas: ["Business Management", "IT", "Engineering Technology", "Health Sciences", "Hospitality"],
    intakes: "Main intakes in September and January, with a smaller May intake at select colleges.",
    tuition: `Roughly CAD 15,000–35,000/year depending on institution type and program. ${genericProcessNote}`,
    livingCost: "Immigration guidance sets minimum proof-of-funds thresholds for study permits — we confirm current figures per province at your consultation.",
    englishRequirements: "Most programs ask for IELTS 6.0–6.5 or PTE 55–65; Duolingo is accepted by a growing list of colleges and universities.",
    popularUniversities: ["University of Toronto", "McGill University", "University of British Columbia", "Conestoga College"],
    scholarships: "Entrance scholarships and tuition awards are available at many partner institutions, particularly for strong academic profiles.",
    admissionRequirements: [
      "Academic transcripts (WES/ECA may be required)",
      "English test score",
      "Statement of purpose",
      "Proof of funds (GIC or equivalent)",
      "Letter of acceptance for study permit filing",
    ],
    faqs: [
      { q: "Is a GIC required for a Canadian study permit?", a: "Requirements vary by application stream and have changed in recent years — we confirm the current requirement for your specific case." },
      { q: "Can Canadian study lead to permanent residence?", a: "Many students use post-graduation work experience as a pathway toward PR programs — your counsellor can walk through current pathways relevant to your profile." },
    ],
  },
};

export const universitySeed = [
  { name: "University of Melbourne", country: "AU", level: "Master", field: "Business", englishTest: "IELTS/PTE", intake: "Feb, Jul", tuitionBand: "AUD 35,000–45,000/yr" },
  { name: "Monash University", country: "AU", level: "Bachelor", field: "Engineering", englishTest: "IELTS/PTE", intake: "Feb, Jul", tuitionBand: "AUD 38,000–44,000/yr" },
  { name: "UNSW Sydney", country: "AU", level: "Master", field: "IT", englishTest: "IELTS/PTE/Duolingo", intake: "Feb, Jul", tuitionBand: "AUD 40,000–46,000/yr" },
  { name: "University of Manchester", country: "UK", level: "Master", field: "Business", englishTest: "IELTS/PTE", intake: "Sep", tuitionBand: "GBP 24,000–28,000/yr" },
  { name: "University of Leeds", country: "UK", level: "Bachelor", field: "Engineering", englishTest: "IELTS", intake: "Sep, Jan", tuitionBand: "GBP 20,000–24,000/yr" },
  { name: "Coventry University", country: "UK", level: "Master", field: "IT", englishTest: "IELTS/PTE/Duolingo", intake: "Sep, Jan", tuitionBand: "GBP 15,000–18,000/yr" },
  { name: "University of Toronto", country: "CA", level: "Master", field: "Engineering", englishTest: "IELTS/PTE", intake: "Sep", tuitionBand: "CAD 32,000–38,000/yr" },
  { name: "McGill University", country: "CA", level: "Bachelor", field: "Business", englishTest: "IELTS", intake: "Sep", tuitionBand: "CAD 28,000–34,000/yr" },
  { name: "Conestoga College", country: "CA", level: "Diploma", field: "IT", englishTest: "IELTS/PTE/Duolingo", intake: "Sep, Jan, May", tuitionBand: "CAD 15,000–18,000/yr" },
];

export type TestPageData = {
  slug: string;
  name: string;
  fullName: string;
  what: string;
  who: string;
  structure: { label: string; desc: string }[];
  scoring: string;
  preparation: string[];
  classOptions: string[];
  faqs: { q: string; a: string }[];
};

export const testPrepData: Record<string, TestPageData> = {
  pte: {
    slug: "pte",
    name: "PTE",
    fullName: "Pearson Test of English",
    what: "A fully computer-delivered English test that assesses speaking, writing, reading and listening in a single sitting, with AI-assisted scoring.",
    who: "Popular with students who prefer a fast turnaround (results in ~48 hours) and are comfortable with a computer-based speaking test rather than a face-to-face interview.",
    structure: [
      { label: "Speaking & Writing", desc: "Combined section — read aloud, repeat sentence, describe image, essay writing and more." },
      { label: "Reading", desc: "Multiple-choice, re-order paragraphs, fill-in-the-blanks tasks." },
      { label: "Listening", desc: "Summarize spoken text, multiple choice, dictation and fill-in-the-blanks." },
    ],
    scoring: "Scored 10–90 overall, with communicative skill scores for speaking, writing, reading and listening reported separately.",
    preparation: [
      "Live and recorded classes covering each item type",
      "Timed practice sets under exam conditions",
      "Speaking practice with recorded playback and feedback",
      "Writing feedback on essays and summaries",
      "Reading and listening strategy sessions",
    ],
    classOptions: ["Group classes (weekday evenings)", "Weekend intensive batches", "1:1 speaking-focused sessions"],
    faqs: [
      { q: "How soon do PTE results come out?", a: "Typically within about 48 hours of your test, though this can vary — always check the latest official timelines." },
      { q: "Is PTE accepted for my target university?", a: "PTE is widely accepted across Australia, UK, Canada and more, but always varies by institution and program — we confirm this for every shortlist." },
    ],
  },
  ielts: {
    slug: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    what: "One of the most widely recognized English tests globally, available in Academic and General Training formats, with a face-to-face or video-call speaking component.",
    who: "A strong fit for students who prefer speaking with a real examiner and want the test with the broadest institutional recognition.",
    structure: [
      { label: "Listening", desc: "Four recorded sections, increasing in difficulty." },
      { label: "Reading", desc: "Three long passages with a range of question types." },
      { label: "Writing", desc: "Two tasks — a report/letter and an essay." },
      { label: "Speaking", desc: "A short face-to-face or video interview with an examiner." },
    ],
    scoring: "Band-scored from 0–9 in increments of 0.5, with an overall band and four individual skill bands.",
    preparation: [
      "Academic vs General Training strategy sessions",
      "Speaking mock interviews with real feedback",
      "Writing task correction and band-improvement plans",
      "Reading and listening timed practice",
      "Vocabulary and grammar accuracy drills",
    ],
    classOptions: ["Group classes (weekday evenings)", "Weekend intensive batches", "1:1 speaking mock interviews"],
    faqs: [
      { q: "Academic or General Training — which do I need?", a: "Academic is generally for university admission, General Training for some immigration pathways — we confirm which your target program requires." },
      { q: "How is IELTS speaking scored?", a: "An examiner assesses fluency, vocabulary, grammar and pronunciation during a short conversation — our mock sessions mirror the real format." },
    ],
  },
  duolingo: {
    slug: "duolingo",
    name: "Duolingo English Test",
    fullName: "Duolingo English Test (DET)",
    what: "A shorter, at-home, adaptive English test that adjusts question difficulty as you answer, with results typically available within about 48 hours.",
    who: "Popular with students who want a flexible, take-it-from-home option and whose target universities accept it as an alternative to IELTS/PTE.",
    structure: [
      { label: "Adaptive Test", desc: "A single adaptive section mixing reading, listening, writing and speaking-style items, roughly 45 minutes." },
      { label: "Video Interview", desc: "A short recorded writing/speaking sample sent to institutions alongside your score." },
    ],
    scoring: "Scored on a scale of 10–160, with sub-scores for literacy, comprehension, conversation and production.",
    preparation: [
      "Practice with the adaptive question format",
      "Timed mock tests under real test conditions",
      "Speaking and writing sample practice",
      "Guidance on setting up a compliant home test environment",
    ],
    classOptions: ["Self-paced practice pack", "Group orientation session", "1:1 mock test review"],
    faqs: [
      { q: "Is Duolingo accepted by my target university?", a: "Acceptance is growing but still varies by institution and program — we check this individually before recommending it for your shortlist." },
      { q: "Can I take the Duolingo test from home?", a: "Yes, it's designed to be taken remotely on a computer with a webcam, under proctored conditions — we'll walk you through the setup requirements." },
    ],
  },
};

export const articles = [
  { id: "pte-vs-ielts", category: "English", title: "PTE vs IELTS: how to actually choose", excerpt: "A practical, non-hype breakdown of format, timing and delivery differences." },
  { id: "australia-intake-guide", category: "Study Abroad", title: "Australia intake guide: Feb vs July", excerpt: "What changes between intakes, and how it affects your application timeline." },
  { id: "sop-writing-tips", category: "Universities", title: "Writing a statement of purpose that isn't generic", excerpt: "Structure, common mistakes, and what admissions teams actually look for." },
  { id: "visa-refusal-recovery", category: "Visa", title: "What to do after a visa refusal", excerpt: "How to read a refusal letter and rebuild a stronger application." },
  { id: "scholarship-checklist", category: "Scholarships", title: "A pre-application scholarship checklist", excerpt: "The documents and deadlines that catch students out most often." },
];

export const learningHubCategories = [
  "PTE",
  "IELTS",
  "Duolingo",
  "Study Abroad",
  "Visa",
  "Scholarships",
  "Universities",
  "Career",
  "English",
];

export const faqCategories = [
  "General",
  "PTE",
  "IELTS",
  "Duolingo",
  "Study Abroad",
  "Universities",
  "Application",
  "Visa",
  "Scholarships",
];
