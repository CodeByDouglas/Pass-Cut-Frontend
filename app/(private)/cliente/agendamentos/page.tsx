"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarPlus, Clock, MapPin, Scissors, UserCheck } from "lucide-react";
import Link from "next/link";

// Mock data
const agendamentosAtivos = [
  {
    id: 1,
    servico: "Corte de Cabelo",
    barbearia: "Barbearia Vintage",
    barbeiro: "Marcos Oliveira",
    data: "20/05/2025",
    horario: "14:30",
    duracao: 30,
    status: "confirmado",
    valor: "R$ 80,00",
  },
  {
    id: 2,
    servico: "Barba Completa",
    barbearia: "Barbearia Vintage",
    barbeiro: "Felipe Santos",
    data: "10/06/2025",
    horario: "16:00",
    duracao: 20,
    status: "pendente",
    valor: "R$ 50,00",
  }
];

const agendamentosPassados = [
  {
    id: 3,
    servico: "Corte e Barba",
    barbearia: "Barbearia Vintage",
    barbeiro: "Marcos Oliveira",
    data: "10/04/2025",
    horario: "10:00",
    duracao: 50,
    status: "concluido",
    endereco: "Av. Paulista, 1000 - São Paulo",
  },
  {
    id: 4,
    servico: "Corte Degradê",
    barbearia: "Barbearia Vintage",
    barbeiro: "Felipe Santos",
    data: "20/03/2025",
    horario: "14:00",
    duracao: 40,
    status: "concluido",
    endereco: "Av. Paulista, 1000 - São Paulo",
  },
  {
    id: 5,
    servico: "Barba Modelada",
    barbearia: "Barbearia Vintage",
    barbeiro: "Marcos Oliveira",
    data: "05/03/2025",
    horario: "11:30",
    duracao: 20,
    status: "concluido",
    endereco: "Av. Paulista, 1000 - São Paulo",
  }
];

// Agendamento Card
function AgendamentoCard({ agendamento, tipo }: { agendamento: any, tipo: "ativo" | "passado" }) {
  return (
  <Card className={
    agendamento.status === "confirmado" ? "border-l-4 border-l-green-300" :
    agendamento.status === "pendente" ? "border-l-4 border-l-yellow-300" :
    "border-l-4 border-l-gray-300"
  }>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{agendamento.servico}</CardTitle>
          <Badge 
            className={
              agendamento.status === "confirmado" ? "bg-green-100 text-stone-800 hover:bg-green-200" :
              agendamento.status === "pendente" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
              "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }
          >
            {agendamento.status === "confirmado" ? "Confirmado" :
             agendamento.status === "pendente" ? "Pendente" :
             "Concluído"}
          </Badge>
        </div>
        <CardDescription className="flex items-center mt-1">
          <Scissors className="h-4 w-4 mr-1" />
          {agendamento.barbearia}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <span>{agendamento.data} às {agendamento.horario}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>Duração: {agendamento.duracao} minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-gray-500" />
            <span>Com {agendamento.barbeiro}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">{agendamento.endereco}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {tipo === "ativo" ? (
          <>
            <Button variant="outline" size="sm">
              Reagendar
            </Button>
            <Button variant="destructive" size="sm">
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm">
              Ver detalhes
            </Button>
            <Button size="sm" className="bg-stone-600 hover:bg-stone-700">
              Agendar similar
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default function AgendamentosPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Agendamentos</h1>
          <p className="text-gray-500 mt-1">
            Visualize e gerencie todos os seus agendamentos
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/cliente/agendar">
            <Button className="bg-stone-900/90 hover:bg-stone-700">
              <CalendarPlus className="mr-2 h-4 w-4" /> Novo Agendamento
            </Button>
          </Link>
        </div>
      </div>
      
      <Tabs defaultValue="ativos" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="ativos" className="flex-1">Agendamentos Ativos</TabsTrigger>
          <TabsTrigger value="passados" className="flex-1">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ativos">
          {agendamentosAtivos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agendamentosAtivos.map(agendamento => (
                <AgendamentoCard 
                  key={agendamento.id} 
                  agendamento={agendamento}
                  tipo="ativo"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarDays className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900">Nenhum agendamento ativo</h3>
              <p className="text-gray-500 mb-6">
                Você não possui agendamentos para os próximos dias.
              </p>
              <Link href="/cliente/agendar">
                <Button className="bg-stone-600 hover:bg-stone-700">
                  <CalendarPlus className="mr-2 h-4 w-4" /> Fazer um Agendamento
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="passados">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agendamentosPassados.map(agendamento => (
              <AgendamentoCard 
                key={agendamento.id} 
                agendamento={agendamento}
                tipo="passado"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}