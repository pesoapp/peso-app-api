import { prisma } from "../../../db";

const getAllActive = async () => {
  return await prisma.oc_customer.findMany({
    where: {
      live_video_status: true,
    },
  });
};

const setAddress = async (customer_id: number, address_id: number) => {
  return await prisma.oc_customer.update({
    where: {
      customer_id,
    },
    data: {
      address_id,
    },
  });
};

const getById = async (id: number) => {
  return await prisma.oc_customer.findFirst({
    where: {
      customer_id: id,
    },
  });
};

const getManyByCustomer = async (ids: number[]) => {
  return await prisma.oc_customer.findMany({
    where: {
      customer_id: { in: ids },
    },
  });
};

const toggleActiveStatus = async (customer_id: number, active: boolean) => {
  return await prisma.oc_customer.updateMany({
    where: {
      customer_id,
    },
    data: {
      live_video_status: active,
    },
  });
};

const getByEmail = async (email: string) => {
  return await prisma.oc_customer.findFirst({
    where: {
      email,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.oc_customer.create({
    data: {
      customer_group_id: _body,
      store_id: _body,
      firstname: _body,
      lastname: _body,
      b_day: _body,
      email: _body,
      telephone: _body,
      fax: _body,
      custom_field: _body,
      salt: _body,
      password: _body,
      newsletter: _body,
      ip: _body,
      status: _body,
      approved: _body,
      date_added: new Date(),
      username: _body,
      nexmo_code: _body,
      nexmo_status: _body,
      safe: _body,
      token: _body,
      a2sh_status: _body,
      fb_app_id: _body,
      type: _body,
    },
  });
};

const update = async (filter: any, _body: any) => {
  return await prisma.oc_customer.update({
    where: {
      customer_id: filter.id,
    },
    data: {
      firstname: _body.firstname,
      lastname: _body.lastname,
      b_day: _body.b_day,
      email: _body.email,
      telephone: _body.telephone,
    },
  });
};

const removeOne = async (filter: any, session: any) => {};

export default {
  setAddress,
  getByEmail,
  toggleActiveStatus,
  getManyByCustomer,
  getById,
  getAllActive,
  add,
  update,
  removeOne,
};
