import HeaderBarbearia from "@/components/layout/header-barbearia";

export default function BarbeariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBarbearia />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
}