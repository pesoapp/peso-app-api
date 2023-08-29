import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.oc_product.findMany({});
};

const getManyById = async (id: number[]) => {
  return await prisma.oc_product.findMany({
    where: {
      product_id: { in: id },
    },
  });
};

// FIX: Taking to long to respond
const getById = async (id: number) => {
  return await prisma.oc_product.findFirst({
    where: {
      product_id: id,
    },
  });
};

const getLocalProductById = async (product_id: number) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT p.image, p.product_id, pd.name AS name, " +
      "(SELECT price FROM oc_product_special ps " +
      "WHERE ps.product_id = p.product_id " +
      "AND ((ps.date_start = null OR " +
      "ps.date_start < convert_tz(utc_timestamp(),'-08:00','+0:00')) " +
      "AND (ps.date_end = null OR ps.date_end > convert_tz(utc_timestamp(),'-08:00','+0:00'))) " +
      "ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS special, p.price, " +
      "AVG(r1.rating) AS rating, p.quantity, pd.tag, p.viewed, pd.description, " +
      "p.seller_id, p.model FROM oc_product p LEFT JOIN oc_product_description pd " +
      "ON p.product_id = pd.product_id " +
      "LEFT JOIN oc_manufacturer m ON p.manufacturer_id = m.manufacturer_id " +
      "LEFT JOIN oc_review r1 ON r1.product_id = p.product_id where p.product_id=" +
      product_id +
      " " +
      "AND p.status = '1' AND p.date_available <= convert_tz(utc_timestamp(),'-08:00','+0:00') " +
      "GROUP BY p.image, p.product_id, pd.name, p.price, p.quantity, pd.tag, p.viewed, " +
      "pd.description, p.seller_id, p.model"
  );
};

const add = async (_body: any) => {};

const update = async (id: number, _body: any) => {};

const removeOne = async (id: number) => {};

export default {
  getLocalProductById,
  getManyById,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
