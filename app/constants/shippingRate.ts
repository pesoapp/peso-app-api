import { IShippingRate } from "../interfaces";

const FLAT_RATE: IShippingRate = {
  name: "Standard Shipping Rate",
  code: "flat_rate",
  total: 0,
  value: "flat.flat",
  disable: false,
};

const CUSTOMER_HANDEL: IShippingRate = {
  name: "Customer handles shipping upon arrival",
  code: "customer_handel",
  total: 0,
  value: "cutomerhandle.flat",
  disable: false,
};

const STORE_PICKUP: IShippingRate = {
  name: "Pickup From Store",
  code: "store_pickup",
  total: 0,
  value: "pickup.pickup",
  disable: false,
};

const SPECIAL_DELIVERY: IShippingRate = {
  name: "Special Delivery",
  code: "special_del",
  total: 0,
  value: "special_del",
  disable: false,
};

export default { SPECIAL_DELIVERY, STORE_PICKUP, CUSTOMER_HANDEL, FLAT_RATE };
