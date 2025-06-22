import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const NewMaintenance = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState({
    client: {
      name: "",
      phone: "",
      email: "",
      cpf: ""
    },
    motorcycle: {
      brand: undefined,
      model: "",
      year: "",
      plate: "",
      color: "",
      mileage: ""
    },
    service: {
      type: undefined,
      description: "",
      priority: "media",
      estimatedHours: "1"
    },
    schedule: {
      scheduledDate: "",
      scheduledTime: ""
    },
    mechanic: undefined,
    items: [],
    notes: ""
  });

  const [newItem, setNewItem] = useState({
    item: "",
    quantity: "1",
    price: ""
  });

  // Dados mock para simulação
  const mockMechanics = [
    { id: "1", name: "João Silva", specializations: ["motor", "eletrica"] },
    { id: "2", name: "Pedro Santos", specializations: ["suspensao", "freios"] },
    { id: "3", name: "Carlos Oliveira", specializations: ["transmissao", "geral"] }
  ];

  const mockItems = [
    { id: "1", code: "OL-001", name: "Óleo Motor 4T", price: 35.90, quantity: 15 },
    { id: "2", code: "FLT-002", name: "Filtro de Óleo CG 160", price: 22.50, quantity: 8 },
    { id: "3", code: "PNR-003", name: "Corrente Retenção 520H", price: 189.90, quantity: 3 },
    { id: "4", code: "PNM-004", name: "Pastilha de Freio Dianteira", price: 45.00, quantity: 6 },
    { id: "5", code: "VLA-006", name: "Vela de Ignição", price: 18.90, quantity: 12 }
  ];

  const handleChange = (section: string, field: string, value: string) => {
    setMaintenanceData(prev => {
      const sectionData = prev[section as keyof typeof prev] as Record<string, any>;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value === "" ? undefined : value
        }
      };
    });
  };

  const handleServiceChange = (field: string, value: string) => {
    setMaintenanceData(prev => ({
      ...prev,
      service: {
        ...prev.service,
        [field]: value === "" ? undefined : value
      }
    }));
  };

  const handleScheduleChange = (field: string, value: string) => {
    setMaintenanceData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value === "" ? undefined : value
      }
    }));
  };

  const addItem = () => {
    if (!newItem.item || !newItem.quantity || !newItem.price) {
      toast.error("Preencha todos os campos do item");
      return;
    }

    const selectedItem = mockItems.find(item => item.id === newItem.item);
    if (!selectedItem) return;

    const itemToAdd = {
      id: Date.now().toString(),
      itemId: newItem.item,
      name: selectedItem.name,
      code: selectedItem.code,
      quantity: parseInt(newItem.quantity),
      price: parseFloat(newItem.price),
      total: parseInt(newItem.quantity) * parseFloat(newItem.price)
    };

    setMaintenanceData(prev => ({
      ...prev,
      items: [...prev.items, itemToAdd]
    }));

    setNewItem({ item: "", quantity: "1", price: "" });
    toast.success("Item adicionado");
  };

  const removeItem = (itemId: string) => {
    setMaintenanceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Manutenção agendada com sucesso!");
      setIsSubmitting(false);
      navigate("/maintenance");
    }, 1000);
  };

  const calculateTotal = () => {
    return maintenanceData.items.reduce((total, item) => total + item.total, 0);
  };

  return (
    <DashboardLayout currentPage="maintenance">
      <div className="animate-fade-in">
        <div className="flex items-center mb-6 gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/maintenance")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-1">Nova Manutenção</h1>
            <p className="text-muted-foreground">Agende uma nova manutenção para um cliente</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Dados do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle>Dados do Cliente</CardTitle>
                <CardDescription>Informações do proprietário da moto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome *</Label>
                    <Input
                      id="clientName"
                      value={maintenanceData.client.name}
                      onChange={(e) => handleChange("client", "name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Telefone *</Label>
                    <Input
                      id="clientPhone"
                      value={maintenanceData.client.phone}
                      onChange={(e) => handleChange("client", "phone", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={maintenanceData.client.email}
                      onChange={(e) => handleChange("client", "email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientCpf">CPF</Label>
                    <Input
                      id="clientCpf"
                      value={maintenanceData.client.cpf}
                      onChange={(e) => handleChange("client", "cpf", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados da Moto */}
            <Card>
              <CardHeader>
                <CardTitle>Dados da Moto</CardTitle>
                <CardDescription>Informações do veículo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="motorcycleBrand">Marca *</Label>
                    <Select value={maintenanceData.motorcycle.brand} onValueChange={(value) => handleChange("motorcycle", "brand", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a marca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Honda">Honda</SelectItem>
                        <SelectItem value="Yamaha">Yamaha</SelectItem>
                        <SelectItem value="Kawasaki">Kawasaki</SelectItem>
                        <SelectItem value="Suzuki">Suzuki</SelectItem>
                        <SelectItem value="BMW">BMW</SelectItem>
                        <SelectItem value="Ducati">Ducati</SelectItem>
                        <SelectItem value="Harley-Davidson">Harley-Davidson</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motorcycleModel">Modelo *</Label>
                    <Input
                      id="motorcycleModel"
                      value={maintenanceData.motorcycle.model}
                      onChange={(e) => handleChange("motorcycle", "model", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="motorcycleYear">Ano</Label>
                    <Input
                      id="motorcycleYear"
                      type="number"
                      value={maintenanceData.motorcycle.year}
                      onChange={(e) => handleChange("motorcycle", "year", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motorcyclePlate">Placa</Label>
                    <Input
                      id="motorcyclePlate"
                      value={maintenanceData.motorcycle.plate}
                      onChange={(e) => handleChange("motorcycle", "plate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motorcycleColor">Cor</Label>
                    <Input
                      id="motorcycleColor"
                      value={maintenanceData.motorcycle.color}
                      onChange={(e) => handleChange("motorcycle", "color", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motorcycleMileage">Quilometragem</Label>
                  <Input
                    id="motorcycleMileage"
                    type="number"
                    value={maintenanceData.motorcycle.mileage}
                    onChange={(e) => handleChange("motorcycle", "mileage", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Serviço */}
            <Card>
              <CardHeader>
                <CardTitle>Serviço</CardTitle>
                <CardDescription>Detalhes do serviço a ser realizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Tipo de Serviço *</Label>
                    <Select value={maintenanceData.service.type} onValueChange={(value) => handleServiceChange("type", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revisao">Revisão</SelectItem>
                        <SelectItem value="troca_oleo">Troca de Óleo</SelectItem>
                        <SelectItem value="freios">Sistema de Freios</SelectItem>
                        <SelectItem value="suspensao">Suspensão</SelectItem>
                        <SelectItem value="eletrica">Elétrica</SelectItem>
                        <SelectItem value="motor">Motor</SelectItem>
                        <SelectItem value="transmissao">Transmissão</SelectItem>
                        <SelectItem value="diagnostico">Diagnóstico</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="servicePriority">Prioridade</Label>
                    <Select value={maintenanceData.service.priority} onValueChange={(value) => handleServiceChange("priority", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Descrição *</Label>
                  <Textarea
                    id="serviceDescription"
                    value={maintenanceData.service.description}
                    onChange={(e) => handleServiceChange("description", e.target.value)}
                    placeholder="Descreva o serviço a ser realizado..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedHours">Horas Estimadas</Label>
                    <Input
                      id="estimatedHours"
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={maintenanceData.service.estimatedHours}
                      onChange={(e) => handleServiceChange("estimatedHours", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mechanic">Mecânico Responsável</Label>
                    <Select value={maintenanceData.mechanic} onValueChange={(value) => setMaintenanceData(prev => ({ ...prev, mechanic: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o mecânico" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockMechanics.filter(m => !!m.id).map(mechanic => (
                          <SelectItem key={mechanic.id} value={mechanic.id}>
                            {mechanic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agendamento */}
            <Card>
              <CardHeader>
                <CardTitle>Agendamento</CardTitle>
                <CardDescription>Data e horário do serviço</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Data *</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={maintenanceData.schedule.scheduledDate}
                      onChange={(e) => handleScheduleChange("scheduledDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduledTime">Horário</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={maintenanceData.schedule.scheduledTime}
                      onChange={(e) => handleScheduleChange("scheduledTime", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    value={maintenanceData.notes}
                    onChange={(e) => setMaintenanceData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Observações adicionais..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Itens Utilizados */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Itens Utilizados</CardTitle>
              <CardDescription>Peças e produtos que serão utilizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Adicionar Item */}
                <div className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="itemSelect">Item</Label>
                    <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, item: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o item" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockItems.filter(item => !!item.id).map(item => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.code} - {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemQuantity">Quantidade</Label>
                    <Input
                      id="itemQuantity"
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemPrice">Preço Unit.</Label>
                    <Input
                      id="itemPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={addItem} className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Adicionar
                    </Button>
                  </div>
                </div>

                {/* Lista de Itens */}
                {maintenanceData.items.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Itens Selecionados:</h4>
                    <div className="space-y-2">
                      {maintenanceData.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.code}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">Qtd: {item.quantity}</span>
                            <span className="text-sm">R$ {item.price.toFixed(2)}</span>
                            <span className="font-medium">R$ {item.total.toFixed(2)}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end p-3 border-t">
                      <span className="text-lg font-bold">
                        Total: R$ {calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <CardFooter className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={() => navigate("/maintenance")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? "Salvando..." : (
                <>
                  <Save className="h-4 w-4" /> Agendar Manutenção
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewMaintenance; 
