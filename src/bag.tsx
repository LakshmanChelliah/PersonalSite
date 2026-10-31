import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { pieceById, type DesignId } from "@/content"

const STORAGE_KEY = "embroidery-rcs-bag"

type BagContextValue = {
  ids: DesignId[]
  open: boolean
  setOpen: (open: boolean) => void
  add: (id: DesignId) => void
  remove: (id: DesignId) => void
  has: (id: DesignId) => boolean
}

const BagContext = createContext<BagContextValue | null>(null)

function readBag(): DesignId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (id): id is DesignId => typeof id === "string" && Boolean(pieceById(id)),
    )
  } catch {
    return []
  }
}

export function BagProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<DesignId[]>(readBag)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // The bag still works for this visit if storage is blocked.
    }
  }, [ids])

  const value = useMemo<BagContextValue>(
    () => ({
      ids,
      open,
      setOpen,
      add: (id) => {
        setIds((current) => (current.includes(id) ? current : [...current, id]))
      },
      remove: (id) => {
        setIds((current) => current.filter((item) => item !== id))
      },
      has: (id) => ids.includes(id),
    }),
    [ids, open],
  )

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}

export function useBag() {
  const value = useContext(BagContext)
  if (!value) {
    throw new Error("useBag must be used within BagProvider")
  }
  return value
}
