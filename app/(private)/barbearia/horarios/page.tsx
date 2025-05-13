"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Check, Clock, Info, Plus, Save, X } from "lucide-react";
import { useState } from "react";

const diasSemana = [
  { id: 1, nome: "Segunda-feira", abrev: "Seg" },
  { id: 2, nome: "Terça-feira", abrev: "Ter" },
  { id: 3, nome: "Quarta-feira", abrev: "Qua" },
  { id: 4, nome: "Quinta-feira", abrev: "Qui" },
  { id: 5, nome: "Sexta-feira", abrev: "Sex" },
  { id: 6, nome: "Sábado", abrev: "Sáb" },
  { id: 0, nome: "Domingo", abrev: "Dom" }
];

const Horarios = {
  1: { ativo: true, inicio: "09:00", fim: "18:00", intervalo: 30, pausaAlmoco: true, inicioAlmoco: "12:00", fimAlmoco: "13:00" },
  2: { ativo: true, inicio: "09:00", fim: "18:00", intervalo: 30, pausaAlmoco: true, inicioAlmoco: "12:00", fimAlmoco: "13:00" },
  3: { ativo: true, inicio: "09:00", fim: "18:00", intervalo: 30, pausaAlmoco: true, inicioAlmoco: "12:00", fimAlmoco: "13:00" },
  4: { ativo: true, inicio: "09:00", fim: "18:00", intervalo: 30, pausaAlmoco: true, inicioAlmoco: "12:00", fimAlmoco: "13:00" },
  5: { ativo: true, inicio: "09:00", fim: "18:00", intervalo: 30, pausaAlmoco: true, inicioAlmoco: "12:00", fimAlmoco: "13:00" },
  6: { ativo: true, inicio: "09:00", fim: "14:00", intervalo: 30, pausaAlmoco: false, inicioAlmoco: "", fimAlmoco: "" },
  0: { ativo: false, inicio: "09:00", fim: "18:00", intervalo: 30, pausaAlmoco: false, inicioAlmoco: "", fimAlmoco: "" }
};

const Feriados = [
  { data: "01/01/2025", descricao: "Ano Novo", horarioEspecial: false },
  { data: "15/04/2025", descricao: "Sexta-feira Santa", horarioEspecial: false },
  { data: "21/04/2025", descricao: "Tiradentes", horarioEspecial: true, inicio: "09:00", fim: "13:00" },
  { data: "01/05/2025", descricao: "Dia do Trabalho", horarioEspecial: false }
];

const horarioOpcoes = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

export default function HorariosPage() {
  const [horarios, definirHorarios] = useState(Horarios);
  const [feriados, definirFeriados] = useState(Feriados);
  const [diaEditando, definirDiaEditando] = useState<number | null>(null);
  const [feriadoEditando, definirFeriadoEditando] = useState<any>(null);
  const [confirmacaoSalva, definirConfirmacaoSalva] = useState(false);

  const editarDia = (diaId: number) => {
    definirDiaEditando(diaId);
  };

  const salvarDia = () => {
    definirDiaEditando(null);

    definirConfirmacaoSalva(true);
    setTimeout(() => definirConfirmacaoSalva(false), 2000);
  };

  const alternarDiaAtivo = (diaId: number) => {
    definirHorarios({
      ...horarios,
      [diaId]: {
        ...horarios[diaId as keyof typeof horarios],
        ativo: !horarios[diaId as keyof typeof horarios].ativo
      }
    });
  };

  const atualizarConfiguracoesDia = (diaId: number, campo: string, valor: any) => {
    definirHorarios({
      ...horarios,
      [diaId]: {
        ...horarios[diaId as keyof typeof horarios],
        [campo]: valor
      }
    });
  };

  const adicionarFeriado = () => {
    definirFeriadoEditando({
      data: "",
      descricao: "",
      horarioEspecial: false,
      inicio: "09:00",
      fim: "18:00"
    });
  };

  const salvarFeriado = () => {
    if (feriadoEditando) {
      const indiceExistente = feriados.findIndex(f => f.data === feriadoEditando.data);
      
      if (indiceExistente >= 0) {
        const feriadosAtualizados = [...feriados];
        feriadosAtualizados[indiceExistente] = feriadoEditando;
        definirFeriados(feriadosAtualizados);
      } else {
        definirFeriados([...feriados, feriadoEditando]);
      }
    }
    definirFeriadoEditando(null);
    definirConfirmacaoSalva(true);
    setTimeout(() => definirConfirmacaoSalva(false), 2000);
  };

  const excluirFeriado = (data: string) => {
    definirFeriados(feriados.filter(f => f.data !== data));
  };

  const renderizarIntervalosDeTempo = (diaId: number) => {
    const dia = horarios[diaId as keyof typeof horarios];
    if (!dia || !dia.ativo) return null;

    const intervalos = [];
    let atual = dia.inicio;
    while (atual < dia.fim) {
      if (dia.pausaAlmoco && atual >= dia.inicioAlmoco && atual < dia.fimAlmoco) {
        atual = dia.fimAlmoco;
        continue;
      }

      intervalos.push(atual);

      const [horas, minutos] = atual.split(':').map(Number);
      let novosMinutos = minutos + dia.intervalo;
      let novasHoras = horas;
      
      if (novosMinutos >= 60) {
        novasHoras += Math.floor(novosMinutos / 60);
        novosMinutos = novosMinutos % 60;
      }
      
      atual = `${novasHoras.toString().padStart(2, '0')}:${novosMinutos.toString().padStart(2, '0')}`;
    }

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {intervalos.map((intervalo, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {intervalo}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      {confirmacaoSalva && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center animate-in slide-in-from-right">
          <Check className="h-5 w-5 mr-2" />
          Alterações salvas com sucesso!
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Horários de Funcionamento</h1>
          <p className="text-gray-500 mt-1">
            Configure os horários disponíveis para agendamento
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="horarios" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="horarios" className="flex-1">Horários Semanais</TabsTrigger>
          <TabsTrigger value="feriados" className="flex-1">Feriados e Exceções</TabsTrigger>
        </TabsList>
        
        <TabsContent value="horarios">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center mb-4 text-sm text-gray-500">
              <Info className="h-4 w-4 mr-2" />
              <p>Configure o horário de funcionamento e intervalos para cada dia da semana.</p>
            </div>
            
            <div className="space-y-4">
              {diasSemana.map((dia) => {
                const horarioDia = horarios[dia.id as keyof typeof horarios];
                return (
                  <Card key={dia.id} className={!horarioDia?.ativo ? "opacity-70 bg-gray-50" : ""}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Switch
                            checked={horarioDia?.ativo || false}
                            onCheckedChange={() => alternarDiaAtivo(dia.id)}
                            className="mr-3"
                          />
                          <CardTitle className="text-base">{dia.nome}</CardTitle>
                        </div>
                        {horarioDia?.ativo && (
                          <Badge variant="outline" className="font-normal">
                            {horarioDia.inicio} - {horarioDia.fim}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    {horarioDia?.ativo && (
                      <CardContent className="pt-0">
                        {diaEditando === dia.id ? (
                          <div className="space-y-4 pb-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`inicio-${dia.id}`}>Horário de Abertura</Label>
                                <select
                                  id={`inicio-${dia.id}`}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                  value={horarioDia.inicio}
                                  onChange={(e) => atualizarConfiguracoesDia(dia.id, 'inicio', e.target.value)}
                                >
                                  {horarioOpcoes.map(hora => (
                                    <option key={hora} value={hora}>{hora}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <Label htmlFor={`fim-${dia.id}`}>Horário de Fechamento</Label>
                                <select
                                  id={`fim-${dia.id}`}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                  value={horarioDia.fim}
                                  onChange={(e) => atualizarConfiguracoesDia(dia.id, 'fim', e.target.value)}
                                >
                                  {horarioOpcoes.map(hora => (
                                    <option key={hora} value={hora}>{hora}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor={`intervalo-${dia.id}`}>Intervalo entre agendamentos (minutos)</Label>
                              <select
                                id={`intervalo-${dia.id}`}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                value={horarioDia.intervalo.toString()}
                                onChange={(e) => atualizarConfiguracoesDia(dia.id, 'intervalo', parseInt(e.target.value))}
                              >
                                <option value="15">15 minutos</option>
                                <option value="30">30 minutos</option>
                                <option value="45">45 minutos</option>
                                <option value="60">60 minutos</option>
                              </select>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`almoco-${dia.id}`}
                                checked={horarioDia.pausaAlmoco}
                                onCheckedChange={(checked) => 
                                  atualizarConfiguracoesDia(dia.id, 'pausaAlmoco', checked === true)
                                }
                              />
                              <Label htmlFor={`almoco-${dia.id}`}>Pausa para almoço</Label>
                            </div>
                            
                            {horarioDia.pausaAlmoco && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`inicio-almoco-${dia.id}`}>Início do almoço</Label>
                                  <select
                                    id={`inicio-almoco-${dia.id}`}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    value={horarioDia.inicioAlmoco}
                                    onChange={(e) => atualizarConfiguracoesDia(dia.id, 'inicioAlmoco', e.target.value)}
                                  >
                                    {horarioOpcoes.map(hora => (
                                      <option key={hora} value={hora}>{hora}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <Label htmlFor={`fim-almoco-${dia.id}`}>Fim do almoço</Label>
                                  <select
                                    id={`fim-almoco-${dia.id}`}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    value={horarioDia.fimAlmoco}
                                    onChange={(e) => atualizarConfiguracoesDia(dia.id, 'fimAlmoco', e.target.value)}
                                  >
                                    {horarioOpcoes.map(hora => (
                                      <option key={hora} value={hora}>{hora}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex justify-end">
                              <Button
                                variant="outline"
                                className="mr-2"
                                onClick={() => definirDiaEditando(null)}
                              >
                                <X className="h-4 w-4 mr-1" /> Cancelar
                              </Button>
                              <Button
                                className="bg-stone-600 hover:bg-stone-700"
                                onClick={salvarDia}
                              >
                                <Save className="h-4 w-4 mr-1" /> Salvar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-500 mr-1" />
                                <span>Intervalo: {horarioDia.intervalo} min</span>
                              </div>
                              
                              {horarioDia.pausaAlmoco && (
                                <div className="flex items-center">
                                  <span className="text-gray-500">Almoço: {horarioDia.inicioAlmoco} - {horarioDia.fimAlmoco}</span>
                                </div>
                              )}
                            </div>
                            
                            <CardDescription>Horários disponíveis para agendamento:</CardDescription>
                            {renderizarIntervalosDeTempo(dia.id)}
                            
                            <div className="mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editarDia(dia.id)}
                              >
                                Editar horários
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="feriados">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Info className="h-4 w-4 mr-2" />
                <p>Configure os feriados e dias com horários especiais.</p>
              </div>
              <Button 
                className="bg-stone-600 hover:bg-stone-700"
                onClick={adicionarFeriado}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Feriado
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feriados.map((feriado) => (
                <Card key={feriado.data}>
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{feriado.descricao}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {feriado.data}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={feriado.horarioEspecial ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}
                      >
                        {feriado.horarioEspecial ? "Horário Especial" : "Fechado"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3">
                    {feriado.horarioEspecial && (
                      <div className="mb-2">
                        <span className="text-sm">
                          Funcionamento: {feriado.inicio} - {feriado.fim}
                        </span>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => definirFeriadoEditando({ ...feriado })}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => excluirFeriado(feriado.data)}
                      >
                        Remover
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {feriados.length === 0 && (
                <div className="col-span-2 text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                  <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">Nenhum feriado cadastrado</h3>
                  <p className="text-gray-500 mb-4">
                    Adicione feriados e dias especiais para ajustar seu calendário de agendamentos.
                  </p>
                  <Button 
                    className="bg-stone-600 hover:bg-stone-700"
                    onClick={adicionarFeriado}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Adicionar Feriado
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <Dialog open={!!feriadoEditando} onOpenChange={(open) => !open && definirFeriadoEditando(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {feriadoEditando?.data ? "Editar Feriado" : "Adicionar Feriado"}
                </DialogTitle>
                <DialogDescription>
                  Configure as informações do feriado ou data especial.
                </DialogDescription>
              </DialogHeader>
              
              {feriadoEditando && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="data-feriado">Data</Label>
                    <input
                      id="data-feriado"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="DD/MM/AAAA"
                      value={feriadoEditando.data}
                      onChange={(e) => definirFeriadoEditando({ ...feriadoEditando, data: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="descricao-feriado">Descrição</Label>
                    <input
                      id="descricao-feriado"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Ex: Natal"
                      value={feriadoEditando.descricao}
                      onChange={(e) => definirFeriadoEditando({ ...feriadoEditando, descricao: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="horario-especial"
                      checked={feriadoEditando.horarioEspecial}
                      onCheckedChange={(checked) => 
                        definirFeriadoEditando({ 
                          ...feriadoEditando, 
                          horarioEspecial: checked === true 
                        })
                      }
                    />
                    <Label htmlFor="horario-especial">Funcionamento com horário especial</Label>
                  </div>
                  
                  {feriadoEditando.horarioEspecial && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="inicio-feriado">Horário de Abertura</Label>
                        <select
                          id="inicio-feriado"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                          value={feriadoEditando.inicio || "09:00"}
                          onChange={(e) => definirFeriadoEditando({ ...feriadoEditando, inicio: e.target.value })}
                        >
                          {horarioOpcoes.map(hora => (
                            <option key={hora} value={hora}>{hora}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="fim-feriado">Horário de Fechamento</Label>
                        <select
                          id="fim-feriado"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                          value={feriadoEditando.fim || "18:00"}
                          onChange={(e) => definirFeriadoEditando({ ...feriadoEditando, fim: e.target.value })}
                        >
                          {horarioOpcoes.map(hora => (
                            <option key={hora} value={hora}>{hora}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => definirFeriadoEditando(null)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="bg-stone-600 hover:bg-stone-700"
                  onClick={salvarFeriado}
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}