import { Link } from "react-router-dom"
import { pieceById } from "@/content"
import { useBag } from "@/bag"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function BagSheet() {
  const { ids, remove, setOpen } = useBag()

  return (
    <SheetContent side="right">
      <SheetHeader className="pr-24">
        <SheetTitle className="font-serif text-3xl font-normal">Bag</SheetTitle>
        <SheetDescription>
          Made to order. Nothing is paid here.
        </SheetDescription>
      </SheetHeader>
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4">
        {ids.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>The bag is empty.</EmptyTitle>
              <EmptyDescription>
                Choose a finished blouse, or commission one that does not exist yet.
              </EmptyDescription>
            </EmptyHeader>
            <Button variant="outline" asChild>
              <Link to="/" onClick={() => setOpen(false)}>
                See the pieces
              </Link>
            </Button>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-6">
            {ids.map((id) => {
              const piece = pieceById(id)
              if (!piece) return null
              return (
                <li key={id} className="flex flex-col gap-3">
                  {ids.indexOf(id) > 0 ? <Separator /> : null}
                  <div className="flex flex-col gap-1">
                    <Link
                      to={`/pieces/${piece.id}`}
                      onClick={() => setOpen(false)}
                      className="font-serif text-2xl font-normal text-foreground"
                    >
                      {piece.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{piece.summary}</p>
                  </div>
                  <Button
                    variant="ghost"
                    className="h-11 self-start px-0"
                    onClick={() => remove(id)}
                  >
                    Remove
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <SheetFooter>
        {ids.length > 0 ? (
          <Button asChild>
            <Link to="/order" onClick={() => setOpen(false)}>
              Write the order
            </Link>
          </Button>
        ) : (
          <Button disabled>Write the order</Button>
        )}
      </SheetFooter>
    </SheetContent>
  )
}
