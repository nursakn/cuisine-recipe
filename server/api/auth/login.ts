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

  console.log(body, body.username, body.password);

  const { rows } = await sql`
    SELECT Id, Username
    FROM users
    WHERE Username=${body.username} AND Password=${body.password}
  `;

  if (rows.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "User not found" 
    });
  }

  return rows[0];
});
