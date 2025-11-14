"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/custom/header";
import { Navbar } from "@/components/custom/navbar";
import { Target, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PlanejamentoPage() {
  const categories = [
    {
      id: 1,
      name: "Alimentação",
      budgeted: 1500.00,
      projected: 1350.00,
      spent: 1280.00,
      status: "good",
    },
    {
      id: 2,
      name: "Transporte",
      budgeted: 800.00,
      projected: 850.00,
      spent: 920.00,
      status: "warning",
    },
    {
      id: 3,
      name: "Moradia",
      budgeted: 2000.00,
      projected: 2000.00,
      spent: 2000.00,
      status: "good",
    },
    {
      id: 4,
      name: "Lazer",
      budgeted: 500.00,
      projected: 600.00,
      spent: 780.00,
      status: "danger",
    },
    {
      id: 5,
      name: "Saúde",
      budgeted: 400.00,
      projected: 350.00,
      spent: 320.00,
      status: "good",
    },
  ];

  const totalBudgeted = categories.reduce((acc, cat) => acc + cat.budgeted, 0);
  const totalProjected = categories.reduce((acc, cat) => acc + cat.projected, 0);
  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "danger":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">No Orçamento</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Atenção</Badge>;
      case "danger":
        return <Badge variant="destructive">Acima do Orçamento</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Planejamento" subtitle="Projetado vs Orçado" />

      <main className="p-4 space-y-6 pb-24 max-w-4xl mx-auto">
        {/* Resumo Geral */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Orçado</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  R$ {(totalBudgeted / 1000).toFixed(1)}k
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Projetado</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  R$ {(totalProjected / 1000).toFixed(1)}k
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gasto</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  R$ {(totalSpent / 1000).toFixed(1)}k
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerta de Orçamento */}
        {totalSpent > totalBudgeted && (
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-400">
                    Atenção! Você está R$ {(totalSpent - totalBudgeted).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} acima do orçamento
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-500">
                    Revise seus gastos nas categorias marcadas em vermelho
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Categorias */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Target className="w-5 h-5" />
              Análise por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => {
                const percentage = ((category.spent / category.budgeted) * 100).toFixed(0);
                const difference = category.spent - category.budgeted;
                
                return (
                  <div
                    key={category.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {category.name}
                        </h3>
                        {getStatusBadge(category.status)}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          R$ {category.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <p className={`text-sm font-semibold ${getStatusColor(category.status)}`}>
                          {difference >= 0 ? '+' : ''}R$ {difference.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Orçado: R$ {category.budgeted.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        <span>Projetado: R$ {category.projected.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>

                      {/* Barra de progresso */}
                      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            category.status === "good" 
                              ? "bg-green-500" 
                              : category.status === "warning" 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(parseInt(percentage), 100)}%` }}
                        />
                        {parseInt(percentage) > 100 && (
                          <div 
                            className="absolute top-0 h-full bg-red-600 opacity-50"
                            style={{ 
                              left: '100%',
                              width: `${Math.min(parseInt(percentage) - 100, 50)}%`
                            }}
                          />
                        )}
                      </div>

                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{percentage}% do orçamento</span>
                        {parseInt(percentage) > 100 && (
                          <span className="text-red-600 dark:text-red-400 font-semibold">
                            {parseInt(percentage) - 100}% acima
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Dicas */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-400">
              <TrendingUp className="w-5 h-5" />
              Dicas de Economia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-blue-900 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Revise seus gastos com Lazer - você está 56% acima do orçamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Considere usar transporte público para reduzir custos com Transporte</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Parabéns! Você está economizando em Alimentação e Saúde</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <Navbar />
    </div>
  );
}
