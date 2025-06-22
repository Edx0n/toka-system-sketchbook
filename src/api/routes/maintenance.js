import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Maintenance from "../models/Maintenance.js";
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

// GET /maintenance - Listar todas as manutenções
router.get("/", getUserFromToken, async (req, res) => {
  try {
    const { 
      status, 
      priority, 
      mechanic,
      search, 
      sortBy = 'schedule.scheduledDate', 
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    const filter = {};
    
    // Filtros opcionais
    if (status) filter.status = status;
    if (priority) filter['service.priority'] = priority;
    if (mechanic) filter.mechanic = new mongoose.Types.ObjectId(mechanic);
    if (search) {
      filter.$or = [
        { 'client.name': { $regex: search, $options: 'i' } },
        { 'motorcycle.brand': { $regex: search, $options: 'i' } },
        { 'motorcycle.model': { $regex: search, $options: 'i' } },
        { 'motorcycle.plate': { $regex: search, $options: 'i' } },
        { 'service.description': { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const maintenances = await Maintenance.find(filter)
      .populate('mechanic', 'name')
      .populate('createdBy', 'name')
      .populate('items.item', 'name code price')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Maintenance.countDocuments(filter);

    res.json({
      maintenances,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Erro ao buscar manutenções:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// GET /maintenance/:id - Buscar uma manutenção específica
router.get("/:id", getUserFromToken, async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id)
      .populate('mechanic', 'name')
      .populate('createdBy', 'name')
      .populate('items.item', 'name code price quantity');

    if (!maintenance) {
      return res.status(404).json({ message: "Manutenção não encontrada" });
    }

    res.json(maintenance);
  } catch (error) {
    console.error("Erro ao buscar manutenção:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// POST /maintenance - Criar nova manutenção
router.post("/", getUserFromToken, async (req, res) => {
  try {
    const { 
      client,
      motorcycle,
      service,
      schedule,
      mechanic,
      items,
      notes
    } = req.body;

    if (!client?.name || !client?.phone || !motorcycle?.brand || !motorcycle?.model || !service?.description || !schedule?.scheduledDate) {
      return res.status(400).json({ message: "Dados obrigatórios não fornecidos" });
    }

    const maintenance = new Maintenance({
      client,
      motorcycle,
      service,
      schedule,
      mechanic: mechanic ? new mongoose.Types.ObjectId(mechanic) : null,
      items: items || [],
      notes,
      createdBy: new mongoose.Types.ObjectId(req.userId)
    });

    const savedMaintenance = await maintenance.save();
    const populatedMaintenance = await Maintenance.findById(savedMaintenance._id)
      .populate('mechanic', 'name')
      .populate('createdBy', 'name')
      .populate('items.item', 'name code price');

    res.status(201).json(populatedMaintenance);
  } catch (error) {
    console.error("Erro ao criar manutenção:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// PUT /maintenance/:id - Atualizar manutenção
router.put("/:id", getUserFromToken, async (req, res) => {
  try {
    const { 
      client,
      motorcycle,
      service,
      schedule,
      mechanic,
      items,
      notes,
      diagnosis,
      recommendations,
      photos
    } = req.body;

    const updateData = {};
    if (client) updateData.client = client;
    if (motorcycle) updateData.motorcycle = motorcycle;
    if (service) updateData.service = service;
    if (schedule) updateData.schedule = schedule;
    if (mechanic !== undefined) updateData.mechanic = mechanic ? new mongoose.Types.ObjectId(mechanic) : null;
    if (items) updateData.items = items;
    if (notes !== undefined) updateData.notes = notes;
    if (diagnosis !== undefined) updateData.diagnosis = diagnosis;
    if (recommendations !== undefined) updateData.recommendations = recommendations;
    if (photos) updateData.photos = photos;

    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    .populate('mechanic', 'name')
    .populate('createdBy', 'name')
    .populate('items.item', 'name code price');

    if (!maintenance) {
      return res.status(404).json({ message: "Manutenção não encontrada" });
    }

    res.json(maintenance);
  } catch (error) {
    console.error("Erro ao atualizar manutenção:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// PATCH /maintenance/:id/status - Atualizar status da manutenção
router.patch("/:id/status", getUserFromToken, async (req, res) => {
  try {
    const { status, startDate, endDate, actualHours } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status é obrigatório" });
    }

    const updateData = { status };
    
    if (status === 'em_andamento' && startDate) {
      updateData['schedule.startDate'] = new Date(startDate);
    }
    
    if (status === 'concluida' && endDate) {
      updateData['schedule.endDate'] = new Date(endDate);
    }
    
    if (actualHours !== undefined) {
      updateData['service.actualHours'] = actualHours;
    }

    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    .populate('mechanic', 'name')
    .populate('createdBy', 'name')
    .populate('items.item', 'name code price');

    if (!maintenance) {
      return res.status(404).json({ message: "Manutenção não encontrada" });
    }

    res.json(maintenance);
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// DELETE /maintenance/:id - Deletar manutenção
router.delete("/:id", getUserFromToken, async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndDelete(req.params.id);

    if (!maintenance) {
      return res.status(404).json({ message: "Manutenção não encontrada" });
    }

    res.json({ message: "Manutenção deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar manutenção:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// GET /maintenance/stats/overview - Estatísticas das manutenções
router.get("/stats/overview", getUserFromToken, async (req, res) => {
  try {
    const stats = await Maintenance.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ["$status", "concluida"] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ["$status", "em_andamento"] }, 1, 0] } },
          scheduled: { $sum: { $cond: [{ $eq: ["$status", "agendada"] }, 1, 0] } },
          waitingParts: { $sum: { $cond: [{ $eq: ["$status", "aguardando_pecas"] }, 1, 0] } },
          totalRevenue: { $sum: "$costs.total" }
        }
      }
    ]);

    const statusStats = await Maintenance.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          revenue: { $sum: "$costs.total" }
        }
      }
    ]);

    const priorityStats = await Maintenance.aggregate([
      {
        $group: {
          _id: "$service.priority",
          count: { $sum: 1 }
        }
      }
    ]);

    // Manutenções de hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayMaintenances = await Maintenance.countDocuments({
      'schedule.scheduledDate': {
        $gte: today,
        $lt: tomorrow
      }
    });

    res.json({
      overview: stats[0] || { total: 0, completed: 0, inProgress: 0, scheduled: 0, waitingParts: 0, totalRevenue: 0 },
      status: statusStats,
      priority: priorityStats,
      today: todayMaintenances
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router; 
