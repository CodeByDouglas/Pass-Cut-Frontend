import HeaderCliente from "@/components/layout/header-cliente";

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderCliente />
      <main className="flex-1 bg-stone-50">
        {children}
      </main>
    </div>
  );
}