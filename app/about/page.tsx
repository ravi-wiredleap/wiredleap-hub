"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Cpu,
  Shield,
  Target,
  Users,
  Award,
  Eye,
  Heart,
  Lock,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Globe,
  Lightbulb,
  Building2,
  Brain,
  Network,
  Activity
} from "lucide-react";
import Header from "@/components/layout/Header";

const teamMembers = [
  {
    name: "Ravi Kavuri",
    role: "CEO",
    initials: "RK",
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/Team/Ravi Kavuri.png"
  },
  {
    name: "Subhash Choudhary",
    role: "CTO",
    initials: "SC",
    gradient: "from-purple-500 to-pink-500",
    image: "/images/Team/Subhash Chaudhary.png"
  },
  {
    name: "Suumit Shah",
    role: "Growth & Product Advisor",
    initials: "SS",
    gradient: "from-emerald-500 to-teal-500",
    image: "/images/Team/Suumit Shah.png"
  }
];

const clientLogos = [
  { name: "Bengaluru City Police", logo: "/images/clients/Bengaluru-City-Police.webp" },
  { name: "Bhubaneswar Smart City", logo: "/images/clients/Bhubaneswar-Smart-City.png" },
  { name: "BMC", logo: "/images/clients/BMC.jpeg" },
  { name: "ITPL Bengaluru", logo: "/images/clients/ITPL-Bengaluru.jpeg" },
  { name: "Chikmagalur Police", logo: "/images/clients/Chikmagalur-Police.png" },
  { name: "Puri District Administration", logo: "/images/clients/Puri-District-Administration.png" },
  { name: "Puri Jagannath Temple", logo: "/images/clients/Puri-Jagannath-Temple.png" },
  { name: "Sringeri Temple", logo: "/images/clients/Sringeri-Temple.jpg" },
];

const values = [
  {
    icon: Eye,
    title: "Truth in Every Signal",
    description: "Every frame, frequency, and fragment carries meaning — we build AI that sees what others miss.",
    color: "text-accent-green"
  },
  {
    icon: Users,
    title: "Human Intelligence, Amplified",
    description: "Our AI doesn't replace people — it sharpens their intuition and accelerates their impact.",
    color: "text-blue-400"
  },
  {
    icon: Lock,
    title: "Security is Sacred",
    description: "Every system we design protects life, data, and trust — the foundations of intelligent governance.",
    color: "text-purple-400"
  },
  {
    icon: Shield,
    title: "Resilience by Design",
    description: "Built to operate in the field, on the edge, and under pressure — because downtime isn't an option.",
    color: "text-emerald-400"
  },
  {
    icon: Layers,
    title: "Open Eyes, Open Ecosystems",
    description: "We believe intelligence thrives in connection — across systems, domains, and disciplines.",
    color: "text-cyan-400"
  },
  {
    icon: Heart,
    title: "Purpose Beyond Profit",
    description: "We measure success by societal impact — safety, transparency, sustainability.",
    color: "text-pink-400"
  }
];

const certifications = [
  "ISO/IEC 9001: Quality Management",
  "ISO/IEC 27001: Information Security",
  "ISO/IEC 27701: Privacy Management",
  "ISO/IEC 27017: Cloud Security",
  "ISO/IEC 14001: Environmental Management",
  "ISO/IEC 45001: Occupational Health & Safety",
  "CMMI Maturity Level 3",
  "Startup India Certified"
];

const stack = [
  {
    layer: "Neuron",
    name: "EDGEVERSE",
    subtitle: "Signal Fabric",
    description: "Edge devices that give infrastructure new senses — real-time perception at source.",
    icon: Network,
    gradient: "from-emerald-500 via-green-500 to-teal-500"
  },
  {
    layer: "The Brain",
    name: "PULSE",
    subtitle: "Perception Engine",
    description: "The brain that extracts meaning, context, and patterns from massive signal inputs.",
    icon: Brain,
    gradient: "from-blue-500 via-cyan-500 to-sky-500"
  },
  {
    layer: "The Intelligence",
    name: "SENTINEL",
    subtitle: "Orchestration & Response",
    description: "The intelligence layer that transforms insights into action.",
    icon: Activity,
    gradient: "from-purple-500 via-pink-500 to-rose-500"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary-bg">
      <Header />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              From chaos to clarity. From noise to reality
            </h1>
          </motion.div>

          {/* 1. Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mb-32 overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-accent-blue/10 to-purple-500/10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNNiA2YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSJyZ2JhKDE1LCAyNDMsIDE2MywgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

            <div className="relative p-16">
              <div className="flex items-start gap-4 mb-8">
                <Target className="w-10 h-10 text-accent-green flex-shrink-0 mt-1" />
                <h2 className="text-4xl font-bold text-white">Our Mission</h2>
              </div>
              <div className="space-y-6 text-xl text-text-secondary leading-relaxed max-w-5xl">
                <p>
                  In a world overwhelmed by sensors, screens, and signals, WiredLeap AI exists to transform raw data into living intelligence.
                </p>
                <p>
                  We build the <span className="text-accent-green font-semibold">nervous system of civilization</span> — where edge devices, AI perception engines, and orchestration systems work in harmony to protect lives, optimize cities, and empower decision-makers.
                </p>
                <p className="text-2xl text-white font-semibold pt-4">
                  To turn the world's noise into meaningful action — to transform chaos into clarity, and signals into stories that matter.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2. The Nervous System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Layers className="w-8 h-8 text-accent-blue" />
                <h2 className="text-5xl font-bold text-white">The Nervous System</h2>
              </div>
              <p className="text-xl text-text-secondary">
                A unified three-layer architecture powering intelligent decision-making
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {stack.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="relative group h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl from-accent-green via-accent-blue to-purple-500 blur-xl" />

                  <div className="relative glass-dark rounded-2xl p-8 hover:border-accent-green/50 transition-all h-full flex flex-col">
                    {/* Icon with gradient background */}
                    <div className="mb-6">
                      <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                        <item.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Layer label */}
                    <div className="text-xs text-accent-green font-bold mb-2 uppercase tracking-widest">
                      {item.layer}
                    </div>

                    {/* Name */}
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {item.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-lg text-accent-blue/80 mb-4 font-medium">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-text-secondary leading-relaxed flex-grow">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3. Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-accent-blue" />
                <h2 className="text-5xl font-bold text-white">Our Team</h2>
              </div>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Behind WiredLeap AI stands a team that merges deep technical mastery with field experience across defense, public safety, and enterprise AI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl glass-dark p-8 hover:border-accent-green/50 transition-all">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-green/0 via-accent-green/0 to-accent-green/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                      <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full"
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center center',
                            width: '100%',
                            height: '100%'
                          }}
                          onError={(e) => {
                            // Fallback to gradient if image fails to load
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className={`w-full h-full bg-gradient-to-br ${member.gradient} items-center justify-center hidden`}>
                          <span className="text-white text-6xl font-bold">{member.initials}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 text-center">{member.name}</h3>
                      <p className="text-accent-green font-semibold text-center text-lg">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 4. Key Clientele */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-accent-green" />
                <h2 className="text-5xl font-bold text-white">Key Clientele</h2>
              </div>
              <p className="text-xl text-text-secondary">
                Trusted by organizations that cannot afford to fail
              </p>
            </div>

            {/* White ribbon container with uniform logo sizes */}
            <div className="relative bg-white rounded-2xl py-12 px-8 overflow-hidden">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

              {/* Scrolling animation */}
              <div className="flex overflow-hidden">
                <motion.div
                  className="flex gap-12 items-center"
                  animate={{
                    x: [0, -1920],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 40,
                      ease: "linear",
                    },
                  }}
                >
                  {/* Render logos twice for seamless loop */}
                  {[...clientLogos, ...clientLogos].map((client, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 flex flex-col items-center gap-4"
                    >
                      <div className="w-40 h-40 flex items-center justify-center p-4 bg-white">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-700 font-medium text-center whitespace-nowrap">
                        {client.name}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 5. Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
                <h2 className="text-5xl font-bold text-white">Certifications</h2>
              </div>
              <p className="text-xl text-text-secondary">
                Industry-leading standards and compliance
              </p>
            </div>

            <div className="glass-dark rounded-3xl p-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 6. Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <h2 className="text-5xl font-bold text-white">Core Values</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.05, duration: 0.5 }}
                  className="glass-dark rounded-2xl p-8 hover:border-accent-green/30 transition-all group"
                >
                  <div className="mb-6">
                    <value.icon className={`w-12 h-12 ${value.color} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 7. Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mb-32"
          >
            <div className="relative">
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 via-accent-blue/5 to-purple-500/5 rounded-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,243,163,0.1),transparent_50%)] rounded-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(43,177,255,0.1),transparent_50%)] rounded-3xl" />

              <div className="relative glass-dark rounded-3xl overflow-hidden border-2 border-accent-green/20 p-16">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-green/20 to-accent-blue/20 border border-accent-green/30 mb-8"
                  >
                    <Globe className="w-5 h-5 text-accent-green" />
                    <span className="text-accent-green font-semibold">Our Vision</span>
                  </motion.div>

                  <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                    Building the Future of{" "}
                    <span className="bg-gradient-to-r from-accent-green via-accent-blue to-purple-400 bg-clip-text text-transparent">
                      Distributed Intelligence
                    </span>
                  </h2>

                  <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-6">
                    The future of intelligence is distributed — across devices, cities, and nations.
                    WiredLeap AI is building that future — a unified signal fabric where every camera, sensor, and stream becomes part of a larger consciousness.
                  </p>

                  <p className="text-2xl text-white/90 font-medium leading-relaxed max-w-4xl mx-auto">
                    From public safety to smart governance, from industrial AI to environmental intelligence — we are engineering the invisible architecture of awareness.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 8. The WiredLeap Promise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-16"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-purple-500/5 to-accent-green/5 rounded-3xl" />

              <div className="relative glass-dark rounded-3xl overflow-hidden border-2 border-accent-blue/20 p-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Lightbulb className="w-10 h-10 text-accent-green" />
                      <h3 className="text-4xl font-bold text-white">The WiredLeap Promise</h3>
                    </div>
                    <p className="text-lg text-text-secondary leading-relaxed mb-6">
                      When you partner with WiredLeap AI, you're not just deploying another analytics platform.
                    </p>
                    <p className="text-lg text-text-secondary leading-relaxed mb-8">
                      You're plugging into a living, learning, self-improving network that bridges humans and machines, data and decisions, edge and intelligence.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-1 w-16 bg-gradient-to-r from-accent-green to-accent-blue rounded-full" />
                      <p className="text-2xl text-accent-green font-bold">
                        We build what others imagine.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="h-1 w-16 bg-gradient-to-r from-accent-blue to-purple-500 rounded-full" />
                      <p className="text-2xl text-accent-blue font-bold">
                        We see what others miss.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="glass-dark rounded-2xl p-8 border border-accent-green/30">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-green to-teal-500 flex items-center justify-center flex-shrink-0">
                            <Eye className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold mb-2">Living Intelligence</h4>
                            <p className="text-text-secondary text-sm">Self-improving systems that learn and adapt in real-time</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <Layers className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold mb-2">Unified Fabric</h4>
                            <p className="text-text-secondary text-sm">Seamless integration across edge, cloud, and command</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold mb-2">Trusted by Design</h4>
                            <p className="text-text-secondary text-sm">Built for organizations where failure is not an option</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
