
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Mock data for items
const mockItems = [
  { id: 1, code: "OL-001", name: "Óleo Motor 4T", category: "Lubrificantes", quantity: 15, price: 35.90, status: "Em estoque" },
  { id: 2, code: "FLT-002", name: "Filtro de Óleo CG 160", category: "Filtros", quantity: 8, price: 22.50, status: "Em estoque" },
  { id: 3, code: "PNR-003", name: "Corrente Retenção 520H", category: "Transmissão", quantity: 3, price: 189.90, status: "Estoque baixo" },
  { id: 4, code: "PNM-004", name: "Pastilha de Freio Dianteira", category: "Freios", quantity: 6, price: 45.00, status: "Em estoque" },
  { id: 5, code: "LON-005", name: "Lona de Freio Traseira", category: "Freios", quantity: 0, price: 58.70, status: "Sem estoque" },
  { id: 6, code: "VLA-006", name: "Vela de Ignição", category: "Elétrica", quantity: 12, price: 18.90, status: "Em estoque" },
];

const ItemsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter items based on search term
  const filteredItems = mockItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em estoque":
        return <Badge className="bg-green-500">Em estoque</Badge>;
      case "Estoque baixo":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Estoque baixo</Badge>;
      case "Sem estoque":
        return <Badge variant="destructive">Sem estoque</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout currentPage="items">
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Itens em Estoque</h1>
            <p className="text-muted-foreground">Gerencie os itens e peças da oficina</p>
          </div>
          <Button onClick={() => navigate("/items/new")}>
            <Plus className="mr-2 h-4 w-4" /> Novo Item
          </Button>
        </div>

        <div className="rounded-md border">
          <div className="p-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, código ou categoria..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="cursor-pointer hover:bg-muted" onClick={() => navigate(`/items/${item.id}`)}>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">R$ {item.price.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum item encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ItemsList;
