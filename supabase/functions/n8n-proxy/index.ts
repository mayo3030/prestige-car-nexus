import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const N8N_WEBHOOK_URL = "https://mayomina2020.app.n8n.cloud/webhook/auction-chatbot";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("📤 Sending to n8n:", JSON.stringify(body, null, 2));

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("📥 n8n response status:", response.status);

    // Get the raw response text first
    const responseText = await response.text();
    console.log("📥 n8n raw response:", responseText);

    // Handle empty response
    if (!responseText || responseText.trim() === "") {
      console.log("⚠️ n8n returned empty response - using fallback");
      return new Response(
        JSON.stringify({ 
          response: "شكراً لتواصلك معنا! سيتم الرد عليك قريباً من فريق المبيعات." 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log("✅ Parsed n8n response:", JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.log("⚠️ n8n response is not JSON, treating as text");
      data = { response: responseText };
    }

    if (!response.ok) {
      console.error("❌ n8n error:", response.status, data);
      return new Response(
        JSON.stringify({ error: "n8n webhook error", details: data }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Proxy error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        response: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى." 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
