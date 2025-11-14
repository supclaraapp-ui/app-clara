"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/custom/header";
import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Calendar, Settings, LogOut, Shield, Bell } from "lucide-react";

export default function PerfilPage() {
  const user = {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    address: "São Paulo, SP",
    memberSince: "Janeiro 2024",
    avatar: "JS",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Meu Perfil" subtitle="Gerencie suas informações" />

      <main className="p-4 space-y-6 pb-24 max-w-4xl mx-auto">
        {/* Avatar e Info Principal */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl">
                {user.avatar}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Membro desde {user.memberSince}
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informações Pessoais */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <User className="w-5 h-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Localização</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Membro desde</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.memberSince}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Settings className="w-5 h-5" />
              Configurações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3"
              >
                <Bell className="w-5 h-5" />
                <span>Notificações</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3"
              >
                <Shield className="w-5 h-5" />
                <span>Privacidade e Segurança</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3"
              >
                <Settings className="w-5 h-5" />
                <span>Preferências</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-center gap-2 h-12 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-5 h-5" />
            Sair da Conta
          </Button>
        </div>
      </main>

      <Navbar />
    </div>
  );
}
