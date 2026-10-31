import bronzeNeck from "@/assets/cloth/bronze-neck.jpg"
import bronzeSleeve from "@/assets/cloth/bronze-sleeve.jpg"
import saffronBack from "@/assets/cloth/saffron-back.jpg"
import saffronFront from "@/assets/cloth/saffron-front.jpg"
import saffronSleeve from "@/assets/cloth/saffron-sleeve.jpg"
import saffronStars from "@/assets/cloth/saffron-stars.jpg"

export const INSTAGRAM_URL = "https://instagram.com/embroidery.rcs"

export type DesignId = "bronze-tassel" | "saffron-beaded" | "commission"

export type ClothView = {
  id: string
  label: string
  src: string
  width: number
  height: number
  alt: string
}

export type Piece = {
  id: DesignId
  index: string
  name: string
  summary: string
  paragraphs: string[]
  views: ClothView[]
}

export const pieces: Piece[] = [
  {
    id: "bronze-tassel",
    index: "01",
    name: "Bronze tassel blouse",
    summary:
      "Back neck, leaf beadwork, tiered tassels, a citrine-colored stone.",
    paragraphs: [
      "Bronze silk. The back neck is edged in leaf beadwork of seed beads, with tiered tassels on the ties and a citrine-colored stone at the center.",
      "Made to order. I don't take payment on this site. Send me the measurements on Instagram.",
    ],
    views: [
      {
        id: "neck",
        label: "Neck",
        src: bronzeNeck,
        width: 570,
        height: 666,
        alt: "Back neck of a bronze silk blouse. Leaf beadwork in seed beads, tiered tassels, and a citrine-colored stone at the center.",
      },
      {
        id: "sleeve",
        label: "Sleeve",
        src: bronzeSleeve,
        width: 352,
        height: 364,
        alt: "Sleeve of the bronze blouse, with leaf beadwork and a citrine-colored stone.",
      },
    ],
  },
  {
    id: "saffron-beaded",
    index: "02",
    name: "Saffron beaded blouse",
    summary: "Neckline and sleeve. Pearl and gold star beadwork.",
    paragraphs: [
      "Saffron silk. Pearl and gold star beadwork follows the neckline and the sleeve.",
      "Made to order. I don't take payment on this site. Send me the measurements on Instagram.",
    ],
    views: [
      {
        id: "back",
        label: "Back",
        src: saffronBack,
        width: 540,
        height: 519,
        alt: "Back neckline of a saffron silk blouse, edged with pearl and gold star beadwork.",
      },
      {
        id: "front",
        label: "Front",
        src: saffronFront,
        width: 296,
        height: 724,
        alt: "Front neckline of the saffron blouse, pearl and gold star beadwork, worn with a saree.",
      },
      {
        id: "sleeve",
        label: "Sleeve",
        src: saffronSleeve,
        width: 392,
        height: 362,
        alt: "Sleeve of the saffron blouse, with pearl and gold star beadwork.",
      },
      {
        id: "beadwork",
        label: "Beadwork",
        src: saffronStars,
        width: 234,
        height: 310,
        alt: "Pearl and gold star beadwork on saffron silk.",
      },
    ],
  },
  {
    id: "commission",
    index: "03",
    name: "Commission",
    summary: "A blouse that does not exist yet.",
    paragraphs: [
      "There is no photograph. This blouse is not stitched yet.",
      "Tell me the occasion, your measurements, and what you want the neck to do. I answer on Instagram.",
    ],
    views: [],
  },
]

export function pieceById(id: string | undefined) {
  return pieces.find((piece) => piece.id === id)
}

export type OrderDraft = {
  design: DesignId | ""
  occasion: string
  bust: string
  underbust: string
  shoulder: string
  blouseLength: string
  sleeve: string
  frontNeck: string
  backNeck: string
  notes: string
  name: string
  contact: string
}

const measurementFields = [
  ["bust", "Bust"],
  ["underbust", "Underbust"],
  ["shoulder", "Shoulder"],
  ["blouseLength", "Blouse length"],
  ["sleeve", "Sleeve"],
  ["frontNeck", "Front neck"],
  ["backNeck", "Back neck"],
] as const

export type MeasurementKey = (typeof measurementFields)[number][0]

export const measurements = measurementFields

function measurementValue(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return null
  const number = Number(trimmed)
  if (number < 1 || number > 80) return null
  return trimmed
}

export function orderErrors(draft: OrderDraft) {
  const errors: Partial<Record<keyof OrderDraft, string>> = {}

  if (!draft.design) {
    errors.design = "Choose a design."
  }
  if (!draft.occasion) {
    errors.occasion = "I need the occasion date."
  }

  for (const [key, label] of measurements) {
    const value = draft[key].trim()
    if (!value) {
      errors[key] = `I need the ${label.toLowerCase()}.`
    } else if (!measurementValue(value)) {
      errors[key] = "Use inches, as a number."
    }
  }

  if (!draft.name.trim()) {
    errors.name = "I need your name."
  }
  if (!draft.contact.trim()) {
    errors.contact = "I need a way to reach you."
  }

  return errors
}

export function formatOccasion(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  if (!year || !month || !day) return iso
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

export function buildOrderNote(draft: OrderDraft) {
  const piece = pieceById(draft.design)
  const lines = [
    "Embroidery RCS",
    "Order note. This was not saved on a server.",
    "",
    `Design: ${piece?.name ?? draft.design}`,
    `Occasion: ${formatOccasion(draft.occasion)}`,
    "",
    "Measurements (inches)",
    ...measurements.map(([key, label]) => `${label}: ${draft[key].trim()}`),
    "",
    `Notes: ${draft.notes.trim() || "none"}`,
    "",
    `Name: ${draft.name.trim()}`,
    `Contact: ${draft.contact.trim()}`,
    "",
    `Instagram: ${INSTAGRAM_URL}`,
  ]
  return lines.join("\n")
}
