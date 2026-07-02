import type { Config } from "@netlify/functions";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { links } from "../../db/schema.js";

const codeCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

function isValidUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function generateCode() {
  return Array.from({ length: 6 }, () => {
    return codeCharacters[Math.floor(Math.random() * codeCharacters.length)];
  }).join("");
}

async function createUniqueCode() {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = generateCode();
    const inserted = await db
      .insert(links)
      .values({ code, url: "pending" })
      .onConflictDoNothing()
      .returning({ code: links.code });

    if (inserted[0]) {
      return code;
    }
  }

  throw new Error("Unable to create a unique short code");
}

export default async (req: Request) => {
  if (req.method === "GET") {
    const allLinks = await db.select().from(links).orderBy(desc(links.createdAt));
    return json({ links: allLinks });
  }

  if (req.method === "POST") {
    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const url = typeof payload === "object" && payload !== null && "url" in payload ? payload.url : undefined;
    if (!isValidUrl(url)) {
      return json({ error: "Please enter a valid URL starting with http:// or https://." }, { status: 400 });
    }

    const code = await createUniqueCode();
    const [link] = await db.update(links).set({ url }).where(eq(links.code, code)).returning();
    const shortUrl = new URL(`/s/${code}`, req.url).toString();

    return json({ link, shortUrl }, { status: 201 });
  }

  return json({ error: "Method not allowed." }, { status: 405, headers: { allow: "GET, POST" } });
};

export const config: Config = {
  path: "/api/links",
};
