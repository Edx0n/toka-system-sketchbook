import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    phone: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String,
      lowercase: true,
      trim: true
    },
    cpf: { 
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    cnpj: { 
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    address: {
      street: { type: String },
      number: { type: String },
      complement: { type: String },
      neighborhood: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String }
    },
    motorcycles: [{
      brand: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number },
      plate: { type: String },
      color: { type: String },
      mileage: { type: Number },
      vin: { type: String },
      isActive: { type: Boolean, default: true }
    }],
    notes: { type: String },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    totalServices: { 
      type: Number, 
      default: 0 
    },
    totalSpent: { 
      type: Number, 
      default: 0 
    },
    lastService: { 
      type: Date 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);

export default Client; 
