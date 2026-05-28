// =============================================================
// ClieX AI – New Lead Email Notification
// Supabase Edge Function (Deno runtime)
//
// HOW TO DEPLOY:
// 1. Install Supabase CLI: npm install -g supabase
// 2. Login: supabase login
// 3. Link project: supabase link --project-ref zfusxsegebjsdycevnnd
// 4. Set secret: supabase secrets set RESEND_API_KEY=your_resend_key
// 5. Deploy: supabase functions deploy notify-new-lead --no-verify-jwt
//
// HOW TO CREATE THE WEBHOOK TRIGGER:
// In Supabase Dashboard → Database → Webhooks → Create new webhook:
//   Name: notify-new-lead
//   Table: leads
//   Events: INSERT
//   URL: https://zfusxsegebjsdycevnnd.supabase.co/functions/v1/notify-new-lead
//   HTTP Method: POST
// =============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL   = "cliexai@gmail.com";
const FROM_EMAIL     = "ClieX AI <onboarding@resend.dev>";

serve(async (req: Request) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const payload = await req.json();
    const lead = payload.record;

    if (!lead) {
      return new Response(JSON.stringify({ error: "No record in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const whatsappNum = lead.whatsapp?.replace(/\D/g, "") ?? "";
    const submittedAt = new Date(lead.created_at).toLocaleString("en-US", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", timeZoneName: "short",
    });

    const planBadgeColor: Record<string, string> = {
      Starter: "#3B82F6",
      Growth:  "#8B5CF6",
      Premium: "#F59E0B",
    };
    const planColor = planBadgeColor[lead.plan] ?? "#8B5CF6";

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead – ClieX AI</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#8B5CF6);padding:32px 36px;border-radius:16px 16px 0 0;">
              <table width="100%">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.6);">ClieX AI · Lead Notification</p>
                    <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;">🚀 New Lead Incoming!</h1>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <span style="display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:6px 14px;font-size:12px;font-weight:700;color:white;">
                      ${lead.plan} Plan
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:32px 36px;border-radius:0 0 16px 16px;border:1px solid #e4e4e7;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Fields -->
                ${[
                  { label: "👤 Name",      value: lead.full_name },
                  { label: "🏢 Business",  value: lead.business },
                  { label: "📧 Email",     value: `<a href="mailto:${lead.email}" style="color:#8B5CF6;text-decoration:none;">${lead.email}</a>` },
                  { label: "💬 WhatsApp",  value: whatsappNum ? `<a href="https://wa.me/${whatsappNum}" style="color:#25D366;font-weight:700;text-decoration:none;">${lead.whatsapp} — Open Chat →</a>` : lead.whatsapp },
                  { label: "📅 Submitted", value: submittedAt },
                ].map(({ label, value }) => `
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
                      <table width="100%">
                        <tr>
                          <td width="130" style="font-size:12px;font-weight:600;color:#9ca3af;vertical-align:top;padding-top:2px;">${label}</td>
                          <td style="font-size:14px;font-weight:500;color:#111827;">${value}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>`).join("")}

                <!-- Plan highlight -->
                <tr>
                  <td style="padding:20px 0 0;">
                    <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:12px;padding:16px 20px;display:flex;align-items:center;gap:12px;">
                      <span style="font-size:28px;">💎</span>
                      <div>
                        <p style="margin:0;font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Selected Plan</p>
                        <p style="margin:4px 0 0;font-size:20px;font-weight:800;color:${planColor};">${lead.plan}</p>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td style="padding-top:24px;text-align:center;">
                    <a href="https://cliexai.com/admin" style="display:inline-block;background:#8B5CF6;color:white;font-size:14px;font-weight:700;text-decoration:none;padding:13px 28px;border-radius:10px;letter-spacing:0.3px;">
                      View in Admin Dashboard →
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#9ca3af;">
                This notification was sent automatically by ClieX AI · <a href="https://cliexai.com" style="color:#8B5CF6;text-decoration:none;">cliexai.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    // Send via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      [NOTIFY_EMAIL],
        subject: `🔥 New Lead: ${lead.full_name} — ${lead.plan} Plan`,
        html,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[notify-new-lead] Resend error:", errBody);
      return new Response(JSON.stringify({ error: errBody }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    console.log("[notify-new-lead] Email sent:", data.id);

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[notify-new-lead] Fatal error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
