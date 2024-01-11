import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;
  return await prisma.auction_order.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  });
};

const getAllByIds = async (ids: number[]) => {
  return await prisma.auction_order.findMany({
    where: {
      id: { in: ids },
    },
  });
};

const getById = async (id: number) => {
  return await prisma.auction_order.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.auction_order.create({
    data: {
      invoice_prefix: "PCV-2019-00000",
      store_name: " PESOapp Gadget Mall",
      store_url: "https://pesoapp.ph/",
      custom_field: "https://pesoapp.ph/",
      payment_address_format: "",
      payment_custom_field: "[]",
      shipping_address_format: "",
      shipping_custom_field: "[]",
      comment: "",
      affiliate_id: 0,
      commission: 0.0,
      marketing_id: 0,
      tracking: "",
      language_id: 1,
      currency_id: 4,
      currency_code: "PHP",
      forwarded_ip: "",
      accept_language: "en-US,en;q=0.9",
      date_added: new Date(),
      date_modified: new Date(),
      customer_id: _body.customer.customer_id,
      firstname: _body.customer.firstname,
      lastname: _body.customer.lastname,
      email: _body.customer.email,
      telephone: _body.customer.telephone,
      fax: _body.customer.fax,
      payment_firstname: _body.b_address.firstname,
      payment_lastname: _body.b_address.lastname,
      payment_company: _body.b_address.company,
      payment_address_1: _body.b_address.address_1,
      payment_address_2: _body.b_address.address_2,
      payment_city: _body.b_address.city,
      payment_postcode: _body.b_address.postcode,
      payment_country: _body.b_country.name, // get country
      payment_country_id: _body.b_address.country_id,
      payment_zone: "0",
      payment_zone_id: _body.b_address.zone_id,
      payment_method: _body.paymentMethod.name,
      payment_code: _body.paymentMethod.value,
      shipping_firstname: _body.d_address.firstname,
      shipping_lastname: _body.d_address.lastname,
      shipping_company: _body.d_address.company,
      shipping_address_1: _body.d_address.address_1,
      shipping_address_2: _body.d_address.address_2,
      shipping_city: _body.d_address.city,
      shipping_postcode: _body.d_address.postcode,
      shipping_country: _body.d_country.name,
      shipping_country_id: _body.d_address.country_id,
      shipping_zone: "0",
      shipping_zone_id: _body.d_address.zone_id,
      shipping_method: _body.shippingMethod.name,
      shipping_code: _body.shippingMethod.code,
      total: _body.total,
      payment_district: _body.b_address.district,
      payment_region: _body.b_address.region,
      shipping_district: _body.b_address.district,
      shipping_region: _body.d_address.region,
      ip: _body.ip,
      skip_shipping_insurance: _body.useshipINs ?? 0,
      user_agent: _body.userAgent,
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, getAllByIds, add, update, removeOne, getById };
