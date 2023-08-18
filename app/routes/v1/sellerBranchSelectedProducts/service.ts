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

const add = async (_body: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
