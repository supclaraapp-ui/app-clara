"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, TrendingUp, Shield, Zap, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStripe } from "@/lib/stripe";

export default function Home() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const features = [
    {
      icon: TrendingUp,
      title: "Controle Financeiro Completo",
      description: "Gerencie receitas, despesas e investimentos em um só lugar"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Seus dados protegidos com criptografia de ponta"
    },
    {
      icon: Zap,
      title: "Relatórios Inteligentes",
      description: "Insights automáticos sobre suas finanças"
    },
    {
      icon: Users,
      title: "Interface Intuitiva",
      description: "Fácil de usar, feito para você"
    }
  ];

  const plans = [
    {
      name: "Mensal",
      price: "19,90",
      period: "/mês",
      priceId: "price_monthly", // Você vai substituir isso pela sua Price ID do Stripe
      features: [
        "Controle completo de receitas e despesas",
        "Gestão de cartões de crédito",
        "Planejamento financeiro",
        "Relatórios detalhados",
        "Suporte prioritário",
        "Atualizações automáticas"
      ],
      highlight: false
    },
    {
      name: "Anual",
      price: "199,90",
      period: "/ano",
      priceId: "price_yearly", // Você vai substituir isso pela sua Price ID do Stripe
      savings: "Economize R$ 38,90",
      features: [
        "Tudo do plano mensal",
        "2 meses grátis",
        "Controle completo de receitas e despesas",
        "Gestão de cartões de crédito",
        "Planejamento financeiro",
        "Relatórios detalhados",
        "Suporte prioritário VIP",
        "Atualizações automáticas"
      ],
      highlight: true
    }
  ];

  const handleSubscribe = async (priceId: string, planName: string) => {
    try {
      setLoadingPlan(planName);

      // Cria a sessão de checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planName,
        }),
      });

      const { sessionId, url } = await response.json();

      if (url) {
        // Redireciona para o checkout do Stripe
        window.location.href = url;
      } else {
        // Fallback: usa o Stripe.js para redirecionar
        const stripe = await getStripe();
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId });
        }
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CLARA
            </span>
          </div>
          <Button 
            onClick={() => router.push("/login")}
            variant="outline"
            className="font-semibold"
          >
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-2 text-sm">
          🎉 Controle suas finanças de forma inteligente
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Transforme sua
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Vida Financeira
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          O sistema completo para gerenciar suas finanças pessoais com inteligência e simplicidade
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            onClick={() => {
              const pricingSection = document.getElementById('pricing');
              pricingSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Começar Agora
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg font-semibold"
            onClick={() => router.push("/login")}
          >
            Ver Demonstração
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recursos Poderosos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tudo que você precisa para ter controle total
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-xl transition-all hover:scale-105 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Escolha seu Plano
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Preços simples e transparentes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.highlight 
                  ? 'border-4 border-purple-500 shadow-2xl scale-105' 
                  : 'border-2'
              } bg-white dark:bg-gray-800`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-6 py-2 text-sm font-bold">
                    MAIS POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </CardTitle>
                {plan.savings && (
                  <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {plan.savings}
                  </Badge>
                )}
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    R$ {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-6 text-lg font-semibold ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl'
                      : 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                  }`}
                  onClick={() => handleSubscribe(plan.priceId, plan.name)}
                  disabled={loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name ? 'Processando...' : 'Assinar Agora'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-2xl">
          <CardContent className="text-center py-16 px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já transformaram suas finanças com o CLARA
            </p>
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl"
              onClick={() => {
                const pricingSection = document.getElementById('pricing');
                pricingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Planos
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 CLARA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
