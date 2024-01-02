import { IPaymentMethod } from "../interfaces";

const COD: IPaymentMethod = {
  name: "Cash on Delivery",
  value: "cod",
  disable: false,
};

const BANK_TRANSFER: IPaymentMethod = {
  name: "Bank Transfer",
  value: "bank_transfer",
  disable: false,
};

const CPUP: IPaymentMethod = {
  name: "Cash Payment Upon Pickup",
  value: "cpup",
  disable: false,
};

const CREDIT_CARD: IPaymentMethod = {
  name: "Cards and Other Payment Method",
  value: "credit_card",
  disable: false,
};

const MAXX_PAYMENT: IPaymentMethod = {
  name: "BDO Card Installment",
  value: "maxx_payment",
  disable: false,
};

const LAND_BANK_PAY: IPaymentMethod = {
  name: "LANDBANKPay",
  value: "land_bank_pay",
  disable: false,
};

const FOUR_GIVES_PAY: IPaymentMethod = {
  name: "4Gives powerd by: AllBank",
  value: "4Gives_pay",
  disable: false,
};

const DEBIT_CARD: IPaymentMethod = {
  name: "All Banks - Debit Card Payments",
  value: "Debit_card",
  disable: false,
};

export default {
  COD,
  BANK_TRANSFER,
  CPUP,

  CREDIT_CARD,
  MAXX_PAYMENT,
  LAND_BANK_PAY,
  FOUR_GIVES_PAY,
  DEBIT_CARD,
};
