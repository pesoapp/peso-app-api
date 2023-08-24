import { prisma } from "../../../db";

const getAll = async ({
  limit = 5,
  page = 1,
  customer_id = 1,
  product_id = 1,
  p_type = 0,
}) => {
  let where: any = {};
  where.p_type = p_type;

  if (customer_id != 0) {
    where.customer_id = customer_id;
  }

  if (product_id != 0) {
    where.product_id = product_id;
  }

  return await prisma.product_views.findMany({
    where,
  });
};

const getById = async (id: number) => {
  return await prisma.product_views.findFirst({
    where: {
      id,
    },
  });
};

const add = async (_body: any) => {
  return await prisma.product_views.create({
    data: {
      customer_id: _body.customer_id,
      product_id: _body.product_id,
      ip: _body.ip,
      p_type: _body.p_type,
      date_viewed: new Date(),
    },
  });
  // if($row['cntid'] == 0){
  //     $stmt = $this->conn->prepare("INSERT INTO product_views
  //                                           SET customer_id = :customer_id, ip = :ip,p_type=:p_type,
  //                                               product_id=:product_id,date_viewed=convert_tz(utc_timestamp(),'-08:00','+0:00')");
  //     $stmt->bindValue(':customer_id', $customer_id);
  //     $stmt->bindValue(':ip', $_SERVER['REMOTE_ADDR']);
  //     $stmt->bindValue(':p_type', $p_type);
  //     $stmt->bindValue(':product_id', $product_id);
  //     $stmt->execute();
  // }else{
  //    $stmt = $this->conn->prepare("UPDATE product_views
  //                                           SET date_viewed=convert_tz(utc_timestamp(),'-08:00','+0:00')
  //                                         where customer_id = :customer_id
  //                                         AND product_id = :product_id and p_type=:p_type");
  //     $stmt->bindValue(':customer_id', $customer_id);
  //     $stmt->bindValue(':p_type', $p_type);
  //     $stmt->bindValue(':product_id', $product_id);
  //     $stmt->execute();
  // }
};

const update = async (id: number, _body: any) => {
  return await prisma.product_views.update({
    where: {
      id,
    },
    data: {
      date_viewed: new Date(),
    },
  });
};

const removeOne = async (id: number) => {};

export default { getAll, add, update, removeOne, getById };
