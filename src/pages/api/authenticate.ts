import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password } = req.body;
    // Supplied by the deployment environment — never hardcoded.
    const correctPassword = process.env.PAGE_PASSWORD;

    // Fail closed: if the env var is unset, nothing unlocks.
    if (correctPassword && password === correctPassword) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("authToken", "authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        }),
      );

      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
