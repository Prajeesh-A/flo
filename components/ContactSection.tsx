"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { api, useApiData } from "@/lib/api";
import { useCTAModal } from "@/contexts/CTAModalContext";
import { useToast } from "@/components/ui/notification-toast";

export default function ContactSection() {
  const { openModal } = useCTAModal();
  const { showDemoToast } = useToast();

  // Fetch social media links to get LinkedIn URL
  const { data: socialLinks } = useApiData(api.getSocialMediaLinks);

  // Find LinkedIn URL from social links
  const linkedInLink = socialLinks?.find(
    (link) =>
      link.platform.toLowerCase() === "linkedin" ||
      link.platform_name.toLowerCase().includes("linkedin")
  );
  const linkedInUrl = linkedInLink?.url || "#";

  // Fetch section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getContactSection);

  // Fallback data
  const fallbackData = {
    title: "Get in Touch",
    subtitle: "Contact Us",
    description:
      "Ready to transform your business? Let's talk about how we can help you achieve your goals.",
    email: "contact@ floneo.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, Suite 100, City, State 12345",
    form_title: "Send us a message",
    form_submit_text: "Send Message",
    form_success_message:
      "Thank you for your message! We'll get back to you soon.",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Combine first and last name for the API
      const fullName =
        `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

      // Prepare data for API submission
      const submissionData = {
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || "Contact Form Submission",
        message: formData.message,
      };

      // Submit to Django API
      await api.submitContactForm(submissionData);

      // Show success message
      setSubmitStatus({
        type: "success",
        message:
          data.form_success_message ||
          "Thank you for your message! We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Sorry, there was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-100 py-[100px] px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Get in touch card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
              className="bg-[#1A2332] rounded-[24px] p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                </div>
                <h3
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {data.title}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-black/20 rounded-lg px-4 py-3">
                  <span className="text-white/70 text-sm">Email</span>
                  <span className="text-white text-sm">{data.email}</span>
                </div>
                <div className="flex justify-between items-center bg-black/20 rounded-lg px-4 py-3">
                  <span className="text-white/70 text-sm">Phone</span>
                  <span className="text-white text-sm">{data.phone}</span>
                </div>
                <div className="flex justify-between items-center bg-black/20 rounded-lg px-4 py-3">
                  <span className="text-white/70 text-sm">Address</span>
                  <span className="text-white text-sm">{data.address}</span>
                </div>
              </div>
            </motion.div>

            {/* Community support card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.2, 0.6, 0.2, 1],
              }}
              className="bg-[#2563EB] rounded-[24px] p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                </div>
                <h3
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Community support
                </h3>
              </div>

              <p className="text-white/90 text-sm leading-relaxed mb-8">
                Join our Community to share tips, ask questions, and learn from
                others. This is the place to connect and get advice from fellow
                users.
              </p>

              <motion.a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#1A2332] hover:bg-[#2A3442] text-white py-4 rounded-[24px] font-medium transition-colors duration-200 inline-block text-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Join Our Community
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.6, 0.2, 1] }}
            className="bg-[#1A2332] rounded-[24px] p-8 text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                <div className="w-3 h-3 bg-white/60 rounded-full"></div>
              </div>
              <h3
                className="text-2xl font-semibold"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Contact our sales team
              </h3>
            </div>

            <p className="text-white/70 text-sm mb-8">
              Talk with our sales team to see how floneo can fit your needs.
            </p>

            {/* Success/Error Message */}
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg mb-6 ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 border border-green-500/30 text-green-300"
                    : "bg-red-500/20 border border-red-500/30 text-red-300"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (optional)"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your message here"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-[24px] font-medium transition-colors duration-200 ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#2ECC71] hover:bg-[#27AE60] text-white"
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {isSubmitting
                  ? "Sending..."
                  : data.form_submit_text || "Submit"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
