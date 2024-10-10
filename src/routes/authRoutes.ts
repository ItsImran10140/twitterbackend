import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = process.env.JWT_SECRET || "SUPER SECRET";

const router = Router();
const prisma = new PrismaClient();

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateAuthToken(tokenId: number): string {
  const jwtPayload = { tokenId };
  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

// Create a user , if it doesm;t exist,
// generate the emailToken and send it to their email
router.post("/login", async (req, res) => {
  const { email } = req.body;

  //   generate token
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
  );

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email },
            create: { email },
          },
        },
      },
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: "Couldn't start the authentication process." });
  }
});

router.post("/authentcate", async (req, res) => {
  const { email, emailToken } = req.body;
  console.log(email, emailToken);

  const dbEmailToke = await prisma.token.findUnique({
    where: {
      emailToken,
    },
    include: {
      user: true,
    },
  });
  console.log(dbEmailToke);
  if (!dbEmailToke || !dbEmailToke.valid) {
    res.sendStatus(401);
  }
  if (dbEmailToke!.expiration < new Date()) {
    res.status(401).json({ error: "Token Expired" });
  }
  if (dbEmailToke?.user?.email !== email) {
    res.sendStatus(401);
  }

  // Here we validate that the user is the owner of the email

  // generate on API taken

  const expiration = new Date(
    new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );

  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  // Invalidate the email
  await prisma.token.update({
    where: { id: dbEmailToke?.id },
    data: { valid: false },
  });

  // generate the JWT token
  const authToken = generateAuthToken(apiToken.id);

  res.json({ authToken });
});

export default router;
