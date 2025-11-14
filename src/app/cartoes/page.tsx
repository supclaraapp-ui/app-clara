"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { Plus, TrendingUp, TrendingDown, CreditCard, Calendar, Target, PiggyBank, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreditCard {
  id: string;
  name: string;
  brand: string;
  limit: number;
  used: number;
  available: number;
  closingDay: number;
  dueDay: number;
  currentBill: number;
}

export default function Cartoes() {
  const router = useRouter();
  const [cards, setCards] = useState<CreditCard[]>([
    {
      id: "1",
      name: "Nubank",
      brand: "Mastercard",
      limit: 5000,
      used: 1200,
      available: 3800,
      closingDay: 15,
      dueDay: 22,
      currentBill: 1200,
    },
    {
      id: "2",
      name: "Itaú",
      brand: "Visa",
      limit: 3000,
      used: 800,
      available: 2200,
      closingDay: 10,
      dueDay: 17,
      currentBill: 800,
    },
  ]);

  const handleAddCard = () => {
    alert("Adicionar novo cartão - funcionalidade em desenvolvimento");
  };

  const handleEditCard = (card: CreditCard) => {
    alert(`Editar cartão: ${card.name} - funcionalidade em desenvolvimento`);
  };

  const handleDeleteCard = (card: CreditCard) => {
    if (confirm(`Tem certeza que deseja excluir o cartão ${card.name}?`)) {
      setCards(prev => prev.filter(c => c.id !== card.id));
      alert("Cartão excluído com sucesso!");
    }
  };

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
          <Button variant="ghost" size="icon" onClick={handleAddCard}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 pb-20">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Meus Cartões</h1>
          <p className="text-muted-foreground">Gerencie seus cartões de crédito</p>
        </div>

        <div className="space-y-4">
          {cards.map((card) => (
            <Card key={card.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{card.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{card.brand}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditCard(card)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCard(card)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Limite Total</p>
                    <p className="text-lg font-semibold">R$ {card.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Limite Disponível</p>
                    <p className="text-lg font-semibold text-green-600">R$ {card.available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Utilizado</span>
                    <span>R$ {card.used.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(card.used / card.limit) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Fechamento</p>
                    <p className="font-semibold">Dia {card.closingDay}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vencimento</p>
                    <p className="font-semibold">Dia {card.dueDay}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fatura Atual</p>
                    <p className="font-semibold">R$ {card.currentBill.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Lançamentos
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Gráfico
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {cards.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum cartão cadastrado</p>
              <Button onClick={handleAddCard} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Cartão
              </Button>
            </CardContent>
          </Card>
        )}
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