import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Schibsted_Grotesk,
  Source_Serif_4,
} from "next/font/google";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  fallback: ["Segoe UI", "Helvetica Neue", "Arial"],
});

const display = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-display",
  fallback: ["Iowan Old Style", "Palatino", "Georgia"],
});

const displayItalic = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  axes: ["opsz"],
  variable: "--font-display-italic",
  fallback: ["Iowan Old Style", "Palatino", "Georgia"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["Consolas", "ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lakshmanchelliah.ca"),
  title: {
    default: "Lakshman Chelliah — Software, systems & things that move",
    template: "%s · Lakshman Chelliah",
  },
  description:
    "Software Engineering Developer at General Dynamics Mission Systems–Canada. Explore web products, multiplayer games, AI workflows, and embedded systems.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Lakshman Chelliah",
    images: [{ url: "/social.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${displayItalic.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <footer className="footer">
          <a href="/">
            LC<span>© {new Date().getFullYear()}</span>
          </a>
          <span>Built with curiosity. Verified with care.</span>
          <a href="#main">Back to top ↑</a>
        </footer>
      </body>
    </html>
  );
}
