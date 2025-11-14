"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/custom/header";
import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Eye, EyeOff, Calendar, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function CartoesPage() {
  const [showValues, setShowValues] = useState(true);

  const cards = [
    {
      id: 1,
      name: "Nubank",
      lastDigits: "4321",
      brand: "Mastercard",
      limit: 5000.00,
      used: 2350.00,
      dueDate: "2024-01-25",
      color: "from-purple-500 to-purple-700",
    },
    {
      id: 2,
      name: "Itaú",
      lastDigits: "8765",
      brand: "Visa",
      limit: 8000.00,
      used: 4120.00,
      dueDate: "2024-01-28",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: 3,
      name: "Bradesco",
      lastDigits: "1234",
      brand: "Elo",
      limit: 3000.00,
      used: 890.00,
      dueDate: "2024-01-20",
      color: "from-red-500 to-red-700",
    },
  ];

  const totalLimit = cards.reduce((acc, card) => acc + card.limit, 0);
  const totalUsed = cards.reduce((acc, card) => acc + card.used, 0);
  const totalAvailable = totalLimit - totalUsed;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Cartões" subtitle="Gerencie seus cartões de crédito" />

      <main className="p-4 space-y-6 pb-24 max-w-4xl mx-auto">
        {/* Resumo Geral */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Resumo Total
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowValues(!showValues)}
              >
                {showValues ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Limite Total</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {showValues ? `R$ ${(totalLimit / 1000).toFixed(0)}k` : "••••"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Utilizado</p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  {showValues ? `R$ ${(totalUsed / 1000).toFixed(1)}k` : "••••"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Disponível</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {showValues ? `R$ ${(totalAvailable / 1000).toFixed(1)}k` : "••••"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Cartões */}
        <div className="space-y-4">
          {cards.map((card) => {
            const usagePercentage = ((card.used / card.limit) * 100).toFixed(0);
            const available = card.limit - card.used;
            const daysUntilDue = Math.ceil((new Date(card.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

            return (
              <Card key={card.id} className="shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-gray-900 dark:text-white">
                          {card.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {card.brand} •••• {card.lastDigits}
                        </p>
                      </div>
                    </div>
                    <Badge variant={daysUntilDue <= 5 ? "destructive" : "secondary"}>
                      {daysUntilDue <= 0 ? "Vencido" : `${daysUntilDue} dias`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Valores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Limite</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {showValues ? `R$ ${card.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "••••••"}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Disponível</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {showValues ? `R$ ${available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "••••••"}
                      </p>
                    </div>
                  </div>

                  {/* Barra de Uso */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Utilizado</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {showValues ? `${usagePercentage}%` : "••%"}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${card.color} transition-all`}
                        style={{ width: `${usagePercentage}%` }}
                      />
                    </div>
                    {showValues && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        R$ {card.used.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de R$ {card.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>

                  {/* Vencimento */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Vencimento</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(card.dueDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  {/* Ações */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="gap-2">
                      <DollarSign className="w-4 h-4" />
                      Ver Fatura
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Lançar Gasto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Botão Adicionar Cartão */}
        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-14 gap-2">
          <Plus className="w-5 h-5" />
          Adicionar Novo Cartão
        </Button>
      </main>

      <Navbar />
    </div>
  );
}
