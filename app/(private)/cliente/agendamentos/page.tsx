"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CalendarPlus, Clock, MapPin, Scissors, UserCheck } from "lucide-react";
import Link from "next/link";

interface Agendamento {
  id: string;
  servico: string;
  barbearia: string;
  barbeiro: string;
  data: string;
  horario: string;
  duracao: number;
  status: string;
  valor?: string;
}

export default function AgendamentosPage() {
  const [agendamentosAtivos, setAgendamentosAtivos] = useState<Agendamento[]>([]);
  const [agendamentosPassados, setAgendamentosPassados] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Token de autorização Fernet (fictício) – substitua pelo token real obtido no login
  const FERNET_TOKEN = "gAAAAABoFXWOShrofgST8w79AVnOio4TjucW9WajCVVmF-KPDfI6N_wMgTC5F8UqYGlozSIuWYP0efDp9HBzboborsIm8qyNxJ0QOc67i2sIIPRVjbVlKNPFzetDDlPxYXt2Lcm5e3HycFATv7wXZbJiNDzi6kz7lTgs3uKa7ReaU_FocHie_Ks8BY0KUYJbpDfVMT42tJ3NCjFnDgCruMk_Vr01m1uCVQ==";

  // Token de cancelamento fornecido
  const CANCEL_TOKEN = "gAAAAABoIEYbDvh0TvPQDAHmaiNMWxCKvNx9dUFvOQRbQppou8m-wyOUlWURwyJm2OcPu_K5SN5j2G3vqak8ncl4pABBnSaXrIdkMV4K9x_A1AGRfD_GOmEzy-ifAalNlb92GnXcX8TnWYUXGE5kJNgI1G4AHmUjlJJTRcibQyQ1Spuk2Qowsb5scKKKRpsnMxSSocwW8bzKD4m4TGT0teTmqjv1BanmsQ==";

  useEffect(() => {
    const consultarAgendamentos = async () => {
      try {
        // Buscar agendamentos ativos
        const resAtivos = await fetch("https://jubilant-adventure-q79vr767pj7pf4v66-5000.app.github.dev/api/consultar_agendamentos", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": FERNET_TOKEN,
          },
          body: JSON.stringify({ type: "ativos" }),
        });
        if (resAtivos.ok) {
          const data = await resAtivos.json();
          if (data.status === "success") {
            console.log("Agendamentos ativos recebidos do endpoint:", data.agendamentos);
            setAgendamentosAtivos(transformarArrayParaAgendamentos(data.agendamentos || []));
          } else {
            console.error("Erro ao buscar agendamentos ativos:", data.message);
          }
        } else {
          console.error("Erro ao buscar agendamentos ativos:", resAtivos.status);
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos ativos:", error);
      }

      try {
        // Buscar histórico de agendamentos
        const resHistorico = await fetch("https://jubilant-adventure-q79vr767pj7pf4v66-5000.app.github.dev/api/consultar_agendamentos", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": FERNET_TOKEN,
          },
          body: JSON.stringify({ type: "historico" }),
        });
        if (resHistorico.ok) {
          const data = await resHistorico.json();
          if (data.status === "success") {
            console.log("Agendamentos passados recebidos do endpoint:", data.agendamentos); // <-- Adicione esta linha
            setAgendamentosPassados(transformarArrayParaAgendamentos(data.agendamentos || [], "concluido"));
          } else {
            console.error("Erro ao buscar histórico de agendamentos:", data.message);
          }
        } else {
          console.error("Erro ao buscar histórico de agendamentos:", resHistorico.status);
        }
      } catch (error) {
        console.error("Erro ao buscar histórico de agendamentos:", error);
      }

      // Marcar carregamento como concluído
      setLoading(false);
    };

    consultarAgendamentos();
  }, []);

  // Função de cancelamento usando header Authorization
  const cancelarAgendamento = async (id: string) => {
    try {
      const res = await fetch(
        "https://jubilant-adventure-q79vr767pj7pf4v66-5000.app.github.dev/cancelar-agendamento",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": CANCEL_TOKEN,
          },
          body: JSON.stringify({ agendamento_id: id }),
        }
      );
      if (res.ok) {
        console.log("Agendamento cancelado com sucesso!");
        setAgendamentosAtivos((prev) => prev.filter((a) => a.id !== id));
      } else {
        const error = await res.text();
        console.error("Erro ao cancelar agendamento:", error);
      }
    } catch (err) {
      console.error("Erro na requisição de cancelamento:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Cabeçalho da página */}
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

      {/* Conteúdo com tabs de agendamentos ativos e históricos */}
      {loading ? (
        // Mostrar indicador de carregamento (pode ser um texto ou spinner)
        <div className="text-center py-12 text-gray-500">Carregando...</div>
      ) : (
        <Tabs defaultValue="ativos" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="ativos" className="flex-1">
              Agendamentos Ativos
            </TabsTrigger>
            <TabsTrigger value="passados" className="flex-1">
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativos">
            {agendamentosAtivos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agendamentosAtivos.map((agendamento, idx) => (
                  <AgendamentoCard
                    key={agendamento.id ?? `ativo-${idx}`}
                    agendamento={agendamento}
                    tipo="ativo"
                    onCancel={cancelarAgendamento}
                  />
                ))}
              </div>
            ) : (
              // Caso não haja agendamentos ativos, exibe mensagem de vazio
              <div className="text-center py-12">
                <CalendarDays className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900">
                  Nenhum agendamento ativo
                </h3>
                <p className="text-gray-500 mb-6">
                  Você não possui agendamentos para os próximos dias.
                </p>
                <Link href="/cliente/agendar">
                  <Button className="bg-sky-500 hover:bg-sky-700">
                    <CalendarPlus className="mr-2 h-4 w-4" /> Fazer um Agendamento
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="passados">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agendamentosPassados.map((agendamento, idx) => (
                <AgendamentoCard
                  key={agendamento.id ?? `passado-${idx}`}
                  agendamento={agendamento}
                  tipo="passado"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

// Componente de cartão para exibir um agendamento individual
function AgendamentoCard({
  agendamento,
  tipo,
  onCancel,
}: {
  agendamento: Agendamento;
  tipo: "ativo" | "passado";
  onCancel?: (id: string) => void;
}) {
  return (
    <Card
      className={
        agendamento.status === "confirmado"
          ? "border-l-4 border-l-green-300"
          : agendamento.status === "pendente"
          ? "border-l-4 border-l-yellow-300"
          : "border-l-4 border-l-gray-300"
      }
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{agendamento.servico}</CardTitle>
          <Badge
            className={
              agendamento.status === "confirmado"
                ? "bg-green-100 text-stone-800 hover:bg-green-200"
                : agendamento.status === "pendente"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }
          >
            {agendamento.status === "confirmado"
              ? "Confirmado"
              : agendamento.status === "pendente"
              ? "Pendente"
              : "Concluído"}
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
            <span>
              {agendamento.data} às {agendamento.horario}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>Duração: {agendamento.duracao} minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-gray-500" />
            <span>Com {agendamento.barbeiro}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {tipo === "ativo" ? (
          <>
            <Button variant="outline" size="sm">
              Reagendar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onCancel && onCancel(agendamento.id)}
            >
              Cancelar
            </Button>
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
}

// Função para transformar o array do backend no formato esperado pelo card
function transformarArrayParaAgendamentos(array: any[], statusPadrao = "confirmado"): Agendamento[] {
  let agendamentos: Agendamento[] = [];
  array.forEach((item) => {
    if (item.horas && item.horas.length > 0) {
      agendamentos.push({
        id: item.id,
        servico: item.servicos.join(", "),
        barbearia: item.estabelecimento,
        barbeiro: item.colaborador,
        data: item.data,
        horario: item.horas[0].slice(0, 5),
        duracao: item.duracao,
        status: statusPadrao,
        valor: undefined,
      });
    }
  });
  return agendamentos;
}