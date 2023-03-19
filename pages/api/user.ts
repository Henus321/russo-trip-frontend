import { API_URL } from "@/constants";
import { IMessage, IUserData } from "@/models";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserData | IMessage>
) {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { jwt } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user = await strapiRes.json();
    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(200).json({ message: "You are not authorized!" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default handler;
