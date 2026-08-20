import { Body, Column, Container, Head, Hr, Html, Img, Link, Preview, Row, Section, Text } from "@react-email/components";
import type { InquiryInput } from "@/lib/inquiry";

const MONO_STACK = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const DISPLAY_STACK = "'Public Sans', Helvetica, Arial, sans-serif";
const BODY_STACK = "'Instrument Sans', Helvetica, Arial, sans-serif";

const SITE_URL = "https://rvnwstudios.com";

interface Props extends InquiryInput {
  submittedAt: string;
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Row style={{ marginBottom: "14px" }}>
      <Column style={{ width: "110px", verticalAlign: "top" }}>
        <Text style={{ fontFamily: MONO_STACK, fontSize: "11px", letterSpacing: "0.1em", color: "#6B6B65", margin: 0, textTransform: "uppercase" }}>
          {label}
        </Text>
      </Column>
      <Column style={{ verticalAlign: "top" }}>
        <Text style={{ fontFamily: BODY_STACK, fontSize: "15px", lineHeight: 1.6, color: "#FAFAF7", margin: 0 }}>
          {value}
        </Text>
      </Column>
    </Row>
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
      <Body style={{ backgroundColor: "#0A0A0A", margin: 0, padding: "40px 16px" }}>
        <Container
          style={{
            backgroundColor: "#141414",
            border: "1px solid #2A2A2A",
            borderRadius: "16px",
            maxWidth: "600px",
            overflow: "hidden",
          }}
        >
          <Section style={{ padding: "40px 40px 0" }}>
            <Img
              src={`${SITE_URL}/images/logos/horizontal-logo-light.png`}
              width="160"
              height="42"
              alt="RVNW Studios"
            />
          </Section>

          <Section style={{ padding: "28px 40px 0" }}>
            <Text
              style={{
                display: "inline-block",
                fontFamily: MONO_STACK,
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#FF5A1F",
                fontWeight: 700,
                backgroundColor: "#1D1D1B",
                border: "1px solid #2A2A2A",
                borderRadius: "100px",
                padding: "6px 14px",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              New Inquiry
            </Text>
          </Section>

          <Section style={{ padding: "20px 40px 0" }}>
            <Text style={{ fontFamily: DISPLAY_STACK, fontWeight: 800, fontSize: "30px", lineHeight: 1.2, color: "#FAFAF7", margin: 0 }}>
              {name} wants to start a project.
            </Text>
          </Section>

          <Section style={{ padding: "28px 40px 0" }}>
            <Section style={{ backgroundColor: "#1D1D1B", border: "1px solid #2A2A2A", borderRadius: "12px", padding: "24px 28px" }}>
              <Field label="Name" value={name} />
              <Field label="Email" value={email} />
              <Field label="Company" value={company ?? ""} />
              <Field label="Vertical" value={vertical ?? ""} />
              <Field label="Disciplines" value={disciplines.join(", ")} />
              <Field label="Budget" value={budget ?? ""} />
              <Field label="Timeline" value={timeline ?? ""} />
              <Row>
                <Column style={{ width: "110px", verticalAlign: "top" }}>
                  <Text style={{ fontFamily: MONO_STACK, fontSize: "11px", letterSpacing: "0.1em", color: "#6B6B65", margin: 0, textTransform: "uppercase" }}>
                    Message
                  </Text>
                </Column>
                <Column style={{ verticalAlign: "top" }}>
                  <Text style={{ fontFamily: BODY_STACK, fontSize: "15px", lineHeight: 1.6, color: "#FAFAF7", margin: 0, whiteSpace: "pre-wrap" }}>
                    {projectDetails}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Section>

          <Section style={{ padding: "28px 40px 0" }}>
            <Link
              href={`mailto:${email}`}
              style={{
                display: "inline-block",
                fontFamily: DISPLAY_STACK,
                fontWeight: 800,
                fontSize: "14px",
                letterSpacing: "0.02em",
                color: "#0A0A0A",
                backgroundColor: "#FF5A1F",
                padding: "14px 28px",
                borderRadius: "100px",
                boxShadow: "4px 4px 0px #0A0A0A",
              }}
            >
              REPLY TO {name.toUpperCase()}
            </Link>
          </Section>

          <Section style={{ padding: "36px 40px 0" }}>
            <Hr style={{ borderColor: "#2A2A2A", margin: 0 }} />
          </Section>

          <Section style={{ padding: "24px 40px 40px" }}>
            <Row>
              <Column style={{ width: "20px", verticalAlign: "middle" }}>
                <Img
                  src={`${SITE_URL}/images/logos/white-icon.png`}
                  width="16"
                  height="16"
                  alt=""
                />
              </Column>
              <Column style={{ verticalAlign: "middle" }}>
                <Text style={{ fontFamily: MONO_STACK, fontSize: "10px", letterSpacing: "0.1em", color: "#6B6B65", margin: 0, paddingLeft: "8px", textTransform: "uppercase" }}>
                  Submitted {submittedAt} · rvnwstudios.com/start-a-project
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
