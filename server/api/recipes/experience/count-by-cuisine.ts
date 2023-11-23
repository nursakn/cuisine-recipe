import { sql } from "@vercel/postgres";

export default defineEventHandler<{ body: { userId: string, cuisineType: string } }>(async event => {
  const body = await readBody(event);

  const { rowCount } = await sql`
    SELECT *
    FROM cooked
    WHERE UserId=${body.userId} AND Images=${"{\"" + body.cuisineType + "\"}"};
  `

  return rowCount * 250;
});
