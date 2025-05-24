"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginAsCliente = () => {
    setLoading(true);
    // Simulating authentication
    setTimeout(() => {
      document.cookie = `token=logado; path=/`;
      document.cookie = `tipo=cliente; path=/`;
      router.push("/cliente/agendamentos");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-stone-900" />
          </div>
          <CardTitle className="text-2xl">Bem-vindo ao Passcut</CardTitle>
          <CardDescription>
            Faça login para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-cliente">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input 
                  id="email-cliente" 
                  placeholder="seuemail@exemplo.com" 
                  type="email" 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="senha-cliente">Senha</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input 
                  id="senha-cliente" 
                  placeholder="••••••••" 
                  type="password" 
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button 
              className="w-full bg-stone-600 hover:bg-stone-700"
              onClick={loginAsCliente}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar como Cliente"}
            </Button>
            
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-stone-600 hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Ou</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Criar conta de cliente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}