"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/custom/header";
import { Navbar } from "@/components/custom/navbar";
import { TrendingUp, TrendingDown, CreditCard, Calendar, Target, PiggyBank } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const greeting = user?.user_metadata?.full_name 
    ? `Bom dia, ${user.user_metadata.full_name.split(' ')[0]}` 
    : "Bom dia";

  // Calcular totais das transações
  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyBalance = monthlyIncome - monthlyExpenses;
  const currentBalance = 15420.50 + monthlyBalance;

  useEffect(() => {
    checkUser();
    loadData();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUser(user);
  };

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Carregar transações
      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(10);

      if (transactionsData) {
        setTransactions(transactionsData);
      }

      // Carregar cartões
      const { data: cardsData } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', user.id);

      if (cardsData) {
        setCards(cardsData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      icon: TrendingDown,
      label: "Lançar Despesa",
      path: "/lancamentos?type=expense",
      color: "text-red-600 dark:text-red-400",
    },
    {
      icon: TrendingUp,
      label: "Lançar Entrada",
      path: "/lancamentos?type=income",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: CreditCard,
      label: "Ver Cartões",
      path: "/cartoes",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Calendar,
      label: "Ver Agenda",
      path: "/agenda",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Target,
      label: "Projetado vs Orçado",
      path: "/planejamento",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: PiggyBank,
      label: "Ver Investimentos",
      path: "/investimentos",
      color: "text-teal-600 dark:text-teal-400",
    },
  ];

  // Cartões próximos ao vencimento
  const upcomingCards = cards
    .filter(card => {
      const today = new Date().getDate();
      const daysUntilDue = card.due_date - today;
      return daysUntilDue >= 0 && daysUntilDue <= 7;
    })
    .sort((a, b) => a.due_date - b.due_date);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="p-4 space-y-6 pb-24 max-w-4xl mx-auto">
        {/* Greeting */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {greeting}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Aqui está o resumo da sua semana
          </p>
        </div>

        {/* Current Balance */}
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Saldo Atual Consolidado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">
              R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Summary */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Resumo do Mês
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Entradas</span>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                R$ {monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Saídas</span>
              </div>
              <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                R$ {monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-gray-900 dark:text-white">Saldo do Mês</span>
              <span className={`font-bold text-xl ${monthlyBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                R$ {monthlyBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Cartões Próximos ao Vencimento */}
        {upcomingCards.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <CreditCard className="w-5 h-5" />
                Cartões Próximos ao Vencimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingCards.map((card) => {
                  const today = new Date().getDate();
                  const daysUntilDue = card.due_date - today;
                  return (
                    <div key={card.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{card.name}</span>
                      </div>
                      <Badge variant={daysUntilDue <= 2 ? "destructive" : "secondary"} className="font-semibold">
                        Vence em {daysUntilDue} {daysUntilDue === 1 ? 'dia' : 'dias'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Últimas Transações */}
        {transactions.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="w-5 h-5" />
                Últimas Transações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 dark:bg-green-900/40' 
                          : 'bg-red-100 dark:bg-red-900/40'
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white block">
                          {transaction.description}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      transaction.type === 'income' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.path}
                variant="outline"
                className="h-24 flex-col gap-3 hover:shadow-lg transition-all hover:scale-105 bg-white dark:bg-gray-800"
                onClick={() => router.push(action.path)}
              >
                <div className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${action.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </div>
      </main>

      <Navbar />
    </div>
  );
}
