import { createElement } from "react";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { inquirySchema } from "@/lib/inquiry";
import InternalNotificationEmail from "@/emails/InternalNotificationEmail";
import ConfirmationEmail from "@/emails/ConfirmationEmail";

const INTERNAL_INBOX = "marcos@rvnwstudios.com";
const FROM_ADDRESS = "RVNW Studios <notifications@rvnwstudios.com>";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "That request wasn't readable." }, { status: 400 });
  }

  // Server-side validation before either email sends, regardless of the
  // form's own client-side checks (Inquiry Email Template.md).
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: "Some fields need a second look.", fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json({ error: "Email delivery isn't configured yet." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  });

  try {
    const [internalResult, confirmationResult] = await Promise.all([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: INTERNAL_INBOX,
        replyTo: data.email,
        subject: `New inquiry — ${data.name}`,
        react: createElement(InternalNotificationEmail, { ...data, submittedAt }),
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        replyTo: "hello@rvnwstudios.com",
        subject: "We've got your project details",
        react: createElement(ConfirmationEmail, { name: data.name }),
      }),
    ]);

    if (internalResult.error || confirmationResult.error) {
      console.error("Resend error", internalResult.error, confirmationResult.error);
      return NextResponse.json({ error: "Something went wrong sending that." }, { status: 502 });
    }
  } catch (err) {
    console.error("Inquiry email send failed", err);
    return NextResponse.json({ error: "Something went wrong sending that." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
