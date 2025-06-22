# Toka System API - Oficina de Motos

Backend completo para o sistema de gerenciamento de oficina de motos Toka System.

## 🚀 Funcionalidades

- ✅ Autenticação completa (registro, login, logout)
- ✅ Gerenciamento de usuários (mecânicos, atendentes, gerentes)
- ✅ Controle de estoque (peças e produtos)
- ✅ Gestão de manutenções
- ✅ Cadastro de clientes
- ✅ Controle de motos
- ✅ Filtros e busca avançada
- ✅ Estatísticas e relatórios
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Middleware de autenticação
- ✅ CORS configurado

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

## 🛠️ Instalação

1. Navegue até a pasta do backend:
```bash
cd src/api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env baseado no .env.example
cp .env.example .env
```

4. Inicie o servidor:
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `src/api/` com as seguintes variáveis:

```env
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/toka-system
JWT_SECRET=sua_chave_secreta_muito_segura
CORS_ORIGIN=http://localhost:3000
```

## 📚 Endpoints da API

### Autenticação

#### POST `/auth/register`
Registrar novo usuário.

**Body:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123",
  "role": "mecanico",
  "phone": "(11) 99999-9999",
  "specializations": ["motor", "eletrica"]
}
```

#### POST `/auth/login`
Fazer login.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

#### POST `/auth/logout`
Fazer logout.

#### GET `/auth/user`
Obter dados do usuário atual.

#### PUT `/auth/profile`
Atualizar perfil do usuário.

### Itens/Estoque

#### GET `/items`
Listar todos os itens do estoque.

**Query Parameters:**
- `category`: Filtrar por categoria
- `status`: Filtrar por status (em_estoque, estoque_baixo, sem_estoque)
- `search`: Buscar por nome, código ou descrição
- `sortBy`: Campo para ordenação
- `sortOrder`: Ordem (asc/desc)
- `page`: Página para paginação
- `limit`: Limite por página

#### GET `/items/:id`
Buscar item específico.

#### POST `/items`
Criar novo item.

**Body:**
```json
{
  "code": "PT-001",
  "name": "Óleo Motor 4T",
  "description": "Óleo para motor 4 tempos",
  "category": "lubrificantes",
  "brand": "Honda",
  "quantity": 15,
  "minQuantity": 5,
  "price": 35.90,
  "costPrice": 25.00,
  "supplier": {
    "name": "Fornecedor ABC",
    "contact": "(11) 88888-8888",
    "email": "contato@fornecedor.com"
  }
}
```

#### PUT `/items/:id`
Atualizar item.

#### DELETE `/items/:id`
Deletar item.

#### PATCH `/items/:id/stock`
Atualizar estoque.

**Body:**
```json
{
  "quantity": 10,
  "operation": "add" // add, remove, set
}
```

#### GET `/items/stats/overview`
Obter estatísticas do estoque.

### Manutenções

#### GET `/maintenance`
Listar todas as manutenções.

**Query Parameters:**
- `status`: Filtrar por status
- `priority`: Filtrar por prioridade
- `mechanic`: Filtrar por mecânico
- `search`: Buscar por cliente, moto ou serviço

#### GET `/maintenance/:id`
Buscar manutenção específica.

#### POST `/maintenance`
Criar nova manutenção.

**Body:**
```json
{
  "client": {
    "name": "João Silva",
    "phone": "(11) 99999-9999",
    "email": "joao@email.com"
  },
  "motorcycle": {
    "brand": "Honda",
    "model": "CG 160",
    "year": 2020,
    "plate": "ABC-1234",
    "mileage": 15000
  },
  "service": {
    "type": "revisao",
    "description": "Revisão 10.000km",
    "priority": "media",
    "estimatedHours": 2
  },
  "schedule": {
    "scheduledDate": "2024-01-15T10:00:00.000Z",
    "scheduledTime": "10:00"
  },
  "mechanic": "64f1a2b3c4d5e6f7g8h9i0j1",
  "items": [
    {
      "item": "64f1a2b3c4d5e6f7g8h9i0j2",
      "quantity": 1,
      "price": 35.90
    }
  ]
}
```

#### PUT `/maintenance/:id`
Atualizar manutenção.

#### PATCH `/maintenance/:id/status`
Atualizar status da manutenção.

**Body:**
```json
{
  "status": "em_andamento",
  "startDate": "2024-01-15T10:00:00.000Z",
  "actualHours": 2.5
}
```

#### DELETE `/maintenance/:id`
Deletar manutenção.

#### GET `/maintenance/stats/overview`
Obter estatísticas das manutenções.

### Outros

#### GET `/`
Informações da API.

#### GET `/health`
Health check da API.

## 🗄️ Modelos de Dados

### User (Funcionários)
```javascript
{
  name: String (obrigatório),
  email: String (único, obrigatório),
  password: String (obrigatório),
  role: String (admin/mecanico/atendente/gerente),
  phone: String,
  cpf: String (único),
  specializations: [String] (motor/eletrica/suspensao/freios/transmissao/geral),
  hourlyRate: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Item (Estoque)
```javascript
{
  code: String (único, obrigatório),
  name: String (obrigatório),
  description: String,
  category: String (lubrificantes/filtros/transmissao/freios/eletrica/motor/suspensao/pneus/acessorios/outros),
  brand: String,
  model: String,
  quantity: Number (padrão: 0),
  minQuantity: Number (padrão: 5),
  price: Number (obrigatório),
  costPrice: Number,
  supplier: { name, contact, email },
  location: String,
  status: String (em_estoque/estoque_baixo/sem_estoque/descontinuado),
  isActive: Boolean,
  createdBy: ObjectId (referência ao User),
  createdAt: Date,
  updatedAt: Date
}
```

### Maintenance (Manutenções)
```javascript
{
  client: {
    name: String (obrigatório),
    phone: String (obrigatório),
    email: String,
    cpf: String,
    address: String
  },
  motorcycle: {
    brand: String (obrigatório),
    model: String (obrigatório),
    year: Number,
    plate: String,
    color: String,
    mileage: Number,
    vin: String
  },
  service: {
    type: String (obrigatório),
    description: String (obrigatório),
    priority: String (baixa/media/alta/urgente),
    estimatedHours: Number,
    actualHours: Number
  },
  status: String (agendada/em_andamento/aguardando_pecas/concluida/cancelada),
  schedule: {
    scheduledDate: Date (obrigatório),
    scheduledTime: String,
    startDate: Date,
    endDate: Date
  },
  mechanic: ObjectId (referência ao User),
  items: [{
    item: ObjectId (referência ao Item),
    quantity: Number,
    price: Number,
    used: Boolean
  }],
  costs: {
    labor: Number,
    parts: Number,
    total: Number
  },
  notes: String,
  diagnosis: String,
  recommendations: String,
  photos: [String],
  createdBy: ObjectId (referência ao User),
  createdAt: Date,
  updatedAt: Date
}
```

### Client (Clientes)
```javascript
{
  name: String (obrigatório),
  phone: String (obrigatório),
  email: String,
  cpf: String (único),
  cnpj: String (único),
  address: {
    street: String,
    number: String,
    complement: String,
    neighborhood: String,
    city: String,
    state: String,
    zipCode: String
  },
  motorcycles: [{
    brand: String,
    model: String,
    year: Number,
    plate: String,
    color: String,
    mileage: Number,
    vin: String,
    isActive: Boolean
  }],
  notes: String,
  isActive: Boolean,
  totalServices: Number,
  totalSpent: Number,
  lastService: Date,
  createdBy: ObjectId (referência ao User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. O token é enviado via cookie HTTP-only ou no header Authorization.

**Header Authorization:**
```
Authorization: Bearer <token>
```

## 🚨 Tratamento de Erros

A API retorna erros padronizados:

```json
{
  "message": "Descrição do erro",
  "errors": ["Lista de erros de validação"]
}
```

**Códigos de Status:**
- `200`: Sucesso
- `201`: Criado
- `400`: Erro de validação
- `401`: Não autorizado
- `404`: Não encontrado
- `500`: Erro interno do servidor

## 🧪 Testando a API

### Com curl

**Registrar usuário:**
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Mecânico Teste","email":"mecanico@oficina.com","password":"123456","role":"mecanico"}'
```

**Fazer login:**
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mecanico@oficina.com","password":"123456"}' \
  -c cookies.txt
```

**Criar item:**
```bash
curl -X POST http://localhost:4000/items \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"code":"OL-001","name":"Óleo Motor 4T","category":"lubrificantes","price":35.90}'
```

### Com Postman/Insomnia

1. Configure a URL base: `http://localhost:4000`
2. Use as rotas documentadas acima
3. Para rotas protegidas, inclua o cookie de autenticação

## 📊 Estatísticas

A API fornece estatísticas detalhadas:

### Estoque
- Total de itens
- Valor total do estoque
- Itens com estoque baixo
- Itens sem estoque
- Distribuição por categoria

### Manutenções
- Total de manutenções
- Manutenções concluídas/em andamento
- Receita total
- Manutenções por status
- Manutenções por prioridade
- Manutenções de hoje

## 🔧 Desenvolvimento

### Estrutura de Pastas
```
src/api/
├── config/
│   ├── database.js
│   ├── config.js
│   └── local.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Item.js
│   ├── Maintenance.js
│   └── Client.js
├── routes/
│   ├── auth.js
│   ├── items.js
│   └── maintenance.js
├── server.js
├── package.json
└── README.md
```

### Scripts Disponíveis
- `npm start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor em desenvolvimento com nodemon

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. 
