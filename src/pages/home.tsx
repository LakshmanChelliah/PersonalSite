import { Link } from "react-router-dom"
import { pieces } from "@/content"
import { Separator } from "@/components/ui/separator"
import { useTitle } from "@/use-title"

export function HomePage() {
  useTitle("Embroidery RCS")
  const featured = pieces[0]
  const photograph = featured.views[0]

  return (
    <div className="flex flex-col gap-20 lg:gap-28">
      <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-6 lg:pt-6">
          <h1 className="font-serif text-[clamp(3.4rem,8vw,6.4rem)] leading-[0.9] font-normal tracking-[-0.03em] text-foreground">
            Blouses,
            <br />
            made to order.
          </h1>
          <div className="gold-rule" aria-hidden="true" />
          <p className="font-script text-4xl leading-none text-foreground">
            handstitched
          </p>
          <p className="max-w-[34ch] text-base leading-relaxed text-foreground">
            Saree blouses, stitched when you ask. Silk, seed beads, tiered
            tassels, pearl and gold. Two pieces are finished. The third is still
            only a conversation.
          </p>
        </div>
        {photograph ? (
          <figure className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8 lg:mt-28">
            <img
              src={photograph.src}
              alt={photograph.alt}
              width={photograph.width}
              height={photograph.height}
              className="h-auto max-w-full"
              style={{ width: photograph.width }}
            />
            <figcaption className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">{featured.index}</p>
              <Link
                to={`/pieces/${featured.id}`}
                className="font-serif text-3xl leading-none font-normal text-foreground"
              >
                {featured.name}
              </Link>
              <p className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
                {featured.summary}
              </p>
            </figcaption>
          </figure>
        ) : null}
      </div>

      <section className="flex flex-col gap-8" aria-labelledby="pieces-heading">
        <h2 id="pieces-heading" className="text-sm text-muted-foreground">
          Pieces
        </h2>
        <div className="flex flex-col">
          {pieces.map((piece) => (
            <div key={piece.id} className="flex flex-col gap-6 py-8">
              <Separator />
              <div className="grid items-baseline gap-3 sm:grid-cols-12 sm:gap-6">
                <p className="text-sm text-muted-foreground sm:col-span-2">
                  {piece.index}
                </p>
                <Link
                  to={`/pieces/${piece.id}`}
                  className="font-serif text-[clamp(2rem,4vw,3rem)] leading-none font-normal text-foreground sm:col-span-6"
                >
                  {piece.name}
                </Link>
                <p className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground sm:col-span-4">
                  {piece.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
