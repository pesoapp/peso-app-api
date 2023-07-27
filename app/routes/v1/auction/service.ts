import { prisma } from "../../../db";

const getAll = async (_query: any) => {
  return await prisma.auction.findMany({
    include: {
      condition: true,
    },
  });
};

const getById = async (id: number) => {
  const temp = await prisma.auction.findFirst({
    where: {
      id,
    },
  });

  return temp;
};

// SELECT a.*,oc.firstname,oc.lastname,
//         FORMAT(a.price,2) as priceFormat,
//         FORMAT(a.buy_price,2) as buyPriceFormat,
//         LOWER(REPLACE(REPLACE(a.name,' ','-'),'/','-')) as href,
//         b.name as brandName,
//         CONCAT(addr.address_1,' ',addr.district,' ',addr.city) as fullAddress,
//         DATE_FORMAT(a.due_date,'%M %d, %Y') as due,
//         oc.picture as customer_picture
//         FROM auction a
//         left join oc_customer oc on a.customer_id=oc.customer_id
//         left join oc_product_brand b on a.brand_id=b.id
//         left join oc_address addr on oc.customer_id= addr.customer_id
//         where a.id=${id};
const add = async (_body: any, session: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getAll, add, update, removeOne, getById };
