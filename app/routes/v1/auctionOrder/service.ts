import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  const { limit = 5, page = 1 } = _query;
  return await prisma.auction_order.findMany({
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
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
      payment_country: ":payment_country,", // get country
      payment_country_id: _body.b_address.country_id,
      payment_zone: "0",
      payment_zone_id: _body.b_address.zone_id,
      payment_method: ":payment_method,",
      payment_code: ":payment_code,",
      shipping_firstname: ":shipping_firstname,",
      shipping_lastname: ":shipping_lastname,",
      shipping_company: ":shipping_company,",
      shipping_address_1: ":shipping_address_1,",
      shipping_address_2: ":shipping_address_2,",
      shipping_city: ":shipping_city,",
      shipping_postcode: ":shipping_postcode,",
      shipping_country: ":shipping_country,",
      shipping_country_id: 1,
      shipping_zone: ":shipping_zone,",
      shipping_zone_id: 1,
      shipping_method: ":shipping_method,",
      shipping_code: ":shipping_code",
      total: ":total,",
      payment_district: ":payment_district,",
      payment_region: ":payment_region,",
      shipping_district: ":shipping_district,",
      shipping_region: ":shipping_region,",
      ip: ":ip,",
      skip_shipping_insurance: 1,
      user_agent: "",
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
