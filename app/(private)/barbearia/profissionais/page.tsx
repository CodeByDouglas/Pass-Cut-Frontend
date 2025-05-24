"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Plus, Clock, Mail, Phone, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

// Mock data
const initialProfissionais = [
  {
    id: 1,
    nome: "Marcos Oliveira",
    cargo: "Barbeiro Master",
    email: "marcos@exemplo.com",
    telefone: "(11) 98765-4321",
    experiencia: "10 anos",
    especialidades: ["Corte degradê", "Barba completa", "Pigmentação"],
    ativo: true,
    avatar: "https://uploads.jovemnerd.com.br/wp-content/uploads/2024/05/satoru_gojo_curiosidades__2h4a0242x.jpg"
  },
  {
    id: 2,
    nome: "Felipe Santos",
    cargo: "Barbeiro Senior",
    email: "felipe@exemplo.com",
    telefone: "(11) 98765-1234",
    experiencia: "7 anos",
    especialidades: ["Corte social", "Barboterapia", "Tintura"],
    ativo: true,
    avatar: "https://uploads.jovemnerd.com.br/wp-content/uploads/2024/05/satoru_gojo_curiosidades__2h4a0242x.jpg"
  },
  {
    id: 3,
    nome: "Alexandre Costa",
    cargo: "Barbeiro Junior",
    email: "alexandre@exemplo.com",
    telefone: "(11) 91234-5678",
    experiencia: "3 anos",
    especialidades: ["Corte tesoura", "Barba simples"],
    ativo: false,
    avatar: "https://uploads.jovemnerd.com.br/wp-content/uploads/2024/05/satoru_gojo_curiosidades__2h4a0242x.jpg"
  }
];

export default function ProfissionaisPage() {
  const [profissionais, setProfissionais] = useState(initialProfissionais);
  const [editingProfissional, setEditingProfissional] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (profissional: any) => {
    setEditingProfissional({...profissional});
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProfissional) {
      if (editingProfissional.id) {
        // Update existing
        setProfissionais(profissionais.map(p => 
          p.id === editingProfissional.id ? editingProfissional : p
        ));
      } else {
        // Add new
        const newId = Math.max(...profissionais.map(p => p.id)) + 1;
        setProfissionais([...profissionais, {...editingProfissional, id: newId}]);
      }
    }
    setIsDialogOpen(false);
    setEditingProfissional(null);
  };

  const handleDelete = (id: number) => {
    setProfissionais(profissionais.filter(p => p.id !== id));
  };

  const handleAddNew = () => {
    setEditingProfissional({
      id: 0,
      nome: "",
      cargo: "Barbeiro",
      email: "",
      telefone: "",
      experiencia: "",
      especialidades: [],
      ativo: true,
      avatar: ""
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profissionais</h1>
          <p className="text-gray-500 mt-1">
            Gerencie a equipe de barbeiros da sua barbearia
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            className="bg-stone-600 hover:bg-stone-700"
            onClick={handleAddNew}
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Profissional
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profissionais.map((profissional) => (
          <Card key={profissional.id} className={!profissional.ativo ? "opacity-70" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={profissional.avatar} alt={profissional.nome} />
                    <AvatarFallback className="bg-stone-100 text-stone-700">
                      {profissional.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{profissional.nome}</CardTitle>
                    <CardDescription>{profissional.cargo}</CardDescription>
                  </div>
                </div>
                {!profissional.ativo && (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Inativo
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{profissional.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{profissional.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Experiência: {profissional.experiencia}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Especialidades:</p>
                <div className="flex flex-wrap gap-1">
                  {profissional.especialidades.map((esp, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {esp}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEdit(profissional)}
              >
                <Edit className="h-4 w-4 mr-1" /> Editar
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remover
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirmar Remoção</DialogTitle>
                    <DialogDescription>
                      Tem certeza de que deseja remover o profissional "{profissional.nome}"? Esta ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(profissional.id)}
                    >
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}

        {/* Empty state */}
        {profissionais.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed border-gray-200">
            <User className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">Nenhum profissional encontrado</h3>
            <p className="text-gray-500 mb-4 text-center">
              Adicione sua equipe de barbeiros para começar
            </p>
            <Button 
              className="bg-stone-600 hover:bg-stone-700"
              onClick={handleAddNew}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Profissional
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingProfissional?.id ? "Editar Profissional" : "Adicionar Novo Profissional"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do profissional abaixo.
            </DialogDescription>
          </DialogHeader>
          {editingProfissional && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input 
                  id="nome" 
                  value={editingProfissional.nome}
                  onChange={(e) => setEditingProfissional({...editingProfissional, nome: e.target.value})}
                  placeholder="Ex: João Silva" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input 
                  id="cargo" 
                  value={editingProfissional.cargo}
                  onChange={(e) => setEditingProfissional({...editingProfissional, cargo: e.target.value})}
                  placeholder="Ex: Barbeiro Senior" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={editingProfissional.email}
                    onChange={(e) => setEditingProfissional({...editingProfissional, email: e.target.value})}
                    placeholder="email@exemplo.com" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input 
                    id="telefone" 
                    value={editingProfissional.telefone}
                    onChange={(e) => setEditingProfissional({...editingProfissional, telefone: e.target.value})}
                    placeholder="(00) 00000-0000" 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experiencia">Experiência</Label>
                <Input 
                  id="experiencia" 
                  value={editingProfissional.experiencia}
                  onChange={(e) => setEditingProfissional({...editingProfissional, experiencia: e.target.value})}
                  placeholder="Ex: 5 anos" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="especialidades">Especialidades (separadas por vírgula)</Label>
                <Input 
                  id="especialidades" 
                  value={editingProfissional.especialidades.join(", ")}
                  onChange={(e) => setEditingProfissional({
                    ...editingProfissional, 
                    especialidades: e.target.value.split(",").map(item => item.trim()).filter(Boolean)
                  })}
                  placeholder="Ex: Corte degradê, Barba completa" 
                />
            
                <div className="flex items-center gap-2 mt-2">
                  <input
                  type="file"
                  id="avatarUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setEditingProfissional({...editingProfissional, avatar: reader.result as string});
                    };
                    reader.readAsDataURL(file);
                    }
                  }}
                  />  
                  <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById("avatarUpload")?.click()}
                  >
                  Escolher Foto
                  </Button>
                  {editingProfissional.avatar && (
                  <img 
                    src={editingProfissional.avatar} 
                    alt="Preview" 
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                  )}
                </div>
                </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ativo"
                  className="h-4 w-4 rounded border-gray-300 text-stone-600 focus:ring-stone-500"
                  checked={editingProfissional.ativo}
                  onChange={(e) => setEditingProfissional({...editingProfissional, ativo: e.target.checked})}
                />
                <Label htmlFor="ativo">Ativo</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-stone-600 hover:bg-stone-700"
              onClick={handleSave}
            >
              {editingProfissional?.id ? "Salvar Alterações" : "Adicionar Profissional"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}