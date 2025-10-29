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
  const [allUseCases, setAllUseCases] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cycling stream types for subtitle animation
  const streamTypes = ["visual", "audio", "social", "text", "sensor"];
  const streamColors = ["text-blue-400", "text-purple-400", "text-teal-400", "text-amber-400", "text-green-400"];
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);

  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });

  // Fetch use cases from API on mount
  useEffect(() => {
    const fetchUseCases = async () => {
      try {
        const response = await fetch('/api/usecases');
        const result = await response.json();
        const excludedIds = new Set<string>([
          'visual-contraband-prison',
          'visual-accident-detection',
          'visual-warehouse-automation',
          'text-document-extraction',
          'text-emergency-sms',
        ]);
        const filtered = (result.data || []).filter((uc: UseCase) => !excludedIds.has(uc.id));
        setAllUseCases(filtered);
      } catch (error) {
        console.error('Failed to load use cases:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUseCases();
  }, []);

  // Cycle through stream types every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStreamIndex((prev) => (prev + 1) % streamTypes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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

  // Define priority order for use cases by ID
  const useCasePriority: { [key: string]: number } = {
    // Visual (highest priority)
    "visual-crowd-management": 1,
    "visual-facial-recognition": 2,
    "visual-vehicle-classification": 3,
    "visual-traffic-congestion": 4,
    "visual-perimeter-intrusion": 5,
    "visual-loitering-detection": 6,
    "visual-accident-detection": 7,
    "visual-illegal-parking": 8,
    "visual-potholes": 9,
    "visual-fire-detection": 10,
    "visual-abandoned-objects": 11,
    "visual-suspicious-behavior": 12,
    "visual-graffiti-detection": 13,
    "visual-wrong-way-driving": 14,
    "visual-unauthorized-access": 15,

    // Audio
    "audio-gunshot-detection": 16,
    "audio-glass-break": 17,
    "audio-distress-sounds": 18,
    "audio-aggression": 19,
    "audio-noise-monitoring": 20,
    "audio-explosion-detection": 21,

    // Social Media
    "social-threat-detection": 22,
    "social-sentiment-analysis": 23,
    "social-misinformation": 24,
    "social-crisis-monitoring": 25,
    "social-brand-monitoring": 26,

    // Text
    "text-hate-speech": 27,
    "text-fraud-detection": 28,
    "text-compliance-monitoring": 29,
    "text-document-analysis": 30,

    // Sensors
    "sensors-air-quality": 31,
    "sensors-water-quality": 32,
    "sensors-temperature": 33,
    "sensors-seismic": 34,
    "sensors-radiation": 35,
    "sensors-flood": 36,
    "sensors-waste-management": 37,
    "sensors-energy": 38,
    "sensors-parking": 39,
    "sensors-traffic-flow": 40,
    "sensors-fleet-tracking": 41,
    "sensors-indoor-tracking": 42,
  };

  // Filter and sort use cases
  const filteredUseCases = useMemo(() => {
    const filtered = allUseCases.filter((usecase) => {
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

    // Sort by priority
    return filtered.sort((a, b) => {
      const priorityA = useCasePriority[a.id] || 999;
      const priorityB = useCasePriority[b.id] || 999;
      return priorityA - priorityB;
    });
  }, [allUseCases, selectedInput, selectedPersona, searchQuery]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
          />
          <p className="text-slate-400">Loading intelligence universe...</p>
        </div>
      </div>
    );
  }

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
        <div className="pt-20 pb-4 px-8 text-center max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-5 leading-tight"
            style={{ lineHeight: 1.2, paddingTop: '4px', paddingBottom: '4px' }}
          >
            Intelligence Universe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base font-light max-w-5xl mx-auto whitespace-nowrap"
          >
            Explore how WiredLeap transforms{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStreamIndex}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`inline-block font-bold ${streamColors[currentStreamIndex]} px-2.5 py-0.5 rounded-lg text-lg relative`}
                style={{
                  minWidth: '80px',
                  textAlign: 'center',
                  textShadow: `0 0 20px ${streamColors[currentStreamIndex] === 'text-blue-400' ? 'rgba(59, 130, 246, 0.6)' :
                    streamColors[currentStreamIndex] === 'text-purple-400' ? 'rgba(168, 85, 247, 0.6)' :
                    streamColors[currentStreamIndex] === 'text-teal-400' ? 'rgba(20, 184, 166, 0.6)' :
                    streamColors[currentStreamIndex] === 'text-amber-400' ? 'rgba(245, 158, 11, 0.6)' :
                    'rgba(34, 197, 94, 0.6)'}`,
                  background: `linear-gradient(135deg, ${
                    streamColors[currentStreamIndex] === 'text-blue-400' ? 'rgba(59, 130, 246, 0.15)' :
                    streamColors[currentStreamIndex] === 'text-purple-400' ? 'rgba(168, 85, 247, 0.15)' :
                    streamColors[currentStreamIndex] === 'text-teal-400' ? 'rgba(20, 184, 166, 0.15)' :
                    streamColors[currentStreamIndex] === 'text-amber-400' ? 'rgba(245, 158, 11, 0.15)' :
                    'rgba(34, 197, 94, 0.15)'
                  }, transparent)`,
                  border: `1px solid ${
                    streamColors[currentStreamIndex] === 'text-blue-400' ? 'rgba(59, 130, 246, 0.3)' :
                    streamColors[currentStreamIndex] === 'text-purple-400' ? 'rgba(168, 85, 247, 0.3)' :
                    streamColors[currentStreamIndex] === 'text-teal-400' ? 'rgba(20, 184, 166, 0.3)' :
                    streamColors[currentStreamIndex] === 'text-amber-400' ? 'rgba(245, 158, 11, 0.3)' :
                    'rgba(34, 197, 94, 0.3)'
                  }`
                }}
              >
                {streamTypes[currentStreamIndex]}
              </motion.span>
            </AnimatePresence>
            {" "}streams into actionable intelligence across industries
          </motion.p>
        </div>

        {/* Main Layout: Left Sidebar + Right Content */}
        <div className="flex gap-8 px-8 pb-20">
          {/* LEFT SIDEBAR - Fixed Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-64 flex-shrink-0"
          >
            <div className="sticky top-24 space-y-3">
              {/* Search & Actions */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-3.5 shadow-2xl space-y-2.5">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search use cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                {/* Results Count */}
                {!viewAll && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-center text-slate-400 py-1"
                  >
                    <span className="font-semibold text-white text-base">{filteredUseCases.length}</span>
                    <span className="block text-xs text-slate-500">solutions found</span>
                  </motion.div>
                )}

                {/* View All Button */}
                <motion.button
                  onClick={handleViewAll}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
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

              {/* Signal Streams */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-3.5 shadow-2xl">
                <div className="flex items-center gap-2 mb-2.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Signal Streams</h3>
                </div>
                <div className="space-y-1.5">
                  {INPUT_TYPES.map((input) => {
                    const Icon = input.icon;
                    const isActive = selectedInput === input.id;

                    return (
                      <motion.button
                        key={input.id}
                        onClick={() => handleInputSelect(input.id)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full px-2.5 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${input.gradient} text-white shadow-lg`
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                        style={{
                          boxShadow: isActive ? `0 0 20px ${input.glow}` : 'none'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" />
                          <span>{input.label}</span>
                        </div>

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                            style={{ background: input.glow }}
                            layoutId="activeIndicator"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Intelligence Receivers */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-3.5 shadow-2xl">
                <div className="flex items-center gap-2 mb-2.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Intelligence Receivers</h3>
                </div>
                <div className="space-y-1.5">
                  {PERSONAS.map((persona) => {
                    const Icon = persona.icon;
                    const isActive = selectedPersona === persona.id;

                    return (
                      <motion.button
                        key={persona.id}
                        onClick={() => handlePersonaSelect(persona.id)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-2.5 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                        style={{
                          boxShadow: isActive ? '0 0 20px rgba(168, 85, 247, 0.5)' : 'none'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" />
                          <span>{persona.label}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
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

                      {/* Card - Full Image with Title on Hover */}
                      <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-500 h-80">
                        {/* Full Image Section */}
                        <div className="relative h-full overflow-hidden bg-gradient-to-br from-slate-900 to-black">
                          <motion.img
                            src={usecase.demoAsset}
                            alt={usecase.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-50"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            onError={(e) => {
                              e.currentTarget.src = `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80`;
                            }}
                          />

                          {/* Gradient Overlay - stronger on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/60 transition-all duration-500" />

                          {/* Icon Badge */}
                          <motion.div
                            className={`absolute top-3 left-3 w-12 h-12 rounded-xl bg-gradient-to-br ${inputConfig?.gradient || 'from-purple-500 to-pink-500'} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            style={{
                              boxShadow: `0 0 20px ${inputConfig?.glow || 'rgba(168, 85, 247, 0.6)'}`
                            }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>

                          {/* Title - Only visible on hover, centered */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                          >
                            <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
                              {usecase.title}
                            </h3>
                          </motion.div>

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
