"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";

export default function DemoRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    useCase: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-primary-bg">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark rounded-3xl p-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-green/20 mb-6">
                <CheckCircle className="w-10 h-10 text-accent-green" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Request Received!</h2>
              <p className="text-xl text-text-secondary mb-8">
                Thank you for your interest. Our team will reach out to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-accent-green/10 border border-accent-green/30 rounded-lg text-accent-green font-semibold hover:bg-accent-green/20 transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      <Header />

      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-4">Request a Demo</h1>
            <p className="text-xl text-text-secondary">
              Let's explore how WiredLeap can transform your operations
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass-dark rounded-3xl p-8 space-y-6"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Work Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-all"
                placeholder="john@company.com"
              />
            </div>

            {/* Organization */}
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-text-secondary mb-2">
                Organization *
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                required
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-all"
                placeholder="Your Company"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-text-secondary mb-2">
                Role *
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-all"
              >
                <option value="">Select your role</option>
                <option value="police">Law Enforcement / Public Safety</option>
                <option value="city-planner">City Planner / Municipal</option>
                <option value="conservation">Conservation / Environment</option>
                <option value="enterprise">Enterprise / Business</option>
                <option value="healthcare">Healthcare / Medical</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Use Case */}
            <div>
              <label htmlFor="useCase" className="block text-sm font-medium text-text-secondary mb-2">
                Primary Use Case of Interest
              </label>
              <input
                type="text"
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-all"
                placeholder="e.g., Crowd Management, Weapon Detection"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-all resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-accent-green to-accent-blue rounded-xl text-white font-semibold hover:scale-105 transition-transform"
            >
              <span>Submit Request</span>
              <Send className="w-5 h-5" />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
