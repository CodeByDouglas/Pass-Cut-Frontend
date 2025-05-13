"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    nome: "João da Silva",
    email: "email@.com.br",
    telefone: "40028922",
    senha: "dasdsadasda",
  });
  const [profileImage, setProfileImage] = useState<string>("https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png");
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/perfil")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData(data);
        } else {
          setIsNewUser(true);
          setIsEditing(true);
        }
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.nome || !formData.email || !formData.telefone || !formData.senha) {
      setMessage("Todos os campos são obrigatórios!");
      return;
    }

    setIsLoading(true);
    const endpoint = isNewUser ? "/api/perfil/create" : "/api/perfil/update";
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ ...formData, profileImage }),
    })
      .then(() => {
        setMessage("Dados salvos com sucesso!");
        setIsEditing(false);
        setIsNewUser(false);
      })
      .catch(() => setMessage("Erro ao salvar os dados."))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="p-4">
      <Card className="border-l-4 border-l-stone-900">
        <CardHeader>
          <CardTitle>Perfil do Usuário</CardTitle>
          <CardDescription>
            {isEditing ? "Edite suas informações" : "Visualize suas informações"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Versão Mobile */}
          <div className="block md:hidden">
            <div className="relative w-40 h-30 mx-auto">
              <img
                src={profileImage}
                alt="Foto de perfil"
                className="w-40 h-40 rounded-full object-cover"
              />
              <label
                htmlFor="upload-image-mobile"
                className="absolute bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full p-2 cursor-pointer"
              >
                <Edit className="w-4 h-4 text-white" />
                <input
                  id="upload-image-mobile"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <Separator className="my-2" />
            <h2 className="text-lg font-semibold">Informações Pessoais</h2>
            <div className="space-y-2">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium">
                  Nome
                </label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Digite seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Digite seu email"
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium">
                  Telefone
                </label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Digite seu telefone"
                />
              </div>
            </div>
            <Separator className="my-2" />
            <h2 className="text-lg font-semibold">Segurança</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="senha" className="block text-sm font-medium">
                  Senha
                </label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Digite sua senha"
                />
              </div>
            </div>
          </div>

          {/* Versão Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Imagem de Perfil */}
            <div className="relative w-60 h-60 ">
              <img
                src={profileImage}
                alt="Foto de perfil"
                className="w-60 h-60 rounded-full object-cover "
              />
              <label
                htmlFor="upload-image-desktop"
                className="absolute bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full p-2 cursor-pointer"
              >
                <Edit className="w-6 h-6 text-white" />
                <input
                  id="upload-image-desktop"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Informações do Usuário */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Informações Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium">
                    Nome
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Digite seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Digite seu email"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium">
                    Telefone
                  </label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Digite seu telefone"
                  />
                </div>
              </div>
              <Separator className="my-4" />
              <h2 className="text-lg font-semibold">Segurança</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="senha" className="block text-sm font-medium">
                    Senha
                  </label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setShowDialog(true)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Editar</Button>
          )}
        </CardFooter>
      </Card>

      {message && <p className="text-sm text-stone-800 mt-4">{message}</p>}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDialog(false)}>
              Não
            </Button>
            <Button onClick={() => setIsEditing(false)}>Sim</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

