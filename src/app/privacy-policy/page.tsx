import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — RVNW Studios",
  description: "How RVNW Studios collects, uses, and protects information from visitors to rvnwstudios.com.",
};

const linkClass = "text-paper underline underline-offset-4";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Privacy Policy" lastUpdated="August 20, 2026">
      <p className="font-body text-[15px] leading-relaxed text-grid">
        RVNW Studios (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) operates rvnwstudios.com (the
        &quot;Site&quot;). This policy explains what information we collect, how we use it, and your
        choices.
      </p>

      <LegalSection heading="Information We Collect">
        <p>
          <strong className="text-paper">Information you provide directly.</strong> When you submit
          an inquiry through our{" "}
          <Link href="/start-a-project" className={linkClass}>
            Start a Project
          </Link>{" "}
          form, we collect the information you enter — typically your name, email address, company
          or project details, and any message you include.
        </p>
        <p>
          <strong className="text-paper">Automatically collected information.</strong> We may use
          analytics tools to understand how visitors use the Site — for example, which pages are
          viewed and general traffic patterns. This may include standard technical data like IP
          address, browser type, and device information. We do not currently use a third-party
          analytics provider or run advertising pixels or ad-retargeting tools; if that changes, we
          will update this policy to name the provider.
        </p>
        <p>
          <strong className="text-paper">Cookies.</strong> The Site may use cookies or similar
          technology to support basic functionality and analytics. You can disable cookies in your
          browser settings; some site features may not work as intended if you do.
        </p>
      </LegalSection>

      <LegalSection heading="How We Use Information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to project inquiries and communicate with prospective and current clients</li>
          <li>Understand and improve how the Site is used</li>
          <li>Maintain the security and functionality of the Site</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </LegalSection>

      <LegalSection heading="How We Share Information">
        <p>
          We share information only with the service providers that help us run the Site and respond
          to inquiries:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-paper">Resend</strong> — processes and delivers inquiry form
            submissions to our email
          </li>
          <li>
            <strong className="text-paper">Sanity</strong> — hosts the content management system
            powering the Site
          </li>
          <li>
            <strong className="text-paper">Netlify</strong> — hosts the Site itself
          </li>
        </ul>
        <p>We don&apos;t share your information with third parties for their own marketing purposes.</p>
      </LegalSection>

      <LegalSection heading="Data Retention">
        <p>
          We retain inquiry form submissions for as long as reasonably necessary to respond to your
          inquiry and maintain business records, after which they may be deleted.
        </p>
      </LegalSection>

      <LegalSection heading="Your Rights">
        <p>
          Depending on your location, you may have rights to access, correct, or request deletion of
          your personal information. To make a request, contact us at{" "}
          <a href="mailto:hello@rvnwstudios.com" className={linkClass}>
            hello@rvnwstudios.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Children's Privacy">
        <p>
          The Site is not directed at children under 13, and we do not knowingly collect information
          from children under 13.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to This Policy">
        <p>
          We may update this policy from time to time. The &quot;last updated&quot; date above
          reflects the most recent version.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy:{" "}
          <a href="mailto:hello@rvnwstudios.com" className={linkClass}>
            hello@rvnwstudios.com
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
