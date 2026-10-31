"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
const approaches = {
  conqr: {
    label: "Conqr",
    question: "How do several browsers agree?",
    steps: [
      "Understand turn ownership, private state, and what happens on disconnect.",
      "Separate browser presentation from the rules engine and room lifecycle.",
      "Use tools and AI assistance to explore unfamiliar APIs and iterate on implementation.",
      "Check rules, bots, cards, and reconnect flows with automated tests.",
    ],
  },
  beyweb: {
    label: "BeyWeb",
    question: "How do you make the browser feel alive?",
    steps: [
      "Break the problem into physics, rendering, input, networking, and persistence.",
      "Research the constraints of fixed-step simulation and authoritative multiplayer.",
      "Build reusable simulation and asset-processing tools; use AI to accelerate exploration.",
      "Exercise snapshots, reconciliation, room transitions, and UI flows.",
    ],
  },
  essta: {
    label: "ESSTA",
    question: "How do you learn an entirely new medium?",
    steps: [
      "Start with the people using the website and the information they need.",
      "Learn browser layout, navigation, forms, and responsive design.",
      "Use available tools and AI assistance to work through unfamiliar web technologies.",
      "Review mobile layouts, field validation, errors, and the final reading experience.",
    ],
  },
};
export function ProcessLab() {
  const [selected, setSelected] = useState<keyof typeof approaches>("conqr");
  const item = approaches[selected];
  return (
    <section className="process section-pad" id="approach">
      <div className="section-top">
        <span className="eyebrow">04 / How I work</span>
        <span className="mono">AI in the loop. Judgment at every step.</span>
      </div>
      <div className="process-layout">
        <div>
          <h2>
            New problem.
            <br />
            New tools.
            <br />
            <span>Same curiosity.</span>
          </h2>
          <p>
            My embedded background taught me to understand the system. Building
            with AI lets me explore faster. Research, implementation, and
            verification still do the work.
          </p>
          <div
            className="process-select"
            role="group"
            aria-label="Choose a project approach"
          >
            {Object.entries(approaches).map(([key, value]) => (
              <button
                key={key}
                aria-pressed={selected === key}
                onClick={() => setSelected(key as keyof typeof approaches)}
              >
                {value.label}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
        </div>
        <div className="process-case" aria-live="polite">
          <span className="eyebrow">A practical example / {item.label}</span>
          <h3>{item.question}</h3>
          <ol>
            {["Understand", "Research", "Build", "Verify"].map((label, i) => (
              <li key={label}>
                <span className="process-number">0{i + 1}</span>
                <div>
                  <h4>{label}</h4>
                  <p>{item.steps[i]}</p>
                </div>
              </li>
            ))}
          </ol>
          <span className="process-footnote">
            A description of my approach, not a recorded agent trace.
          </span>
        </div>
      </div>
    </section>
  );
}
