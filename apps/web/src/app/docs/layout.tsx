import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-14 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 flex gap-10">
          <aside className="hidden md:block w-56 shrink-0">
            <div className="sticky top-24">
              <DocsSidebar />
            </div>
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
