import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Eye, Edit, Trash2, Calendar, Clock, User, Bike } from "lucide-react";
import { toast } from "sonner";

const MaintenanceList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<string | undefined>(undefined);

  // Dados mock de manutenções
  const mockMaintenances = [
    {
      id: "1",
      client: {
        name: "João Silva",
        phone: "(11) 99999-9999",
        email: "joao@email.com"
      },
      motorcycle: {
        brand: "Honda",
        model: "CG 160",
        year: 2020,
        plate: "ABC-1234",
        color: "Vermelha"
      },
      service: {
        type: "revisao",
        description: "Revisão 10.000km - Troca de óleo e filtros",
        priority: "media",
        estimatedHours: 2
      },
      status: "em_andamento",
      schedule: {
        scheduledDate: "2024-01-15",
        scheduledTime: "10:00",
        startDate: "2024-01-15T10:00:00"
      },
      mechanic: {
        id: "1",
        name: "Pedro Santos"
      },
      costs: {
        labor: 120.00,
        parts: 89.40,
        total: 209.40
      },
      items: [
        { name: "Óleo Motor 4T", quantity: 1, price: 35.90 },
        { name: "Filtro de Óleo CG 160", quantity: 1, price: 22.50 },
        { name: "Vela de Ignição", quantity: 1, price: 18.90 }
      ],
      createdAt: "2024-01-14T08:00:00"
    },
    {
      id: "2",
      client: {
        name: "Maria Santos",
        phone: "(11) 88888-8888",
        email: "maria@email.com"
      },
      motorcycle: {
        brand: "Yamaha",
        model: "Fazer 250",
        year: 2019,
        plate: "XYZ-5678",
        color: "Azul"
      },
      service: {
        type: "freios",
        description: "Troca de pastilhas de freio dianteiras e traseiras",
        priority: "alta",
        estimatedHours: 1.5
      },
      status: "agendada",
      schedule: {
        scheduledDate: "2024-01-16",
        scheduledTime: "14:00"
      },
      mechanic: {
        id: "2",
        name: "Carlos Oliveira"
      },
      costs: {
        labor: 90.00,
        parts: 90.00,
        total: 180.00
      },
      items: [
        { name: "Pastilha de Freio Dianteira", quantity: 1, price: 45.00 },
        { name: "Pastilha de Freio Traseira", quantity: 1, price: 45.00 }
      ],
      createdAt: "2024-01-14T10:30:00"
    },
    {
      id: "3",
      client: {
        name: "Roberto Lima",
        phone: "(11) 77777-7777",
        email: "roberto@email.com"
      },
      motorcycle: {
        brand: "Kawasaki",
        model: "Ninja 650",
        year: 2021,
        plate: "DEF-9012",
        color: "Verde"
      },
      service: {
        type: "suspensao",
        description: "Regulagem de suspensão e troca de amortecedores",
        priority: "baixa",
        estimatedHours: 3
      },
      status: "aguardando_pecas",
      schedule: {
        scheduledDate: "2024-01-17",
        scheduledTime: "09:00"
      },
      mechanic: {
        id: "1",
        name: "Pedro Santos"
      },
      costs: {
        labor: 180.00,
        parts: 450.00,
        total: 630.00
      },
      items: [
        { name: "Amortecedor Dianteiro", quantity: 1, price: 250.00 },
        { name: "Amortecedor Traseiro", quantity: 1, price: 200.00 }
      ],
      createdAt: "2024-01-13T15:45:00"
    },
    {
      id: "4",
      client: {
        name: "Ana Costa",
        phone: "(11) 66666-6666",
        email: "ana@email.com"
      },
      motorcycle: {
        brand: "Honda",
        model: "CB 300R",
        year: 2022,
        plate: "GHI-3456",
        color: "Branca"
      },
      service: {
        type: "eletrica",
        description: "Problema no sistema elétrico - não está dando partida",
        priority: "urgente",
        estimatedHours: 2.5
      },
      status: "concluida",
      schedule: {
        scheduledDate: "2024-01-14",
        scheduledTime: "08:00",
        startDate: "2024-01-14T08:00:00",
        endDate: "2024-01-14T10:30:00"
      },
      mechanic: {
        id: "3",
        name: "João Silva"
      },
      costs: {
        labor: 150.00,
        parts: 120.00,
        total: 270.00
      },
      items: [
        { name: "Bateria 12V", quantity: 1, price: 120.00 }
      ],
      createdAt: "2024-01-13T18:20:00"
    },
    {
      id: "5",
      client: {
        name: "Carlos Ferreira",
        phone: "(11) 55555-5555",
        email: "carlos@email.com"
      },
      motorcycle: {
        brand: "BMW",
        model: "R 1250 GS",
        year: 2020,
        plate: "JKL-7890",
        color: "Preta"
      },
      service: {
        type: "motor",
        description: "Diagnóstico de barulho anormal no motor",
        priority: "alta",
        estimatedHours: 4
      },
      status: "em_andamento",
      schedule: {
        scheduledDate: "2024-01-15",
        scheduledTime: "13:00",
        startDate: "2024-01-15T13:00:00"
      },
      mechanic: {
        id: "2",
        name: "Carlos Oliveira"
      },
      costs: {
        labor: 240.00,
        parts: 0,
        total: 240.00
      },
      items: [],
      createdAt: "2024-01-14T11:15:00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendada":
        return "bg-blue-100 text-blue-800";
      case "em_andamento":
        return "bg-yellow-100 text-yellow-800";
      case "aguardando_pecas":
        return "bg-orange-100 text-orange-800";
      case "concluida":
        return "bg-green-100 text-green-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "baixa":
        return "bg-green-100 text-green-800";
      case "media":
        return "bg-blue-100 text-blue-800";
      case "alta":
        return "bg-orange-100 text-orange-800";
      case "urgente":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "agendada":
        return "Agendada";
      case "em_andamento":
        return "Em Andamento";
      case "aguardando_pecas":
        return "Aguardando Peças";
      case "concluida":
        return "Concluída";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "baixa":
        return "Baixa";
      case "media":
        return "Média";
      case "alta":
        return "Alta";
      case "urgente":
        return "Urgente";
      default:
        return priority;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const filteredMaintenances = mockMaintenances.filter(maintenance => {
    const matchesSearch = 
      maintenance.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.motorcycle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.motorcycle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.motorcycle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || statusFilter === 'all' || maintenance.status === statusFilter;
    const matchesPriority = !priorityFilter || priorityFilter === 'all' || maintenance.service.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDelete = (id: string) => {
    toast.success("Manutenção removida com sucesso!");
  };

  const stats = {
    total: mockMaintenances.length,
    agendada: mockMaintenances.filter(m => m.status === "agendada").length,
    em_andamento: mockMaintenances.filter(m => m.status === "em_andamento").length,
    concluida: mockMaintenances.filter(m => m.status === "concluida").length,
    totalRevenue: mockMaintenances.reduce((sum, m) => sum + m.costs.total, 0)
  };

  return (
    <DashboardLayout currentPage="maintenance">
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Manutenções</h1>
            <p className="text-muted-foreground">Gerencie todas as manutenções da oficina</p>
          </div>
          <Button onClick={() => navigate("/maintenance/new")} className="gap-2">
            <Plus className="h-4 w-4" /> Nova Manutenção
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Manutenções</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.agendada}</div>
              <p className="text-xs text-muted-foreground">Aguardando</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.em_andamento}</div>
              <p className="text-xs text-muted-foreground">Trabalhando</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <Bike className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre as manutenções por critérios específicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Cliente, moto, placa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="agendada">Agendada</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="aguardando_pecas">Aguardando Peças</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as prioridades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter(undefined);
                    setPriorityFilter(undefined);
                  }}
                  className="w-full"
                >
                  <Filter className="h-4 w-4 mr-2" /> Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Manutenções</CardTitle>
            <CardDescription>
              {filteredMaintenances.length} manutenção{filteredMaintenances.length !== 1 ? 'ões' : ''} encontrada{filteredMaintenances.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Moto</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Mecânico</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaintenances.map((maintenance) => (
                  <TableRow key={maintenance.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{maintenance.client.name}</p>
                        <p className="text-sm text-muted-foreground">{maintenance.client.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{maintenance.motorcycle.brand} {maintenance.motorcycle.model}</p>
                        <p className="text-sm text-muted-foreground">{maintenance.motorcycle.plate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium text-sm">{maintenance.service.description}</p>
                        <p className="text-xs text-muted-foreground">{maintenance.service.estimatedHours}h estimadas</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(maintenance.status)}>
                        {getStatusText(maintenance.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(maintenance.service.priority)}>
                        {getPriorityText(maintenance.service.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{maintenance.mechanic.name}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{formatDate(maintenance.schedule.scheduledDate)}</p>
                        <p className="text-xs text-muted-foreground">{formatTime(maintenance.schedule.scheduledTime)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">R$ {maintenance.costs.total.toFixed(2)}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(maintenance.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MaintenanceList; 
