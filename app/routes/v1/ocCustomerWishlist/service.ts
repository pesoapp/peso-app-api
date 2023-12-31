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
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT cw.*, pp.price, pp.name, pp.img FROM (SELECT p.price, p.product_id, p.status, pd.name, p.image img FROM oc_product p LEFT JOIN oc_product_description pd ON pd.product_id = p.product_id UNION ALL SELECT bg.price, bg.product_id, bg.status, bg.product_name as `name`, bg.img FROM bg_product bg ) pp JOIN oc_customer_wishlist cw ON cw.product_id = pp.product_id WHERE cw.customer_id = " +
      customer_id +
      " AND pp.status = 1 ORDER BY cw.date_added DESC"
  );
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

const removeOne = async (filter: any) => {
  await prisma.$executeRawUnsafe(
    `DELETE FROM oc_customer_wishlist WHERE customer_id = ${filter.customer_id} AND product_id = ${filter.product_id}`
  );
};

export default { getByCustomer, getAll, add, update, removeOne, getById };
