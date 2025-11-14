"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/logo";
import { TrendingUp, TrendingDown, CreditCard, Calendar, Target, PiggyBank, Plus, ArrowLeft, BarChart3, PieChart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleNavigateHome = () => router.push("/");
  const handleNavigateLancamentos = () => router.push("/lancamentos");
  const handleNavigateCartoes = () => router.push("/cartoes");
  const handleNavigateDashboard = () => router.push("/dashboard");
  const handleNavigatePerfil = () => router.push("/perfil");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Logo />
          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 pb-20">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Dashboard Financeiro</h1>
          <p className="text-muted-foreground">Visão completa das suas finanças</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Mês</label>
                <Select defaultValue="current">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Janeiro 2024</SelectItem>
                    <SelectItem value="previous">Dezembro 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Categoria</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Conta</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="nubank">Nubank</SelectItem>
                    <SelectItem value="itau">Itaú</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Entradas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R$ 8.500,00</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                Saídas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">R$ 6.950,00</div>
              <p className="text-xs text-muted-foreground">-5% em relação ao mês passado</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Fluxo de Caixa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de linha - Em desenvolvimento</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Gastos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de pizza - Em desenvolvimento</p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Comparação Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Dezembro 2023</span>
                <span className="font-semibold">R$ 1.200,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Janeiro 2024</span>
                <span className="font-semibold">R$ 1.550,00</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Diferença</span>
                <span className="font-semibold text-green-600">+R$ 350,00 (+29%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accounts Near Due */}
        <Card>
          <CardHeader>
            <CardTitle>Contas Próximas ao Vencimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Conta de Luz</span>
                <span className="text-sm text-muted-foreground">Vence hoje</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Aluguel</span>
                <span className="text-sm text-muted-foreground">Vence em 3 dias</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex-col gap-1" onClick={handleNavigateHome}>
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1" onClick={handleNavigateLancamentos}>
            <Plus className="w-5 h-5" />
            <span className="text-xs">Lançamentos</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1" onClick={handleNavigateCartoes}>
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">Cartões</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1" onClick={handleNavigateDashboard}>
            <Target className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1" onClick={handleNavigatePerfil}>
            <PiggyBank className="w-5 h-5" />
            <span className="text-xs">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}