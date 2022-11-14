export enum TransactionType {
  EXPENSE = "Expense",
  INCOME = "Income",
  TRANSFER = "Transfer",
}

export enum Bank {
  ING = "ING",
  INTERNAL = "INTERNAL",
}

export type Account = {
  userID?: string;
  accountName: string;
  accountType?: string;
  balance?: number;
  bank: Bank;
  balanceSince?: Date;
};

export type Transaction = {
  date: Date;
  userID?: string;
  rawDescription: string;
  sanitizedDescription?: string;
  account: string;
  type: TransactionType;
  category?: string;
  subcategory?: string;
  vendor?: string;
  credit: number;
  debit: number;
  balance: number;
};

export type Sanitization = {
  id?: string;
  userID?: string;
  keywords: string[];
  sanitizedDescription: string;
  type: TransactionType;
  category: string;
  subcategory?: string;
  vendor: string;
};

export type UploadFiles = {
  transactionRecord?: UploadFileDetails[];
};

export type UploadFileDetails = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};
