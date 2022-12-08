import { Magic } from "@magic-sdk/admin";
import Iron from "@hapi/iron";

import CookieService from "@utils/cookie";
import { MAGIC_TOKEN, MAGIC_ENCRYPTION_SECRET } from "@utils/constants";

let magic = new Magic(MAGIC_TOKEN);

async function repository(req, res) {
  let user;
  switch (req.method) {
    case "GET":
      user = await Iron.unseal(
        CookieService.getAuthToken(req.cookies),
        MAGIC_ENCRYPTION_SECRET,
        Iron.defaults
      );

      await magic.users.logoutByIssuer(user.issuer);
      CookieService.removeSession(res);

      res.writeHead(302, { Location: "/login" });
      res.end();
      break;
    default:
      //Method Not Allowed
      res.status(405).end();
      break;
  }
}

export default repository;
