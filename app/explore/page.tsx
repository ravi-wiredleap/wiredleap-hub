"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, Shield, Building2, Briefcase, Video, Radio, Globe2, FileText, Cpu, Brain, Eye, Zap, Check, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import UseCaseModal from "@/components/ui/UseCaseModal";
import { UseCase } from "@/types";
import usecasesData from "@/content/usecases.json";

// Curated categories
const CATEGORIES = [
  { id: "Public Safety", label: "Public Safety", icon: Shield },
  { id: "Smart City", label: "Smart Cities", icon: Building2 },
  { id: "Enterprise", label: "Enterprise", icon: Briefcase },
];

// Input type colors
const INPUT_COLORS: { [key: string]: string } = {
  "Visual": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Audio": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Social Media": "bg-pink-500/15 text-pink-400 border-pink-500/30",
  "Text": "bg-green-500/15 text-green-400 border-green-500/30",
  "Sensors (IoT, GIS)": "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

// Input type order for sorting
const INPUT_ORDER = ["Visual", "Sensors (IoT, GIS)", "Social Media", "Text", "Audio"];

// Input Feed Definitions with actual visual representations
const INPUT_FEEDS = [
  {
    id: "Visual",
    label: "Visual",
    icon: Video,
    color: "from-blue-500 to-cyan-500",
    description: "CCTV, Cameras, Drones",
    visualImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80" // Drone aerial footage
  },
  {
    id: "Sensors (IoT, GIS)",
    label: "Sensors",
    icon: Cpu,
    color: "from-orange-500 to-amber-500",
    description: "IoT, GIS, Environmental",
    visualImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80" // IoT sensors dashboard
  },
  {
    id: "Social Media",
    label: "Social Media",
    icon: Globe2,
    color: "from-pink-500 to-purple-500",
    description: "Twitter, Facebook, News",
    showSocialIcons: true // Display actual social media platform icons
  },
  {
    id: "Text",
    label: "Text",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    description: "Documents, Reports, Logs",
    visualImage: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80" // Documents and reports
  },
  {
    id: "Audio",
    label: "Audio",
    icon: Radio,
    color: "from-purple-500 to-indigo-500",
    description: "Voice, Alerts, Calls",
    showWaveform: true // Display audio waveform visualization
  },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedInputFeed, setSelectedInputFeed] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const allUseCases = usecasesData.usecases as UseCase[];

  // Typing animation for hero statement
  const heroText = "WiredLeap transforms global signals — from cameras to conversations — into a unified layer of intelligence.";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typedText.length < heroText.length) {
      timeout = setTimeout(() => {
        setTypedText(heroText.slice(0, typedText.length + 1));
      }, 30);
    }
    return () => clearTimeout(timeout);
  }, [typedText]);

  // Cycling animation for input types in subtitle
  const inputTypes = ["Visual", "Sensors", "Social Media", "Text", "Audio"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInputIndex((prev) => (prev + 1) % inputTypes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredUseCases = useMemo(() => {
    const filtered = allUseCases.filter((usecase) => {
      const matchesCategory =
        selectedCategory === "All" ||
        usecase.category.includes(selectedCategory) ||
        (selectedCategory === "Enterprise" && (usecase.category.includes("Industrial") || usecase.category.includes("Enterprise"))) ||
        (selectedCategory === "Smart City" && usecase.category.includes("Transport"));

      const matchesInputFeed =
        !selectedInputFeed || usecase.input === selectedInputFeed;

      const matchesSearch =
        searchQuery === "" ||
        usecase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usecase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usecase.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesInputFeed && matchesSearch;
    });

    // Sort by input type order
    return filtered.sort((a, b) => {
      const aIndex = INPUT_ORDER.indexOf(a.input);
      const bIndex = INPUT_ORDER.indexOf(b.input);
      return aIndex - bIndex;
    });
  }, [allUseCases, selectedCategory, selectedInputFeed, searchQuery]);

  const handleSelectUseCase = (usecase: UseCase) => {
    setSelectedUseCase(usecase);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Sticky Navbar with Blur */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <Header />
      </div>

      <div className="relative z-10 pt-16 pb-12 px-8">
        {/* Hero Statement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <div className="mb-6">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Global Intelligence Command Center
            </motion.h1>
            <p className="text-slate-300 text-lg leading-relaxed font-light tracking-wide">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-cyan-400 ml-1"
              />
            </p>
          </div>

          {/* Animated Subtitle with Input Types */}
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-slate-500">Unifying</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={inputTypes[currentInputIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 min-w-[120px]"
              >
                {inputTypes[currentInputIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="text-slate-500">→</span>
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Actionable Intelligence
            </span>
          </div>
        </motion.div>

        {/* Main Layout: Input Feeds → Intelligence → Use Cases */}
        <div className="relative flex items-center justify-center gap-8 max-w-[1800px] mx-auto h-[calc(100vh-280px)]">
          {/* LEFT: Input Feeds - Glowing Animated Icons (20% width) */}
          <div className="w-[20%] flex-shrink-0 flex flex-col h-full">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 font-semibold text-xs mb-4 text-center uppercase tracking-[0.2em]"
            >
              Input Feeds
            </motion.h3>
            <div className="flex flex-col gap-3 flex-1 justify-center">
              {INPUT_FEEDS.map((feed, index) => {
                const Icon = feed.icon;
                const isActive = selectedInputFeed === feed.id;

                return (
                  <motion.div
                    key={feed.id}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.5, type: "spring" }}
                    onClick={() => setSelectedInputFeed(isActive ? null : feed.id)}
                    className="relative group cursor-pointer"
                  >
                    {/* Glowing Background Card */}
                    <div className={`relative rounded-xl overflow-hidden backdrop-blur-xl transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-white/10 to-white/5 shadow-2xl ring-2 ring-cyan-400/50'
                        : 'bg-white/5 hover:bg-white/10 hover:shadow-xl'
                    }`}
                      style={{
                        boxShadow: isActive ? `0 0 40px ${feed.color.includes('blue') ? 'rgba(6, 182, 212, 0.3)' : feed.color.includes('orange') ? 'rgba(249, 115, 22, 0.3)' : feed.color.includes('pink') ? 'rgba(236, 72, 153, 0.3)' : feed.color.includes('green') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(168, 85, 247, 0.3)'}` : 'none'
                      }}
                    >
                      <div className="relative w-full p-3 flex flex-col items-center justify-center">
                        {/* Glowing Icon */}
                        <motion.div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feed.color} flex items-center justify-center mb-1.5 relative`}
                          animate={{
                            boxShadow: isActive
                              ? ['0 0 20px rgba(99, 102, 241, 0.5)', '0 0 40px rgba(99, 102, 241, 0.8)', '0 0 20px rgba(99, 102, 241, 0.5)']
                              : '0 0 0px rgba(99, 102, 241, 0)'
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Icon className="w-5 h-5 text-white relative z-10" />
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"
                              animate={{ opacity: [0.5, 0.8, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </motion.div>

                        {/* Label */}
                        <p className={`text-[10px] font-semibold transition-all duration-300 ${
                          isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500' : 'text-slate-400 group-hover:text-slate-300'
                        }`}>
                          {feed.label}
                        </p>

                        {/* Glow Effect on Hover */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feed.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      </div>
                    </div>

                    {/* Animated Connection Line to Intelligence */}
                    {isActive && (
                      <motion.svg
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 w-24 h-2 pointer-events-none z-20"
                      >
                        <motion.line
                          x1="0"
                          y1="1"
                          x2="96"
                          y2="1"
                          stroke="url(#gradient-flow)"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          initial={{ strokeDashoffset: 10 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <defs>
                          <linearGradient id="gradient-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
                            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.8)" />
                            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
                          </linearGradient>
                        </defs>
                      </motion.svg>
                    )}
                  </motion.div>
                );
              })}
              </div>
            </div>

            {/* CENTER: WiredLeap Intelligence - Pulsating AI Core */}
            <div className="relative flex-shrink-0 flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                className="relative"
              >
                {/* Pulsating Outer Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                    filter: 'blur(20px)'
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
                    filter: 'blur(30px)'
                  }}
                />

                {/* Main AI Core Card */}
                <motion.div
                  className="relative rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-purple-900/40 border border-purple-400/30 p-8 shadow-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 60px rgba(168, 85, 247, 0.4)',
                      '0 0 80px rgba(236, 72, 153, 0.6)',
                      '0 0 60px rgba(168, 85, 247, 0.4)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Neural Network Background Pattern */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 1px, transparent 1px), radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.4) 1px, transparent 1px)',
                      backgroundSize: '50px 50px'
                    }} />
                  </div>

                  {/* Glowing Brain Icon */}
                  <div className="relative mb-6">
                    <motion.div
                      className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center relative"
                      animate={{
                        boxShadow: [
                          '0 0 30px rgba(168, 85, 247, 0.6)',
                          '0 0 50px rgba(236, 72, 153, 0.8)',
                          '0 0 30px rgba(168, 85, 247, 0.6)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Brain className="w-12 h-12 text-white relative z-10" />
                      <Sparkles className="w-4 h-4 text-cyan-300 absolute top-1 right-1 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 text-center mb-1">
                    WiredLeap
                  </h2>
                  <p className="text-sm text-purple-300/80 font-medium text-center mb-8 tracking-wider">
                    AI CORE
                  </p>

                  {/* Capabilities with Animated Checkmarks */}
                  <div className="space-y-3">
                    {[
                      { icon: Zap, label: "Real-time Processing", color: "text-cyan-400" },
                      { icon: Eye, label: "Predictive Analytics", color: "text-blue-400" },
                      { icon: Shield, label: "Threat Detection", color: "text-emerald-400" },
                      { icon: Brain, label: "Pattern Recognition", color: "text-purple-400" }
                    ].map((capability, idx) => (
                      <motion.div
                        key={capability.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <motion.div
                          className={`w-5 h-5 rounded-md bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Check className={`w-3 h-3 ${capability.color}`} />
                        </motion.div>
                        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                          {capability.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Animated Line to Solutions */}
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 w-24 h-2 pointer-events-none z-20 ml-4"
                >
                  <motion.line
                    x1="0"
                    y1="1"
                    x2="96"
                    y2="1"
                    stroke="url(#gradient-output)"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ strokeDashoffset: 10 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <defs>
                    <linearGradient id="gradient-output" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                      <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </motion.div>
            </div>

            {/* RIGHT: Solutions Grid - Enhanced with Parallax */}
            <div className="flex-1 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <motion.h3
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 font-semibold text-xs uppercase tracking-[0.2em]"
                >
                  Intelligence Solutions
                </motion.h3>
                {selectedInputFeed && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedInputFeed(null)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20 hover:border-cyan-500/40 transition-all backdrop-blur-sm"
                  >
                    Clear Filter
                  </motion.button>
                )}
              </div>

              <motion.div
                ref={gridRef}
                style={{ y }}
                className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent"
              >
                <AnimatePresence mode="wait">
                  {filteredUseCases.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-24 rounded-2xl border border-white/5 bg-white/[0.02]"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">No solutions found</h3>
                      <p className="text-slate-400 text-sm mb-6">Try selecting a different input feed</p>
                      <button
                        onClick={() => setSelectedInputFeed(null)}
                        className="px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-xl hover:bg-white/15 transition-all border border-white/10"
                      >
                        Clear Filter
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={selectedInputFeed || 'all'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-3 gap-5"
                    >
                      {filteredUseCases.map((usecase, index) => {
                        // Generate subtitle based on use case category
                        const subtitle = usecase.category.includes("Public Safety") ? "Public Safety" :
                                       usecase.category.includes("Smart City") ? "Smart City" :
                                       usecase.category.includes("Transport") ? "Transport" :
                                       usecase.category.includes("Enterprise") ? "Enterprise" : "AI Solution";

                        // Generate AI tag based on input type
                        const aiTag = usecase.input === "Visual" ? "AI + Vision" :
                                     usecase.input === "Sensors (IoT, GIS)" ? "AI + IoT" :
                                     usecase.input === "Social Media" ? "Social Intelligence" :
                                     usecase.input === "Text" ? "AI + NLP" :
                                     "AI + Audio";

                        return (
                          <motion.div
                            key={usecase.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              delay: index * 0.03,
                              duration: 0.4,
                              type: "spring",
                              stiffness: 100
                            }}
                            onClick={() => handleSelectUseCase(usecase)}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer"
                          >
                            {/* Glowing Border on Hover */}
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500 blur-xl"
                              whileHover={{ scale: 1.05 }}
                            />

                            {/* Card Container */}
                            <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group-hover:border-cyan-400/50 transition-all duration-500 group-hover:shadow-2xl">
                              {/* Image Section */}
                              <div className="relative h-36 overflow-hidden bg-gradient-to-br from-slate-900 to-black">
                                <motion.img
                                  src={usecase.demoAsset}
                                  alt={usecase.title}
                                  className="w-full h-full object-cover opacity-60"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.6 }}
                                  onError={(e) => {
                                    e.currentTarget.src = `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80`;
                                  }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                {/* Glassy Overlay on Hover with Description */}
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  whileHover={{ opacity: 1, y: 0 }}
                                  className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-md flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                                >
                                  <p className="text-white text-sm text-center font-light leading-relaxed line-clamp-4">
                                    {usecase.description}
                                  </p>
                                </motion.div>

                                {/* AI Tag - Top Right */}
                                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-400/30">
                                  <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 tracking-wide">
                                    {aiTag}
                                  </span>
                                </div>
                              </div>

                              {/* Content Section */}
                              <div className="p-4 space-y-2">
                                {/* Title */}
                                <h3 className="text-sm font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2 leading-snug">
                                  {usecase.title}
                                </h3>

                                {/* Subtitle */}
                                <p className="text-xs text-slate-400 font-medium">
                                  {subtitle}
                                </p>

                                {/* Input Type Badge */}
                                <div className="pt-1">
                                  <span className={`inline-block text-[10px] px-2.5 py-1 rounded-lg font-semibold border ${INPUT_COLORS[usecase.input] || "bg-gray-500/15 text-gray-400 border-gray-500/30"}`}>
                                    {usecase.input}
                                  </span>
                                </div>
                              </div>

                              {/* Shimmer Effect on Hover */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
        </div>
      </div>

      {/* Modal */}
      <UseCaseModal
        usecase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
