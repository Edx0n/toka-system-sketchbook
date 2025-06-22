import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['admin', 'mecanico', 'atendente', 'gerente'],
    default: 'mecanico'
  },
  phone: { 
    type: String 
  },
  cpf: { 
    type: String,
    unique: true,
    sparse: true
  },
  avatar: { 
    type: String 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  specializations: [{
    type: String,
    enum: ['motor', 'eletrica', 'suspensao', 'freios', 'transmissao', 'geral']
  }],
  hourlyRate: {
    type: Number,
    default: 0
  },
  lastLogin: { 
    type: Date 
  },
  preferences: {
    theme: { 
      type: String, 
      enum: ['light', 'dark', 'auto'], 
      default: 'auto' 
    },
    language: { 
      type: String, 
      default: 'pt-BR' 
    }
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
