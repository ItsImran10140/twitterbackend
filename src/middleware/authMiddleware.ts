import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "SUPER SECRET";

type AuthRequest = Request & { user?: User };

export async function authenticationToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader?.split(" ")[1];
  if (!jwtToken) {
    res.sendStatus(401);
  }
  // decode the jwt token
  try {
    const payload = (await jwt.verify(jwtToken!, JWT_SECRET)) as {
      tokenId: number;
    };
    const dbToken = await prisma.token.findUnique({
      where: { id: payload.tokenId },
      include: { user: true },
    });
    if (!dbToken?.valid || dbToken.expiration < new Date()) {
      res.status(401).json({ error: "API token expired" });
    }
    // console.log(dbToken?.user);
    req.user = dbToken?.user;
  } catch (e) {
    res.sendStatus(401);
  }
  next();
}
