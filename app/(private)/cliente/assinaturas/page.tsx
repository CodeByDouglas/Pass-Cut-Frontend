"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Subscription {
  plan: string;
  paymentMethod: string;
}

export default function AssinaturaPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const router = useRouter();

  const handleChoosePlan = () => {
    router.push("/cliente/planos");
  };

  const handleCancelSubscription = () => {
    alert("Assinatura cancelada com sucesso!");
    setSubscription(null);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Assinatura</h1>
        <p className="text-gray-500 mt-1">
          Gerencie sua assinatura, escolha um plano ou altere suas informações de pagamento.
        </p>
      </div>

      {!subscription ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Escolha um Plano</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Você ainda não possui um plano de assinatura. Escolha um plano para continuar.
              </p>
              <div className="mt-4">
                <Button
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={handleChoosePlan}
                >
                  Escolher Plano
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forma de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Forma de pagamento cadastrada!");
                  setSubscription({
                    plan: "Plano Básico",
                    paymentMethod: "Cartão de Crédito",
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número do Cartão
                  </label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Validade
                    </label>
                    <Input type="text" placeholder="MM/AA" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <Input type="text" placeholder="123" required />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700"
                >
                  Salvar Forma de Pagamento
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plano Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Plano: <span className="font-medium">{subscription.plan}</span>
              </p>
              <p className="text-gray-500">
                Forma de Pagamento:{" "}
                <span className="font-medium">{subscription.paymentMethod}</span>
              </p>
              <div className="mt-4 flex space-x-4">
                <Button
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={handleChoosePlan}
                >
                  Alterar Plano
                </Button>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={handleCancelSubscription}
                >
                  Cancelar Assinatura
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}