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

const getFreebies = async (
  product_id: number,
  seller_id: number[],
  branch_id: number[]
) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM seller_product_freebies WHERE product_id = " +
      product_id +
      " AND (seller_id IN (" +
      seller_id +
      ") OR branch_id IN (" +
      branch_id +
      ")) "
  );
};

const getDeductionsPerSeller = async (
  seller_id: number[],
  product_id: number,
  prioe: number
) => {
  const temp = await prisma.$queryRawUnsafe<any[]>(
    "SELECT sd.id,IFNULL(sdp.deduction_type,0) as deduction_type,sd.description, sdp.value, sd.date_from,sd.date_to, CASE WHEN (IFNULL(sdp.deduction_type,0)=0) THEN IFNULL(sdp.value,0) / 100  ELSE IFNULL(sdp.value,0) END AS  rate , DATE_FORMAT(sd.date_from, '%M %d %Y') as date_f,DATE_FORMAT(sd.date_to, '%M %d %Y') as date_t FROM seller_deductions sd  INNER JOIN  seller_deductions_product sdp  ON sd.id=sdp.deduction_id WHERE sd.seller_id IN (" +
      seller_id +
      ") AND sdp.product_id=" +
      product_id +
      "  AND  ( sd.date_from <=  DATE_FORMAT(convert_tz(utc_timestamp(),'-08:00','+0:00'),'%Y-%m-%d')  and sd.date_to >= DATE_FORMAT(convert_tz(utc_timestamp(),'-08:00','+0:00'),'%Y-%m-%d') )"
  );

  const parsed = temp.map((e: any) => {
    e.deduction_type = Number(e.deduction_type);
    e.pricePromoText =
      e["deduction_type"] == 0
        ? e["rate"] * 100 + "% OFF"
        : "₱" + e["rate"] + " OFF";
    e.datePromoText = `<div class='red-color'>Discounted from <b>" ${e.date_f}"</b><br> to <b>" ${e.date_t} "</b></div>`;
    e.commingsoon = 0;
    e.type = "radio";
    e.checked = false;
    return e;
  });

  const exclusiveFor = (
    await getExclusiveFor([...new Set(parsed.map((e: any) => e.id))])
  ).map((e: any) => {
    e.exclusive_for = null;
    if (e.exclusive_for == 1) e.exclusive_for = "landbank";
    if (e.exclusive_for == 2) e.exclusive_for = "4gives";

    return e;
  });

  const exclusiveForTemp = parsed.map((e: any) => {
    e.exclusiveFor = exclusiveFor.find((exclusive: any) => {
      return e.id == exclusive.deduction_id;
    }).exclusive_for;

    return e;
  });

  // different deduction
  // const future = await prisma.$queryRawUnsafe<any[]>(
  //   "SELECT sd.id,IFNULL(sdp.deduction_type,0) as deduction_type,sd.description, sdp.value, sd.date_from,sd.date_to, CASE WHEN (IFNULL(sdp.deduction_type,0)=0) THEN IFNULL(sdp.value,0) / 100  ELSE IFNULL(sdp.value,0) END AS  rate , DATE_FORMAT(sd.date_from, '%M %d %Y') as date_f,DATE_FORMAT(sd.date_to, '%M %d %Y') as date_t FROM seller_deductions sd  INNER JOIN  seller_deductions_product sdp  ON sd.id=sdp.deduction_id WHERE sd.seller_id IN (" +
  //     seller_id +
  //     ") AND sdp.product_id=" +
  //     product_id +
  //     " AND   ( sd.date_from >  DATE_FORMAT(convert_tz(utc_timestamp(),'-08:00','+0:00'),'%Y-%m-%d')  and  sd.date_to > DATE_FORMAT(convert_tz(utc_timestamp(),'-08:00','+0:00'),'%Y-%m-%d') )"
  // );
  return exclusiveForTemp;
};

const getExclusiveFor = async (deduction_id: number[]) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT sdp.deduction_id ,lp.exclusive_for FROM `latest_promo` lp INNER JOIN latest_promo_seller_list lpsl ON  lpsl.latest_promo_id=lp.id INNER JOIN lp_seller_promo_list lsp ON lsp.seller_list_id=lpsl.id INNER JOIN seller_deductions_product sdp ON sdp.deduction_id=lsp.deduction_id where sdp.deduction_id IN (" +
      deduction_id +
      ") and lp.status=1 LIMIT 1"
  );
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
  getDeductionsPerSeller,
  getFreebies,
  getLocalProductById,
  getManyById,
  getAll,
  add,
  update,
  removeOne,
  getById,
};
