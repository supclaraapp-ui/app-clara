"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/custom/header";
import { Navbar } from "@/components/custom/navbar";
import { Calendar, Clock, DollarSign, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AgendaPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Conta de Luz",
      amount: 150.00,
      date: "2024-01-20",
      time: "Vencimento",
      type: "expense",
      priority: "high",
    },
    {
      id: 2,
      title: "Aluguel",
      amount: 1200.00,
      date: "2024-01-25",
      time: "Vencimento",
      type: "expense",
      priority: "high",
    },
    {
      id: 3,
      title: "Salário",
      amount: 5000.00,
      date: "2024-01-30",
      time: "Recebimento",
      type: "income",
      priority: "medium",
    },
    {
      id: 4,
      title: "Internet",
      amount: 99.90,
      date: "2024-01-22",
      time: "Vencimento",
      type: "expense",
      priority: "medium",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Agenda Financeira" subtitle="Seus compromissos futuros" />

      <main className="p-4 space-y-6 pb-24 max-w-4xl mx-auto">
        {/* Resumo */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    R$ {(1449.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Eventos */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Calendar className="w-5 h-5" />
              Próximos Compromissos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      event.type === "income" 
                        ? "bg-green-100 dark:bg-green-900/40" 
                        : "bg-red-100 dark:bg-red-900/40"
                    }`}>
                      <DollarSign className={`w-6 h-6 ${
                        event.type === "income" 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-red-600 dark:text-red-400"
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      event.type === "income" 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    }`}>
                      {event.type === "income" ? "+" : "-"}R$ {event.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <Badge 
                      variant={event.priority === "high" ? "destructive" : "secondary"}
                      className="mt-1"
                    >
                      {event.priority === "high" ? "Urgente" : "Normal"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Navbar />
    </div>
  );
}
