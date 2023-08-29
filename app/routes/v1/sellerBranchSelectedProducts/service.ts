import { prisma } from "../../../db";

const getAll = async ({ limit = 5, page = 1 }) => {
  const result = await prisma.$queryRawUnsafe<any[]>(
    " SELECT DISTINCT op.product_id, opd.name, " +
      "CONCAT('product/',LOWER(Replace(Replace(opd.name, ' ', '-'),'/', '-')),'/',op.product_id) " +
      "AS href, op.image, op.price, op.watermark, sbsp.seller_id, CONCAT('company/', os.image) AS " +
      "seller_image FROM seller_branch_selected_products AS sbsp INNER JOIN product_to_brand AS ptb " +
      "ON ptb.product_id = sbsp.product_id INNER JOIN oc_product_to_category AS optc ON " +
      "optc.product_id = sbsp.product_id INNER JOIN oc_product AS op ON op.product_id = sbsp.product_id " +
      "AND op.status = 1 INNER JOIN oc_product_description AS opd ON opd.product_id = sbsp.product_id " +
      "INNER JOIN oc_seller AS os ON os.seller_id = sbsp.seller_id AND os.status = 1 " +
      "LEFT JOIN seller_deductions_product AS sdp ON sdp.product_id = sbsp.product_id " +
      "LEFT JOIN seller_deductions AS sd ON sd.id = sdp.deduction_id AND " +
      "sd.seller_id = sbsp.seller_id WHERE sbsp.quantity > 0  ORDER BY RAND() " +
      "LIMIT " +
      `${page},` +
      `${limit}`
  );
  return result;
};

const getById = async (id: number) => {
  return await prisma.seller_branch_selected_products.findFirst({
    where: {
      id,
    },
  });
};

const getManyByProduct = async (product_id: number) => {
  return await prisma.seller_branch_selected_products.findMany({
    where: {
      quantity: {
        gt: 0,
      },
      product_id,
    },
  });
};

const getBranchQuantity = async (
  seller_id: number,
  product_id: number,
  branch_id: number
) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM seller_branch_selected_products where product_id = " +
      product_id +
      " AND seller_id = " +
      seller_id +
      " AND branch_id = " +
      branch_id +
      ""
  );
};

const getStoreList = async (store_id: number | null, product_id: number) => {
  if (store_id == null) {
    return await prisma.$queryRawUnsafe<any[]>(
      "SELECT os.seller_id,sb.b_name as shop_name,sbsp.branch_id, " +
        "sbsp.brand_id,opd.name,sbsp.quantity as qty, sb.branch_logo " +
        "as image, sb.live_demo_status FROM seller_branch_selected_products " +
        "sbsp INNER JOIN  oc_seller os  ON sbsp.seller_id=os.seller_id INNER JOIN " +
        "seller_branch sb ON sbsp.branch_id=sb.id INNER JOIN oc_product_brand opd " +
        "ON opd.id=sbsp.brand_id WHERE sbsp.quantity!=0 AND sbsp.product_id=" +
        product_id +
        " " +
        " order by sbsp.quantity desc "
    );
  }

  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT os.seller_id,sb.b_name as shop_name, sbsp.branch_id, " +
      "sbsp.brand_id,opd.name,sbsp.quantity as qty, sb.branch_logo " +
      "AS image, sb.live_demo_status FROM seller_branch_selected_products " +
      "sbsp INNER JOIN  oc_seller os  ON sbsp.seller_id=os.seller_id INNER JOIN " +
      "seller_branch sb ON sbsp.branch_id=sb.id INNER JOIN oc_product_brand opd ON " +
      "opd.id=sbsp.brand_id WHERE sbsp.quantity!=0 AND sbsp.product_id=" +
      product_id +
      " " +
      "AND os.seller_id=" +
      store_id +
      " order by sbsp.quantity desc"
  );
};

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default {
  getStoreList,
  getBranchQuantity,
  getManyByProduct,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
