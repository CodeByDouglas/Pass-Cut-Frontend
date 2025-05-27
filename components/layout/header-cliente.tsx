"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarClock, ChevronDown, LogOut, Scissors , CreditCard} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderCliente() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    document.cookie = 'tipo=; Max-Age=0; path=/';
    router.push('/login');
  };

  const links = [
    { href: '/cliente/assinaturas', label: 'Assinaturas' }, 
    { href: '/cliente/agendamentos', label: 'Meus Agendamentos' },
  ];

  return (
    <header className="bg-stone-950 text-white">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/cliente/agendamentos" className="flex items-center space-x-2">
            <img
              src="https://raw.githubusercontent.com/RxTaylin/icon/refs/heads/main/logo.jpeg"
              alt="Logo Passcut"
              width={100}
              height={100}
            />
          </Link>
          <div className="flex-100 flex items-center justify-between md:justify-start">
          <div className="flex items-center space-x-4">
          <Link href="/cliente/agendamentos" className="text-lg font-bold text-white">
              Barbearia Exemplo
          </Link>
          </div>
          </div>
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-stone-900 hover:text-white">
                  <div className="h-8 w-8 rounded-full bg-stone-900 mr-2 flex items-center justify-center">
                    <span className="font-medium">JD</span>
                  </div>
                  <span className="hidden md:inline">João da Silva</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/cliente/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/cliente/assinaturas">
                    Assinaturas
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/cliente/agendamentos">
                    Agendamentos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Menu - Mobile */}
          <div className="flex md:hidden items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-stone-850 hover:text-white">
                  <div className="h-8 w-8 rounded-full bg-stone-850 flex items-center justify-center">
                    <span className="font-medium">JD</span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/cliente/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/cliente/assinaturas">
                    Assinaturas
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/cliente/agendamentos">
                    Agendamentos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}