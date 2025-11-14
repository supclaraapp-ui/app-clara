"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoToDashboard = () => {
    setIsLoading(true);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl border-2">
        <CardHeader className="text-center pb-8 pt-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pagamento Confirmado!
          </CardTitle>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Sua assinatura foi ativada com sucesso
          </p>
        </CardHeader>

        <CardContent className="space-y-8 pb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  O que acontece agora?
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Você receberá um email de confirmação em instantes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sua conta já está ativa e pronta para uso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Acesse todos os recursos premium imediatamente</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-lg font-semibold shadow-xl w-full sm:w-auto"
              onClick={handleGoToDashboard}
              disabled={isLoading}
            >
              {isLoading ? "Carregando..." : "Acessar Minha Conta"}
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pronto para começar sua jornada financeira!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
