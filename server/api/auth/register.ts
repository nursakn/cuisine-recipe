import { sql } from "@vercel/postgres";
import { LoginRegisterDTO } from "~/server/typings";

export default defineEventHandler(async event => {
  const body = await readBody(event) as LoginRegisterDTO;

  if (!body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please fill out username and password" 
    });
  }

  const { rowCount } = await sql`SELECT * FROM users WHERE Username=${body.username};`

  if (rowCount > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists" 
    });
  }

  try {
    const userId = Math.round(Math.random() * 100000000)
    await sql`INSERT INTO users (Id, Username, Password) VALUES (${userId}, ${body.username}, ${body.password});`
    const { rows } = await sql`SELECT Id, Username FROM users WHERE Id = ${userId};`;

    return rows[0];
  } catch(e) {
    console.log(e);
  }
});
