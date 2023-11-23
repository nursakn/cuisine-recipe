import { put } from "@vercel/blob"

export default defineEventHandler<{ body: {file: File} }>(async (event) => {
  const body = await readBody(event);
  console.log(body);

  const blob = await put(body.file.name, body.file, {
    access: "public",
  })

  return blob;
})
