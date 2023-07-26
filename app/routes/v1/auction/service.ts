import { sequelize } from "../../../db";

const getAll = async (_query: any) => {
  let query =
    "SELECT a.*, oc.firstname, oc.lastname, c.condition, FORMAT(a.price,2) AS priceFormat, LOWER(REPLACE(REPLACE(a.name,' ','-'),'/','-')) AS href, oc.picture AS customer_picture, DATE_FORMAT(a.due_date,'%M %d, %Y') AS due FROM `auction` a LEFT JOIN oc_customer oc ON a.customer_id=oc.customer_id LEFT JOIN `condition` c ON a.condition_id=c.id WHERE deleted_at IS NULL ";
  query += " ORDER BY RAND()";
  query += ` LIMIT ${_query.page - 1}, ${_query.limit}`;
  const [results, metadata] = await sequelize.query(query);

  return results;
};

const add = async (_body: any, session: any) => {};

const update = async (filter: any, _body: any, session: any) => {};

const removeOne = async (filter: any, session: any) => {};

export default { getAll, add, update, removeOne };
