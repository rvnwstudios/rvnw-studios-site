import { Body, Container, Head, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";

const DISPLAY_STACK = "'Public Sans', Helvetica, Arial, sans-serif";
const BODY_STACK = "'Instrument Sans', Helvetica, Arial, sans-serif";
const MONO_STACK = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const CAL_LINK = "https://cal.com/rvnwstudios/intro-meeting-call";

interface Props {
  name: string;
}

export default function ConfirmationEmail({ name }: Props) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <Html>
      <Head />
      <Preview>We&apos;ve got your project details.</Preview>
      <Body style={{ backgroundColor: "#F7F5F0", margin: 0, padding: "40px 16px" }}>
        <Container style={{ backgroundColor: "#FFFFFF", border: "1px solid #E4E1DB", borderRadius: "2px", maxWidth: "560px", padding: "40px" }}>
          <Text
            style={{
              fontFamily: MONO_STACK,
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.18em",
              color: "#FF5A1F",
              margin: "0 0 28px",
              textTransform: "uppercase",
            }}
          >
            RVNW Studios
          </Text>

          <Text style={{ fontFamily: DISPLAY_STACK, fontWeight: 600, fontSize: "28px", lineHeight: 1.15, color: "#0A0A0A", margin: "0 0 16px" }}>
            Got it, {firstName}.
          </Text>

          <Text style={{ fontFamily: BODY_STACK, fontSize: "16px", lineHeight: 1.6, color: "#0A0A0A", margin: "0 0 16px" }}>
            We read every inquiry directly — no automated screening in between. Expect a reply within two
            business days: either next steps, or a few questions if we need more to scope it right.
          </Text>

          <Section style={{ backgroundColor: "#F7F5F0", borderRadius: "2px", padding: "20px 24px", margin: "24px 0" }}>
            <Text style={{ fontFamily: BODY_STACK, fontSize: "15px", lineHeight: 1.6, color: "#0A0A0A", margin: "0 0 12px" }}>
              Rather talk it through first? Grab a slot on the calendar — no need to wait on the reply.
            </Text>
            <Link
              href={CAL_LINK}
              style={{
                display: "inline-block",
                fontFamily: DISPLAY_STACK,
                fontWeight: 600,
                fontSize: "14px",
                color: "#0A0A0A",
                backgroundColor: "#FF5A1F",
                padding: "12px 22px",
                borderRadius: "4px",
                letterSpacing: "0.02em",
              }}
            >
              Book a call
            </Link>
          </Section>

          <Hr style={{ borderColor: "#E4E1DB", margin: "28px 0" }} />

          <Text style={{ fontFamily: BODY_STACK, fontSize: "13px", lineHeight: 1.6, color: "#8C8C88", margin: 0 }}>
            RVNW Studios ·{" "}
            <Link href="mailto:hello@rvnwstudios.com" style={{ color: "#8C8C88", textDecoration: "underline" }}>
              hello@rvnwstudios.com
            </Link>
            {" · "}
            <Link href="https://instagram.com/rvnwstudios" style={{ color: "#8C8C88", textDecoration: "underline" }}>
              Instagram
            </Link>
            {" · "}
            <Link href="https://linkedin.com/company/rvnwstudios" style={{ color: "#8C8C88", textDecoration: "underline" }}>
              LinkedIn
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
