"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Logo } from "@/components/logo";
import { TrendingUp, TrendingDown, CreditCard, Calendar, Target, PiggyBank, Plus, ArrowLeft, User, Settings, Bell, Download, Upload, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const router = useRouter();

  const handleNavigateHome = () => router.push("/");
  const handleNavigateLancamentos = () => router.push("/lancamentos");
  const handleNavigateCartoes = () => router.push("/cartoes");
  const handleNavigateDashboard = () => router.push("/dashboard");
  const handleNavigatePerfil = () => router.push("/perfil");

  const handleBackup = () => {
    alert("Backup dos dados realizado com sucesso!");
  };

  const handleExport = () => {
    alert("Dados exportados com sucesso!");
  };

  const handleImport = () => {
    alert("Importação de dados - funcionalidade em desenvolvimento");
  };

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
          <h1 className="text-2xl font-semibold">Meu Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas configurações</p>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">João Silva</h3>
                <p className="text-sm text-muted-foreground">joao@email.com</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Alterar Foto de Perfil
            </Button>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Personalização
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tema</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button variant="outline" size="sm">Claro</Button>
                <Button variant="outline" size="sm">Escuro</Button>
                <Button variant="outline" size="sm">Sistema</Button>
              </div>
            </div>
            <div>
              <Label>Cor do Tema</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                <Button variant="outline" size="sm" className="bg-blue-500 text-white">Azul</Button>
                <Button variant="outline" size="sm" className="bg-green-500 text-white">Verde</Button>
                <Button variant="outline" size="sm" className="bg-purple-500 text-white">Roxo</Button>
                <Button variant="outline" size="sm" className="bg-pink-500 text-white">Rosa</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Lembretes de contas</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Alertas de orçamento</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Notificações push</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={handleBackup}>
              <Download className="w-4 h-4 mr-2" />
              Fazer Backup
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" />
              Importar Planilha
            </Button>
          </CardContent>
        </Card>

        {/* Family Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Gestão Familiar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Cônjuge
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Dependente
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Ver Financeiro Familiar
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600">
              Sair da Conta
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