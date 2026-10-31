"use client";
import { useEffect, useRef, useState } from "react";
import { animate, createScope } from "animejs";
import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileImage,
  Globe2,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Play,
  Pause,
  Radio,
  CircleStop,
  Box,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("./model-viewer"), {
  ssr: false,
  loading: () => <div className="viewer-loading">Loading the 3D studio…</div>,
});

export function Media({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="product-media">
      {failed ? (
        <img src={poster} alt={label} />
      ) : (
        <video
          ref={ref}
          poster={poster}
          preload="none"
          loop
          muted
          playsInline
          aria-label={label}
          onError={() => setFailed(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/webm" />
        </video>
      )}
      {!failed && (
        <button
          className="media-toggle"
          onClick={() => {
            const v = ref.current;
            if (v) {
              if (v.paused) void v.play().catch(() => setFailed(true));
              else v.pause();
            }
          }}
          aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span>{playing ? "Pause film" : "Play product film"}</span>
        </button>
      )}
    </div>
  );
}

export function EsstaDemo() {
  const [view, setView] = useState("desktop");
  const [sent, setSent] = useState(false);
  return (
    <Tabs.Root value={view} onValueChange={setView} className="essta-stage">
      <div className="stage-toolbar">
        <span>
          <Globe2 size={14} /> A digital home. A real community.
        </span>
        <Tabs.List aria-label="ESSTA preview">
          <Tabs.Trigger value="desktop">Desktop</Tabs.Trigger>
          <Tabs.Trigger value="mobile">Mobile</Tabs.Trigger>
          <Tabs.Trigger value="membership">Membership</Tabs.Trigger>
        </Tabs.List>
      </div>
      <Tabs.Content value="desktop">
        <div className="browser-chrome">
          <i />
          <i />
          <i />
          <span>essta.ca</span>
        </div>
        <Media
          src="/media/essta.webm"
          poster="/media/essta.webp"
          label="ESSTA community website tour"
        />
      </Tabs.Content>
      <Tabs.Content value="mobile">
        <div className="mobile-device">
          <img
            src="/media/essta-mobile.webp"
            alt="ESSTA live website captured at a mobile viewport"
            loading="lazy"
          />
        </div>
      </Tabs.Content>
      <Tabs.Content value="membership">
        <div className="membership-demo">
          <span className="eyebrow">Illustrative membership preview</span>
          <h3>Belonging starts here.</h3>
          <p>
            Explore the form experience with sample details. Nothing is
            submitted.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label>
              Full name
              <input defaultValue="Alex Example" required />
            </label>
            <label>
              Email
              <input type="email" defaultValue="alex@example.com" required />
            </label>
            <button className="button" type="submit">
              Preview confirmation
              <ArrowRight size={16} />
            </button>
          </form>
          {sent && (
            <p role="status" className="demo-status">
              <Check size={16} /> Preview complete. No application was sent.
            </p>
          )}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

const territories = [
  "M80 75 135 40 193 63 179 122 128 144 76 116Z",
  "M194 63 251 52 293 89 268 138 212 150 179 122Z",
  "M128 144 179 122 212 150 199 205 150 231 108 195Z",
  "M293 89 350 73 399 111 381 164 322 186 268 138Z",
  "M212 150 268 138 322 186 294 238 239 256 199 205Z",
  "M399 111 457 98 508 136 497 195 433 214 381 164Z",
  "M322 186 381 164 433 214 410 271 352 292 294 238Z",
  "M150 231 199 205 239 256 213 308 157 331 117 287Z",
  "M239 256 294 238 352 292 326 350 266 360 213 308Z",
  "M433 214 497 195 541 237 518 292 462 314 410 271Z",
];
export function ConqrDemo() {
  const [step, setStep] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  useEffect(() => {
    scope.current = createScope({ root });
    return () => scope.current?.revert();
  }, []);
  const next = () => {
    setStep((s) => (s + 1) % 4);
    scope.current?.add(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        animate(".map-pulse", {
          scale: [0.7, 1.12, 1],
          opacity: [0.4, 1],
          duration: 650,
        });
    });
  };
  const phases = [
    "Join a lobby",
    "Claim a territory",
    "Resolve an action",
    "Sync every player",
  ];
  return (
    <div className="conqr-stage" ref={root}>
      <div className="conqr-board">
        <div className="stage-toolbar">
          <span className="mono">CONQR / FIELD OPERATIONS</span>
          <span className="live-dot">Interactive architecture demo</span>
        </div>
        <svg
          className="territory-map"
          viewBox="0 0 640 400"
          role="img"
          aria-label={`Illustrative territory board. ${phases[step]}`}
        >
          <defs>
            <pattern
              id="map-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M24 0H0V24"
                fill="none"
                stroke="currentColor"
                strokeWidth=".3"
              />
            </pattern>
          </defs>
          <rect width="640" height="400" fill="url(#map-grid)" />
          {territories.map((d, i) => (
            <path
              key={d}
              d={d}
              className={`territory ${step > 0 && i < step * 2 ? "claimed" : ""}`}
            />
          ))}
          {step > 0 && (
            <g className="map-pulse">
              <circle cx="168" cy="176" r="17" fill="#f2ba62" />
              <text
                x="168"
                y="181"
                textAnchor="middle"
                fontSize="13"
                fill="#142d26"
              >
                {step === 1 ? "1" : "4"}
              </text>
            </g>
          )}
          <path
            className="board-route"
            d="M168 176Q230 80 339 129"
            fill="none"
            strokeDasharray="5 7"
            stroke={step > 1 ? "#f2ba62" : "transparent"}
            strokeWidth="2"
          />
          <text x="34" y="370" className="map-caption">
            ILLUSTRATIVE BOARD · SERVER-OWNED GAME STATE
          </text>
        </svg>
        <div className="player-strip">
          {["You", "Player 02", "Player 03"].map((p, i) => (
            <span key={p}>
              <i style={{ background: ["#f2ba62", "#79aa9c", "#b2c8d2"][i] }} />
              {p}
              <small>
                {step === 3 ? "Synced" : step === 0 ? "In lobby" : "Connected"}
              </small>
            </span>
          ))}
        </div>
      </div>
      <div className="conqr-explainer">
        <span className="eyebrow">The hard part wasn’t the map.</span>
        <h3>
          It was making every
          <br />
          browser agree.
        </h3>
        <ol className="phase-list">
          {phases.map((p, i) => (
            <li key={p} data-active={step === i}>
              <span>0{i + 1}</span>
              {p}
              {step > i && <Check size={14} />}
            </li>
          ))}
        </ol>
        <p aria-live="polite">
          {
            [
              "A shareable URL brings players into the same PartyKit room.",
              "The browser sends an intent. The rules engine decides if the move is valid.",
              "Turns, dice, and troop counts are resolved on the authoritative server.",
              "The server broadcasts snapshots. Every player renders the same public state.",
            ][step]
          }
        </p>
        <button className="button light-button" onClick={next}>
          {step === 3 ? "Replay sequence" : "Next step"}
          {step === 3 ? <RotateCcw size={15} /> : <ArrowRight size={15} />}
        </button>
      </div>
      <details className="conqr-live-capture">
        <summary>
          See the actual product <ArrowUpRight size={14} />
        </summary>
        <Media
          src="/media/conqr.webm"
          poster="/media/conqr.webp"
          label="Conqr live interface tour"
        />
      </details>
    </div>
  );
}

const beyViews = [
  {
    id: "physics",
    name: "Physics",
    label: "Real-time simulation",
    text: "Three.js visuals meet Cannon-es physics. The same simulation foundation powers local play and authoritative online matches.",
    flow: ["Input", "Simulation", "Render"],
  },
  {
    id: "multiplayer",
    name: "Multiplayer",
    label: "Responsive, synchronized play",
    text: "Local prediction responds to input immediately. Authoritative snapshots and input replay reconcile the client with the server.",
    flow: ["Predict", "Validate", "Reconcile"],
  },
  {
    id: "progression",
    name: "Progression",
    label: "A game that keeps growing",
    text: "The repository extends the arena with accounts, ranked formats, earned progression, and a workshop for custom parts. Availability depends on live service configuration.",
    flow: ["Play", "Persist", "Customize"],
  },
];
export function BeyDemo() {
  const [view, setView] = useState("physics");
  const [model, setModel] = useState(false);
  return (
    <Tabs.Root
      value={view}
      onValueChange={(v) => {
        setView(v);
        setModel(false);
      }}
      className="bey-stage"
    >
      <div className="bey-topline">
        <span className="mono">
          <span className="live-dot" /> Browser-native arena
        </span>
        <Tabs.List aria-label="BeyWeb architecture">
          {beyViews.map((v) => (
            <Tabs.Trigger key={v.id} value={v.id}>
              {v.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>
      {beyViews.map((v) => (
        <Tabs.Content value={v.id} key={v.id}>
          <div className="bey-visual">
            {model ? (
              <div className="model-container">
                <ModelViewer />
                <button
                  className="viewer-close icon-button"
                  aria-label="Close 3D viewer"
                  onClick={() => setModel(false)}
                >
                  <X />
                </button>
              </div>
            ) : (
              <>
                <Media
                  src={`/media/beyweb-${v.id}.webm`}
                  poster={`/media/beyweb-${v.id}.webp`}
                  label={`BeyWeb ${v.name.toLowerCase()} demonstration`}
                />
                <button className="model-launch" onClick={() => setModel(true)}>
                  <Box size={16} /> Explore in 3D
                  <ArrowRight size={14} />
                </button>
              </>
            )}
          </div>
          <div className="bey-architecture">
            <div>
              <span className="eyebrow">{v.label}</span>
              <p>{v.text}</p>
            </div>
            <div className="flow-nodes">
              {v.flow.map((f, i) => (
                <span key={f}>
                  <i>0{i + 1}</i>
                  {f}
                  {i < 2 && <ArrowRight size={18} />}
                </span>
              ))}
            </div>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

export function QnxDemo() {
  const [mode, setMode] = useState<"idle" | "drive" | "estop" | "watchdog">(
    "idle",
  );
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const change = (next: typeof mode) => {
    if (timer.current) clearTimeout(timer.current);
    setCount(0);
    setMode(next);
    if (next === "drive") {
      setCount(500);
      timer.current = setTimeout(() => {
        setMode("watchdog");
        setCount(0);
      }, 500);
    }
  };
  return (
    <div className="qnx-demo">
      <div className="mini-stage-header">
        <span>
          <Radio size={15} /> QNX / control path
        </span>
        <span>Explanatory simulation</span>
      </div>
      <div className={`qnx-flow ${mode === "drive" ? "driving" : ""}`}>
        <span>Controller</span>
        <ArrowRight />
        <span>IPC</span>
        <ArrowRight />
        <span>Drive</span>
        <ArrowRight />
        <span className="motor-state">
          {mode === "drive" ? "Motor on" : "Motor off"}
        </span>
      </div>
      <div className="qnx-readings">
        <span>
          Drive period
          <strong>
            50<small> ms</small>
          </strong>
        </span>
        <span>
          Watchdog
          <strong>
            500<small> ms</small>
          </strong>
        </span>
        <span>
          Status
          <strong className="status-text" aria-live="polite">
            {mode === "estop"
              ? "E-STOP"
              : mode === "watchdog"
                ? "TIMEOUT"
                : mode === "drive"
                  ? "DRIVING"
                  : "READY"}
          </strong>
        </span>
      </div>
      <p>
        {mode === "watchdog"
          ? "No new command arrived within 500 ms. The explanatory motor output has stopped."
          : mode === "estop"
            ? "Emergency stop overrides drive commands. Reset to return to the ready state."
            : mode === "drive"
              ? `${count} ms watchdog started. Send another command to refresh it.`
              : "Send a drive command, then watch the watchdog stop the motor when commands cease."}
      </p>
      <div className="demo-controls">
        <button disabled={mode === "estop"} onClick={() => change("drive")}>
          <Play size={13} /> Send drive
        </button>
        <button onClick={() => change("estop")}>
          <CircleStop size={13} /> Emergency stop
        </button>
        <button
          onClick={() => change("idle")}
          aria-label="Reset QNX simulation"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}

const sampleFiles = [
  { name: "morning-light.webp", color: "#b8c3a7", scene: "hills" },
  { name: "coastal-study.webp", color: "#b5c8cc", scene: "sea" },
  { name: "morning-light-copy.webp", color: "#b8c3a7", scene: "hills" },
];
export function FileTriageDemo() {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<{ index: number; action: string }[]>(
    [],
  );
  const act = (action: string) => {
    setHistory((h) => [...h, { index, action }]);
    setIndex((i) => i + 1);
  };
  const file = sampleFiles[index];
  return (
    <div className="triage-demo">
      <div className="mini-stage-header">
        <span>
          <FileImage size={15} /> FileTriage
        </span>
        <span>Sample media only</span>
      </div>
      {file ? (
        <>
          <div
            className={`sample-landscape ${file.scene}`}
            style={{ background: file.color }}
            role="img"
            aria-label="Illustrated sample landscape"
          >
            <div className="sun" />
            <div className="hill hill-back" />
            <div className="hill hill-front" />
            {index === 2 && (
              <span className="duplicate-label">
                Exact duplicate · matching SHA-256
              </span>
            )}
          </div>
          <div className="file-caption">
            <span>{file.name}</span>
            <small>{index + 1} / 3</small>
          </div>
        </>
      ) : (
        <div className="triage-complete">
          <Check size={30} />
          <h4>All clear.</h4>
          <p>
            {history.filter((h) => h.action === "Keep").length} kept ·{" "}
            {history.filter((h) => h.action === "Recycle").length} recycled in
            this demo.
          </p>
        </div>
      )}
      <div className="demo-controls">
        <button onClick={() => act("Keep")} disabled={!file}>
          <Check size={14} /> Keep
        </button>
        <button onClick={() => act("Recycle")} disabled={!file}>
          <Trash2 size={14} /> Recycle
        </button>
        <button
          onClick={() => {
            const last = history.at(-1);
            if (last) {
              setIndex(last.index);
              setHistory((h) => h.slice(0, -1));
            }
          }}
          disabled={!history.length}
        >
          <RotateCcw size={14} /> Undo
        </button>
      </div>
      <p className="sample-notice" aria-live="polite">
        {history.length
          ? `Last action: ${history.at(-1)?.action}. No real files were changed.`
          : "Try the preview-first review loop. No file access required."}
      </p>
    </div>
  );
}

const leagueTeams = [
  "Grand HEIST Auto",
  "Advanced Net-ronics",
  "The Bumpy Bunch",
  "Block Party",
  "Tank U, Next",
  "The Upsetters",
  "Sets on the Beach",
  "How I Set My Mother",
];
const sampleNight: {
  time: string;
  home: number;
  away: number;
  games: [number, number][];
}[] = [
  {
    time: "6:00",
    home: 0,
    away: 1,
    games: [
      [21, 16],
      [21, 14],
      [19, 21],
    ],
  },
  {
    time: "7:00",
    home: 2,
    away: 3,
    games: [
      [18, 21],
      [21, 17],
      [15, 21],
    ],
  },
  {
    time: "8:00",
    home: 4,
    away: 5,
    games: [
      [21, 19],
      [21, 18],
      [21, 16],
    ],
  },
  {
    time: "9:00",
    home: 6,
    away: 7,
    games: [
      [21, 23],
      [21, 19],
      [25, 23],
    ],
  },
];
function sampleStandings(recorded: boolean) {
  const rows = leagueTeams.map((name, team) => ({
    team,
    name,
    wins: 0,
    losses: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  }));
  if (recorded) {
    for (const match of sampleNight) {
      for (const [homeScore, awayScore] of match.games) {
        const home = rows[match.home];
        const away = rows[match.away];
        home.pointsFor += homeScore;
        home.pointsAgainst += awayScore;
        away.pointsFor += awayScore;
        away.pointsAgainst += homeScore;
        if (homeScore > awayScore) {
          home.wins += 1;
          away.losses += 1;
        } else if (awayScore > homeScore) {
          away.wins += 1;
          home.losses += 1;
        }
      }
    }
  }
  return rows
    .map((row) => ({ ...row, diff: row.pointsFor - row.pointsAgainst }))
    .sort(
      (a, b) =>
        b.wins - a.wins ||
        b.diff - a.diff ||
        b.pointsFor - a.pointsFor ||
        a.team - b.team,
    )
    .map((row, index) => ({ ...row, rank: index + 1 }));
}
export function VolleyballDemo() {
  const [team, setTeam] = useState(0);
  const [recorded, setRecorded] = useState(false);
  const rows = sampleStandings(recorded);
  const match = sampleNight.find(
    (item) => item.home === team || item.away === team,
  );
  const opponent = match
    ? match.home === team
      ? match.away
      : match.home
    : 0;
  let setsFor = 0;
  let setsAgainst = 0;
  if (match && recorded) {
    for (const [homeScore, awayScore] of match.games) {
      const yours = match.home === team ? homeScore : awayScore;
      const theirs = match.home === team ? awayScore : homeScore;
      if (yours > theirs) setsFor += 1;
      else if (theirs > yours) setsAgainst += 1;
    }
  }
  const diffLabel = (diff: number) => (diff > 0 ? `+${diff}` : String(diff));
  return (
    <div className="volley-stage">
      <div className="stage-toolbar">
        <span>Illustrative night · one court</span>
        <label className="volley-pick">
          Your team
          <select
            value={team}
            onChange={(event) => setTeam(Number(event.target.value))}
          >
            {leagueTeams.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="volley-layout">
        <div className="volley-night">
          <span className="eyebrow">Your next match</span>
          {match && (
            <>
              <div className="volley-matchup">
                <div>
                  <small>You</small>
                  <strong>{leagueTeams[team]}</strong>
                </div>
                <div className="volley-time">
                  <b>{match.time}</b>
                  <small>PM</small>
                </div>
                <div>
                  <small>Opponent</small>
                  <strong>{leagueTeams[opponent]}</strong>
                </div>
              </div>
              <p>
                {recorded
                  ? `Sample result ${setsFor}–${setsAgainst}.`
                  : "Wednesday slot on the sample board. No score yet."}
              </p>
              <h3>Rest of the night</h3>
              <ul className="volley-rest">
                {sampleNight
                  .filter((item) => item !== match)
                  .map((item) => (
                    <li key={item.time}>
                      <b>{item.time}</b>
                      <span>
                        {leagueTeams[item.home]} vs {leagueTeams[item.away]}
                      </span>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
        <div className="volley-standings">
          <h3>Standings</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Team</th>
                <th scope="col">W</th>
                <th scope="col">Diff</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} data-you={row.team === team || undefined}>
                  <td>{row.rank}</td>
                  <td>{row.name}</td>
                  <td>{row.wins}</td>
                  <td>{diffLabel(row.diff)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="demo-controls">
        <button onClick={() => setRecorded(true)} disabled={recorded}>
          <Check size={14} /> Record sample scores
        </button>
        <button onClick={() => setRecorded(false)} disabled={!recorded}>
          <RotateCcw size={14} /> Clear sample scores
        </button>
      </div>
      <p className="sample-notice" role="status">
        {recorded
          ? "Sample scores recorded. Nothing was saved to the league."
          : "No games yet. Recording scores only changes this preview."}
      </p>
    </div>
  );
}
