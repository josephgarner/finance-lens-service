import mongoose from "mongoose";
import { Account } from "../../types";

const accountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: false,
    default: 0,
  },
  bank: {
    type: String,
    required: false,
  },
  balanceSince: {
    type: Date,
    required: false,
  },
});

accountSchema.statics.build = (attr: Account) => {
  return new accountData(attr);
};

interface accountModel extends mongoose.Model<any> {
  build(attr: Account): any;
}

const accountData = mongoose.model<any, accountModel>("Account", accountSchema);

export { accountData };
