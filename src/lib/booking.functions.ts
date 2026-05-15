import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BookingSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  service: z.string().trim().min(2).max(120),
  preferredDate: z.string().trim().max(40).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(1500).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof BookingSchema>;

const CLINIC_NAME = "Korean Smile Dental";
const CLINIC_INBOX = process.env.CLINIC_NOTIFICATION_EMAIL || "hello@koreansmiledental.com";
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || "Korean Smile Dental <onboarding@resend.dev>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendEmail(payload: {
  to: string | string[];
  subject: string;
  html: string;
  reply_to?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY missing — skipping email send.");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from: FROM_ADDRESS, ...payload }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Resend send failed:", res.status, text);
  }
}

function patientEmailHtml(b: BookingInput) {
  return `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;background:#f5f3ef;padding:32px;color:#111">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;padding:40px 36px;border:1px solid #e8e4dd">
      <div style="font-family:'Playfair Display',Georgia,serif;font-size:26px;margin-bottom:8px">Thank you, ${escapeHtml(b.fullName.split(" ")[0])}.</div>
      <div style="letter-spacing:.2em;text-transform:uppercase;font-size:11px;color:#666;margin-bottom:24px">${CLINIC_NAME}</div>
      <p style="line-height:1.6;font-size:14px;color:#333">
        We've received your booking request and a member of our team will contact you shortly to confirm your appointment.
      </p>
      <div style="margin:28px 0;padding:20px;background:#f8f8f8;border-left:2px solid #D8C3A5">
        <div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:.18em;margin-bottom:10px">Your request</div>
        <div style="font-size:14px;line-height:1.8">
          <strong>Service:</strong> ${escapeHtml(b.service)}<br/>
          ${b.preferredDate ? `<strong>Preferred date:</strong> ${escapeHtml(b.preferredDate)}<br/>` : ""}
          ${b.preferredTime ? `<strong>Preferred time:</strong> ${escapeHtml(b.preferredTime)}<br/>` : ""}
        </div>
      </div>
      <p style="font-size:13px;color:#666;line-height:1.6">
        If anything changes, simply reply to this email.
      </p>
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #eee;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#999">
        ${CLINIC_NAME}
      </div>
    </div>
  </body></html>`;
}

function clinicEmailHtml(b: BookingInput, id: string) {
  return `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;padding:24px;color:#111">
    <h2 style="font-family:'Playfair Display',Georgia,serif;margin:0 0 12px">New booking request</h2>
    <p style="color:#666;font-size:12px;letter-spacing:.18em;text-transform:uppercase">ID: ${id}</p>
    <table style="border-collapse:collapse;font-size:14px;margin-top:12px">
      <tr><td style="padding:6px 12px;color:#666">Name</td><td style="padding:6px 12px"><strong>${escapeHtml(b.fullName)}</strong></td></tr>
      <tr><td style="padding:6px 12px;color:#666">Email</td><td style="padding:6px 12px">${escapeHtml(b.email)}</td></tr>
      <tr><td style="padding:6px 12px;color:#666">Phone</td><td style="padding:6px 12px">${escapeHtml(b.phone)}</td></tr>
      <tr><td style="padding:6px 12px;color:#666">Service</td><td style="padding:6px 12px">${escapeHtml(b.service)}</td></tr>
      <tr><td style="padding:6px 12px;color:#666">Preferred date</td><td style="padding:6px 12px">${escapeHtml(b.preferredDate || "—")}</td></tr>
      <tr><td style="padding:6px 12px;color:#666">Preferred time</td><td style="padding:6px 12px">${escapeHtml(b.preferredTime || "—")}</td></tr>
      <tr><td style="padding:6px 12px;color:#666;vertical-align:top">Notes</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(b.notes || "—")}</td></tr>
    </table>
  </body></html>`;
}

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        service: data.service,
        preferred_date: data.preferredDate ? data.preferredDate : null,
        preferred_time: data.preferredTime || null,
        notes: data.notes || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Booking insert failed:", error);
      throw new Error("We couldn't save your booking. Please try again.");
    }

    // Fire-and-forget emails — failures won't block the user response
    await Promise.allSettled([
      sendEmail({
        to: data.email,
        subject: `${CLINIC_NAME} — your booking request received`,
        html: patientEmailHtml(data),
      }),
      sendEmail({
        to: CLINIC_INBOX,
        subject: `New booking — ${data.fullName} · ${data.service}`,
        html: clinicEmailHtml(data, row.id),
        reply_to: data.email,
      }),
    ]);

    return { ok: true as const, id: row.id };
  });
