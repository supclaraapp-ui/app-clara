"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  CheckCircle2, 
  Star,
  TrendingUp,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Sparkles,
  BarChart3,
  CreditCard,
  PiggyBank,
  Target,
  Calendar,
  Bell,
  Smartphone,
  Lock,
  Globe,
  Award
} from "lucide-react";
import { useRouter } from "next/navigation";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Empreendedora Digital",
    avatar: "MS",
    rating: 5,
    text: "O CLARA transformou completamente minha relação com dinheiro. Agora tenho controle total das minhas finanças e consigo planejar melhor meus investimentos!",
    color: "from-pink-500 to-rose-500",
    savings: "R$ 3.500/mês economizados"
  },
  {
    name: "João Santos",
    role: "Freelancer Tech",
    avatar: "JS",
    rating: 5,
    text: "Finalmente consigo visualizar para onde meu dinheiro está indo. Interface intuitiva, recursos poderosos e relatórios que realmente fazem diferença!",
    color: "from-blue-500 to-cyan-500",
    savings: "R$ 2.800/mês economizados"
  },
  {
    name: "Ana Costa",
    role: "Gerente de Projetos",
    avatar: "AC",
    rating: 5,
    text: "Melhor aplicativo de finanças que já usei. Os relatórios são incríveis e me ajudam a tomar decisões financeiras muito mais inteligentes.",
    color: "from-purple-500 to-indigo-500",
    savings: "R$ 4.200/mês economizados"
  },
  {
    name: "Carlos Oliveira",
    role: "Empresário",
    avatar: "CO",
    rating: 5,
    text: "Uso o CLARA tanto para minhas finanças pessoais quanto para minha empresa. A clareza que ele traz é incomparável!",
    color: "from-green-500 to-emerald-500",
    savings: "R$ 8.500/mês economizados"
  },
  {
    name: "Beatriz Lima",
    role: "Designer",
    avatar: "BL",
    rating: 5,
    text: "Além de funcional, o design é lindo! Uso todos os dias e finalmente consegui organizar minhas finanças de verdade.",
    color: "from-orange-500 to-amber-500",
    savings: "R$ 1.900/mês economizados"
  },
  {
    name: "Rafael Mendes",
    role: "Desenvolvedor",
    avatar: "RM",
    rating: 5,
    text: "Como dev, aprecio a atenção aos detalhes. O app é rápido, seguro e tem todas as features que eu preciso.",
    color: "from-indigo-500 to-violet-500",
    savings: "R$ 3.100/mês economizados"
  }
];

const features = [
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description: "Visualize seus gastos com gráficos detalhados e insights automáticos"
  },
  {
    icon: CreditCard,
    title: "Gestão de Cartões",
    description: "Controle todos seus cartões e faturas em um só lugar"
  },
  {
    icon: PiggyBank,
    title: "Metas de Economia",
    description: "Defina objetivos e acompanhe seu progresso em tempo real"
  },
  {
    icon: Target,
    title: "Planejamento Financeiro",
    description: "Crie orçamentos e compare com seus gastos reais"
  },
  {
    icon: Calendar,
    title: "Agenda Financeira",
    description: "Nunca mais esqueça de pagar uma conta com lembretes automáticos"
  },
  {
    icon: Bell,
    title: "Notificações Smart",
    description: "Receba alertas importantes sobre suas finanças"
  },
  {
    icon: Smartphone,
    title: "Acesso Mobile",
    description: "Gerencie suas finanças de qualquer lugar, a qualquer hora"
  },
  {
    icon: Lock,
    title: "Segurança Total",
    description: "Criptografia de ponta e proteção máxima dos seus dados"
  }
];

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar",
    features: [
      "Até 50 transações/mês",
      "2 cartões cadastrados",
      "Relatórios básicos",
      "Suporte por email"
    ],
    highlighted: false
  },
  {
    name: "Pro",
    price: "R$ 19,90",
    period: "/mês",
    description: "Para quem quer mais controle",
    features: [
      "Transações ilimitadas",
      "Cartões ilimitados",
      "Relatórios avançados",
      "Metas e planejamento",
      "Suporte prioritário",
      "Exportação de dados"
    ],
    highlighted: true,
    badge: "Mais Popular"
  },
  {
    name: "Premium",
    price: "R$ 39,90",
    period: "/mês",
    description: "Controle total das finanças",
    features: [
      "Tudo do Pro +",
      "Múltiplas contas",
      "Consultoria financeira",
      "API de integração",
      "Suporte 24/7",
      "Relatórios personalizados"
    ],
    highlighted: false
  }
];

const stats = [
  { value: "10.000+", label: "Usuários Ativos" },
  { value: "R$ 50M+", label: "Gerenciados" },
  { value: "4.9/5", label: "Avaliação" },
  { value: "99.9%", label: "Uptime" }
];

export default function VendasPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Search className="w-9 h-9 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">CLARA</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clareza Financeira</p>
            </div>
          </div>

          {/* Badge */}
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Mais de 10.000 pessoas já transformaram suas finanças
          </Badge>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Transforme sua vida financeira com{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              clareza total
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Controle suas finanças de forma simples, inteligente e segura. 
            Comece gratuitamente hoje mesmo e veja a diferença em 7 dias!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg rounded-xl border-2"
            >
              Ver Demonstração
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Grátis para sempre</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tudo que você precisa para ter{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              controle total
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Recursos poderosos que fazem a diferença no seu dia a dia
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-blue-500 to-purple-600 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mais de 10.000 pessoas já transformaram suas finanças
            </h3>
            <p className="text-xl text-white/90">
              Veja o que nossos usuários têm a dizer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    "{testimonial.text}"
                  </p>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {testimonial.savings}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Escolha o plano ideal para você
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Comece grátis e faça upgrade quando precisar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`border-2 shadow-xl hover:shadow-2xl transition-all ${plan.highlighted ? 'border-blue-500 scale-105' : 'border-gray-200 dark:border-gray-700'}`}>
              <CardContent className="p-8">
                {plan.badge && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 mb-4">
                    <Award className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                )}
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
                <Button
                  onClick={() => router.push("/login")}
                  className={`w-full py-6 rounded-xl font-semibold ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  Começar Agora
                </Button>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-blue-500 to-purple-600 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para transformar suas finanças?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão no controle total do seu dinheiro
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-6 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
          >
            Começar Gratuitamente Agora
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
          <p className="text-white/80 mt-6">
            🔒 Seus dados estão seguros e protegidos • Sem cartão de crédito necessário
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">CLARA</span>
          </div>
          <p className="text-gray-400 mb-4">
            Clareza Financeira para uma vida melhor
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
          <p className="text-gray-500 mt-6 text-sm">
            © 2024 CLARA - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
