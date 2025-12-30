// app/api/stream-query/route.ts
import { NextRequest } from "next/server";
import { GoogleAuth } from "google-auth-library";

const PROJECT_ID = "vertex-ai-rag-demo-467217";
const LOCATION = "us-central1";
const ENGINE_ID = "6634481749302706176";

export async function POST(req: NextRequest) {
  const { sessionId, message } = await req.json();

  // ---- AUTH (Recommended) ----
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  const upstream = await fetch(
    `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/reasoningEngines/${ENGINE_ID}:streamQuery?alt=sse`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        class_method: "async_stream_query",
        input: {
          user_id: "u_123",
          session_id: sessionId,
          message,
        },
      }),
    }
  );

  if (!upstream.body) {
    return new Response("No stream", { status: 500 });
  }

  // Pass-through SSE
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
