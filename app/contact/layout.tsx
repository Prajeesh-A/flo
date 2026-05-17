import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Sales",
  description:
    "Contact the Floneo team to discuss low-code/no-code workflow automation for your business.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Sales | Floneo",
    description:
      "Contact the Floneo team to discuss low-code/no-code workflow automation for your business.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
