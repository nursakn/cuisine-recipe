import { sql } from "@vercel/postgres";
import { FavoriteAddDTO } from "~/server/typings";

export default defineEventHandler(async event => {
  const body = await readBody(event) as FavoriteAddDTO;

  const { rows: favorites } = await sql`SELECT * FROM favorites WHERE UserId=${body.userId}`;
  console.log(favorites);
  return favorites;
});
