"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, User, MessageSquare, Send, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("I'd like to know more");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, message }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 via-accent-blue/20 to-purple-500/20 rounded-3xl blur-3xl" />

              <div className="relative bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent-green to-accent-blue mb-6"
                  >
                    <Phone className="w-10 h-10 text-white" />
                  </motion.div>
                  <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
                  <p className="text-xl text-slate-400">We'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-white mb-3">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-green/50 focus:ring-2 focus:ring-accent-green/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div>
                    <label htmlFor="phone" className="block text-lg font-medium text-white mb-3">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-green/50 focus:ring-2 focus:ring-accent-green/20 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-lg font-medium text-white mb-3">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-green/50 focus:ring-2 focus:ring-accent-green/20 transition-all resize-none"
                        placeholder="Your message"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-gradient-to-r from-accent-green to-accent-blue rounded-xl text-xl font-semibold text-primary-bg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 via-accent-blue/20 to-purple-500/20 rounded-3xl blur-3xl" />

              <div className="relative bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-16 shadow-2xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent-green to-accent-blue mb-8"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">Message Sent!</h2>
                <p className="text-xl text-slate-400 mb-8">We'll be in touch within 24 hours.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
