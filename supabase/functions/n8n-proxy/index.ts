import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN") ?? "*";
  return {
    "Access-Control-Allow-Origin": allowedOrigin === "*" ? "*" : origin === allowedOrigin ? origin : allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function jsonResponse(req: Request, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(req) });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed" }, 405);
  }

  const webhookUrl = Deno.env.get("N8N_WEBHOOK_URL");
  if (!webhookUrl) {
    return jsonResponse(req, { error: "N8N_WEBHOOK_URL is not configured" }, 500);
  }

  try {
    const body = await req.json();
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    let data: Record<string, unknown> = { response: "Workflow accepted." };
    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { response: responseText };
      }
    }

    if (!response.ok) {
      return jsonResponse(req, { error: "Workflow error", details: data }, response.status);
    }

    return jsonResponse(req, data);
  } catch {
    return jsonResponse(req, { error: "Unable to complete workflow request." }, 500);
  }
});
