import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-[90]">
        <AnnouncementBar />
        <Header />
      </div>
      <main className="flex-1 flex flex-col min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
