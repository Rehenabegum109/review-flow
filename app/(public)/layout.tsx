import Navbar from "../src/components/shared/navbar";
import Footer from "../src/components/shared/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          <main className="flex-1">{children}</main>
 
    </>
  );
}