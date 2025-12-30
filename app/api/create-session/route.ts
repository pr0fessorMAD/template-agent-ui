// app/api/create-session/route.ts
import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

const PROJECT_ID = "vertex-ai-rag-demo-467217";
const LOCATION = "us-central1";
const ENGINE_ID = "6634481749302706176";

export async function POST() {
  try {
    // ---- AUTH (Recommended) ----
    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    const res = await fetch(
      `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/reasoningEngines/${ENGINE_ID}:query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_method: "async_create_session",
          input: {
            user_id: "u_123",
          },
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const data = await res.json();

    return NextResponse.json({
      sessionId: data.output.id,
      raw: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
