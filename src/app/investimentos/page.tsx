"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/custom/header";
import { Navbar } from "@/components/custom/navbar";
import { TrendingUp, DollarSign, PieChart, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function InvestimentosPage() {
  const investments = [
    {
      id: 1,
      name: "Tesouro Selic 2027",
      type: "Renda Fixa",
      amount: 10000.00,
      profitability: 12.5,
      currentValue: 11250.00,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Ações PETR4",
      type: "Renda Variável",
      amount: 5000.00,
      profitability: 18.3,
      currentValue: 5915.00,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Fundo Imobiliário HGLG11",
      type: "FII",
      amount: 3000.00,
      profitability: 8.7,
      currentValue: 3261.00,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "CDB Banco Inter",
      type: "Renda Fixa",
      amount: 7000.00,
      profitability: 10.2,
      currentValue: 7714.00,
      color: "bg-orange-500",
    },
  ];

  const totalInvested = investments.reduce((acc, inv) => acc + inv.amount, 0);
  const totalCurrent = investments.reduce((acc, inv) => acc + inv.currentValue, 0);
  const totalProfit = totalCurrent - totalInvested;
  const totalProfitability = ((totalProfit / totalInvested) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Investimentos" subtitle="Acompanhe seu patrimônio" />

      <main className="p-4 space-y-6 pb-24 max-w-4xl mx-auto">
        {/* Resumo Geral */}
        <Card className="bg-gradient-to-br from-green-500 to-teal-600 border-0 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Patrimônio Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-2">
              R$ {totalCurrent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">
                +R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({totalProfitability}%)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Investido</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    R$ {(totalInvested / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Lucro</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    +{totalProfitability}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Investimentos */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <PieChart className="w-5 h-5" />
              Meus Investimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${investment.color} rounded-lg flex items-center justify-center`}>
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {investment.name}
                        </h3>
                        <Badge variant="secondary" className="mt-1">
                          {investment.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        R$ {investment.currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        +{investment.profitability}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Investido: R$ {investment.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      +R$ {(investment.currentValue - investment.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Barra de progresso */}
                  <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${investment.color}`}
                      style={{ width: `${Math.min(investment.profitability * 5, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por Tipo */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <PieChart className="w-5 h-5" />
              Distribuição por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <span className="font-medium text-gray-900 dark:text-white">Renda Fixa</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">68%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <span className="font-medium text-gray-900 dark:text-white">Renda Variável</span>
                <span className="font-bold text-green-600 dark:text-green-400">20%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <span className="font-medium text-gray-900 dark:text-white">FII</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Navbar />
    </div>
  );
}
