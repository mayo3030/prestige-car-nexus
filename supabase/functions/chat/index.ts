import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.2";

const SYSTEM_PROMPT = `You are a concise virtual assistant for Jersey Auto Lease, a New Jersey auto broker. Help customers with inventory, lease and finance quote steps, trade-in intake, delivery timing, and scheduling a broker call. If the request needs pricing confirmation, credit review, or personal data, ask the customer to submit the website form so staff can follow up.`;

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

function fallbackReply(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("finance") || lower.includes("payment") || lower.includes("approved")) {
    return "I can help with financing steps. Use the financing form with your target vehicle, down payment, term, and contact details so the broker desk can review the quote.";
  }
  if (lower.includes("sell") || lower.includes("trade")) {
    return "For trade-in or sale review, submit the Sell Your Car form with make, model, year, mileage, asking price, and condition notes. Staff can then review it in the pipeline.";
  }
  return "Thanks for contacting Jersey Auto Lease. Tell me the vehicle, budget, preferred monthly payment, and delivery location, or submit the contact form for broker follow-up.";
}

async function storeMessage(sessionId: string, role: "user" | "assistant", content: string) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return;

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data: existing } = await supabase
    .from("conversations")
    .select("id")
    .eq("session_id", sessionId)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  let conversationId = existing?.id as string | undefined;
  if (!conversationId) {
    const { data: created } = await supabase
      .from("conversations")
      .insert({ session_id: sessionId, source: "website", status: "active" })
      .select("id")
      .maybeSingle();
    conversationId = created?.id as string | undefined;
  }

  if (conversationId) {
    await supabase.from("messages").insert({ conversation_id: conversationId, role, content });
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(req) });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const sessionId = typeof body.session_id === "string" ? body.session_id.trim().slice(0, 120) : "";
    const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];

    if (!message || message.length > 2000) {
      return jsonResponse(req, { error: "Message must be between 1 and 2000 characters." }, 400);
    }
    if (!sessionId || !/^[a-zA-Z0-9_-]+$/.test(sessionId)) {
      return jsonResponse(req, { error: "Invalid session id." }, 400);
    }

    await storeMessage(sessionId, "user", message);

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    let reply = fallbackReply(message);

    if (lovableApiKey) {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((item) => ({
              role: item.role === "assistant" ? "assistant" : "user",
              content: String(item.content ?? "").slice(0, 2000),
            })),
            { role: "user", content: message },
          ],
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        reply = data?.choices?.[0]?.message?.content ?? reply;
      }
    }

    const needsHuman = /finance|payment|approved|sell|trade|call|broker|quote/i.test(message);
    await storeMessage(sessionId, "assistant", reply);

    return jsonResponse(req, {
      response: reply,
      needs_human: needsHuman,
      intent: needsHuman ? "broker_follow_up" : "general",
      priority: needsHuman ? "high" : "normal",
    });
  } catch {
    return jsonResponse(req, { error: "Unable to process chat request." }, 500);
  }
});
