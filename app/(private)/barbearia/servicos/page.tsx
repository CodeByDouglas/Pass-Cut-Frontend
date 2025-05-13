"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Clock, Edit, Plus, Scissors, Trash2 } from "lucide-react";
import { useState } from "react";

// Mock data
const initialServicos = [
  {
    id: 1,
    nome: "Corte de Cabelo",
    descricao: "Corte tradicional com máquina e tesoura",
    preco: 45,
    duracao: 30,
    categoria: "cabelo",
    disponivel: true,
  },
  {
    id: 2,
    nome: "Barba Completa",
    descricao: "Modelagem e acabamento completo da barba",
    preco: 35,
    duracao: 20,
    categoria: "barba",
    disponivel: true,
  },
  {
    id: 3,
    nome: "Pacote Completo",
    descricao: "Corte de cabelo e barba completa",
    preco: 70,
    duracao: 50,
    categoria: "combo",
    disponivel: true,
  },
  {
    id: 4,
    nome: "Corte Degradê",
    descricao: "Corte com degradê e acabamento perfeito",
    preco: 50,
    duracao: 40,
    categoria: "cabelo",
    disponivel: true,
  },
  {
    id: 5,
    nome: "Barboterapia",
    descricao: "Tratamento completo de pele e barba",
    preco: 60,
    duracao: 40,
    categoria: "barba",
    disponivel: true,
  },
  {
    id: 6,
    nome: "Design de Sobrancelhas",
    descricao: "Modelagem e alinhamento de sobrancelhas",
    preco: 25,
    duracao: 15,
    categoria: "outros",
    disponivel: false,
  }
];

// Categories
const categorias = [
  { id: "cabelo", nome: "Cabelo", icone: "✂️" },
  { id: "barba", nome: "Barba", icone: "🧔" },
  { id: "combo", nome: "Combos", icone: "🔄" },
  { id: "outros", nome: "Outros", icone: "✨" },
];

export default function ServicosPage() {
  const [servicos, setServicos] = useState(initialServicos);
  const [editingServico, setEditingServico] = useState<typeof initialServicos[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  const handleEdit = (servico: typeof initialServicos[0]) => {
    setEditingServico({...servico});
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingServico) {
      if (editingServico.id) {
        // Update existing
        setServicos(servicos.map(s => 
          s.id === editingServico.id ? editingServico : s
        ));
      } else {
        // Add new
        const newId = Math.max(...servicos.map(s => s.id)) + 1;
        setServicos([...servicos, {...editingServico, id: newId, disponivel: true}]);
      }
    }
    setIsDialogOpen(false);
    setEditingServico(null);
  };

  const handleDelete = (id: number) => {
    setServicos(servicos.filter(s => s.id !== id));
  };

  const handleAddNew = () => {
    setEditingServico({
      id: 0,
      nome: "",
      descricao: "",
      preco: 0,
      duracao: 30,
      categoria: "cabelo",
      disponivel: true
    });
    setIsDialogOpen(true);
  };

  const filteredServicos = categoriaAtiva
    ? servicos.filter(s => s.categoria === categoriaAtiva)
    : servicos;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
          <p className="text-gray-500 mt-1">
            Gerencie os serviços oferecidos pela sua barbearia
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleAddNew}
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Serviço
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button
          variant={categoriaAtiva === null ? "default" : "outline"}
          className={categoriaAtiva === null ? "bg-blue-600 hover:bg-blue-700" : ""}
          onClick={() => setCategoriaAtiva(null)}
        >
          Todos
        </Button>
        {categorias.map(categoria => (
          <Button
            key={categoria.id}
            variant={categoriaAtiva === categoria.id ? "default" : "outline"}
            className={categoriaAtiva === categoria.id ? "bg-blue-600 hover:bg-blue-700" : ""}
            onClick={() => setCategoriaAtiva(categoria.id)}
          >
            <span className="mr-2">{categoria.icone}</span> {categoria.nome}
          </Button>
        ))}
      </div>
      
      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServicos.map((servico) => (
          <Card key={servico.id} className={!servico.disponivel ? "opacity-70" : ""}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-blue-600" />
                  {servico.nome}
                </CardTitle>
                <div>
                  {!servico.disponivel && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Indisponível
                    </Badge>
                  )}
                </div>
              </div>
              <CardDescription>{servico.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-900">
                  R$ {servico.preco.toFixed(2)}
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{servico.duracao} min</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center text-sm text-gray-500">
                <span>Categoria: </span>
                <Badge variant="secondary" className="ml-2">
                  {categorias.find(c => c.id === servico.categoria)?.nome || servico.categoria}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEdit(servico)}>
                <Edit className="h-4 w-4 mr-1" /> Editar
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(servico.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Empty state */}
        {filteredServicos.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed border-gray-200">
            <Scissors className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">Nenhum serviço encontrado</h3>
            <p className="text-gray-500 mb-4 text-center">
              {categoriaAtiva ? "Não há serviços nesta categoria" : "Adicione seu primeiro serviço para começar"}
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleAddNew}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Serviço
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingServico?.id ? "Editar Serviço" : "Adicionar Novo Serviço"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do serviço abaixo.
            </DialogDescription>
          </DialogHeader>
          {editingServico && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Serviço</Label>
                <Input 
                  id="nome" 
                  value={editingServico.nome}
                  onChange={(e) => setEditingServico({...editingServico, nome: e.target.value})}
                  placeholder="Ex: Corte de Cabelo" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input 
                  id="descricao" 
                  value={editingServico.descricao}
                  onChange={(e) => setEditingServico({...editingServico, descricao: e.target.value})}
                  placeholder="Breve descrição do serviço" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <Input 
                    id="preco" 
                    type="number"
                    value={editingServico.preco}
                    onChange={(e) => setEditingServico({...editingServico, preco: Number(e.target.value)})}
                    placeholder="00.00" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duracao">Duração (min)</Label>
                  <Input 
                    id="duracao" 
                    type="number"
                    value={editingServico.duracao}
                    onChange={(e) => setEditingServico({...editingServico, duracao: Number(e.target.value)})}
                    placeholder="30" 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="categoria">Categoria</Label>
                <select 
                  id="categoria"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editingServico.categoria}
                  onChange={(e) => setEditingServico({...editingServico, categoria: e.target.value})}
                >
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="disponivel"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={editingServico.disponivel}
                  onChange={(e) => setEditingServico({...editingServico, disponivel: e.target.checked})}
                />
                <Label htmlFor="disponivel">Disponível para agendamento</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
            >
              {editingServico?.id ? "Salvar Alterações" : "Adicionar Serviço"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}