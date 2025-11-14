"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { Plus, TrendingUp, TrendingDown, CreditCard, Calendar, Target, PiggyBank } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const greeting = "Bom dia, João"; // Isso viria do contexto do usuário
  const currentBalance = 15420.50;
  const monthlyIncome = 8500.00;
  const monthlyExpenses = 6950.00;
  const monthlyBalance = monthlyIncome - monthlyExpenses;

  const handleAddTransaction = () => {
    router.push("/lancamentos");
  };

  const handleLaunchExpense = () => {
    router.push("/lancamentos?type=expense");
  };

  const handleLaunchIncome = () => {
    router.push("/lancamentos?type=income");
  };

  const handleViewCards = () => {
    router.push("/cartoes");
  };

  const handleViewAgenda = () => {
    router.push("/agenda");
  };

  const handleProjectedVsBudgeted = () => {
    router.push("/planejamento");
  };

  const handleViewInvestments = () => {
    router.push("/investimentos");
  };

  const handleNavigateHome = () => {
    router.push("/");
  };

  const handleNavigateLancamentos = () => {
    router.push("/lancamentos");
  };

  const handleNavigateCartoes = () => {
    router.push("/cartoes");
  };

  const handleNavigateDashboard = () => {
    router.push("/dashboard");
  };

  const handleNavigatePerfil = () => {
    router.push("/perfil");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b">
        <div className="flex items-center justify-between">
          <Logo />
          <Button variant="ghost" size="icon" onClick={handleAddTransaction}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 pb-20">
        {/* Greeting */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{greeting}</h1>
          <p className="text-muted-foreground">Aqui está o resumo da sua semana</p>
        </div>

        {/* Current Balance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual Consolidado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Mês</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>Entradas</span>
              </div>
              <span className="font-semibold text-green-600">
                R$ {monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span>Saídas</span>
              </div>
              <span className="font-semibold text-red-600">
                R$ {monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Saldo</span>
              <span className={`font-semibold ${monthlyBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {monthlyBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Cards Próximos ao Vencimento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Cartões Próximos ao Vencimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Nubank</span>
                <Badge variant="destructive">Vence em 2 dias</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Itaú</span>
                <Badge variant="secondary">Vence em 5 dias</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Compromissos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Próximos Compromissos Financeiros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Conta de Luz</span>
                <Badge variant="outline">R$ 150,00 - Hoje</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span>Aluguel</span>
                <Badge variant="outline">R$ 1.200,00 - 5 dias</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={handleLaunchExpense}>
            <TrendingDown className="w-6 h-6" />
            Lançar Despesa
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={handleLaunchIncome}>
            <TrendingUp className="w-6 h-6" />
            Lançar Entrada
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={handleViewCards}>
            <CreditCard className="w-6 h-6" />
            Ver Cartões
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={handleViewAgenda}>
            <Calendar className="w-6 h-6" />
            Ver Agenda
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={handleProjectedVsBudgeted}>
            <Target className="w-6 h-6" />
            Projetado vs Orçado
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={handleViewInvestments}>
            <PiggyBank className="w-6 h-6" />
            Ver Investimentos
          </Button>
        </div>
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