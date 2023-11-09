import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  picture: string;
  bio?: string;
  portfolioWebsite?: string;
  location?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String, required: true },
  bio: { type: String },
  portfolioWebsite: { type: String },
  location: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const User = models.User || model("User", UserSchema);
export default User;
