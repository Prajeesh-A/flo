import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the terms and conditions for using Floneo websites, applications, and services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms and Conditions | Floneo",
    description:
      "Read the terms and conditions for using Floneo websites, applications, and services.",
    url: "/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
