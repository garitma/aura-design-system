import Iron from "@hapi/iron";
import CookieService from "@utils/cookie";
import { MAGIC_ENCRYPTION_SECRET } from "@utils/constants";

export default async (req, res) => {
  let user;
  try {
    user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      MAGIC_ENCRYPTION_SECRET,
      Iron.defaults
    );
  } catch (error) {
    res.status(401).end();
  }

  // now we have access to the data inside of user
  // and we could make database calls or just send back what we have
  // in the token.

  res.json(user);
};
