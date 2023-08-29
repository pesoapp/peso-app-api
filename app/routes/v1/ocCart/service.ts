import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  return await prisma.oc_cart.findMany({});
};

const getManyByCustomer = async (id: number) => {
  return await prisma.oc_cart.findMany({
    where: {
      customer_id: id,
    },
  });
};

const clearQuantity = async (customer_id: number) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "UPDATE oc_cart SET quantity = 1 WHERE customer_id = " +
      customer_id +
      " AND quantity < 0 AND seller_id IS NOT NULL;"
  );
};

const getByProduct = async (product_ids: number[], type: any) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM (SELECT DISTINCT p.product_id, p.price, pd.name AS name, p.image, p.status, 'reg' as `type`, p.model FROM oc_product p  LEFT JOIN oc_product_description pd ON(p.product_id = pd.product_id)  UNION All SELECT bg.product_id, bg.price, bg.product_name as name, bg.img as image, bg.status, 'bg' as `type`, bg.product_id as model FROM bg_product bg ) as pp  WHERE pp.status = 1 AND pp.product_id IN (" +
      product_ids +
      ") AND pp.type IN ('bg', 'reg');"
  );
};

const getQuantityByProduct = async (
  product_ids: number[],
  seller_ids: number[],
  branch_id: number[]
) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM seller_branch_selected_products WHERE product_id IN (" +
      product_ids +
      ") OR seller_id IN (" +
      seller_ids +
      ") OR branch_id IN (" +
      branch_id +
      ");"
  );
};

const getManySellerBranchById = async (ids: number[]) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM seller_branch where id IN (" + ids + ")"
  );
};

const getManySellerNamesById = async (ids: number[]) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT s.seller_id, s.shop_name, concat('company/', fp.flagship_logo) as image, fp.theme_color FROM oc_seller s LEFT JOIN flagship_profile fp ON fp.seller_id = s.seller_id WHERE s.seller_id IN (" +
      ids +
      ") LIMIT 1"
  );
};

const getManyProductDiscountById = async (ids: number[]) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM oc_product_discount WHERE product_id IN (" +
      ids +
      ") AND quantity > 1 AND ((date_start = null OR date_start < convert_tz(utc_timestamp(),'-08:00','+0:00')) AND (date_end = null OR date_end > convert_tz(utc_timestamp(),'-08:00','+0:00'))) ORDER BY quantity ASC, priority ASC, price ASC"
  );
};

const getById = async (id: number) => {
  return await prisma.oc_cart.findFirst({});
};

const add = async (_body: any) => {};

const update = async (id: number, _body: any) => {};

const removeOne = async (id: number) => {};

export default {
  getManyProductDiscountById,
  getManySellerNamesById,
  getManySellerBranchById,
  getQuantityByProduct,
  getByProduct,
  clearQuantity,
  getManyByCustomer,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
