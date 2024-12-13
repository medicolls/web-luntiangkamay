import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
}, { timestamps: true });

const User = models.User || model('User', UserSchema, 'users'); // Explicitly use the 'users' collection

export default User;
