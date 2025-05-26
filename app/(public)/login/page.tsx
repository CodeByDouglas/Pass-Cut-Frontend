// app/(public)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const ENDPOINT = "https://jubilant-adventure-q79vr767pj7pf4v66-5000.app.github.dev/api/autenticar_user";
      const FERNET_TOKEN = "gAAAAABoMq5-Akg8Nzut-mkdgopFmlHbDtamCEA4NPGLRM4etW0z37hQFf7sGCpN13FJtZwR8deTONj0LkgAr2X2ch2Sdx1CNL8dId8CGR_6xclXZXd24jaaPZKyl-yb6wFgWj2TIuzFya95MxsOJhL1Ivdr-OUILATCMlWviAgCnQ-s2vRcI61dTzVkupDOKgK1ULUhlPRlZRaBLuCNSxbpIECUuiGmSw==";

      const res = await fetch(ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": FERNET_TOKEN,
        },
        body: JSON.stringify({ login: email, senha }),
      });

      const data = await res.json();
      if (res.status === 200) {
        router.push("/cliente/agendamentos");
      } else {
        toast({ title: data.message || "Erro ao fazer login.", variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Erro no servidor, tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-sky-900" />
          </div>
          <CardTitle className="text-2xl">Bem-vindo ao Passcut</CardTitle>
          <CardDescription>Faça login para acessar sua conta</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full bg-sky-600 hover:bg-sky-700"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar como Cliente"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
