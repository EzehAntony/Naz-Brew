import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true },
  purchased: { type: Number },
});

export default mongoose.models.item || mongoose.model("item", itemSchema);
