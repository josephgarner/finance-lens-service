import mongoose from "mongoose";
import { Transaction } from "../../types";

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  rawDescription: {
    type: String,
    required: true,
  },
  sanitizedDescription: {
    type: String,
    required: false,
  },
  account: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  vendor: {
    type: String,
    required: false,
  },
  credit: {
    type: Number,
    required: false,
  },
  debit: {
    type: Number,
    required: false,
  },
});

transactionSchema.statics.build = (attr: Transaction) => {
  return new transactionData(attr);
};

interface transactionModel extends mongoose.Model<any> {
  build(attr: Transaction): any;
}

const transactionData = mongoose.model<any, transactionModel>(
  "Transaction",
  transactionSchema
);

export { transactionData };
