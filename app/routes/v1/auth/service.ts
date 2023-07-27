import { prisma } from "../../../db";

const login = async (username: string) => {
  return await prisma.oc_customer.findFirst({
    where: {
      username,
    },
  });
};

export default { login };
