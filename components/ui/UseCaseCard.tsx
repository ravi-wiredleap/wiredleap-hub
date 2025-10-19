"use client";

import { motion } from "framer-motion";
import { Eye, Mic, Globe, FileText, Cpu, Plus, ExternalLink } from "lucide-react";
import { UseCase } from "@/types";
import { cn } from "@/lib/utils";

interface UseCaseCardProps {
  usecase: UseCase;
  onSelect?: (usecase: UseCase) => void;
  onAdd?: (usecase: UseCase) => void;
}

const getInputIcon = (input: string) => {
  switch (input) {
    case "Visual":
      return Eye;
    case "Audio":
      return Mic;
    case "Social Media":
      return Globe;
    case "Text":
      return FileText;
    case "Sensors (IoT, GIS)":
      return Cpu;
    default:
      return Eye;
  }
};

const getInputColor = (input: string) => {
  switch (input) {
    case "Visual":
      return "text-accent-green border-accent-green/30 bg-accent-green/10";
    case "Audio":
      return "text-accent-blue border-accent-blue/30 bg-accent-blue/10";
    case "Social Media":
      return "text-purple-400 border-purple-400/30 bg-purple-400/10";
    case "Text":
      return "text-orange-400 border-orange-400/30 bg-orange-400/10";
    case "Sensors (IoT, GIS)":
      return "text-pink-400 border-pink-400/30 bg-pink-400/10";
    default:
      return "text-accent-green border-accent-green/30 bg-accent-green/10";
  }
};

export default function UseCaseCard({ usecase, onSelect, onAdd }: UseCaseCardProps) {
  const Icon = getInputIcon(usecase.input);
  const colorClass = getInputColor(usecase.input);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={() => onSelect?.(usecase)}
      role="button"
      tabIndex={0}
      aria-label={usecase.title}
      className="group relative glass-dark rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent-green/30"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-accent-green/10 to-accent-blue/10">
        <img
          src={usecase.demoAsset}
          alt={usecase.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/50 to-transparent opacity-80" />

        {/* Input Category Badge */}
        <div className={cn(
          "absolute top-4 left-4 px-3 py-1.5 rounded-full border backdrop-blur-sm flex items-center gap-2",
          colorClass
        )}>
          <Icon className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="text-xs font-medium">{usecase.input}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-accent-green transition-colors">
          {usecase.title}
        </h3>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
          {usecase.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {usecase.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-text-secondary hover:border-accent-green/30 transition-colors"
            >
              {tag}
            </span>
          ))}
          {usecase.tags.length > 3 && (
            <span className="text-xs px-2.5 py-1 text-text-muted">
              +{usecase.tags.length - 3}
            </span>
          )}
        </div>

        {/* Integration Badges */}
        <div className="flex items-center gap-2 mb-4">
          {usecase.integration.edge && (
            <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] text-emerald-400 font-medium">
              EDGE
            </div>
          )}
          {usecase.integration.pulse && (
            <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-[10px] text-blue-400 font-medium">
              PULSE
            </div>
          )}
          {usecase.integration.sentinel && (
            <div className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded text-[10px] text-purple-400 font-medium">
              SENTINEL
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd?.(usecase);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-green hover:bg-accent-green/10 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors">
            <span>Details</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-accent-green/5 to-transparent" />
      </div>
    </motion.article>
  );
}
