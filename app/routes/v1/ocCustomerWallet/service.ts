import { prisma } from "../../../db";

const getAll = async () => {
  return await prisma.oc_customer_wallet.findMany();
};

const getById = async (id: number) => {
  return await prisma.oc_customer_wallet.findFirst({
    where: {
      id,
    },
  });
};

const getWalletInfo = async (order_id: string) => {
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT REPLACE(amount,'-','') amount,customer_id FROM oc_customer_wallet where SUBSTRING_INDEX(REPLACE(particulars,')',''), '#', - 1) = " +
      order_id +
      ""
  );
};

const add = async (_body: any) => {
  return await prisma.oc_customer_wallet.create({
    data: {
      customer_id: _body.customer_id,
      particulars: _body.particulars,
      amount: _body.amount,
      date_added: new Date(),
    },
  });
};

const updateStatus = async (filter: any) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "UPDATE oc_customer_wallet SET status='1' WHERE SUBSTRING_INDEX(REPLACE(particulars,')',''), '#', - 1)=" +
      filter.order_id +
      ""
  );
};

const cancelOrder = async (filter: any) => {
  return await prisma.$executeRawUnsafe<any[]>(
    "INSERT INTO oc_customer_wallet SET customer_id = " +
      filter.customer_id +
      ", particulars ='" +
      filter.particulars +
      "', amount = " +
      filter.amount +
      ", date_added = convert_tz(utc_timestamp(),'-08:00','+0:00'),status='1'"
  );
};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any) => {
  const { customer_id, particulars } = filter;
  return await prisma.$executeRawUnsafe<any[]>(
    "DELETE FROM oc_customer_wallet where customer_id = " +
      customer_id +
      " and particulars ='" +
      particulars +
      "' "
  );
};

export default {
  getById,
  getAll,
  updateStatus,
  cancelOrder,
  getWalletInfo,
  add,
  update,
  removeOne,
};
