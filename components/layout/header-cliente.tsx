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
import Image from "next/image";

export default function HeaderCliente() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    document.cookie = 'tipo=; Max-Age=0; path=/';
    router.push('/login');
  };

  const links = [
    { href: '/cliente/assinaturas', label: 'Assinaturas', icon: CreditCard }, 
    { href: '/cliente/agendamentos', label: 'Meus Agendamentos', icon: CalendarClock },
  ];

  return (
    <header className="bg-stone-900/95 text-white">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/cliente/agendamentos" className="flex items-center space-x-2">
            <Image
              src="https://github.com/RxTaylin/icon/blob/main/logo.jpeg"
              alt="Logo"
              width={36}
              height={36}
              className="h-9 w-9"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActive
                      ? 'bg-stone-700 text-white'
                      : 'text-stone-100 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-stone-700 hover:text-white">
                  <div className="h-8 w-8 rounded-full bg-stone-700 mr-2 flex items-center justify-center">
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
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Menu - Mobile */}
          <div className="flex md:hidden items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-stone-700 hover:text-white">
                  <div className="h-8 w-8 rounded-full bg-stone-700 flex items-center justify-center">
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
                  <Link href="/cliente/assinaturas">Assinatura</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}