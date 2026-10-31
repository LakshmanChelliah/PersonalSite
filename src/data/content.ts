export type Experience = {
  company: string;
  role: string;
  team?: string;
  start: string;
  end: string;
  area: string;
  bullets: string[];
  tags: string[];
};
export type Education = { school: string; degree: string; period: string };
export type SkillGroup = { name: string; skills: string[] };
export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  story: string;
  challenge: string;
  decisions: string[];
  outcome: string;
  tags: string[];
  url?: string;
  period?: string;
  number: string;
};
export const person = {
  name: "Lakshman Chelliah",
  email: "lakshman.chelliah@gmail.com",
  location: "Ottawa, Ontario",
  linkedin: "https://www.linkedin.com/in/lakshmanchelliah/",
  domain: "https://lakshmanchelliah.ca",
};
export const experience: Experience[] = [
  {
    company: "General Dynamics Mission Systems–Canada",
    role: "Software Engineering Developer",
    team: "Vetronics · Smart Displays",
    start: "May 2026",
    end: "Present",
    area: "Vehicle electronics",
    bullets: [
      "Software development within the Smart Displays team for vehicle electronics.",
    ],
    tags: ["Embedded systems", "Smart Displays"],
  },
  {
    company: "Royal Canadian Mounted Police",
    role: "Intercept System Developer",
    team: "Technical Operations",
    start: "May 2025",
    end: "Aug 2025",
    area: "Secure software",
    bullets: [
      "Contributed automated data-purging features for sensitive information in accordance with stakeholder requirements.",
      "Investigated intermittent CI/CD failures and environment-specific issues; tested and validated application changes.",
    ],
    tags: ["Angular", "Node.js", "Spring Boot", "GitLab CI/CD"],
  },
  {
    company: "Ciena",
    role: "Photonics Software Developer",
    start: "Sept 2024",
    end: "Dec 2024",
    area: "Photonics",
    bullets: [
      "Contributed to FPGA upgrade workflows for amplifiers and ROADMs on the 6500 Reconfigurable Line System.",
      "Developed PRAM-based diagnostic logging and validated recovery from fibre cuts and loss-of-signal events in hardware-in-the-loop environments.",
    ],
    tags: ["Embedded C/C++", "VxWorks", "Linux", "Wireshark"],
  },
  {
    company: "Royal Canadian Mounted Police",
    role: "Web Developer",
    team: "Technical Operations",
    start: "May 2024",
    end: "Aug 2024",
    area: "Web platforms",
    bullets: [
      "Upgraded an Angular application from v13 to v18, refactoring legacy components and resolving compatibility issues.",
      "Developed unit and web UI tests to check feature parity; contributed code reviews and changes through deployment.",
    ],
    tags: ["Angular", "TypeScript", "Playwright"],
  },
  {
    company: "BlackBerry",
    role: "Machine Learning Developer",
    start: "Jan 2024",
    end: "Apr 2024",
    area: "ML & automation",
    bullets: [
      "Built a Salesforce data-ingestion pipeline to produce structured datasets for predictive modelling.",
      "Evaluated lightweight LLMs for system-log summaries and developed Python/PowerShell automation for Microsoft 365 and Azure licence audits.",
    ],
    tags: ["Python", "PowerShell", "Pandas", "Azure", "LLMs"],
  },
  {
    company: "Ciena",
    role: "Embedded Software Developer",
    start: "May 2023",
    end: "Aug 2023",
    area: "Embedded software",
    bullets: [
      "Resolved Coverity findings involving memory leaks, uninitialized variables, and buffer overflows.",
      "Built Python tooling to compare software-load boot times across RLS modules and recreate long-running customer defects.",
      "Automated log analysis and engineering notifications during defect reproduction.",
    ],
    tags: ["C/C++", "Python", "VxWorks", "Coverity"],
  },
  {
    company: "Telepin Software Systems",
    role: "Automation Software Engineer",
    start: "Jan 2022",
    end: "Sept 2022",
    area: "Test automation",
    bullets: [
      "Built automated regression tests for payment, refund, and commission workflows.",
      "Translated business rules and edge cases into API and UI validation using Java, JMeter, and SQL.",
    ],
    tags: ["Java", "JMeter", "REST APIs", "SQL"],
  },
];
export const education: Education = {
  school: "Carleton University",
  degree: "Bachelor of Engineering · Software Engineering with Co-op",
  period: "Sept 2021 – April 2026",
};
export const skills: SkillGroup[] = [
  {
    name: "Systems & embedded",
    skills: [
      "C",
      "C++",
      "QNX",
      "VxWorks",
      "Embedded Linux",
      "ARM",
      "IPC",
      "UART / SPI / I2C",
    ],
  },
  {
    name: "Web & products",
    skills: [
      "TypeScript",
      "JavaScript",
      "React / Next.js",
      "Angular",
      "Node.js",
      "Spring Boot",
      "WebSockets",
      "SQL",
    ],
  },
  {
    name: "AI & automation",
    skills: [
      "Python",
      "LLM-assisted workflows",
      "Pandas / NumPy",
      "SHAP",
      "Ghidra automation",
      "PowerShell",
    ],
  },
  {
    name: "Verification & delivery",
    skills: [
      "Git",
      "GitLab CI/CD",
      "Docker",
      "Playwright",
      "Vitest",
      "Coverity",
      "HIL testing",
      "Wireshark",
    ],
  },
];
export const projects: Project[] = [
  {
    slug: "essta",
    name: "ESSTA",
    number: "01",
    eyebrow: "Community / First website",
    headline: "A community,\nconnected.",
    summary:
      "An embedded developer’s first step onto the web. A digital home for Edmonton’s senior Sri Lankan Tamil community.",
    story:
      "My first website brought the Edmonton Senior Sri Lankan Tamils Association online. I learned web development while turning the association’s content into a responsive site with cultural storytelling, program information, and a membership application workflow.",
    challenge:
      "Learning the browser from the ground up while creating a clear, approachable experience for a community organization.",
    decisions: [
      "Kept the application static with HTML, CSS, and JavaScript to make hosting and maintenance straightforward.",
      "Separated organization and membership configuration from the interface.",
      "Used D3 and TopoJSON for a heritage globe, with a fallback when visualization data is unavailable.",
      "Added field validation, submission feedback, and email delivery through FormSubmit.",
    ],
    outcome:
      "A live community website that brings the organization’s heritage, programs, leadership, and membership information together.",
    tags: ["HTML / CSS", "JavaScript", "D3", "FormSubmit"],
    url: "https://essta.ca",
  },
  {
    slug: "conqr",
    name: "Conqr",
    number: "02",
    eyebrow: "Multiplayer / State machines",
    headline: "One world.\nShared state.",
    summary:
      "A world-conquest game that turned my first WebSocket lobbies into a lesson in authoritative multiplayer systems.",
    story:
      "My first state-based multiplayer web game moved the challenge beyond rendering a board: players needed to share reliable turns, actions, and outcomes. Conqr separates its browser interface from an authoritative game engine, with shareable rooms, reconnection support, and repeatable rules.",
    challenge:
      "Making several browsers agree on what happened, whose turn it is, and what each player is allowed to know.",
    decisions: [
      "Clients send intents to PartyKit rooms; a pure rules engine validates actions and produces snapshots.",
      "Kept dice, card shuffling, and bot decisions on the server with seeded randomness for repeatable tests.",
      "Used resume tokens and disconnect grace to let players recover their seats.",
      "Separated public board state from private cards and missions.",
    ],
    outcome:
      "A browser strategy game with shareable lobbies, bot opponents, an SVG world map, and mobile battle controls.",
    tags: ["Next.js", "PartyKit", "TypeScript", "WebSockets", "Vitest"],
    url: "https://conqr.net",
  },
  {
    slug: "beyweb",
    name: "BeyWeb",
    number: "03",
    eyebrow: "Realtime / Physics / Progression",
    headline: "A whole arena.\nIn your browser.",
    summary:
      "From spinning tops to a connected game: 3D physics, multiplayer battles, player progression, and a parts workshop.",
    story:
      "BeyWeb expanded my work into real-time 3D physics, online play, customization, and persistent progression. The challenge became coordinating the game simulation, responsive controls, network synchronization, and a growing collection of player-facing systems.",
    challenge:
      "Making a physics-based game feel responsive while keeping online matches and persistent progression authoritative.",
    decisions: [
      "Shared simulation logic between offline play and authoritative Node/WebSocket rooms.",
      "Combined client prediction, input replay, and reconciliation to respond locally while respecting server state.",
      "Separated Three.js rendering, Cannon-es physics, input adapters, and game rules.",
      "Built accounts, workshop customization, ranked formats, and progression persistence with a Supabase-backed data layer.",
    ],
    outcome:
      "A live browser arena game for desktop and mobile, supported by integration tests and Playwright scenarios. Architecture details describe the inspected repository; individual online and account features depend on the live service configuration.",
    tags: ["Three.js", "Cannon-es", "Node.js", "WebSockets", "Supabase"],
    url: "https://beyweb.net",
  },
  {
    slug: "gdravolleyball",
    name: "GD RA Volleyball",
    number: "04",
    eyebrow: "League / Wednesday nights",
    headline: "The night,\non one board.",
    summary:
      "Schedule, standings, and score entry for the GD RA Volleyball League. Eight teams, one gym, Wednesday nights.",
    story:
      "Eight teams share one gym at Regina Street Public School. I built a board that leads with your next match, keeps the rest of the night and the standings beside it, and lets the coordinator record scores without republishing the site.",
    challenge:
      "Giving players a phone-first view of their own night, while keeping standings current after the games are played.",
    decisions: [
      "Published home, schedule, standings, team pages, and rules as a static board.",
      "Remembered the chosen team in a cookie. On a phone, Home, Schedule, and Team focus on that team’s matches. Standings still lists every team.",
      "Ranked by games won, then point differential, then points scored. A tied game awards no point. A forfeit is stored as 21–0, 21–0, 21–0.",
      "Kept score entry on a coordinator host. The PIN stays on the server. Saving merges one match into the results file on GitHub, so the board updates without a new HTML publish.",
      "Gave each team an Outlook subscription and an .ics download for that team’s games.",
    ],
    outcome:
      "A live board for the Wednesday-night season, October 28, 2026 through the May playoffs. The public pages are static. Score entry depends on the coordinator host.",
    tags: ["Next.js", "TypeScript", "ICS calendars"],
    url: "https://gdravolleyball.ca",
    period: "2026–27 season",
  },
  {
    slug: "qnx",
    name: "QNX RC Vehicle",
    number: "05",
    eyebrow: "University team project / Real-time systems",
    headline: "When software\nmeets motion.",
    summary:
      "A Raspberry Pi vehicle safety stack built around message passing, motor control, sensing, and predictable behavior.",
    story:
      "As part of a university team, I worked on a QNX-based RC vehicle system connecting real-time processes with physical inputs and outputs. The architecture separates control inputs, drive arbitration, sensors, and operator feedback.",
    challenge:
      "Coordinating hardware-facing processes while making control ownership and stop conditions explicit.",
    decisions: [
      "Used QNX IPC messages to separate input sources from the motor controller.",
      "Designed source arbitration, an emergency-stop override, and a command watchdog.",
      "Separated drive logic from the I2C motor-driver abstraction.",
      "Used a configured 50 ms drive-update period and 500 ms command watchdog; these are configuration values, not measured latency claims.",
    ],
    outcome:
      "A team-built hardware/software platform exploring RTOS scheduling, sensing, IPC, and defensive motor control.",
    tags: ["QNX", "C/C++", "Raspberry Pi", "IPC", "I2C"],
    period: "Jan – Apr 2026",
  },
  {
    slug: "filetriage",
    name: "FileTriage",
    number: "06",
    eyebrow: "Desktop utility / Toolmaking",
    headline: "Keep the good.\nUndo the rest.",
    summary:
      "A focused desktop tool for reviewing media, finding exact duplicates, and cleaning up with a way back.",
    story:
      "FileTriage turns a cluttered folder into a preview-first review process. Instead of making cleanup an irreversible batch decision, it supports keeping, recycling, and undoing recent actions.",
    challenge:
      "Making large-folder cleanup understandable and recoverable through a fast, focused interface.",
    decisions: [
      "Built a Windows desktop application with Electron, React, and TypeScript.",
      "Used media previews and keyboard shortcuts to keep the review loop simple.",
      "Sent discarded items to the Recycle Bin and supported undo through temporary backups.",
      "Identified exact image duplicates using SHA-256 hashes.",
    ],
    outcome:
      "A desktop media-review tool with installer and portable packaging workflows. The website demo only uses bundled sample media.",
    tags: ["Electron", "React", "TypeScript", "SHA-256"],
  },
];
export const additionalProjects = [
  {
    name: "IoT Trust Management · Capstone team project",
    period: "Oct 2025 – Apr 2026",
    text: "Neural-network trust scoring for ON–OFF attack detection, behavioral features, SHAP explanations, repeatable data snapshots, and an LLM-based security-summary layer.",
  },
  {
    name: "Automotive Firmware Reverse Engineering",
    period: "Mar – Apr 2026",
    text: "PowerPC ECU analysis with Ghidra and WinOLS; investigated LIN and NVRAM routines and implemented a Tow/Haul persistence patch with assembly-level hooks and scripted analysis.",
  },
];
