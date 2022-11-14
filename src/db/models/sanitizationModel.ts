import mongoose from "mongoose";
import { Sanitization } from "../../types";

const sanitizationSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  keywords: {
    type: Array,
    required: true,
  },
  sanitizedDescription: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  subcategory: {
    type: String,
    required: false,
  },
  vendor: {
    type: String,
    required: false,
  },
});

sanitizationSchema.statics.build = (attr: Sanitization) => {
  return new sanitizationModel(attr);
};

interface sanitizationModel extends mongoose.Model<any> {
  build(attr: Sanitization): any;
}

const sanitizationModel = mongoose.model<any, sanitizationModel>(
  "Sanitization",
  sanitizationSchema
);

export { sanitizationModel };
