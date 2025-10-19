"use client";

import { motion } from "framer-motion";
import { FileText, Download, BookOpen, Code } from "lucide-react";
import Header from "@/components/layout/Header";

const resources = [
  {
    icon: FileText,
    title: "Product Overview",
    description: "Comprehensive overview of WiredLeap's platform and capabilities",
    type: "PDF",
    size: "2.4 MB",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    title: "Use Case Library",
    description: "Complete catalog of all 50+ use cases with technical details",
    type: "PDF",
    size: "5.8 MB",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "API Documentation",
    description: "Developer guide for integrating with WiredLeap APIs",
    type: "Online",
    size: "Web",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FileText,
    title: "Technical Specifications",
    description: "Hardware requirements and deployment architecture",
    type: "PDF",
    size: "1.2 MB",
    color: "from-orange-500 to-red-500",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-primary-bg">
      <Header />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-4">Resources</h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Download technical documentation, case studies, and integration guides
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-dark rounded-2xl p-8 hover:border-accent-green/30 transition-all group cursor-pointer"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${resource.color} bg-opacity-10 mb-6`}>
                  <resource.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{resource.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="px-2 py-1 bg-white/5 rounded">{resource.type}</span>
                    <span>{resource.size}</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-accent-green/10 border border-accent-green/30 rounded-lg text-accent-green font-semibold hover:bg-accent-green/20 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
