import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    code: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      uppercase: true
    },
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    description: { 
      type: String 
    },
    category: {
      type: String,
      enum: [
        "lubrificantes", 
        "filtros", 
        "transmissao", 
        "freios", 
        "eletrica", 
        "motor", 
        "suspensao", 
        "pneus",
        "acessorios",
        "outros"
      ],
      required: true
    },
    brand: { 
      type: String,
      trim: true
    },
    model: { 
      type: String,
      trim: true
    },
    quantity: { 
      type: Number, 
      default: 0,
      min: 0
    },
    minQuantity: { 
      type: Number, 
      default: 5,
      min: 0
    },
    price: { 
      type: Number, 
      required: true,
      min: 0
    },
    costPrice: { 
      type: Number,
      min: 0
    },
    supplier: {
      name: { type: String },
      contact: { type: String },
      email: { type: String }
    },
    location: { 
      type: String,
      default: "Estoque Principal"
    },
    status: {
      type: String,
      enum: ["em_estoque", "estoque_baixo", "sem_estoque", "descontinuado"],
      default: "em_estoque"
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

// Middleware para atualizar status baseado na quantidade
ItemSchema.pre('save', function(next) {
  if (this.quantity <= 0) {
    this.status = 'sem_estoque';
  } else if (this.quantity <= this.minQuantity) {
    this.status = 'estoque_baixo';
  } else {
    this.status = 'em_estoque';
  }
  next();
});

const Item = mongoose.model("Item", ItemSchema);

export default Item; 
