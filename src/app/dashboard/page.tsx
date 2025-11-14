"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/custom/header";
import { Navbar } from "@/components/custom/navbar";
import { BarChart3, TrendingUp, TrendingDown, PieChart, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const monthlyData = [
    { month: "Jan", income: 8500, expense: 6950 },
    { month: "Fev", income: 9200, expense: 7100 },
    { month: "Mar", income: 8800, expense: 6800 },
    { month: "Abr", income: 9500, expense: 7300 },
    { month: "Mai", income: 8700, expense: 6900 },
    { month: "Jun", income: 9000, expense: 7200 },
  ];

  const categoryExpenses = [
    { name: "Alimentação", value: 1350, color: "bg-blue-500" },
    { name: "Transporte", value: 920, color: "bg-green-500" },
    { name: "Moradia", value: 2000, color: "bg-purple-500" },
    { name: "Lazer", value: 780, color: "bg-orange-500" },
    { name: "Saúde", value: 320, color: "bg-red-500" },
  ];

  const totalExpenses = categoryExpenses.reduce((acc, cat) => acc + cat.value, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Dashboard" subtitle="Visão geral das suas finanças" />

      <main className="p-4 space-y-6 pb-24 max-w-4xl mx-auto">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Entradas</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    R$ 9,0k
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Saídas</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    R$ 7,2k
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Barras Mensal */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <BarChart3 className="w-5 h-5" />
              Evolução Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => {
                const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));
                const incomeWidth = (data.income / maxValue) * 100;
                const expenseWidth = (data.expense / maxValue) * 100;

                return (
                  <div key={data.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-white w-12">
                        {data.month}
                      </span>
                      <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                        <span className="text-green-600 dark:text-green-400">
                          +R$ {(data.income / 1000).toFixed(1)}k
                        </span>
                        <span className="text-red-600 dark:text-red-400">
                          -R$ {(data.expense / 1000).toFixed(1)}k
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${incomeWidth}%` }}
                        />
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${expenseWidth}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Gastos por Categoria */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <PieChart className="w-5 h-5" />
              Gastos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryExpenses.map((category) => {
                const percentage = ((category.value / totalExpenses) * 100).toFixed(1);

                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          R$ {category.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${category.color} rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Média Diária */}
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-xl">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm text-white/80 mb-1">Média de Gastos Diários</p>
                <p className="text-3xl font-bold">R$ 240,00</p>
                <p className="text-sm text-white/80 mt-2">Baseado nos últimos 30 dias</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Navbar />
    </div>
  );
}
