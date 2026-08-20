import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service — RVNW Studios",
  description: "The terms governing use of rvnwstudios.com.",
};

const linkClass = "text-paper underline underline-offset-4";

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Terms of Service" lastUpdated="August 20, 2026">
      <p className="font-body text-[15px] leading-relaxed text-grid">
        These Terms of Service (&quot;Terms&quot;) govern your use of rvnwstudios.com (the
        &quot;Site&quot;), operated by RVNW Studios. By using the Site, you agree to these Terms.
      </p>

      <LegalSection heading="Use of the Site">
        <p>
          The Site and its content — including designs, copy, case studies, and branding — are the
          property of RVNW Studios or its clients, as applicable, and are protected by copyright and
          other intellectual property laws. You may not copy, reproduce, or use Site content for
          commercial purposes without written permission.
        </p>
      </LegalSection>

      <LegalSection heading="Project Inquiries">
        <p>
          Submitting an inquiry through the Site does not create a client relationship, contract, or
          obligation on either party. Project scope, pricing, and terms are established separately, in
          writing, once a proposal is agreed upon.
        </p>
      </LegalSection>

      <LegalSection heading="Case Studies and Client Work">
        <p>
          Case studies and work samples shown on the Site are shared with client permission where
          required. If you are a current or former client and have questions about your project&apos;s
          inclusion on the Site, contact us at{" "}
          <a href="mailto:hello@rvnwstudios.com" className={linkClass}>
            hello@rvnwstudios.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimers">
        <p>
          The Site is provided &quot;as is.&quot; We make reasonable efforts to keep information
          accurate and the Site available, but we don&apos;t guarantee uninterrupted access or that all
          content is free of errors.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          To the extent permitted by law, RVNW Studios is not liable for any indirect, incidental, or
          consequential damages arising from your use of the Site.
        </p>
      </LegalSection>

      <LegalSection heading="Governing Law">
        <p>
          These Terms are governed by the laws of the State of California, without regard to
          conflict-of-law principles.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of the Site after changes are
          posted constitutes acceptance of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these Terms:{" "}
          <a href="mailto:hello@rvnwstudios.com" className={linkClass}>
            hello@rvnwstudios.com
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
