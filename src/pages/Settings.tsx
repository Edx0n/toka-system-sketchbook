import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Save, 
  RefreshCw,
  Globe,
  Clock,
  Mail
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    // Configurações do Usuário
    user: {
      name: "João Silva",
      email: "joao@toka-system.com",
      phone: "(11) 99999-9999",
      role: "admin"
    },
    // Configurações Gerais
    general: {
      companyName: "TOKA-SYSTEM",
      timezone: "America/Sao_Paulo",
      language: "pt-BR",
      currency: "BRL"
    },
    // Configurações de Notificações
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      maintenanceReminders: true,
      lowStockAlerts: true,
      newOrderNotifications: true
    },
    // Configurações do Sistema
    system: {
      autoBackup: true,
      backupFrequency: "daily",
      maxFileSize: "10",
      sessionTimeout: "30",
      maintenanceMode: false
    }
  });

  const handleUserChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [field]: value
      }
    }));
  };

  const handleGeneralChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handleSystemChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Configurações salvas com sucesso!");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    toast.info("Configurações resetadas para os valores padrão");
  };

  return (
    <DashboardLayout currentPage="settings">
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Resetar
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Configurações do Usuário */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Perfil do Usuário
                </CardTitle>
                <CardDescription>Informações pessoais e preferências</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Nome Completo</Label>
                  <Input
                    id="userName"
                    value={settings.user.name}
                    onChange={(e) => handleUserChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={settings.user.email}
                    onChange={(e) => handleUserChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userPhone">Telefone</Label>
                  <Input
                    id="userPhone"
                    value={settings.user.phone}
                    onChange={(e) => handleUserChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userRole">Função</Label>
                  <Select value={settings.user.role} onValueChange={(value) => handleUserChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="mechanic">Mecânico</SelectItem>
                      <SelectItem value="assistant">Assistente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Configurações Gerais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Configurações Gerais
                </CardTitle>
                <CardDescription>Configurações básicas do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={settings.general.companyName}
                    onChange={(e) => handleGeneralChange("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select value={settings.general.timezone} onValueChange={(value) => handleGeneralChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                      <SelectItem value="America/Belem">Belém (GMT-3)</SelectItem>
                      <SelectItem value="America/Fortaleza">Fortaleza (GMT-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={settings.general.language} onValueChange={(value) => handleGeneralChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Select value={settings.general.currency} onValueChange={(value) => handleGeneralChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (R$)</SelectItem>
                      <SelectItem value="USD">Dólar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Configurações de Notificações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
                <CardDescription>Configure como receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por SMS</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações via SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lembretes de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Lembretes de manutenções agendadas</p>
                  </div>
                  <Switch
                    checked={settings.notifications.maintenanceReminders}
                    onCheckedChange={(checked) => handleNotificationChange("maintenanceReminders", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Estoque Baixo</Label>
                    <p className="text-sm text-muted-foreground">Alertas quando itens estiverem com estoque baixo</p>
                  </div>
                  <Switch
                    checked={settings.notifications.lowStockAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("lowStockAlerts", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novas Ordens</Label>
                    <p className="text-sm text-muted-foreground">Notificações de novas ordens de manutenção</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newOrderNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("newOrderNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Configurações do Sistema */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Sistema
                </CardTitle>
                <CardDescription>Configurações avançadas do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">Realizar backup automático dos dados</p>
                  </div>
                  <Switch
                    checked={settings.system.autoBackup}
                    onCheckedChange={(checked) => handleSystemChange("autoBackup", checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Frequência do Backup</Label>
                  <Select value={settings.system.backupFrequency} onValueChange={(value) => handleSystemChange("backupFrequency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Tamanho Máximo de Arquivo (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.system.maxFileSize}
                    onChange={(e) => handleSystemChange("maxFileSize", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.system.sessionTimeout}
                    onChange={(e) => handleSystemChange("sessionTimeout", e.target.value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Ativar modo manutenção do sistema</p>
                  </div>
                  <Switch
                    checked={settings.system.maintenanceMode}
                    onCheckedChange={(checked) => handleSystemChange("maintenanceMode", checked)}
                  />
                </div>
                {settings.system.maintenanceMode && (
                  <Badge variant="destructive" className="w-fit">
                    Sistema em Manutenção
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Informações do Sistema */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Informações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Versão</p>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Última Atualização</p>
                  <p className="text-sm text-muted-foreground">15/12/2024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant="default" className="w-fit">Online</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Licença</p>
                  <p className="text-sm text-muted-foreground">Ativa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 
