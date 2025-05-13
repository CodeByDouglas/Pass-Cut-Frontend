"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Nut as Cut, Phone, Plus, Search, User } from "lucide-react";
import { useState } from "react";

// Mock data
const clientes = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos.silva@email.com",
    telefone: "(11) 98765-4321",
    ultimaVisita: "10/04/2025",
    totalVisitas: 12,
    preferencias: ["Corte degradê", "Barba completa"],
  },
  {
    id: 2,
    nome: "Roberto Alves",
    email: "roberto.alves@email.com",
    telefone: "(11) 98765-1234",
    ultimaVisita: "05/04/2025",
    totalVisitas: 8,
    preferencias: ["Corte social", "Barboterapia"],
  },
  {
    id: 3,
    nome: "João Oliveira",
    email: "joao.oliveira@email.com",
    telefone: "(11) 91234-5678",
    ultimaVisita: "02/04/2025",
    totalVisitas: 15,
    preferencias: ["Corte navalhado", "Tintura de barba"],
  },
  {
    id: 4,
    nome: "André Costa",
    email: "andre.costa@email.com",
    telefone: "(11) 99876-5432",
    ultimaVisita: "28/03/2025",
    totalVisitas: 5,
    preferencias: ["Corte militar", "Barba simples"],
  },
  {
    id: 5,
    nome: "Paulo Santos",
    email: "paulo.santos@email.com",
    telefone: "(11) 98765-8765",
    ultimaVisita: "25/03/2025",
    totalVisitas: 20,
    preferencias: ["Corte moderno", "Barboterapia completa"],
  },
  {
    id: 6,
    nome: "Lucas Ferreira",
    email: "lucas.ferreira@email.com",
    telefone: "(11) 91234-9876",
    ultimaVisita: "20/03/2025",
    totalVisitas: 3,
    preferencias: ["Corte tesoura", "Aparar barba"],
  }
];

function ClienteCard({ cliente }: { cliente: typeof clientes[0] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-stone-100 text-stone-700">
                {cliente.nome.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{cliente.nome}</CardTitle>
              <CardDescription>{cliente.email}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="h-fit">
            {cliente.totalVisitas} visitas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{cliente.telefone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Última visita: {cliente.ultimaVisita}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Cut className="h-4 w-4 text-gray-500" />
            <div className="flex flex-wrap gap-1">
              {cliente.preferencias.map((pref, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {pref}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          Ver histórico
        </Button>
        <Button size="sm" className="bg-stone-600 hover:bg-stone-700">
          Agendar
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [novoClienteAberto, setNovoClienteAberto] = useState(false);
  
  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 mt-1">
            Gerencie a base de clientes da sua barbearia
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog open={novoClienteAberto} onOpenChange={setNovoClienteAberto}>
            <DialogTrigger asChild>
              <Button className="bg-stone-600 hover:bg-stone-700">
                <Plus className="mr-2 h-4 w-4" /> Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo cliente abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" placeholder="Nome do cliente" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="preferencias">Preferências</Label>
                  <Input id="preferencias" placeholder="Ex: Corte degradê, Barba completa" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNovoClienteAberto(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-stone-600 hover:bg-stone-700"
                  onClick={() => setNovoClienteAberto(false)}
                >
                  Adicionar Cliente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar cliente por nome ou email"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs defaultValue="todos" className="w-full">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="recentes">Visitas Recentes</TabsTrigger>
            <TabsTrigger value="frequentes">Mais Frequentes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClientes.length > 0 ? (
          filteredClientes.map(cliente => (
            <ClienteCard key={cliente.id} cliente={cliente} />
          ))
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center py-12">
            <User className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">Nenhum cliente encontrado</h3>
            <p className="text-gray-500 mb-4 text-center">
              {searchTerm ? "Tente buscar com outros termos" : "Adicione seu primeiro cliente para começar"}
            </p>
            <Button 
              className="bg-stone-600 hover:bg-stone-700"
              onClick={() => setNovoClienteAberto(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Cliente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}