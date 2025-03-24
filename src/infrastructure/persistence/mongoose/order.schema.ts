import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  total: { type: Number, required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  ],
  createdAt: { type: Date, default: Date.now },
});

OrderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});
