"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, Filter } from "lucide-react";
import { FilterState, InputCategory } from "@/types";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: string[];
  personas: string[];
}

const inputCategories: InputCategory[] = ["All", "Visual", "Audio", "Social Media", "Text", "Sensors (IoT, GIS)"];

export default function FilterPanel({ filters, onChange, categories, personas }: FilterPanelProps) {
  const [showCategories, setShowCategories] = useState(false);
  const [showPersonas, setShowPersonas] = useState(false);

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: newCategories });
  };

  const togglePersona = (persona: string) => {
    const newPersonas = filters.personas.includes(persona)
      ? filters.personas.filter((p) => p !== persona)
      : [...filters.personas, persona];
    onChange({ ...filters, personas: newPersonas });
  };

  const clearFilters = () => {
    onChange({
      input: "All",
      categories: [],
      personas: [],
      searchQuery: "",
    });
  };

  const activeFilterCount =
    (filters.input !== "All" ? 1 : 0) +
    filters.categories.length +
    filters.personas.length +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="glass-dark rounded-2xl p-6 sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent-green" />
          <h2 className="text-lg font-bold text-white">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-accent-green/20 text-accent-green text-xs rounded-full font-medium">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-text-muted hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-text-secondary mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            id="search"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search use cases..."
            className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ ...filters, searchQuery: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Input Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Input Type
        </label>
        <div className="flex flex-wrap gap-2">
          {inputCategories.map((input) => (
            <button
              key={input}
              onClick={() => onChange({ ...filters, input })}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                filters.input === input
                  ? "bg-accent-green text-primary-bg"
                  : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10"
              )}
            >
              {input}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="flex items-center justify-between w-full text-sm font-medium text-text-secondary mb-3 hover:text-white transition-colors"
        >
          <span>Categories ({filters.categories.length})</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              showCategories && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {showCategories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 overflow-hidden"
            >
              {categories.slice(0, 10).map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent-green focus:ring-accent-green/50 focus:ring-offset-0"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Personas */}
      <div>
        <button
          onClick={() => setShowPersonas(!showPersonas)}
          className="flex items-center justify-between w-full text-sm font-medium text-text-secondary mb-3 hover:text-white transition-colors"
        >
          <span>Personas ({filters.personas.length})</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              showPersonas && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {showPersonas && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 overflow-hidden"
            >
              {personas.slice(0, 15).map((persona) => (
                <label
                  key={persona}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.personas.includes(persona)}
                    onChange={() => togglePersona(persona)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent-green focus:ring-accent-green/50 focus:ring-offset-0"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                    {persona}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
