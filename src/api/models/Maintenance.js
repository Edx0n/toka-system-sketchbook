import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema(
  {
    client: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      cpf: { type: String },
      address: { type: String }
    },
    motorcycle: {
      brand: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number },
      plate: { type: String },
      color: { type: String },
      mileage: { type: Number },
      vin: { type: String } // Número do chassi
    },
    service: {
      type: { type: String, required: true },
      description: { type: String, required: true },
      priority: {
        type: String,
        enum: ["baixa", "media", "alta", "urgente"],
        default: "media"
      },
      estimatedHours: { type: Number, default: 1 },
      actualHours: { type: Number }
    },
    status: {
      type: String,
      enum: ["agendada", "em_andamento", "aguardando_pecas", "concluida", "cancelada"],
      default: "agendada"
    },
    schedule: {
      scheduledDate: { type: Date, required: true },
      scheduledTime: { type: String },
      startDate: { type: Date },
      endDate: { type: Date }
    },
    mechanic: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    items: [{
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
      used: { type: Boolean, default: false }
    }],
    costs: {
      labor: { type: Number, default: 0 },
      parts: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    notes: { type: String },
    diagnosis: { type: String },
    recommendations: { type: String },
    photos: [{ type: String }],
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

// Middleware para calcular custos totais
MaintenanceSchema.pre('save', function(next) {
  // Calcular custo das peças
  const partsCost = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  this.costs.parts = partsCost;
  this.costs.total = this.costs.labor + partsCost;
  
  next();
});

const Maintenance = mongoose.model("Maintenance", MaintenanceSchema);

export default Maintenance; 
