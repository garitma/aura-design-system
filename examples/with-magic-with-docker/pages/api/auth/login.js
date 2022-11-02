import { Magic } from "@magic-sdk/admin";
import Iron from '@hapi/iron';

import { MAGIC_TOKEN, MAGIC_ENCRYPTION_SECRET } from "@utils/constants";
import CookieService from '@utils/cookie';


let magic = new Magic(MAGIC_TOKEN);

async function repository(req, res) {
  switch (req.method) {
    case "POST":
      const did = magic.utils.parseAuthorizationHeader(
        req.headers.authorization
      );
      const user = await magic.users.getMetadataByToken(did);

      const token = await Iron.seal(
        user,
        MAGIC_ENCRYPTION_SECRET,
        Iron.defaults,
      );
      CookieService.setTokenCookie(res, token);

      res.end();
      break;
    default: //Method Not Allowed
      res.status(405).end();
      break;
  }
}

export default repository;