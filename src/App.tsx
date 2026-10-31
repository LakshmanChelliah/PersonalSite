import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { BagProvider, useBag } from "@/bag"
import { BagSheet } from "@/components/bag-sheet"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Sheet } from "@/components/ui/sheet"
import { HomePage } from "@/pages/home"
import { OrderPage } from "@/pages/order"
import { PiecePage } from "@/pages/piece"
import { useTitle } from "@/use-title"

function NotFound() {
  useTitle("Embroidery RCS")
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

function Shell() {
  const { open, setOpen } = useBag()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="mx-auto flex min-h-svh w-full max-w-[90rem] flex-col gap-16 px-6 py-8 sm:px-12 lg:px-20 lg:py-12">
        <SiteHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pieces/:slug" element={<PiecePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
      <BagSheet />
    </Sheet>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BagProvider>
        <Shell />
      </BagProvider>
    </BrowserRouter>
  )
}
