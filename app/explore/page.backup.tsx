"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Building2, Briefcase } from "lucide-react";
import Header from "@/components/layout/Header";
import UseCaseModal from "@/components/ui/UseCaseModal";
import { UseCase } from "@/types";
import usecasesData from "@/content/usecases.json";

// Curated categories - Steve Jobs simplicity
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

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allUseCases = usecasesData.usecases as UseCase[];

  const filteredUseCases = useMemo(() => {
    const filtered = allUseCases.filter((usecase) => {
      const matchesCategory =
        selectedCategory === "All" ||
        usecase.category.includes(selectedCategory) ||
        (selectedCategory === "Enterprise" && (usecase.category.includes("Industrial") || usecase.category.includes("Enterprise"))) ||
        (selectedCategory === "Smart City" && usecase.category.includes("Transport"));

      const matchesSearch =
        searchQuery === "" ||
        usecase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usecase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        usecase.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });

    // Sort by input type order
    return filtered.sort((a, b) => {
      const aIndex = INPUT_ORDER.indexOf(a.input);
      const bIndex = INPUT_ORDER.indexOf(b.input);
      return aIndex - bIndex;
    });
  }, [allUseCases, selectedCategory, searchQuery]);

  const handleSelectUseCase = (usecase: UseCase) => {
    setSelectedUseCase(usecase);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-semibold text-white mb-3 tracking-tight">
              Solutions
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
              WiredLeap delivers intelligence across all real-world challenges—regardless of input feed
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "All"
                  ? "bg-white text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-white text-black"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </motion.div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            {filteredUseCases.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <h3 className="text-2xl font-medium text-white mb-2">No solutions found</h3>
                <p className="text-slate-400 mb-6">Try a different search or category</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all"
                >
                  Clear
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredUseCases.map((usecase, index) => (
                  <motion.div
                    key={usecase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    onClick={() => handleSelectUseCase(usecase)}
                    className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden bg-black">
                      <img
                        src={usecase.demoAsset}
                        alt={usecase.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                          e.currentTarget.src = `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-green transition-colors">
                        {usecase.title}
                      </h3>

                      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                        {usecase.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {usecase.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Input Type Badge */}
                      <div className="flex gap-1.5">
                        <span className={`text-xs px-2 py-1 rounded-md border font-medium ${INPUT_COLORS[usecase.input] || "bg-gray-500/15 text-gray-400 border-gray-500/30"}`}>
                          {usecase.input}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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
