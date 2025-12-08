import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const languageNames: Record<string, string> = {
      'en': 'English',
      'zu': 'isiZulu',
      'xh': 'isiXhosa',
      'nso': 'Sepedi',
    };

    const systemPrompt = `You are MzanziShield, a cybersecurity AI assistant focused on protecting South Africans from online threats, scams, and phishing attacks.

Your task is to analyze the provided link, message, or content and determine if it poses a security threat.

Respond in ${languageNames[language] || 'English'}.

You must respond ONLY with a valid JSON object in this exact format:
{
  "status": "safe" | "warning" | "danger",
  "summary": "A brief 1-2 sentence summary of your analysis",
  "details": ["Point 1 about the analysis", "Point 2", "Point 3"],
  "riskLevel": 1-10
}

Consider South African-specific scams such as:
- Fake SARS (tax) links
- FNB, Standard Bank, Absa, Nedbank phishing
- Job scam offers asking for payment
- Fake lottery/giveaway scams
- WhatsApp/SMS scams pretending to be family members
- Fraudulent online stores
- Romance scams

Guidelines for status:
- "safe": The content appears legitimate with no red flags (riskLevel 1-3)
- "warning": Some suspicious elements that warrant caution (riskLevel 4-6)
- "danger": Clear indicators of a scam or phishing attempt (riskLevel 7-10)

Be thorough but concise. Focus on actionable advice.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this content for potential threats:\n\n${content}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response from AI
    let analysis;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse);
      // Fallback response
      analysis = {
        status: "warning",
        summary: "Unable to fully analyze. Please exercise caution with this content.",
        details: ["The content could not be fully analyzed", "When in doubt, do not click on links from unknown sources", "Verify the source through official channels"],
        riskLevel: 5,
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-threat function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error",
      status: "warning",
      summary: "Analysis temporarily unavailable. Please try again.",
      details: ["Service is experiencing issues", "Try again in a few moments"],
      riskLevel: 5,
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
