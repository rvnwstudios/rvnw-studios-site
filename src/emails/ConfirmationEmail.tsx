import { Body, Container, Head, Hr, Html, Img, Link, Preview, Row, Column, Section, Text } from "@react-email/components";

const DISPLAY_STACK = "'Public Sans', Helvetica, Arial, sans-serif";
const BODY_STACK = "'Instrument Sans', Helvetica, Arial, sans-serif";

const CAL_LINK = "https://cal.com/rvnwstudios/intro-meeting-call";
const SITE_URL = "https://rvnwstudios.com";

interface Props {
  name: string;
}

export default function ConfirmationEmail({ name }: Props) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <Html>
      <Head />
      <Preview>We&apos;ve got your project details.</Preview>
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

          <Section style={{ padding: "32px 40px 0" }}>
            <Text style={{ fontFamily: DISPLAY_STACK, fontWeight: 700, fontSize: "34px", lineHeight: 1.15, color: "#FAFAF7", margin: 0 }}>
              Got it, {firstName}.
            </Text>
          </Section>

          <Section style={{ padding: "20px 40px 0" }}>
            <Text style={{ fontFamily: BODY_STACK, fontSize: "16px", lineHeight: 1.6, color: "#B8B8B0", margin: 0 }}>
              We read every inquiry directly — no automated screening in between. Expect a reply
              within two business days: either next steps, or a few questions if we need more to
              scope it right.
            </Text>
          </Section>

          <Section style={{ padding: "32px 40px 0" }}>
            <Section style={{ backgroundColor: "#1D1D1B", border: "1px solid #2A2A2A", borderRadius: "12px", padding: "28px 28px 24px" }}>
              <Text style={{ fontFamily: BODY_STACK, fontSize: "15px", lineHeight: 1.6, color: "#FAFAF7", margin: "0 0 20px" }}>
                Rather talk it through first? Grab a slot on the calendar — no need to wait on the
                reply.
              </Text>
              <Link
                href={CAL_LINK}
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
                BOOK A CALL
              </Link>
            </Section>
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
                <Text style={{ fontFamily: BODY_STACK, fontSize: "13px", color: "#6B6B65", margin: 0, paddingLeft: "8px" }}>
                  RVNW Studios ·{" "}
                  <Link href="mailto:hello@rvnwstudios.com" style={{ color: "#8A8A84", textDecoration: "underline" }}>
                    hello@rvnwstudios.com
                  </Link>
                  {" · "}
                  <Link href="https://instagram.com/rvnwstudios" style={{ color: "#8A8A84", textDecoration: "underline" }}>
                    Instagram
                  </Link>
                  {" · "}
                  <Link href="https://linkedin.com/company/rvnwstudios" style={{ color: "#8A8A84", textDecoration: "underline" }}>
                    LinkedIn
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
