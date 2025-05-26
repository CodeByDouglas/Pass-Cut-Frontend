"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Check, ChevronRight, Clock, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Mock data
const servicos = [
  {
    id: 1,
    nome: "Corte de Cabelo",
    descricao: "Corte tradicional com máquina e tesoura",
    preco: 45.00,
    duracao: 30,
    imagem: "https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg"
  },
  {
    id: 2,
    nome: "Barba Completa",
    descricao: "Modelagem e acabamento completo da barba",
    preco: 35.00,
    duracao: 20,
    imagem: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg"
  },
  {
    id: 3,
    nome: "Pacote Completo",
    descricao: "Corte de cabelo e barba completa",
    preco: 70.00,
    duracao: 50,
    imagem: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg"
  },
  {
    id: 4,
    nome: "Corte Degradê",
    descricao: "Corte com degradê e acabamento perfeito",
    preco: 50.00,
    duracao: 40,
    imagem: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg"
  }
];

const profissionais = [
  {
    id: 1,
    nome: "Marcos Oliveira",
    cargo: "Barbeiro Master",
    experiencia: "10 anos",
    disponivel: true,
    avatar: "https://demo-source.imgix.net/head_shot.jpg?fit=max&w=1584&h=311.375&dpr=1&q=75&auto=format%2Ccompress&cacheID=3434649284"
  },
  {
    id: 2,
    nome: "Felipe Santos",
    cargo: "Barbeiro Senior",
    experiencia: "7 anos",
    disponivel: true,
    avatar: "https://demo-source.imgix.net/head_shot.jpg?fit=max&w=1584&h=311.375&dpr=1&q=75&auto=format%2Ccompress&cacheID=3434649284"
  }
];

export default function AgendarPage() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<"servico" | "profissional" | "data" | "confirmacao">("servico");
  const [servicoSelecionado, setServicoSelecionado] = useState<any>(null);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<any>(null);
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [horarioSelecionado, setHorarioSelecionado] = useState<any>(null);
  const [confirmarDialogAberto, setConfirmarDialogAberto] = useState(false);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<any[]>([]);
  const AUTH_TOKEN = "gAAAAABoM7n7ETcN-piSP0jan1HVMuaa4clZwcjdK1QtIK3YZVuPZXNWxAej1MMOlhWiYwt9NxidOC2cnpk_JsOIn-wHy1yit0HeXZFy78S7p4nDzGmK18y15wwijwS9_bbvbbqLZikzK5F8ezjNvesyZ3kqOqpedMsnzpvXNxXAg5-o4p6KjbtZdAPzYQ5LxaYAhLoqO9T3"; // Troque pelo token correto

  useEffect(() => {
    const buscarHorarios = async () => {
      if (!dataSelecionada || !profissionalSelecionado || !servicoSelecionado) {
        setHorariosDisponiveis([]);
        return;
      }

      try {
        const res = await fetch("https://jubilant-adventure-q79vr767pj7pf4v66-5000.app.github.dev/consultar-horarios", {
          method: "POST",
          credentials: "include", // envia cookies HttpOnly
          headers: {
            "Content-Type": "application/json",
            "Authorization": "gAAAAABoM7n7ETcN-piSP0jan1HVMuaa4clZwcjdK1QtIK3YZVuPZXNWxAej1MMOlhWiYwt9NxidOC2cnpk_JsOIn-wHy1yit0HeXZFy78S7p4nDzGmK18y15wwijwS9_bbvbbqLZikzK5F8ezjNvesyZ3kqOqpedMsnzpvXNxXAg5-o4p6KjbtZdAPzYQ5LxaYAhLoqO9T3",
          },
          body: JSON.stringify({
            servicos: "5a7e3f8d-1234-4abc-9876-9f1234567890",
            colaborador_id: "5a7e3f8d-1234-4abc-9876-9f1234567890",
            data: "2025-05-26",
          }),
        });

        const data = await res.json();
        if (res.status === 200 && data.horarios) {
          // data.horarios é um array de strings "HH:MM:SS"
          setHorariosDisponiveis(
            data.horarios.map((h: string, idx: number) => ({
              id: idx + 1,
              hora: h.slice(0, 5),
              disponivel: true,
            }))
          );
        } else {
          setHorariosDisponiveis([]);
        }
      } catch (err) {
        setHorariosDisponiveis([]);
      }
    };

    buscarHorarios();
  }, [dataSelecionada, profissionalSelecionado, servicoSelecionado]);
  
  // Next step
  const avancarEtapa = () => {
    if (etapa === "servico" && servicoSelecionado) {
      setEtapa("profissional");
    } else if (etapa === "profissional" && profissionalSelecionado) {
      setEtapa("data");
    } else if (etapa === "data" && dataSelecionada && horarioSelecionado) {
      setConfirmarDialogAberto(true);
    }
  };
  
  // Previous step
  const voltarEtapa = () => {
    if (etapa === "profissional") {
      setEtapa("servico");
    } else if (etapa === "data") {
      setEtapa("profissional");
    }
  };
  
  // Confirm appointment
  const confirmarAgendamento = () => {
    // API para salvar o agendamento
    setConfirmarDialogAberto(false);
    // Rediceionar para a página de agendamentos
    router.push("/cliente/agendamentos");
  };
  
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Agendar Horário</h1>
        <p className="text-gray-500 mt-1">
          Selecione o serviço, profissional e horário de sua preferência
        </p>
      </div>
      
      {/* Progress steps */}
      <div className="flex items-center mb-8">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${etapa === "servico" ? "bg-sky-600 text-white" : "bg-sky-100 text-sky-700"}`}>
          1
        </div>
        <div className={`flex-1 h-1 mx-2 ${etapa === "servico" ? "bg-gray-200" : "bg-sky-300"}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${etapa === "profissional" ? "bg-sky-600 text-white" : etapa === "data" || etapa === "confirmacao" ? "bg-sky-100 text-sky-700" : "bg-gray-100 text-gray-400"}`}>
          2
        </div>
        <div className={`flex-1 h-1 mx-2 ${etapa === "servico" || etapa === "profissional" ? "bg-gray-200" : "bg-sky-300"}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${etapa === "data" ? "bg-sky-600 text-white" : etapa === "confirmacao" ? "bg-sky-100 text-sky-700" : "bg-gray-100 text-gray-400"}`}>
          3
        </div>
      </div>
      
      {/* Step 1: Service selection */}
      {etapa === "servico" && (
        <div className="animate-in slide-in-from-right">
          <h2 className="text-xl font-semibold mb-4">Escolha o serviço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicos.map((servico) => (
              <Card 
                key={servico.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  servicoSelecionado?.id === servico.id 
                    ? "border-2 border-sky-500" 
                    : ""
                }`}
                onClick={() => setServicoSelecionado(servico)}
              >
                <div className="flex">
                  <div className="relative w-1/3 h-auto">
                    <Image
                      src={servico.imagem}
                      alt={servico.nome}
                      width={150}
                      height={150}
                      className="object-cover h-full rounded-l-lg"
                    />
                  </div>
                  <div className="w-2/3">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{servico.nome}</CardTitle>
                        {servicoSelecionado?.id === servico.id && (
                          <div className="h-6 w-6 rounded-full bg-sky-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-sky-600" />
                          </div>
                        )}
                      </div>
                      <CardDescription>{servico.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">
                          R$ {servico.preco.toFixed(2)}
                        </span>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{servico.duracao} min</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={avancarEtapa}
              disabled={!servicoSelecionado}
              className="bg-sky-600 hover:bg-sky-700"
            >
              Continuar <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Step 2: Professional selection */}
      {etapa === "profissional" && (
        <div className="animate-in slide-in-from-right">
          <h2 className="text-xl font-semibold mb-4">Escolha o profissional</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profissionais.map((profissional) => (
              <Card 
                key={profissional.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  profissionalSelecionado?.id === profissional.id 
                    ? "border-2 border-sky-500" 
                    : ""
                }`}
                onClick={() => setProfissionalSelecionado(profissional)}
              >
                <div className="flex items-center p-4">
                  <div className="relative w-20 h-20 mr-4">
                    <Image
                      src={profissional.avatar}
                      alt={profissional.nome}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{profissional.nome}</h3>
                    <p className="text-sm text-gray-500">{profissional.cargo}</p>
                    <p className="text-sm text-gray-500">Experiência: {profissional.experiencia}</p>
                    <Badge className="mt-2 bg-sky-100 text-sky-800 hover:bg-sky-200">
                      Disponível hoje
                    </Badge>
                  </div>
                  {profissionalSelecionado?.id === profissional.id && (
                    <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-sky-600" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button 
              variant="outline" 
              onClick={voltarEtapa}
            >
              Voltar
            </Button>
            <Button 
              onClick={avancarEtapa}
              disabled={!profissionalSelecionado}
              className="bg-sky-600 hover:bg-sky-700"
            >
              Continuar <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Step 3: Date and time selection */}
      {etapa === "data" && (
        <div className="animate-in slide-in-from-right">
          <h2 className="text-xl font-semibold mb-4">Escolha a data e horário</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date selection */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Selecione a data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    return date;
                  }).map((date, index) => {
                    const dayStr = date.toLocaleDateString('pt-BR', { day: 'numeric' });
                    const weekdayStr = date.toLocaleDateString('pt-BR', { weekday: 'short' }).substring(0, 3);
                    const fullDateStr = date.toLocaleDateString('pt-BR');
                    
                    return (
                      <Button
                        key={index}
                        variant={dataSelecionada === fullDateStr ? "default" : "outline"}
                        className={`flex flex-col h-16 ${
                          dataSelecionada === fullDateStr ? "bg-sky-600 hover:bg-sky-700" : ""
                        }`}
                        onClick={() => {
                          setDataSelecionada(fullDateStr);
                          setHorarioSelecionado(null);
                        }}
                      >
                        <span className="text-xs">{weekdayStr}</span>
                        <span className="text-lg">{dayStr}</span>
                      </Button>
                    );
                  })}
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Data selecionada: {dataSelecionada || "Nenhuma"}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Time selection */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Selecione o horário</CardTitle>
                <CardDescription>
                  {dataSelecionada 
                    ? `Horários disponíveis para ${dataSelecionada}`
                    : "Selecione uma data para ver os horários disponíveis"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dataSelecionada ? (
                  <ScrollArea className="h-[220px] pr-4">
                    <div className="grid grid-cols-3 gap-2">
                      {horariosDisponiveis.map((horario) => (
                        <Button
                          key={horario.id}
                          variant={horarioSelecionado?.id === horario.id ? "default" : "outline"}
                          className={
                            horarioSelecionado?.id === horario.id
                              ? "bg-sky-600 hover:bg-sky-700"
                              : ""
                          }
                          disabled={!horario.disponivel}
                          onClick={() => setHorarioSelecionado(horario)}
                        >
                          {horario.hora}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="h-[220px] flex items-center justify-center text-gray-400">
                    Selecione uma data para ver os horários
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button 
              variant="outline" 
              onClick={voltarEtapa}
            >
              Voltar
            </Button>
            <Button 
              onClick={avancarEtapa}
              disabled={!dataSelecionada || !horarioSelecionado}
              className="bg-sky-600 hover:bg-sky-700"
            >
              Finalizar Agendamento <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmarDialogAberto} onOpenChange={setConfirmarDialogAberto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Agendamento</DialogTitle>
            <DialogDescription>
              Verifique os detalhes do seu agendamento abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <h4 className="font-medium">Serviço</h4>
                <p className="text-sm text-gray-500">{servicoSelecionado?.nome}</p>
              </div>
              <div className="ml-auto font-medium">
                R$ {servicoSelecionado?.preco.toFixed(2)}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <h4 className="font-medium">Profissional</h4>
                <p className="text-sm text-gray-500">{profissionalSelecionado?.nome}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <h4 className="font-medium">Data e Horário</h4>
                <p className="text-sm text-gray-500">
                  {dataSelecionada} às {horarioSelecionado?.hora}
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <h4 className="font-medium">Duração</h4>
                <p className="text-sm text-gray-500">{servicoSelecionado?.duracao} minutos</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmarDialogAberto(false)}
            >
              Voltar
            </Button>
            <Button 
              className="bg-sky-600 hover:bg-sky-700"
              onClick={confirmarAgendamento}
            >
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}