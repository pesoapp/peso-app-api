import { prisma } from "../../../db";

const getById = async (id: number) => {
  return await prisma.oc_country.findFirst({
    where: {
      country_id: id,
    },
  });
};

export default {
  getById,
};
