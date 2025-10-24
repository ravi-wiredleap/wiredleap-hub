"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search, Shield, Building2, Briefcase, Video, Radio, Globe2, FileText, Cpu,
  Brain, Eye, Zap, Check, Sparkles, Camera, Waves, MessageCircle, FileText as Document,
  Activity, X, TrendingUp, Users, MapPin, AlertTriangle
} from "lucide-react";
import Header from "@/components/layout/Header";
import UseCaseDetailDashboard from "@/components/ui/UseCaseDetailDashboard";
import { UseCase } from "@/types";
import usecasesData from "@/content/usecases.json";

// Input type definitions with color palettes
const INPUT_TYPES = [
  {
    id: "Visual",
    label: "Visual",
    icon: Camera,
    glow: "rgba(59, 130, 246, 0.6)", // Blue
    gradient: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-400"
  },
  {
    id: "Audio",
    label: "Audio",
    icon: Waves,
    glow: "rgba(168, 85, 247, 0.6)", // Purple
    gradient: "from-purple-500 to-indigo-500",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-400"
  },
  {
    id: "Social Media",
    label: "Social",
    icon: MessageCircle,
    glow: "rgba(20, 184, 166, 0.6)", // Teal
    gradient: "from-teal-500 to-cyan-500",
    borderColor: "border-teal-500/50",
    textColor: "text-teal-400"
  },
  {
    id: "Text",
    label: "Text",
    icon: Document,
    glow: "rgba(245, 158, 11, 0.6)", // Amber
    gradient: "from-amber-500 to-yellow-500",
    borderColor: "border-amber-500/50",
    textColor: "text-amber-400"
  },
  {
    id: "Sensors (IoT, GIS)",
    label: "Sensors",
    icon: Activity,
    glow: "rgba(34, 197, 94, 0.6)", // Green
    gradient: "from-green-500 to-emerald-500",
    borderColor: "border-green-500/50",
    textColor: "text-green-400"
  },
];

// Persona definitions
const PERSONAS = [
  { id: "Public Safety", label: "Public Safety", icon: Shield },
  { id: "Smart City", label: "Smart City", icon: Building2 },
  { id: "Institutions", label: "Institutions", icon: Users },
  { id: "Enterprise", label: "Enterprise", icon: Briefcase },
];

export default function ExplorePage() {
  const [selectedInput, setSelectedInput] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coreAnimating, setCoreAnimating] = useState(false);
  const [showCards, setShowCards] = useState(true);

  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });

  const allUseCases = usecasesData.usecases as UseCase[];

  // Get the active input type config
  const activeInputConfig = INPUT_TYPES.find(input => input.id === selectedInput);

  // Check if viewing all
  const viewAll = !selectedInput && !selectedPersona && !searchQuery;

  // Handle input selection without animation
  const handleInputSelect = (inputId: string) => {
    if (selectedInput === inputId) {
      setSelectedInput(null);
    } else {
      setSelectedInput(inputId);
    }
  };

  // Handle persona selection
  const handlePersonaSelect = (personaId: string) => {
    if (selectedPersona === personaId) {
      setSelectedPersona(null);
    } else {
      setSelectedPersona(personaId);
    }
  };

  // Clear all filters
  const handleViewAll = () => {
    setSelectedInput(null);
    setSelectedPersona(null);
    setSearchQuery("");
    setShowCards(true);
  };

  // Filter use cases
  const filteredUseCases = useMemo(() => {
    return allUseCases.filter((usecase) => {
      const matchesInput = !selectedInput || usecase.input === selectedInput;

      const matchesPersona = !selectedPersona ||
        usecase.category.includes(selectedPersona) ||
        (selectedPersona === "Enterprise" && (usecase.category.includes("Industrial") || usecase.category.includes("Enterprise"))) ||
        (selectedPersona === "Smart City" && (usecase.category.includes("Transport") || usecase.category.includes("Smart City"))) ||
        (selectedPersona === "Institutions" && (usecase.category.includes("Institutions") || usecase.category.includes("Social Institutions")));

      const matchesSearch = !searchQuery ||
        usecase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usecase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(usecase.category) ? usecase.category : [usecase.category]).some(cat =>
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesInput && matchesPersona && matchesSearch;
    });
  }, [allUseCases, selectedInput, selectedPersona, searchQuery]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <Header />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-16 pb-8 px-8 text-center max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4"
          >
            Intelligence Universe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg font-light max-w-3xl mx-auto"
          >
            Explore how WiredLeap transforms diverse signal streams into actionable intelligence across industries
          </motion.p>
        </div>

        {/* Main Layout: Left Sidebar + Right Content */}
        <div className="flex gap-8 px-8 pb-20">
          {/* LEFT SIDEBAR - Fixed Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-80 flex-shrink-0"
          >
            <div className="sticky top-24 space-y-6">
              {/* Intelligence Receivers */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <Users className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Intelligence Receivers</h3>
                </div>
                <div className="space-y-2">
                  {PERSONAS.map((persona) => {
                    const Icon = persona.icon;
                    const isActive = selectedPersona === persona.id;

                    return (
                      <motion.button
                        key={persona.id}
                        onClick={() => handlePersonaSelect(persona.id)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                        style={{
                          boxShadow: isActive ? '0 0 20px rgba(168, 85, 247, 0.5)' : 'none'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span>{persona.label}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Signal Streams */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Signal Streams</h3>
                </div>
                <div className="space-y-2">
                  {INPUT_TYPES.map((input) => {
                    const Icon = input.icon;
                    const isActive = selectedInput === input.id;

                    return (
                      <motion.button
                        key={input.id}
                        onClick={() => handleInputSelect(input.id)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${input.gradient} text-white shadow-lg`
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                        style={{
                          boxShadow: isActive ? `0 0 20px ${input.glow}` : 'none'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span>{input.label}</span>
                        </div>

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                            style={{ background: input.glow }}
                            layoutId="activeIndicator"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Search & Actions */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search use cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                {/* Results Count */}
                {!viewAll && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-center text-slate-400"
                  >
                    <span className="font-semibold text-white text-lg">{filteredUseCases.length}</span>
                    <span className="block text-xs text-slate-500 mt-1">solutions found</span>
                  </motion.div>
                )}

                {/* View All Button */}
                <motion.button
                  onClick={handleViewAll}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    viewAll
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  style={{
                    boxShadow: viewAll ? '0 0 20px rgba(6, 182, 212, 0.4)' : 'none'
                  }}
                >
                  {viewAll ? '✓ Viewing All' : 'View All Cases'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT - Use Case Grid */}
          <div className="flex-1 min-w-0">

        {/* AI Core Animation Center */}
        <AnimatePresence>
          {coreAnimating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
            >
              {/* Neural Sphere Animation */}
              <div className="relative">
                {/* Outer pulsating rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: activeInputConfig?.glow || 'rgba(168, 85, 247, 0.6)',
                      width: 300 + i * 100,
                      height: 300 + i * 100,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Central Core */}
                <motion.div
                  className={`w-64 h-64 rounded-full bg-gradient-to-br ${activeInputConfig?.gradient || 'from-purple-500 to-pink-500'} flex items-center justify-center relative`}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 1 }}
                  style={{
                    boxShadow: `0 0 100px ${activeInputConfig?.glow || 'rgba(168, 85, 247, 0.8)'}`
                  }}
                >
                  <Brain className="w-32 h-32 text-white" />

                  {/* Flowing particles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [0, Math.cos(i * 30 * Math.PI / 180) * 150],
                        y: [0, Math.sin(i * 30 * Math.PI / 180) * 150],
                        opacity: [1, 0],
                        scale: [1, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + i * 0.05,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Elegant glow pulse instead of text */}
                <motion.div
                  className="absolute -bottom-32 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <div
                    className="w-48 h-1 rounded-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${activeInputConfig?.glow || 'rgba(168, 85, 247, 0.8)'}, transparent)`
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

            <AnimatePresence mode="wait">
              {showCards && (
                <motion.div
                  key={`${selectedInput}-${selectedPersona}-${viewAll}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  ref={gridRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                {filteredUseCases.map((usecase, index) => {
                  const inputConfig = INPUT_TYPES.find(input => input.id === usecase.input);
                  const Icon = inputConfig?.icon || Brain;

                  return (
                    <motion.div
                      key={usecase.id}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100
                      }}
                      onClick={() => {
                        setSelectedUseCase(usecase);
                        setIsModalOpen(true);
                      }}
                      className="group relative cursor-pointer"
                    >
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                        style={{
                          background: `radial-gradient(circle, ${inputConfig?.glow || 'rgba(168, 85, 247, 0.4)'} 0%, transparent 70%)`
                        }}
                      />

                      {/* Card */}
                      <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full">
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-black">
                          <motion.img
                            src={usecase.demoAsset}
                            alt={usecase.title}
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            onError={(e) => {
                              e.currentTarget.src = `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80`;
                            }}
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                          {/* Icon Badge */}
                          <motion.div
                            className={`absolute top-3 left-3 w-12 h-12 rounded-xl bg-gradient-to-br ${inputConfig?.gradient || 'from-purple-500 to-pink-500'} flex items-center justify-center`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            style={{
                              boxShadow: `0 0 20px ${inputConfig?.glow || 'rgba(168, 85, 247, 0.6)'}`
                            }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>

                          {/* Input Type Badge */}
                          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-md border ${inputConfig?.borderColor || 'border-purple-500/50'} ${inputConfig?.textColor || 'text-purple-400'} text-xs font-bold`}>
                            {usecase.input}
                          </div>

                          {/* Line pulse from center (simulating AI core connection) */}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{
                              background: `linear-gradient(to right, transparent, ${inputConfig?.glow || 'rgba(168, 85, 247, 0.8)'}, transparent)`
                            }}
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>

                        {/* Content Section */}
                        <div className="p-5 space-y-3">
                          {/* Title */}
                          <h3 className="text-base font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2 leading-tight">
                            {usecase.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                            {usecase.description}
                          </p>

                          {/* Intelligence Receivers - Extract all personas from category */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {(() => {
                              const categoryStr = Array.isArray(usecase.category) ? usecase.category.join(' / ') : usecase.category;
                              const receivers = [];

                              if (categoryStr.includes("Public Safety")) receivers.push("Public Safety");
                              if (categoryStr.includes("Smart City")) receivers.push("Smart City");
                              if (categoryStr.includes("Institutions") || categoryStr.includes("Social Institutions")) receivers.push("Institutions");
                              if (categoryStr.includes("Enterprise") || categoryStr.includes("Industrial") || categoryStr.includes("Retail") || categoryStr.includes("Manufacturing") || categoryStr.includes("Logistics") || categoryStr.includes("Finance") || categoryStr.includes("Legal") || categoryStr.includes("Marketing") || categoryStr.includes("Compliance") || categoryStr.includes("Building")) {
                                if (!receivers.includes("Enterprise")) receivers.push("Enterprise");
                              }

                              return receivers.map((receiver, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 text-xs font-semibold border border-purple-500/30"
                                >
                                  {receiver}
                                </span>
                              ));
                            })()}
                          </div>
                        </div>

                        {/* Hover shimmer */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {showCards && filteredUseCases.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                  <Search className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No solutions found</h3>
                <p className="text-slate-400 mb-8">Try adjusting your filters or view all use cases</p>
                <motion.button
                  onClick={handleViewAll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold"
                >
                  View All Use Cases
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <UseCaseDetailDashboard
        usecase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectUseCase={(usecase) => setSelectedUseCase(usecase)}
      />
    </div>
  );
}
