import { prisma } from "../../../db";

const getAll = async (query: any) => {
  return await prisma.oc_seller.findMany({});
};

const getManyBySeller = async (ids: number[]) => {
  return await prisma.oc_seller.findMany({
    where: {
      seller_id: { in: ids },
    },
  });
};


const getById = async (seller_id: number) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT s.seller_id, s.shop_name, concat('company/', fp.flagship_logo) as image, fp.theme_color FROM oc_seller s LEFT JOIN flagship_profile fp ON fp.seller_id = s.seller_id WHERE s.seller_id = " + seller_id + " LIMIT 1;"
  );
};

const add = async (_body: any) => { };

const update = async (filter: any, _body: any, session: any) => { };

const removeOne = async (id: number) => { };

export default { getManyBySeller, getAll, add, update, removeOne, getById };
