import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "sonner";
import { ALL_SERVICES } from "@/lib/services";
import { submitBooking } from "@/lib/booking.functions";
import { Check } from "lucide-react";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Book a Visit — Korean Smile Dental" },
      { name: "description", content: "Book a consultation at Korean Smile Dental. Submit your preferred date and treatment, and our team will confirm." },
      { property: "og:title", content: "Book a Visit — Korean Smile Dental" },
      { property: "og:description", content: "Reserve your appointment with Korean Smile Dental." },
      { property: "og:url", content: "/booking" },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: BookingPage,
});

function BookingPage() {
  const search = useSearch({ from: "/booking" });
  const submit = useServerFn(submitBooking);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: search.service || "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (form.fullName.trim().length < 2) return toast.error("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("Please enter a valid email.");
    if (form.phone.trim().length < 5) return toast.error("Please enter a phone number.");
    if (!form.service) return toast.error("Please select a treatment.");

    setSubmitting(true);
    try {
      await submit({ data: form });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="min-h-[80vh] container-luxe flex items-center justify-center py-28 text-center">
        <div className="max-w-lg">
          <div className="w-14 h-14 rounded-full bg-accent/40 mx-auto flex items-center justify-center mb-8">
            <Check size={22} strokeWidth={1.5} />
          </div>
          <div className="eyebrow mb-4">Request received</div>
          <h1 className="font-display text-5xl mb-6">Thank you.</h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Your booking request has been received and a confirmation has been sent to <strong>{form.email}</strong>.
            A member of our team will be in touch within one business day to confirm your appointment.
          </p>
          <button onClick={() => navigate({ to: "/" })} className="btn-outline">Return home</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-secondary py-24">
        <div className="container-luxe">
          <div className="eyebrow mb-6">Book a Visit</div>
          <h1 className="font-display text-5xl md:text-6xl max-w-3xl leading-[1.05]">
            Reserve your <span className="italic">consultation.</span>
          </h1>
          <p className="mt-6 max-w-lg text-muted-foreground">
            Share a few details and we'll be in touch to confirm. Our consultations are unhurried —
            usually 30 to 45 minutes — and there's no obligation to proceed.
          </p>
        </div>
      </section>

      <section className="py-20 container-luxe">
        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-x-10 gap-y-8 max-w-3xl">
          <Field label="Full name" required>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Email" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Phone" required>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Treatment" required>
            <select
              required
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              className={inputCls}
            >
              <option value="">Select a treatment…</option>
              {ALL_SERVICES.map((s) => (
                <option key={s.slug} value={s.name}>{s.name} — {s.category}</option>
              ))}
              <option value="General consultation">General consultation</option>
            </select>
          </Field>
          <Field label="Preferred date">
            <input
              type="date"
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Preferred time">
            <select
              value={form.preferredTime}
              onChange={(e) => update("preferredTime", e.target.value)}
              className={inputCls}
            >
              <option value="">Any time</option>
              <option>Morning (09:00 – 12:00)</option>
              <option>Afternoon (12:00 – 16:00)</option>
              <option>Evening (16:00 – 19:00)</option>
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field label="Notes (optional)">
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={inputCls + " resize-none"}
                maxLength={1500}
              />
            </Field>
          </div>
          <div className="md:col-span-2 flex items-center justify-between mt-4 flex-wrap gap-6">
            <p className="text-xs text-muted-foreground max-w-sm">
              By booking, you agree to be contacted by Korean Smile Dental about this enquiry.
              Your information is kept confidential.
            </p>
            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? "Sending…" : "Submit Request"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

const inputCls =
  "w-full bg-transparent border-b border-border px-0 py-3 text-base font-sans focus:outline-none focus:border-foreground transition-colors";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">
        {label} {required && <span className="text-foreground">*</span>}
      </span>
      {children}
    </label>
  );
}
