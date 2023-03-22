import { API_URL } from "@/constants";
import { IMessage, IUserData } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserData | IMessage>
) {
  if (req.method === "POST") {
    const { currentPassword, password, passwordConfirmation } = req.body;

    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { jwt } = cookie.parse(req.headers.cookie);
    const strapiRes = await fetch(`${API_URL}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        currentPassword,
        password,
        passwordConfirmation,
      }),
    });
    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default handler;
