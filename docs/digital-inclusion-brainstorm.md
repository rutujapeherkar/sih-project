# Theme 2 — Digital Inclusion & Public Access: Research & Innovation Brainstorm

> Problem statements
> 1. Citizens find it hard to understand public services because the information is complex.
> 2. People with disabilities need digital interfaces that are easy to navigate.
> 3. Older adults need help using digital payments and essential apps.

---

## 1. Domain research — what the data says

| Signal | Evidence | What it means for us |
|---|---|---|
| Elderly are digitally excluded | Fewer than half of elderly Indians can use the internet on their own; **only 8% know how to report cyber fraud** (Springer CSI Transactions, 2026) | Teaching alone is not enough. We need **protection** plus **reporting built into the flow** |
| Fraud is growing fast | UPI fraud went from ₹573 cr (FY23) to ₹1,087 cr (FY24); "digital arrest" networks took ₹1,000+ cr by Dec 2025; cybercrime against seniors rose 86% from 2020 to 2022 (HelpAge) | A scam shield is a **must-have** feature |
| Scale of UPI | 22,168 cr digital transactions in FY25, 81% of them on UPI | Payment help touches almost every household |
| Feature-phone population | Over 200M feature-phone users; UPI 123PAY (IVR/missed call) exists but is little known | A **voice/IVR channel** is required, not a nice-to-have |
| Unclaimed welfare | Rural awareness of schemes is about 30% even among eligible people; myScheme lists 4,700+ schemes | "Complex information" is really a **discovery + eligibility + paperwork** problem |
| Accessibility is legally required but often ignored | GIGW 3.0 requires WCAG 2.1 AA; CCPD fined 155 establishments, including ministries, and sent notices to 140+ entities in 2024; RBI (Oct 2024) and SEBI (2025) now mandate accessibility | There's a real compliance buyer, and a PwD user base badly served today |
| Delegated payments are now possible | NPCI **UPI Circle Full Delegation** (BHIM, Nov 2025): family sets a limit of up to ₹15k/month for a senior | We can build **family-guardian** features on official rails |

## 2. Existing approaches

| Solution | What it does | Category |
|---|---|---|
| **myScheme** (MeitY) | Scheme catalogue + questionnaire-based eligibility | Information |
| **Jugalbandi** (AI4Bharat + Microsoft) | WhatsApp voice/text bot on schemes, built on Bhashini + GPT | Information, vernacular |
| **Bhashini** | Govt ASR/TTS/translation APIs for 22 languages | Language infra |
| **UMANG / DigiLocker** | Single app for 1,000+ services / document wallet | Service delivery |
| **CSCs (Common Service Centres)** | Assisted, human-operated service kiosks | Assisted access |
| **UPI 123PAY, UPI Lite, Hello UPI** | Feature-phone / offline / voice payments | Payments |
| **UPI Circle** | Delegated payments with family limits | Payments + guardianship |
| **Sanchar Saathi / Chakshu, 1930, cybercrime.gov.in** | Report fraud comms / lost money | Fraud reporting |
| **Be My Eyes / Seeing AI / TalkBack** | Visual assistance, screen readers | Disability |
| **Digital literacy (PMGDISHA, 2,421 Centres for Financial Literacy)** | Classroom training | Education |

## 3. Gaps in existing solutions — where we win

1. **Information bots answer but don't act.** Jugalbandi covered only ~171 of ~20,000 schemes in 10 languages, had no real-time updates, and got no feedback on whether the citizen actually *got* the benefit. Nobody closes the loop from "you are eligible" to documents ready, application filed, and status tracked.
2. **LLM eligibility is unreliable.** Chatbots hallucinate criteria. Nobody separates a **deterministic rules engine** (the source of truth) from the **LLM layer** (explanation only), and nobody cites sources.
3. **Documents in the wild are not covered.** Citizens are confused by *paper*: electricity bills, court or police notices, land records, hospital discharge sheets, bank SMS. No tool lets you "point the camera and ask, in Marathi, what do I have to do and by when?"
4. **Protection is reactive.** 1930 and Chakshu work only *after* the user recognises a scam. Scam scripts like "digital arrest" play out over **hours of calls**, and nothing sits in the middle to say "pause, this is the pattern."
5. **Payment help is a tutorial, not a co-pilot.** Seniors are shown videos. They are never **guided inside the real app** or given a **safe practice sandbox** where mistakes cost nothing.
6. **Family help is ad-hoc.** Kids help over the phone ("press the blue button…"). There's no consented remote-assist + UPI Circle + scam-alert bundle.
7. **Accessibility is per-app and per-disability.** Screen readers depend on each site being compliant, and most are not (see the CCPD fines). There is no **universal adaptive layer** that repairs and re-renders any service for a user's specific needs. Indian Sign Language (ISL) and Indian-language easy-read are almost absent.
8. **No feedback to government.** Nobody measures *where* citizens get stuck. Departments don't know which form field, notice or step causes drop-offs.
9. **CSC middlemen are opaque.** Assisted access exists, but fees and quality vary and there's no trust layer.
10. **Channels are siloed.** App, WhatsApp, IVR and kiosk each have separate brains, so a feature-phone user gets a second-class product.

## 4. The solution: **"Saathi" — one inclusive AI companion, every channel**

One brain (rules engine + grounded RAG + Bhashini voice) served over **PWA, WhatsApp, IVR/missed-call and a CSC kiosk mode**. Every feature is designed for the three personas: *the confused citizen, the person with a disability, the elder.*

### Tier-1 "wow" features (build these for the demo)

#### ① Samjho Lens — "Point, and understand"
- Photo, screenshot, PDF or forwarded SMS goes in. Out comes a **3-line plain-language card** in the user's language and dialect: **What is this? What must I do? By when / how much? Is it genuine?**
- Reads the card aloud (Bhashini TTS) and offers **Easy-Read mode** (pictograms + short sentences) for cognitive disabilities and low literacy.
- Auto-extracts deadlines into a **reminder** (WhatsApp or IVR call on the due date).
- Flags suspicious documents: fake "I4C / CBI" letters, fake electricity-disconnection SMS.
- *Why it wins:* it works on **any** paper or page in the country, with no dependency on the department.

#### ② Haq (Entitlement) Engine — "Benefits you're missing"
- A 60-second **voice interview** (or a consented DigiLocker pull) builds a citizen profile. A **deterministic rules engine** (JSON-logic rules compiled from myScheme + state gazettes) returns the schemes they qualify for, **ranked by ₹ value**.
- For each scheme: a **document checklist** marked ✓ already in DigiLocker or ✗ missing (with how to get it), a **pre-filled application draft**, and the nearest CSC or office with timings.
- **Life-event triggers:** turned 60 → old-age pension; child born → Janani Suraksha / Sukanya; disability certificate issued → UDID benefits.
- Every answer shows **source + "last verified on" date**. The LLM only explains; it never decides eligibility.
- Headline stat for the pitch: *"This family is missing ₹48,000/year in benefits."*

#### ③ Kavach — Scam Shield for elders
- **On-device risk scoring** of incoming SMS/WhatsApp text, and of screen content during payments (Android Accessibility Service). It matches known scripts: digital arrest, KYC expiry, "wrong UPI transfer, please refund", "collect request disguised as receive", screen-share apps like AnyDesk.
- **Pause & Verify:** when risk is high and the user is about to pay, a **full-screen calm interrupt** in their language plays a 10-second voice explainer and starts a **cooling-off timer** for amounts above a threshold. The trusted family member gets an **instant alert**.
- **One-tap report:** pre-filled Chakshu (suspicious communication) or 1930 / cybercrime.gov.in (money lost) packet with screenshots, numbers and timeline. It picks the right channel for the user; today only 8% of elders know which one to use.
- **"Golden hour" mode:** if money is already lost, it walks through freezing steps in the first hour.

#### ④ Haath Pakdo — Live co-pilot + safe practice
- **Abhyas (Practice) Sandbox:** a pixel-faithful mock of UPI/BHIM/UMANG flows with **fake money**. Seniors practise scan-to-pay, checking balance and paying a bill, with voice coaching and gamified confidence badges. Mistakes are free.
- **Live overlay guide:** in the real app, a voice + highlight overlay says "Now tap the green button that says Pay". It uses the Accessibility tree, so it works across apps without partner integrations.
- **Family Assist:** a consented, one-tap remote-view session with the family member. The family can **draw arrows on the senior's screen** but **can never type the PIN**, which is enforced by masking. Combined with **UPI Circle** setup for a monthly spending limit.

#### ⑤ Sugam Mode — Universal adaptive interface
- A single **ability profile** set up once by voice: blind / low-vision / deaf / motor / cognitive / elderly.
- Saathi **re-renders any service flow** (our own flows, plus a proxied "reader view" of government pages) into the profile's layout:
  - **Blind:** voice-first conversational mode that turns the form into Q&A. No screen reader or site compliance needed.
  - **Low-vision:** large text, high contrast, magnifier.
  - **Deaf:** **ISL video/avatar** for key instructions, plus captions.
  - **Motor:** switch access, large targets, dwell-click, voice commands.
  - **Cognitive:** Easy-Read, one step per screen, progress pictograms.
- **Accessibility X-Ray** (for govt/compliance judges): paste any govt URL to get an automated WCAG 2.1 AA / GIGW 3.0 scorecard (axe-core) plus an auto-generated fix list. This addresses the compliance problem the CCPD fines expose.

### Tier-2 differentiators (show in slides / partial build)

6. **Confusion Heatmap — Govt Insights Dashboard.** Anonymised, aggregated signals show where citizens get stuck (which scheme, form field, notice type or district) and which scams are trending in which pin code. It turns the citizen app into a **policy feedback loop**, which is highly attractive to SIH judges from ministries.
7. **Sahayak Network (trusted human fallback).** When the AI isn't confident, it hands off to a verified volunteer or CSC VLE, with **fixed transparent fees**, ratings and an audit trail. This curbs middleman exploitation.
8. **Same brain, every channel.** Missed-call to an IVR in 22 languages for feature phones (links to UPI 123PAY), WhatsApp bot, PWA, and a **kiosk mode** for CSCs and panchayat offices.
9. **Voice-note memory for elders.** "What did the bank say last time?" Saathi keeps a private, consent-based timeline of the elder's interactions, applications and payments.
10. **Offline-first.** The PWA caches the scheme rule packs and practice sandbox, so it works at 2G or with no network.

## 5. Architecture — scalable, reliable, performant

```
Channels:  PWA (Next.js) · WhatsApp · IVR/Missed-call · Kiosk
                     │  (one conversation API, channel adapters)
            ┌────────▼─────────┐
            │  Orchestrator     │  intent routing, session, consent, rate-limit
            └──┬──────┬──────┬──┘
   ┌───────────▼┐ ┌───▼──────────┐ ┌▼──────────────────┐
   │ Rules      │ │ Grounded RAG │ │ Risk engine        │
   │ engine     │ │ (schemes,    │ │ (scam patterns,    │
   │ (JSON-logic│ │ notices) +   │ │ on-device model +  │
   │ versioned) │ │ citations    │ │ server rules)      │
   └────────────┘ └──────────────┘ └────────────────────┘
        │  Bhashini ASR/TTS/NMT · OCR · LLM (explain-only)
        ▼
   Postgres (profiles, applications) · Vector store · Redis cache
   Event bus → Analytics warehouse → Confusion Heatmap (k-anonymised)
```

**Scalability**
- Stateless API behind a load balancer; channel adapters are independent services.
- **Rules evaluated in milliseconds without calling an LLM.** The LLM is only used for explanation, which keeps cost low as users grow.
- Aggressive caching: scheme explanations cached per (scheme, language, reading-level). Most traffic is repeat questions.
- Queue-based OCR and ASR (burst tolerant); CDN for sandbox assets; PWA offline packs.

**Reliability and trust**
- **Deterministic eligibility** with versioned rule packs and a citation plus "last verified" date on every answer.
- LLM guardrails: answers are grounded only in retrieved docs; "I'm not sure" hands off to a human.
- Graceful degradation: if the LLM is down, a template-based explanation still works; if the network is down, offline packs still work.
- Scam detection runs **on-device first**, so it still protects the user without a network.

**Privacy and compliance**
- DPDP Act 2023: explicit, granular consent (DigiLocker pull, family assist), data minimisation, **on-device PII redaction** before any cloud call.
- Family assist never exposes the PIN (masked region, no remote input on PIN screens).
- WCAG 2.1 AA / GIGW 3.0 compliant by construction; tested with real PwD users.

**Performance targets:** voice reply < 2s p95; Samjho Lens < 4s; rules evaluation < 50ms; PWA bundle < 200KB for the first screen; usable on a ₹6k Android at 2G.

## 6. Hackathon MVP scope (build order)

| Priority | Feature | Demo-able in 36h? | Stack |
|---|---|---|---|
| P0 | Samjho Lens (photo → plain-language voice card + deadline) | ✅ | Next.js + OCR + LLM + Bhashini TTS |
| P0 | Haq Engine (voice interview → ranked schemes + doc checklist) | ✅ with 30–50 real schemes encoded | JSON-logic rules + RAG |
| P0 | Kavach scam check + Pause & Verify + one-tap 1930/Chakshu packet | ✅ (text/screenshot classifier + rules) | LLM classifier + pattern rules |
| P1 | Abhyas UPI practice sandbox with voice coach | ✅ (pure frontend) | Next.js |
| P1 | Sugam Mode profiles (voice-only, large/contrast, easy-read, captions) | ✅ | CSS tokens + voice mode |
| P1 | Accessibility X-Ray on a govt URL | ✅ | axe-core via Playwright |
| P2 | Govt Confusion Heatmap dashboard | ✅ with seeded data | charts |
| P2 | WhatsApp / IVR channel | Partial (WhatsApp sandbox or Exotel trial) | adapters |

## 7. Demo story (3 minutes, one persona)

1. **Kamla-ji, 67, Nashik, low vision.** Turns on Sugam Mode by voice, in Marathi.
2. Shows her **electricity notice** to Samjho Lens. It says: "Pay ₹1,240 by 5 Oct, genuine. Here is how." A reminder is set.
3. Gets an SMS: "Your electricity will be cut tonight, call 98xxx." **Kavach flags it as fake**, her son gets an alert, and a Chakshu report is filed in one tap.
4. Practises paying in **Abhyas**, then pays for real with the overlay guide (within her UPI Circle limit).
5. **Haq Engine** finds she is missing the **old-age pension + a state widow pension: ₹18,000/yr**. DigiLocker docs are ✓ and the nearest CSC is shown.
6. Cut to the **District Collector's dashboard**: "Electricity-disconnection scams up 3× in Nashik this week; 40% of pension applicants drop off at the income-certificate step."

Close with: **"We don't just explain government to citizens. We show government where citizens get stuck."**

## 8. Judging-criteria mapping

| Criterion | How Saathi scores |
|---|---|
| Innovation | Point-and-understand for *any* paper, pre-payment scam interrupt, practice sandbox, universal adaptive layer, citizen→govt feedback loop |
| Impact | Covers all 3 problem statements; addresses documented ₹1,000+ cr scam losses and unclaimed benefits |
| Feasibility | Built on existing rails (Bhashini, DigiLocker, myScheme, UPI Circle, 1930/Chakshu), with no new govt integration needed for the MVP |
| Scalability | Rules-first and LLM-light, cached, multi-channel, offline-first |
| UX / inclusion | Voice-first, 22 languages, ISL, easy-read, feature-phone IVR |

## Sources
- [Bridging India's generational digital divide — Springer CSI Transactions on ICT](https://link.springer.com/article/10.1007/s40012-026-00428-0)
- [UPI drives 81% of digital payments — TechObserver](https://techobserver.in/news/egov/upi-digital-payments-india-22000-crore-transactions-2025-321551/)
- [UPI scams analysis — Exploratio Journal](https://exploratiojournal.com/exploring-how-indias-digital-payment-revolution-created-a-new-class-of-fraud-victims-an-analysis-of-upi-scams/)
- [PwC: Combating payments fraud in India](https://www.pwc.in/ghost-templates/combating-payments-fraud-in-Indias-digital-payments-landscape.html)
- [Digital arrest scams — ORF](https://www.orfonline.org/expert-speak/digital-arrest-scams-and-the-limits-of-domestic-enforcement)
- [Digital arrest scam targeting elderly — Gracias Living](https://graciasliving.com/digital-arrest-scam-elderly-parents-india/)
- [Jugalbandi — MediaNama](https://www.medianama.com/2023/06/223-jugalbandi-chatbot-rural-india-what-to-know/)
- [Jugalbandi — Microsoft Source Asia](https://news.microsoft.com/source/asia/features/with-help-from-next-generation-ai-indian-villagers-gain-easier-access-to-government-services/)
- [myScheme — Digital India](https://www.digitalindia.gov.in/initiative/myscheme/)
- [RPWD Act & digital accessibility — Deque](https://www.deque.com/blog/how-the-rights-of-persons-with-disabilities-act-rpwd-impacts-digital-accessibility-in-india/)
- [India digital accessibility compliance 2026](https://halfaccessible.com/india-digital-accessibility-compliance/)
- [SEBI accessibility mandate — L&E Global](https://leglobal.law/2025/09/19/india-sebi-mandates-digital-accessibility-for-all-regulated-entities/)
- [UPI 123PAY — Razorpay](https://razorpay.com/blog/what-is-upi-123-pay/)
- [PhonePe UPI 123Pay — MediaNama](https://www.medianama.com/2026/09/223-phonepe-upi-feature-phone-123pay/)
- [UPI Circle Full Delegation — BusinessToday](https://www.businesstoday.in/personal-finance/news/story/bhim-introduces-upi-circle-delegation-for-seniors-young-users-to-transact-independently-within-preset-limits-503697-2025-11-25)
- [NPCI UPI Circle](https://www.npci.org.in/product/upi-circle)
- [Chakshu / Sanchar Saathi](https://services.india.gov.in/service/detail/chakshu-report-suspected-fraud-communication)
- [Report scam calls guide 2026](https://righttoinformation.wiki/report-scam-call-number-2026)
- [UMANG & DigiLocker expansion — IBEF](https://www.ibef.org/news/government-expands-citizen-centric-digital-public-service-delivery-through-umang-and-digilocker)
