export enum TransactionType {
  EXPENSE = "Expense",
  INCOME = "Income",
  TRANSFER = "Transfer",
}

export enum Bank {
  ING = "ING",
}

export type Transaction = {
  date: Date;
  rawDescription: string;
  sanitizedDescription: string;
  account: string;
  type: TransactionType;
  category: string;
  vendor: string;
  credit: number;
  debit: number;
};

export type Sanitization = {
  id?: string;
  rawDescription: string;
  sanitizedDescription: string;
  type: TransactionType;
  category: string;
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
