import { Body, Container, Head, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import type { InquiryInput } from "@/lib/inquiry";

const MONO_STACK = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const DISPLAY_STACK = "'Public Sans', Helvetica, Arial, sans-serif";
const BODY_STACK = "'Instrument Sans', Helvetica, Arial, sans-serif";

interface Props extends InquiryInput {
  submittedAt: string;
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Section style={{ marginBottom: "14px" }}>
      <Text style={{ fontFamily: MONO_STACK, fontSize: "11px", letterSpacing: "0.1em", color: "#8C8C88", margin: "0 0 4px", textTransform: "uppercase" }}>
        {label}
      </Text>
      <Text style={{ fontFamily: BODY_STACK, fontSize: "15px", color: "#0A0A0A", margin: 0, lineHeight: 1.5 }}>
        {value}
      </Text>
    </Section>
  );
}

export default function InternalNotificationEmail({
  name,
  email,
  projectDetails,
  company,
  vertical,
  disciplines = [],
  budget,
  timeline,
  submittedAt,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>New inquiry from {name}</Preview>
      <Body style={{ backgroundColor: "#F7F5F0", margin: 0, padding: "32px 16px" }}>
        <Container style={{ backgroundColor: "#FFFFFF", border: "1px solid #E4E1DB", borderRadius: "2px", maxWidth: "560px", padding: "32px" }}>
          <Text style={{ fontFamily: MONO_STACK, fontSize: "11px", letterSpacing: "0.14em", color: "#FF5A1F", margin: "0 0 4px", textTransform: "uppercase" }}>
            RVNW
          </Text>
          <Text style={{ fontFamily: DISPLAY_STACK, fontWeight: 600, fontSize: "20px", color: "#0A0A0A", margin: "0 0 24px" }}>
            New inquiry
          </Text>

          <Field label="NAME" value={name} />
          <Field label="EMAIL" value={email} />
          <Field label="COMPANY" value={company ?? ""} />
          <Field label="VERTICAL" value={vertical ?? ""} />
          <Field label="DISCIPLINES" value={disciplines.join(", ")} />
          <Field label="BUDGET" value={budget ?? ""} />
          <Field label="TIMELINE" value={timeline ?? ""} />

          <Hr style={{ borderColor: "#E4E1DB", margin: "20px 0" }} />

          <Text style={{ fontFamily: MONO_STACK, fontSize: "11px", letterSpacing: "0.1em", color: "#8C8C88", margin: "0 0 8px", textTransform: "uppercase" }}>
            PROJECT DETAILS
          </Text>
          <Text style={{ fontFamily: BODY_STACK, fontSize: "15px", color: "#0A0A0A", margin: "0 0 24px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
            {projectDetails}
          </Text>

          <Hr style={{ borderColor: "#E4E1DB", margin: "20px 0" }} />

          <Text style={{ fontFamily: MONO_STACK, fontSize: "10px", letterSpacing: "0.1em", color: "#8C8C88", margin: "0 0 12px", textTransform: "uppercase" }}>
            Submitted {submittedAt}
          </Text>
          <Link href={`mailto:${email}`} style={{ fontFamily: DISPLAY_STACK, fontWeight: 600, fontSize: "14px", color: "#FF5A1F" }}>
            Reply to {name} →
          </Link>
        </Container>
      </Body>
    </Html>
  );
}
