// models/Progress.js
// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  
  completedLessons: { type: [String], default: [] },
  scores: { type: Map, of: Number, default: {} },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: { type: [String], default: [] },
  email: { type: String, required: true, unique: true },

  
});

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
