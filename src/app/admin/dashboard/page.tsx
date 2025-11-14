"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  Calendar,
  Settings,
  LogOut,
  Download,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  transactions: number;
  lastAccess: string;
  status: "active" | "inactive";
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    // Verificar autenticação
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          router.replace("/admin/login");
          return false;
        }
        return true;
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        return false;
      }
    };

    if (!checkAuth()) return;

    // Simular carregamento de dados
    const loadData = setTimeout(() => {
      setStats({
        totalUsers: 1247,
        activeUsers: 892,
        totalRevenue: 45678.9,
        totalTransactions: 8934,
      });

      setUsers([
        {
          id: "1",
          name: "João Silva",
          email: "joao@email.com",
          balance: 5420.5,
          transactions: 45,
          lastAccess: "2024-01-15",
          status: "active",
        },
        {
          id: "2",
          name: "Maria Santos",
          email: "maria@email.com",
          balance: 8930.2,
          transactions: 67,
          lastAccess: "2024-01-14",
          status: "active",
        },
        {
          id: "3",
          name: "Pedro Costa",
          email: "pedro@email.com",
          balance: 3210.8,
          transactions: 23,
          lastAccess: "2024-01-10",
          status: "inactive",
        },
      ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadData);
  }, [router]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("adminToken");
      router.replace("/admin/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleExportData = () => {
    try {
      // Simular exportação de dados dos usuários para CSV
      const csvContent = "data:text/csv;charset=utf-8," +
        "ID,Nome,Email,Saldo,Transações,Último Acesso,Status\n" +
        users.map(user =>
          `${user.id},"${user.name}","${user.email}",${user.balance},${user.transactions},${user.lastAccess},${user.status}`
        ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "usuarios_clara.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      alert("Erro ao exportar dados. Tente novamente.");
    }
  };

  const handleViewUser = (user: User) => {
    // Simular visualização de detalhes do usuário
    alert(`Visualizando usuário: ${user.name}\nEmail: ${user.email}\nSaldo: R$ ${user.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\nTransações: ${user.transactions}\nÚltimo Acesso: ${new Date(user.lastAccess).toLocaleDateString("pt-BR")}\nStatus: ${user.status === "active" ? "Ativo" : "Inativo"}`);
  };

  const handleEditUser = (user: User) => {
    // Simular edição de usuário
    const newName = prompt("Novo nome:", user.name);
    if (newName && newName !== user.name) {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, name: newName } : u));
      alert("Usuário editado com sucesso!");
    }
  };

  const handleDeleteUser = (user: User) => {
    // Simular exclusão de usuário
    if (confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers - 1,
        activeUsers: user.status === "active" ? prev.activeUsers - 1 : prev.activeUsers,
      }));
      alert("Usuário excluído com sucesso!");
    }
  };

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
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  CLARA Admin
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Painel de Controle
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalUsers.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total de Usuários
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                +8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.activeUsers.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Usuários Ativos
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                +23%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              R$ {stats.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receita Total
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                +15%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalTransactions.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transações
            </p>
          </div>
        </div>

        {/* Tabela de Usuários */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Usuários Cadastrados
              </h2>
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar Dados
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Saldo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transações
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Último Acesso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        R$ {user.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {user.transactions}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.lastAccess).toLocaleDateString("pt-BR")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        {user.status === "active" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="Visualizar usuário"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                          title="Editar usuário"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Excluir usuário"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
