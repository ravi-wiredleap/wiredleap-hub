"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Mic, Globe, FileText, Cpu, Users, Tag, Zap, Download } from "lucide-react";
import { UseCase } from "@/types";
import { cn } from "@/lib/utils";

interface UseCaseModalProps {
  usecase: UseCase | null;
  isOpen: boolean;
  onClose: () => void;
}

const getInputIcon = (input: string) => {
  switch (input) {
    case "Visual": return Eye;
    case "Audio": return Mic;
    case "Social Media": return Globe;
    case "Text": return FileText;
    case "Sensors (IoT, GIS)": return Cpu;
    default: return Eye;
  }
};

const getInputColor = (input: string) => {
  switch (input) {
    case "Visual": return "from-accent-green/20 to-accent-green/5 border-accent-green/30";
    case "Audio": return "from-accent-blue/20 to-accent-blue/5 border-accent-blue/30";
    case "Social Media": return "from-purple-400/20 to-purple-400/5 border-purple-400/30";
    case "Text": return "from-orange-400/20 to-orange-400/5 border-orange-400/30";
    case "Sensors (IoT, GIS)": return "from-pink-400/20 to-pink-400/5 border-pink-400/30";
    default: return "from-accent-green/20 to-accent-green/5 border-accent-green/30";
  }
};

export default function UseCaseModal({ usecase, isOpen, onClose }: UseCaseModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!usecase) return null;

  const Icon = getInputIcon(usecase.input);
  const colorClass = getInputColor(usecase.input);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl bg-primary-bg border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="sticky top-6 right-6 ml-auto z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors float-right"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <div className="p-8 pt-2 max-h-[90vh] overflow-y-auto">
                {/* Title & Category */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "px-4 py-2 rounded-full border backdrop-blur-md bg-gradient-to-r flex items-center gap-2",
                      colorClass
                    )}>
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                      <span className="text-sm font-semibold text-white">{usecase.input}</span>
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
                    {usecase.title}
                  </h2>
                  <p className="text-lg text-accent-green font-medium">
                    {usecase.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  {usecase.description}
                </p>

                {/* Video or Image */}
                {usecase.videoUrl ? (
                  <div className="relative w-full mb-8 rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${usecase.videoUrl.split('/').pop()?.split('?')[0]}`}
                      title={usecase.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative h-80 w-full overflow-hidden rounded-2xl mb-8">
                    <img
                      src={usecase.demoAsset}
                      alt={usecase.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Grid Layout */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Beneficiaries */}
                  <div className="glass-dark rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-accent-blue" />
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                        Potential Customers
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {usecase.potentialCustomers.slice(0, 6).map((customer) => (
                        <span
                          key={customer}
                          className="px-3 py-1.5 bg-accent-blue/10 border border-accent-blue/30 rounded-lg text-sm text-accent-blue"
                        >
                          {customer}
                        </span>
                      ))}
                      {usecase.potentialCustomers.length > 6 && (
                        <span className="px-3 py-1.5 text-sm text-text-muted">
                          +{usecase.potentialCustomers.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="glass-dark rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-accent-green" />
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                        Key Outputs
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {usecase.outputs.map((output, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                          <span>{output}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Tags
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {usecase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-text-secondary hover:border-accent-green/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Integration */}
                <div className="glass-dark rounded-xl p-5 mb-8">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                    Platform Integration
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <div className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border",
                      usecase.integration.edge
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : "bg-white/5 border-white/10 opacity-50"
                    )}>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        usecase.integration.edge ? "bg-emerald-500" : "bg-white/30"
                      )} />
                      <span className={cn(
                        "text-sm font-medium",
                        usecase.integration.edge ? "text-emerald-400" : "text-text-muted"
                      )}>
                        Edgeverse
                      </span>
                    </div>
                    <div className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border",
                      usecase.integration.pulse
                        ? "bg-blue-500/10 border-blue-500/30"
                        : "bg-white/5 border-white/10 opacity-50"
                    )}>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        usecase.integration.pulse ? "bg-blue-500" : "bg-white/30"
                      )} />
                      <span className={cn(
                        "text-sm font-medium",
                        usecase.integration.pulse ? "text-blue-400" : "text-text-muted"
                      )}>
                        Pulse
                      </span>
                    </div>
                    <div className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border",
                      usecase.integration.sentinel
                        ? "bg-purple-500/10 border-purple-500/30"
                        : "bg-white/5 border-white/10 opacity-50"
                    )}>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        usecase.integration.sentinel ? "bg-purple-500" : "bg-white/30"
                      )} />
                      <span className={cn(
                        "text-sm font-medium",
                        usecase.integration.sentinel ? "text-purple-400" : "text-text-muted"
                      )}>
                        Sentinel
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-green to-accent-blue rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                    Request Demo
                  </button>
                  <button className="px-6 py-3 glass-dark rounded-xl text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Spec
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
