import type { LinksItem } from "~/server/typings";

export function getRecipeIdFromUrl(links: LinksItem) {
  const url = new URL(links.self.href);
  const id = url.pathname.substring(16); // v2/api/...
  
  return id;
}