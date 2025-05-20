
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Motorcycle, Tool, Wrench, ShoppingBag, Calendar, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for the chart
const serviceData = [
  { name: "Jan", value: 12 },
  { name: "Fev", value: 19 },
  { name: "Mar", value: 15 },
  { name: "Abr", value: 22 },
  { name: "Mai", value: 28 },
  { name: "Jun", value: 25 },
];

const DashboardCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  iconColor 
}: { 
  title: string, 
  value: string, 
  description: string, 
  icon: React.ReactNode, 
  iconColor: string 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`w-8 h-8 ${iconColor} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <DashboardLayout currentPage="dashboard">
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel de controle da oficina TOKA-SYSTEM
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Manutenções Hoje"
            value="7"
            description="3 em andamento, 4 agendadas"
            icon={<Wrench className="h-4 w-4 text-white" />}
            iconColor="bg-toka-primary"
          />
          <DashboardCard
            title="Motos na Oficina"
            value="5"
            description="2 aguardando peças"
            icon={<Motorcycle className="h-4 w-4 text-white" />}
            iconColor="bg-toka-secondary"
          />
          <DashboardCard
            title="Itens em Estoque"
            value="143"
            description="12 itens com estoque baixo"
            icon={<ShoppingBag className="h-4 w-4 text-white" />}
            iconColor="bg-toka-tertiary"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Serviços Realizados</CardTitle>
              <CardDescription>Histórico dos últimos meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="col-span-1 grid gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Próximos Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 bg-toka-softPurple p-2 rounded-md">
                      <Calendar className="h-4 w-4 text-toka-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Honda CG 160</h4>
                      <p className="text-sm text-muted-foreground">Revisão 10.000km - Hoje às 10:00</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 bg-toka-softPurple p-2 rounded-md">
                      <Calendar className="h-4 w-4 text-toka-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Yamaha Fazer 250</h4>
                      <p className="text-sm text-muted-foreground">Troca de Óleo - Hoje às 14:30</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 bg-toka-softPurple p-2 rounded-md">
                      <Calendar className="h-4 w-4 text-toka-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Kawasaki Z900</h4>
                      <p className="text-sm text-muted-foreground">Ajuste de Suspensão - Amanhã às 09:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-toka-softBlue p-2 rounded-full">
                      <Users className="h-4 w-4 text-toka-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">5 Mecânicos Disponíveis</p>
                      <p className="text-xs text-muted-foreground">2 em serviço externo</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
