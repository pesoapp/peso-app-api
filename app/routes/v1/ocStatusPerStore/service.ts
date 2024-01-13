import { prisma } from "../../../db";

const getById = async (id: number) => {
  return await prisma.oc_country.findFirst({
    where: {
      country_id: id,
    },
  });
};
const updateStatus = async (filter: any) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "UPDATE order_status_per_store SET order_status_id=31 WHERE order_id=" +
      filter.order_id +
      ""
  );
};
export default {
  getById,
  updateStatus,
};
