import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Item from "../models/Item.js";

const router = express.Router();
const secret = "secret123";

// Middleware para obter usuário do token
const getUserFromToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
    
    const payload = jwt.verify(token, secret);
    req.userId = payload.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// GET /items - Listar todos os itens
router.get("/", getUserFromToken, async (req, res) => {
  try {
    const { 
      category, 
      status, 
      search, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    const filter = {};
    
    // Filtros opcionais
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const items = await Item.find(filter)
      .populate('createdBy', 'name')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments(filter);

    res.json({
      items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// GET /items/:id - Buscar um item específico
router.get("/:id", getUserFromToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('createdBy', 'name');

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    res.json(item);
  } catch (error) {
    console.error("Erro ao buscar item:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// POST /items - Criar novo item
router.post("/", getUserFromToken, async (req, res) => {
  try {
    const { 
      code, 
      name, 
      description, 
      category, 
      brand, 
      model,
      quantity, 
      minQuantity,
      price, 
      costPrice,
      supplier,
      location
    } = req.body;

    if (!code || !name || !category || !price) {
      return res.status(400).json({ message: "Código, nome, categoria e preço são obrigatórios" });
    }

    // Verificar se o código já existe
    const existingItem = await Item.findOne({ code });
    if (existingItem) {
      return res.status(400).json({ message: "Código já existe" });
    }

    const item = new Item({
      code,
      name,
      description,
      category,
      brand,
      model,
      quantity: quantity || 0,
      minQuantity: minQuantity || 5,
      price,
      costPrice,
      supplier,
      location,
      createdBy: new mongoose.Types.ObjectId(req.userId)
    });

    const savedItem = await item.save();
    const populatedItem = await Item.findById(savedItem._id)
      .populate('createdBy', 'name');

    res.status(201).json(populatedItem);
  } catch (error) {
    console.error("Erro ao criar item:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// PUT /items/:id - Atualizar item
router.put("/:id", getUserFromToken, async (req, res) => {
  try {
    const { 
      code, 
      name, 
      description, 
      category, 
      brand, 
      model,
      quantity, 
      minQuantity,
      price, 
      costPrice,
      supplier,
      location,
      isActive
    } = req.body;

    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (brand !== undefined) updateData.brand = brand;
    if (model !== undefined) updateData.model = model;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (minQuantity !== undefined) updateData.minQuantity = minQuantity;
    if (price !== undefined) updateData.price = price;
    if (costPrice !== undefined) updateData.costPrice = costPrice;
    if (supplier !== undefined) updateData.supplier = supplier;
    if (location !== undefined) updateData.location = location;
    if (isActive !== undefined) updateData.isActive = isActive;

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('createdBy', 'name');

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    res.json(item);
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// DELETE /items/:id - Deletar item
router.delete("/:id", getUserFromToken, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    res.json({ message: "Item deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// PATCH /items/:id/stock - Atualizar estoque
router.patch("/:id/stock", getUserFromToken, async (req, res) => {
  try {
    const { quantity, operation } = req.body; // operation: 'add', 'remove', 'set'

    if (!quantity || !operation) {
      return res.status(400).json({ message: "Quantidade e operação são obrigatórios" });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    let newQuantity = item.quantity;
    switch (operation) {
      case 'add':
        newQuantity += quantity;
        break;
      case 'remove':
        newQuantity = Math.max(0, newQuantity - quantity);
        break;
      case 'set':
        newQuantity = Math.max(0, quantity);
        break;
      default:
        return res.status(400).json({ message: "Operação inválida" });
    }

    item.quantity = newQuantity;
    const updatedItem = await item.save();
    const populatedItem = await Item.findById(updatedItem._id)
      .populate('createdBy', 'name');

    res.json(populatedItem);
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// GET /items/stats/overview - Estatísticas dos itens
router.get("/stats/overview", getUserFromToken, async (req, res) => {
  try {
    const stats = await Item.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          lowStock: {
            $sum: {
              $cond: [
                { $and: [{ $lte: ["$quantity", "$minQuantity"] }, { $gt: ["$quantity", 0] }] },
                1,
                0
              ]
            }
          },
          outOfStock: {
            $sum: {
              $cond: [{ $eq: ["$quantity", 0] }, 1, 0]
            }
          }
        }
      }
    ]);

    const categoryStats = await Item.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } }
        }
      }
    ]);

    const statusStats = await Item.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      overview: stats[0] || { total: 0, totalValue: 0, lowStock: 0, outOfStock: 0 },
      categories: categoryStats,
      status: statusStats
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router; 
