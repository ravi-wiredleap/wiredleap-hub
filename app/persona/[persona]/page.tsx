"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Shield, Building2, Trees, Briefcase, Heart, UserCircle, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import UseCaseCard from "@/components/ui/UseCaseCard";
import UseCaseModal from "@/components/ui/UseCaseModal";
import { UseCase } from "@/types";
import usecasesData from "@/content/usecases.json";

const personaConfig: Record<string, { icon: any; title: string; description: string; color: string }> = {
  police: {
    icon: Shield,
    title: "Public Safety & Law Enforcement",
    description: "Advanced AI solutions for crime prevention, emergency response, and community safety",
    color: "from-blue-500 to-cyan-500",
  },
  "city-planner": {
    icon: Building2,
    title: "Smart City & Urban Planning",
    description: "Intelligent infrastructure for comprehensive city monitoring and management",
    color: "from-purple-500 to-pink-500",
  },
  conservation: {
    icon: Trees,
    title: "Conservation & Environment",
    description: "Technology-driven solutions for wildlife protection and environmental monitoring",
    color: "from-green-500 to-emerald-500",
  },
  enterprise: {
    icon: Briefcase,
    title: "Enterprise & Business",
    description: "AI-powered tools for operations, security, and business intelligence",
    color: "from-orange-500 to-red-500",
  },
  healthcare: {
    icon: Heart,
    title: "Healthcare & Medical",
    description: "Innovative solutions for patient care, monitoring, and medical operations",
    color: "from-rose-500 to-pink-500",
  },
};

export default function PersonaPage() {
  const params = useParams();
  const persona = params.persona as string;
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const config = personaConfig[persona] || personaConfig.enterprise;
  const Icon = config.icon;

  const allUseCases = usecasesData.usecases as UseCase[];

  const relevantUseCases = useMemo(() => {
    return allUseCases.filter((usecase) =>
      usecase.persona_relevance.some((p) =>
        p.toLowerCase().includes(persona.toLowerCase().replace("-", " "))
      )
    );
  }, [persona]);

  const handleSelectUseCase = (usecase: UseCase) => {
    setSelectedUseCase(usecase);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <Header />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${config.color} bg-opacity-10 border border-white/10 mb-6`}>
              <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                {persona.replace("-", " ")}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {config.title}
            </h1>

            <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">
              {config.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-green" />
                <span className="text-sm text-text-secondary">
                  <span className="text-white font-semibold text-lg">{relevantUseCases.length}</span> tailored solutions
                </span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-accent-blue" />
                <span className="text-sm text-text-secondary">
                  Curated for your needs
                </span>
              </div>
            </div>
          </motion.div>

          {/* Use Cases Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relevantUseCases.map((usecase, index) => (
              <motion.div
                key={usecase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <UseCaseCard
                  usecase={usecase}
                  onSelect={handleSelectUseCase}
                />
              </motion.div>
            ))}
          </div>

          {relevantUseCases.length === 0 && (
            <div className="text-center py-16">
              <Icon className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No use cases found</h3>
              <p className="text-text-secondary">
                Check back soon for tailored solutions for this persona
              </p>
            </div>
          )}
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
