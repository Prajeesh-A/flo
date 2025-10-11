"use client";

import React from "react";
import { motion } from "framer-motion";

const SocialIcon = ({
  icon,
  label,
  color = "#666666",
  hoverColor = "#2563EB",
}: {
  icon: React.ReactNode;
  label: string;
  color?: string;
  hoverColor?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.1, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-2 cursor-pointer group"
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    <motion.div
      className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center transition-colors duration-200"
      whileHover={{ borderColor: hoverColor }}
      style={{ color }}
    >
      <motion.div
        whileHover={{ color: hoverColor }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
    </motion.div>
    <motion.span
      className="text-sm font-medium transition-colors duration-200"
      style={{ color, fontFamily: "'Poppins',  " }}
      whileHover={{ color: hoverColor }}
    >
      {label}
    </motion.span>
  </motion.div>
);

const FooterLink = ({
  text,
  color = "#FF4FCB",
}: {
  text: string;
  color?: string;
}) => (
  <motion.div className="block">
    <motion.a
      href="#"
      className="text-lg font-medium transition-colors duration-200 hover:opacity-80 block"
      style={{ color, fontFamily: "'Poppins',  " }}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.a>
  </motion.div>
);

export default function SocialSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
            className="grid grid-cols-3 gap-8 max-w-md"
          >
            <SocialIcon
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
              label="LinkedIn"
              hoverColor="#FFC108"
            />

            <SocialIcon
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                </svg>
              }
              label="Threads"
              hoverColor="#FFC108"
            />

            <SocialIcon
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.188 4.72-1.292 1.288-2.896 2.005-4.81 2.15-.445.033-.896.05-1.352.05-.604 0-1.204-.025-1.8-.075-1.914-.145-3.518-.862-4.81-2.15C1.328 11.593.6 10.018.431 8.16c-.033-.445-.05-.896-.05-1.352 0-.604.025-1.204.075-1.8C.601 3.094 1.318 1.49 2.606.198 3.894-1.094 5.498-1.811 7.412-1.956c.445-.033.896-.05 1.352-.05.604 0 1.204.025 1.8.075 1.914.145 3.518.862 4.81 2.15 1.288 1.292 2.005 2.896 2.15 4.81.033.445.05.896.05 1.352 0 .604-.025 1.204-.075 1.8z" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="18" cy="6" r="1.5" />
                </svg>
              }
              label="Instagram"
              hoverColor="#FFC108"
            />

            <SocialIcon
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              }
              label="Slack"
              hoverColor="#FFC108"
            />

            <SocialIcon
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              }
              label="X"
              hoverColor="#FFC108"
            />

            <SocialIcon
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              }
              label="Discord"
              hoverColor="#FFC108"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.6, 0.2, 1] }}
            className="grid grid-cols-2 gap-12"
          >
            <div>
              <h3
                className="text-2xl  text-black mb-8"
                style={{ fontFamily: "'Poppins'" }}
              >
                Company
              </h3>
              <div className="flex flex-col space-y-5">
                <FooterLink text="About Us" />
                <FooterLink text="Features" />
                <FooterLink text="Services" />
                <FooterLink text="Analytics" />
                <FooterLink text="Pricing" />
                <FooterLink text="Help Center" />
              </div>
            </div>

            <div>
              <h3
                className="text-2xl  text-black mb-8"
                style={{ fontFamily: "'Poppins'" }}
              >
                Features
              </h3>
              <div className="flex flex-col space-y-5">
                <motion.div
                  className="text-lg transition-colors duration-200 hover:opacity-80 block"
                  style={{
                    color: "#FF4FCB",
                    fontFamily: "'Poppins',  ",
                    fontWeight: 300,
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Low-Code Development
                </motion.div>

                <motion.div
                  className="text-lg transition-colors duration-200 hover:opacity-80 block"
                  style={{
                    color: "#FF4FCB",
                    fontFamily: "'Poppins',  ",
                    fontWeight: 300,
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  No-Code Automation
                </motion.div>

                <motion.div
                  className="text-lg transition-colors duration-200 hover:opacity-80 block"
                  style={{
                    color: "#FF4FCB",
                    fontFamily: "'Poppins',  ",
                    fontWeight: 300,
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  AI-Powered Operations
                </motion.div>

                <motion.div
                  className="text-lg transition-colors duration-200 hover:opacity-80 block"
                  style={{
                    color: "#FF4FCB",
                    fontFamily: "'Poppins',  ",
                    fontWeight: 300,
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Financial Operations Digitization
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
