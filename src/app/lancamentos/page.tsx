"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/logo";
import { Plus, TrendingUp, TrendingDown, CreditCard, Calendar, Target, PiggyBank, ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Lancamentos() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "expense",
    date: new Date().toISOString().split('T')[0],
    description: "",
    category: "",
    subcategory: "",
    value: "",
    account: "",
    repeat: false,
    attachment: null as File | null,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, attachment: file }));
  };

  const handleSave = () => {
    // Simular salvamento
    alert("Lançamento salvo com sucesso!");
    // Reset form
    setFormData({
      type: "expense",
      date: new Date().toISOString().split('T')[0],
      description: "",
      category: "",
      subcategory: "",
      value: "",
      account: "",
      repeat: false,
      attachment: null,
    });
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
          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 pb-20">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Novo Lançamento</h1>
          <p className="text-muted-foreground">Adicione uma entrada ou saída</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Lançamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Entrada</SelectItem>
                    <SelectItem value="expense">Saída</SelectItem>
                    <SelectItem value="transfer">Transferência</SelectItem>
                    <SelectItem value="fixed_income">Receita Fixa</SelectItem>
                    <SelectItem value="fixed_expense">Despesa Fixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Ex: Salário, Conta de luz..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="lazer">Lazer</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategoria</Label>
                <Input
                  id="subcategory"
                  placeholder="Ex: Restaurante, Combustível..."
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange("subcategory", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Valor</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="account">Conta/Banco/Cartão</Label>
                <Select value={formData.account} onValueChange={(value) => handleInputChange("account", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nubank">Nubank</SelectItem>
                    <SelectItem value="itau">Itaú</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="carteira">Carteira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="attachment">Anexo (Foto/Comprovante)</Label>
              <Input
                id="attachment"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="repeat"
                checked={formData.repeat}
                onChange={(e) => handleInputChange("repeat", e.target.checked)}
              />
              <Label htmlFor="repeat">Repetir mensalmente</Label>
            </div>

            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Salvar Lançamento
            </Button>
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