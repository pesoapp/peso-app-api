import { prisma } from "../../../db";
import { createHash } from "crypto";

const login = async (credential: string, password: string) => {
  const hashed = createHash("md5").update(password).digest("hex");
  return await prisma.$queryRawUnsafe<any[]>(
    "SELECT * FROM oc_customer WHERE (LOWER(username)='" +
      credential +
      "' OR telephone='" +
      credential +
      "' OR email='" +
      credential +
      "') AND (password = SHA1(CONCAT(salt, SHA1(CONCAT(salt, SHA1('" +
      password +
      "'))))) OR password='" +
      hashed +
      "') AND status = '1' AND approved = '1' ORDER BY customer_id DESC LIMIT 1"
  );
};

export default { login };
