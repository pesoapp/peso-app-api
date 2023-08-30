import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.oc_address.findMany();
};

const getManyByCustomer = async (id: number) => {
  return await prisma.oc_address.findMany({
    where: {
      customer_id: id,
    },
  });
};

const getById = async (id: number) => {
  return await prisma.oc_address.findFirst({
    where: {
      address_id: id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.oc_address.create({
    data: {
      customer_id: _body.customer_id,
      firstname: _body.firstname,
      lastname: _body.lastname,
      company: _body.company,
      address_1: _body.address_1,
      address_2: _body.address_2,
      postcode: _body.postcode,
      city: _body.city,
      country_id: _body.country_id,
      custom_field: "",
      tracking_id: _body.tracking_id,
      district: _body.district,
      region: _body.region,
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getManyByCustomer, getById, getAll, add, update, removeOne };
