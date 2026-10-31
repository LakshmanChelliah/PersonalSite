import { INSTAGRAM_URL } from "@/content"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-6 pt-16">
      <Separator />
      <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-baseline sm:justify-between">
        <p>Embroidery RCS</p>
        <a
          href={INSTAGRAM_URL}
          className="text-foreground underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          @embroidery.rcs
        </a>
      </div>
      <p className="max-w-sm text-sm text-muted-foreground">
        Made to order. This site does not take payment.
      </p>
    </footer>
  )
}
