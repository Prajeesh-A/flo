"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
    const router = useRouter();

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 px-4 py-12">
      {/* Back to Home Button - Top left on large screens, top center on small */}
      <a
        href="/"
        className="absolute top-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 bg-white hover:bg-green-50 text-green-600 font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 border border-green-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </a>
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 sm:p-12 border border-green-100">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms and Conditions
        </h1>

        <p className="mb-4 text-sm text-gray-600 text-center">
          Last updated: <strong>October 27, 2025</strong>
        </p>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Welcome to <strong>Floneo</strong>. By accessing or using our website,
          applications, or services, you agree to comply with and be bound by the
          following terms and conditions. Please read them carefully before using
          our platform.
        </p>

        <Section title="1. Acceptance of Terms">
          By accessing or using Floneo’s services, you confirm that you have read,
          understood, and agree to be bound by these Terms and Conditions. If you
          do not agree, you must discontinue use immediately.
        </Section>

        <Section title="2. Use of Our Services">
          You agree to use our services only for lawful purposes and in accordance
          with all applicable local, national, and international laws and
          regulations. You may not use our services:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>To engage in fraudulent, harmful, or illegal activity.</li>
            <li>To attempt unauthorized access to our systems or data.</li>
            <li>To distribute viruses, malware, or any other harmful code.</li>
          </ul>
        </Section>

        <Section title="3. Intellectual Property">
          All content, trademarks, logos, and intellectual property displayed on
          the platform are owned by or licensed to <strong>Floneo</strong>. You
          may not reproduce, distribute, or use any materials without prior written
          permission.
        </Section>

        <Section title="4. Limitation of Liability">
          Floneo will not be held liable for any direct, indirect, incidental, or
          consequential damages resulting from your use of our platform or
          services, including but not limited to data loss, service interruption,
          or unauthorized access.
        </Section>

        <Section title="5. Third-Party Links">
          Our website may contain links to third-party websites. We are not
          responsible for the content, policies, or practices of those sites. You
          access them at your own risk.
        </Section>

        <Section title="6. Termination">
          We reserve the right to suspend or terminate access to our services at
          any time, without notice, for conduct that we believe violates these
          Terms or is harmful to other users or to Floneo.
        </Section>

        <Section title="7. Changes to These Terms">
          We may update or modify these Terms at any time. Updated terms will be
          posted on this page, and your continued use of our services constitutes
          acceptance of the new Terms.
        </Section>

        <Section title="8. Contact Us">
          If you have any questions about these Terms and Conditions, please
          contact us at:
          <div className="border-l-4 border-green-300 pl-4 mt-3 text-gray-700">
            <p><strong>Floneo Technologies Pvt. Ltd.</strong></p>
            <p>Email: admin@floneo.com</p>
            <p>Address: Kollam, Kerela, India</p>
          </div>
        </Section>
        

        <p className="mt-10 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Floneo. All rights reserved.
        </p>
      </div>
    </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}
