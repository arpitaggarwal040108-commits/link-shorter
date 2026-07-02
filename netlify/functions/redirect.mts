import type { Config, Context } from "@netlify/functions";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { links } from "../../db/schema.js";

export default async (_req: Request, context: Context) => {
  const code = context.params.code;

  if (!code) {
    return new Response("Short URL not found.", { status: 404 });
  }

  const [link] = await db.select().from(links).where(eq(links.code, code)).limit(1);

  if (!link) {
    return new Response("Short URL not found.", { status: 404 });
  }

  context.waitUntil(
    db.update(links).set({ clicks: sql`${links.clicks} + 1` }).where(eq(links.code, code)),
  );

  return Response.redirect(link.url, 302);
};

export const config: Config = {
  path: "/s/:code",
};
