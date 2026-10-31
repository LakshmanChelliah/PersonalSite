import { Link } from "react-router-dom"
import { INSTAGRAM_URL } from "@/content"
import { useBag } from "@/bag"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const { ids, setOpen } = useBag()

  return (
    <header className="flex items-baseline justify-between gap-6">
      <Link to="/" className="text-sm text-foreground">
        Embroidery RCS
      </Link>
      <nav className="flex items-baseline gap-5" aria-label="Site">
        <Button variant="ghost" className="h-11 px-0" onClick={() => setOpen(true)}>
          Bag{ids.length > 0 ? ` ${ids.length}` : ""}
        </Button>
        <a
          href={INSTAGRAM_URL}
          className="text-sm text-foreground underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </nav>
    </header>
  )
}
