import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  stock: { type: Number, required: true },
  picture_url: { type: String, required: true },
  price: { type: Number, required: true },
});

ProductSchema.virtual('id').get(function () {
  return this._id.toString();
});

ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});
