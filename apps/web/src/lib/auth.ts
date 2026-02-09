import { NextRequest } from "next/server";
import { getApiKeyRecord } from "./db";

export async function authenticateRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  const apiKey = authHeader.slice(7);
  return getApiKeyRecord(apiKey);
}
