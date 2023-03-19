import { IMessage } from "@/models";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IMessage>) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: "Success" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default handler;
