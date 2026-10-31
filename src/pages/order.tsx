import { useEffect, useRef, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import {
  INSTAGRAM_URL,
  buildOrderNote,
  formatOccasion,
  measurements,
  orderErrors,
  pieceById,
  pieces,
  type DesignId,
  type OrderDraft,
} from "@/content"
import { useBag } from "@/bag"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTitle } from "@/use-title"

const emptyDraft = (design: DesignId | ""): OrderDraft => ({
  design,
  occasion: "",
  bust: "",
  underbust: "",
  shoulder: "",
  blouseLength: "",
  sleeve: "",
  frontNeck: "",
  backNeck: "",
  notes: "",
  name: "",
  contact: "",
})

export function OrderPage() {
  useTitle("Order — Embroidery RCS")
  const { ids } = useBag()
  const [draft, setDraft] = useState<OrderDraft>(() =>
    emptyDraft(ids.length === 1 ? ids[0] : ""),
  )
  const [errors, setErrors] = useState<Partial<Record<keyof OrderDraft, string>>>(
    {},
  )
  const [note, setNote] = useState("")
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const pendingFocus = useRef(false)
  const summaryRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!pendingFocus.current) return
    pendingFocus.current = false
    document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus()
  }, [errors])

  useEffect(() => {
    if (note) summaryRef.current?.focus()
  }, [note])

  function update<K extends keyof OrderDraft>(key: K, value: OrderDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = orderErrors(draft)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      pendingFocus.current = true
      setErrors({ ...next })
      return
    }
    setCopied(false)
    setCopyFailed(false)
    setNote(buildOrderNote(draft))
  }

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(note)
      setCopied(true)
      setCopyFailed(false)
    } catch {
      setCopied(false)
      setCopyFailed(true)
    }
  }

  const bagNames = ids
    .map((id) => pieceById(id)?.name)
    .filter((name): name is string => Boolean(name))

  if (note) {
    const piece = pieceById(draft.design)
    return (
      <article
        ref={summaryRef}
        tabIndex={-1}
        className="grid gap-12 outline-none lg:grid-cols-12"
        aria-live="polite"
      >
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div className="flex flex-col gap-4">
            <h1 className="font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.95] font-normal">
              The note
            </h1>
            <p className="max-w-[40ch] text-base leading-relaxed">
              Nothing was saved on a server. Copy this and send it on Instagram.
            </p>
          </div>
          <dl className="flex max-w-md flex-col gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">Design</dt>
              <dd>{piece?.name}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">Occasion</dt>
              <dd>{formatOccasion(draft.occasion)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">Measurements, inches</dt>
              <dd className="flex flex-col gap-1">
                {measurements.map(([key, label]) => (
                  <span key={key}>
                    {label} {draft[key].trim()}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">Notes</dt>
              <dd>{draft.notes.trim() || "none"}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">Name</dt>
              <dd>{draft.name.trim()}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground">Contact</dt>
              <dd>{draft.contact.trim()}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={copyNote}>
              {copied ? "Copied" : "Copy the note"}
            </Button>
            <Button variant="outline" asChild>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Open Instagram
              </a>
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                setNote("")
                setCopied(false)
                setCopyFailed(false)
              }}
            >
              Revise
            </Button>
          </div>
          {copyFailed ? (
            <p className="max-w-[40ch] text-sm text-destructive" role="status">
              The browser blocked the clipboard. Select the note below and copy
              it yourself.
            </p>
          ) : null}
          <div className="flex max-w-lg flex-col gap-3">
            <p className="text-sm text-muted-foreground">The text to send</p>
            <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-foreground">
              {note}
            </pre>
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="flex flex-col gap-10 lg:col-span-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.95] font-normal">
            Order
          </h1>
          <p className="max-w-[42ch] text-base leading-relaxed">
            One blouse. I stitch it after I have the design, the occasion, and
            the measurements. I don&apos;t take payment on this site.
          </p>
          {bagNames.length > 0 ? (
            <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
              In the bag: {bagNames.join(", ")}. The note uses the design you
              choose here.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              The bag is empty. You can still choose a design below, or{" "}
              <Link to="/" className="text-foreground underline underline-offset-4">
                look at the pieces
              </Link>
              .
            </p>
          )}
        </div>

        <form className="flex flex-col gap-8" onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Design</FieldLegend>
              <FieldDescription>One blouse in this note.</FieldDescription>
              <Field data-invalid={errors.design ? true : undefined}>
                <ToggleGroup
                  type="single"
                  value={draft.design}
                  onValueChange={(value) => {
                    if (value) update("design", value as DesignId)
                  }}
                  orientation="vertical"
                  variant="outline"
                  spacing={1}
                  aria-label="Design"
                  aria-invalid={errors.design ? true : undefined}
                  className="w-full items-stretch"
                >
                  {pieces.map((piece) => (
                    <ToggleGroupItem
                      key={piece.id}
                      value={piece.id}
                      className="h-auto min-h-11 w-full justify-start px-3 text-left"
                    >
                      {piece.name}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                {errors.design ? <FieldError>{errors.design}</FieldError> : null}
              </Field>
            </FieldSet>

            <Field data-invalid={errors.occasion ? true : undefined}>
              <FieldLabel htmlFor="occasion">Occasion date</FieldLabel>
              <FieldDescription>The day you will wear it.</FieldDescription>
              <Input
                id="occasion"
                type="date"
                value={draft.occasion}
                aria-invalid={errors.occasion ? true : undefined}
                onChange={(event) => update("occasion", event.target.value)}
              />
              {errors.occasion ? <FieldError>{errors.occasion}</FieldError> : null}
            </Field>

            <FieldSet>
              <FieldLegend>Measurements</FieldLegend>
              <FieldDescription>Inches.</FieldDescription>
              {measurements.map(([key, label]) => (
                <Field key={key} data-invalid={errors[key] ? true : undefined}>
                  <FieldLabel htmlFor={key}>{label}</FieldLabel>
                  <Input
                    id={key}
                    inputMode="decimal"
                    autoComplete="off"
                    value={draft[key]}
                    aria-invalid={errors[key] ? true : undefined}
                    onChange={(event) => update(key, event.target.value)}
                  />
                  {errors[key] ? <FieldError>{errors[key]}</FieldError> : null}
                </Field>
              ))}
            </FieldSet>

            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <FieldDescription>
                Neck, colour, or anything I should know. Optional.
              </FieldDescription>
              <Textarea
                id="notes"
                value={draft.notes}
                onChange={(event) => update("notes", event.target.value)}
              />
            </Field>

            <Field data-invalid={errors.name ? true : undefined}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                autoComplete="name"
                value={draft.name}
                aria-invalid={errors.name ? true : undefined}
                onChange={(event) => update("name", event.target.value)}
              />
              {errors.name ? <FieldError>{errors.name}</FieldError> : null}
            </Field>

            <Field data-invalid={errors.contact ? true : undefined}>
              <FieldLabel htmlFor="contact">Contact</FieldLabel>
              <FieldDescription>
                Instagram, email, or phone. Whichever you actually read.
              </FieldDescription>
              <Input
                id="contact"
                autoComplete="on"
                value={draft.contact}
                aria-invalid={errors.contact ? true : undefined}
                onChange={(event) => update("contact", event.target.value)}
              />
              {errors.contact ? <FieldError>{errors.contact}</FieldError> : null}
            </Field>
          </FieldGroup>

          <Button type="submit" className="self-start">
            Write the order note
          </Button>
        </form>
      </div>
    </div>
  )
}
