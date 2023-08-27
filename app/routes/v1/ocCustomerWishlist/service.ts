import { prisma } from "../../../db";

const getAll = async ({
  limit = 5,
  page = 1,
  customer_id = 0,
  product_id = 0,
}) => {
  let query: any = {};
  query = {
    skip: page - 1 != 0 ? limit * page : 0,
    take: Number(limit),
  };

  if (customer_id != 0 && product_id != 0) {
    query.where = {
      customer_id,
      product_id,
    };
  }
  return await prisma.oc_customer_wishlist.findMany(query);
};

const getById = async (id: number) => {};

const getByCustomer = async (customer_id: number) => {
  return await prisma.oc_customer_wishlist.findFirst({
    where: {
      customer_id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.oc_customer_wishlist.create({
    data: {
      customer_id: _body.customer_id,
      product_id: _body.product_id,
      date_added: new Date(),
    },
  });
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getByCustomer, getAll, add, update, removeOne, getById };
