"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  CheckCircle2, 
  Star,
  TrendingUp,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Empreendedora",
    avatar: "MS",
    rating: 5,
    text: "O CLARA transformou completamente minha relação com dinheiro. Agora tenho controle total das minhas finanças!",
    color: "from-pink-500 to-rose-500"
  },
  {
    name: "João Santos",
    role: "Freelancer",
    avatar: "JS",
    rating: 5,
    text: "Finalmente consigo visualizar para onde meu dinheiro está indo. Interface intuitiva e recursos poderosos!",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Ana Costa",
    role: "Gerente de Projetos",
    avatar: "AC",
    rating: 5,
    text: "Melhor aplicativo de finanças que já usei. Os relatórios são incríveis e me ajudam a tomar decisões melhores.",
    color: "from-purple-500 to-indigo-500"
  }
];

const features = [
  {
    icon: TrendingUp,
    title: "Controle Total",
    description: "Acompanhe todas suas receitas e despesas em tempo real"
  },
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Seus dados protegidos com criptografia de ponta"
  },
  {
    icon: Zap,
    title: "Super Rápido",
    description: "Interface moderna e responsiva para uso diário"
  },
  {
    icon: Users,
    title: "+10mil Usuários",
    description: "Milhares de pessoas já transformaram suas finanças"
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Verificar se Supabase está configurado
    if (!isSupabaseConfigured()) {
      setError("Supabase não está configurado. Configure nas Integrações do Projeto.");
      return;
    }

    if (!supabase) {
      setError("Erro ao conectar com o Supabase.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        
        if (data.user) {
          router.push("/");
        }
      } else {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        });

        if (error) throw error;
        
        if (data.user) {
          router.push("/");
        }
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Side - Branding & Features */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CLARA</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clareza Financeira</p>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Mais de 10.000 usuários ativos
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Transforme sua vida financeira com{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  clareza total
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Controle suas finanças de forma simples, inteligente e segura. 
                Comece gratuitamente hoje mesmo!
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                O que nossos usuários dizem
              </h3>
              <div className="space-y-3">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.name} className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                          {testimonial.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              • {testimonial.role}
                            </span>
                          </div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            "{testimonial.text}"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login/Signup Form */}
          <div className="lg:sticky lg:top-8">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                {/* Alerta se Supabase não configurado */}
                {!isSupabaseConfigured() && (
                  <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                          Supabase não configurado
                        </p>
                        <p className="text-xs text-orange-800 dark:text-orange-200">
                          Configure o Supabase em <strong>Configurações → Integrações</strong> para fazer login.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle Login/Signup */}
                <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      isLogin
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      !isLogin
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    Criar Conta
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">
                        Nome Completo
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required={!isLogin}
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                      Senha
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading || !isSupabaseConfigured()}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {isLogin ? "Entrar na Plataforma" : "Criar Minha Conta Grátis"}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </form>

                {/* Benefits */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Grátis para sempre</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Sem cartão de crédito necessário</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Cancele quando quiser</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badge */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                🔒 Seus dados estão seguros e protegidos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
