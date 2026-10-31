import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { pieceById, type DesignId } from "@/content"
import { useBag } from "@/bag"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTitle } from "@/use-title"

export function PiecePage() {
  const { slug } = useParams()
  const piece = pieceById(slug)
  useTitle(piece ? `${piece.name} — Embroidery RCS` : "Embroidery RCS")

  if (!piece) {
    return (
      <div className="flex max-w-md flex-col gap-6 py-16">
        <h1 className="font-serif text-5xl leading-none font-normal">
          That page is not here.
        </h1>
        <Link to="/" className="text-sm underline underline-offset-4">
          Back to the pieces
        </Link>
      </div>
    )
  }

  return <PieceDetail id={piece.id} />
}

function PieceDetail({ id }: { id: DesignId }) {
  const piece = pieceById(id)
  const { add, has, setOpen } = useBag()
  const [viewId, setViewId] = useState(piece?.views[0]?.id ?? "")

  if (!piece) return null

  const view = piece.views.find((item) => item.id === viewId) ?? piece.views[0]
  const inBag = has(piece.id)

  return (
    <article className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Link
          to="/"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Pieces
        </Link>
        {view ? (
          <figure className="mt-8">
            <img
              src={view.src}
              alt={view.alt}
              width={view.width}
              height={view.height}
              className="h-auto max-w-full"
              style={{ width: view.width }}
            />
          </figure>
        ) : (
          <p className="mt-16 max-w-[16ch] font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.95] font-normal">
            There is no cloth to show.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:pt-20">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{piece.index}</p>
          <h1 className="font-serif text-[clamp(2.8rem,5vw,4.25rem)] leading-[0.95] font-normal">
            {piece.name}
          </h1>
        </div>

        {piece.views.length > 1 && view ? (
          <ToggleGroup
            type="single"
            value={view.id}
            onValueChange={(value) => {
              if (value) setViewId(value)
            }}
            variant="outline"
            spacing={1}
            aria-label="Photograph"
            className="flex-wrap"
          >
            {piece.views.map((item) => (
              <ToggleGroupItem key={item.id} value={item.id}>
                {item.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        ) : null}

        <div className="flex max-w-[38ch] flex-col gap-4 text-base leading-relaxed">
          {piece.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => add(piece.id)}
            disabled={inBag}
          >
            {inBag ? "In the bag" : "Add to bag"}
          </Button>
          <Button variant="ghost" onClick={() => setOpen(true)}>
            Open bag
          </Button>
        </div>
      </div>
    </article>
  )
}
