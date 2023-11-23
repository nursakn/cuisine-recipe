import { sql } from "@vercel/postgres";

export default defineEventHandler<{ body: { userId: string } }>(async event => {
  const body = await readBody(event);

  const { rowCount } = await sql`
    SELECT *
    FROM cooked
    WHERE UserId=${body.userId};
  `

  return rowCount * 250;
});
