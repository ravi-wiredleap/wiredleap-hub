"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setMounted(true);

    const timers = [
      setTimeout(() => setStage(1), 3000),   // Start zoom to Earth
      setTimeout(() => setStage(2), 6000),   // Zoom to India
      setTimeout(() => setStage(3), 9000),   // Zoom to Indian city
      setTimeout(() => setStage(4), 12000),  // Show chaos
      setTimeout(() => setStage(5), 15000),  // AI overlay
      setTimeout(() => setStage(6), 18000),  // Final reveal - STAY HERE
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">

      {/* STAGE 0-1: SPACE WITH ROTATING EARTH */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: stage >= 1 ? 7 : 1,
          opacity: stage >= 2 ? 0 : 1,
        }}
        transition={{ duration: 3, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {/* Starfield */}
        <div className="absolute inset-0 bg-black">
          {[...Array(800)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() > 0.97 ? '2px' : '1px',
                height: Math.random() > 0.97 ? '2px' : '1px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
              animate={Math.random() > 0.8 ? {
                opacity: [0.2, 1, 0.2],
              } : {}}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Rotating Earth */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-[600px] h-[600px]"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 120,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2400)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: `
                  0 0 180px rgba(59, 130, 246, 0.9),
                  inset -90px -90px 160px rgba(0, 0, 0, 0.95),
                  inset 70px 70px 130px rgba(147, 197, 253, 0.35)
                `,
                filter: 'brightness(1.15) contrast(1.25)',
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 32% 32%, rgba(255, 255, 255, 0.35) 0%, transparent 50%)',
                  mixBlendMode: 'overlay',
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(115deg, transparent 0%, transparent 48%, rgba(0, 0, 0, 0.65) 52%, rgba(0, 0, 0, 0.98) 100%)',
                }}
              />
            </div>
            <div
              className="absolute inset-[-25px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(100, 181, 246, 0.4) 0%, rgba(59, 130, 246, 0.25) 40%, transparent 70%)',
                filter: 'blur(35px)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* STAGE 2: ZOOM TO INDIA - Aerial View */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{
          scale: stage >= 2 ? (stage >= 3 ? 3.5 : 1) : 0.3,
          opacity: stage >= 2 && stage < 3 ? 1 : 0
        }}
        transition={{ duration: 3, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2400)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7) contrast(1.25)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-transparent to-blue-950/30" />

          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(15, 243, 163, 0.25) 50%, transparent 100%)',
              height: '80px',
            }}
            animate={{
              y: ['-80px', 'calc(100% + 80px)'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.div
            className="px-10 py-5 bg-black/90 border-3 border-accent-green rounded-2xl"
            style={{
              boxShadow: '0 0 60px rgba(15, 243, 163, 0.9)',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="text-accent-green text-4xl font-bold tracking-wide">INDIA</div>
          </motion.div>
        </div>
      </motion.div>

      {/* STAGE 3: INDIAN CITY - Aerial View */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{
          scale: stage >= 3 ? 1 : 0.4,
          opacity: stage >= 3 && stage < 6 ? 1 : 0
        }}
        transition={{ duration: 3, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2400)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6) contrast(1.2)',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2400)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'lighten',
              opacity: 0.3,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* STAGE 4: CHAOS OVERLAYS */}
          {stage >= 4 && (
            <AnimatePresence>
              {/* FIRE - Building fire */}
              <motion.div
                className="absolute top-[10%] left-[15%] w-[28%] h-[32%]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3 }}
              >
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1583445095369-9c651e7e5d34?q=80&w=1400)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(1.3) contrast(1.25) saturate(1.3)',
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1611943577418-3ad87030d8bc?q=80&w=1400)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mixBlendMode: 'lighten',
                    opacity: 0.6,
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                  }}
                />
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-[110px] opacity-70" />
              </motion.div>

              {/* TRAFFIC JAM - Actual congested highway */}
              <motion.div
                className="absolute top-[42%] left-[18%] w-[52%] h-[16%]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.4 }}
              >
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(1.1) saturate(1.25)',
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.6) 0%, transparent 50%)',
                  }}
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                  }}
                />
                <div className="absolute inset-0 bg-red-600 rounded-full blur-[90px] opacity-50" />
              </motion.div>

              {/* CROWD STAMPEDE */}
              <motion.div
                className="absolute bottom-[5%] right-[10%] w-[32%] h-[38%]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(1.25) saturate(1.35)',
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 0.45,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1600)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mixBlendMode: 'overlay',
                    opacity: 0.65,
                  }}
                  animate={{
                    x: [-6, 6, -6],
                    y: [-6, 6, -6],
                  }}
                  transition={{
                    duration: 0.28,
                    repeat: Infinity,
                  }}
                />
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-4 border-yellow-400 rounded-full"
                    initial={{ scale: 0.6, opacity: 0.85 }}
                    animate={{
                      scale: [0.7, 2.6],
                      opacity: [0.85, 0],
                    }}
                    transition={{
                      duration: 2.3,
                      repeat: Infinity,
                      delay: i * 0.55,
                    }}
                  />
                ))}
                <motion.div
                  className="absolute inset-0 bg-red-500 rounded-full blur-[110px]"
                  animate={{
                    opacity: [0.5, 0.75, 0.5],
                  }}
                  transition={{
                    duration: 0.95,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* STAGE 5: AI INTELLIGENCE OVERLAY */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 5 ? 1 : 0 }}
        transition={{ duration: 1.8 }}
      >
        <div className="absolute inset-0 bg-black/35">
          <svg className="absolute inset-0 w-full h-full opacity-35">
            <defs>
              <pattern id="aiGrid" width="70" height="70" patternUnits="userSpaceOnUse">
                <rect width="70" height="70" fill="none" stroke="#0ff3a3" strokeWidth="0.4" opacity="0.25"/>
                <circle cx="35" cy="35" r="1.5" fill="#0ff3a3" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aiGrid)"/>
          </svg>

          {/* Detection Boxes */}
          {[
            { left: '12%', top: '6%', width: '330px', height: '260px', label: 'FIRE DETECTED', sublabel: 'EMERGENCY RESPONSE ACTIVE', conf: 98, threat: 'CRITICAL' },
            { left: '16%', top: '40%', width: '500px', height: '140px', label: 'TRAFFIC GRIDLOCK', sublabel: 'SEVERE CONGESTION', conf: 96, threat: 'HIGH' },
            { right: '7%', bottom: '2%', width: '360px', height: '310px', label: 'CROWD DENSITY CRITICAL', sublabel: 'STAMPEDE RISK DETECTED', conf: 97, threat: 'CRITICAL' },
          ].map((zone, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ ...zone }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.35, duration: 0.7, type: "spring", bounce: 0.3 }}
            >
              <div
                className="absolute inset-0 border-[2.5px] rounded-2xl backdrop-blur-sm"
                style={{
                  borderColor: zone.threat === 'CRITICAL' ? '#ff3b3b' : '#0ff3a3',
                  boxShadow: `
                    0 0 45px ${zone.threat === 'CRITICAL' ? 'rgba(255, 59, 59, 0.85)' : 'rgba(15, 243, 163, 0.85)'},
                    inset 0 0 35px ${zone.threat === 'CRITICAL' ? 'rgba(255, 59, 59, 0.18)' : 'rgba(15, 243, 163, 0.18)'}
                  `,
                  background: 'rgba(0, 0, 0, 0.35)',
                }}
              >
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
                  const [v, h] = corner.split('-');
                  return (
                    <motion.div
                      key={corner}
                      className={`absolute ${v}-[-2.5px] ${h}-[-2.5px]`}
                      style={{
                        width: '25px',
                        height: '25px',
                        borderColor: zone.threat === 'CRITICAL' ? '#ff3b3b' : '#0ff3a3',
                        borderTopWidth: v === 'top' ? '4.5px' : '0',
                        borderBottomWidth: v === 'bottom' ? '4.5px' : '0',
                        borderLeftWidth: h === 'left' ? '4.5px' : '0',
                        borderRightWidth: h === 'right' ? '4.5px' : '0',
                        boxShadow: `0 0 18px ${zone.threat === 'CRITICAL' ? '#ff3b3b' : '#0ff3a3'}`,
                      }}
                      animate={{
                        opacity: [0.65, 1, 0.65],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                      }}
                    />
                  );
                })}
              </div>

              <div
                className="absolute -top-18 left-0 px-5 py-2.5 rounded-xl border-2 backdrop-blur-sm"
                style={{
                  borderColor: zone.threat === 'CRITICAL' ? '#ff3b3b' : '#0ff3a3',
                  background: 'rgba(0, 0, 0, 0.94)',
                  boxShadow: `0 0 35px ${zone.threat === 'CRITICAL' ? 'rgba(255, 59, 59, 0.75)' : 'rgba(15, 243, 163, 0.75)'}`,
                }}
              >
                <div className={`text-base font-bold tracking-wide ${zone.threat === 'CRITICAL' ? 'text-red-400' : 'text-accent-green'}`}>
                  {zone.label}
                </div>
                <div className={`text-xs mt-0.5 ${zone.threat === 'CRITICAL' ? 'text-red-300/65' : 'text-accent-green/65'}`}>
                  {zone.sublabel}
                </div>
              </div>

              <div className="absolute -bottom-14 right-0 flex gap-2.5">
                <div
                  className="px-4 py-2 rounded-xl border-2 backdrop-blur-sm"
                  style={{
                    borderColor: zone.threat === 'CRITICAL' ? '#ff3b3b' : '#0ff3a3',
                    background: 'rgba(0, 0, 0, 0.94)',
                    boxShadow: `0 0 22px ${zone.threat === 'CRITICAL' ? 'rgba(255, 59, 59, 0.55)' : 'rgba(15, 243, 163, 0.55)'}`,
                  }}
                >
                  <span className={`text-sm font-mono font-bold ${zone.threat === 'CRITICAL' ? 'text-red-400' : 'text-accent-green'}`}>
                    {zone.conf}% CONF
                  </span>
                </div>
                <motion.div
                  className="px-4 py-2 rounded-xl border-2 border-red-500 backdrop-blur-sm"
                  style={{
                    background: 'rgba(0, 0, 0, 0.94)',
                    boxShadow: '0 0 22px rgba(255, 59, 59, 0.85)',
                  }}
                  animate={{
                    opacity: [0.75, 1, 0.75],
                  }}
                  transition={{
                    duration: 0.95,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-sm font-mono font-bold text-red-400">
                    {zone.threat}
                  </span>
                </motion.div>
              </div>

              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${zone.threat === 'CRITICAL' ? 'rgba(255, 59, 59, 0.18)' : 'rgba(15, 243, 163, 0.18)'} 50%, transparent 100%)`,
                }}
                animate={{
                  y: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.65,
                }}
              />
            </motion.div>
          ))}

          {[...Array(45)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-accent-green"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 22px rgba(15, 243, 163, 0.95)',
              }}
              animate={{
                scale: [1, 2.3, 1],
                opacity: [0.35, 1, 0.35],
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                delay: Math.random() * 2.3,
              }}
            />
          ))}

          <motion.div
            className="absolute top-10 right-10 font-mono space-y-2.5"
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.3, duration: 0.9 }}
          >
            <div
              className="bg-black/94 px-5 py-2.5 rounded-xl border-2 border-accent-green backdrop-blur-sm"
              style={{ boxShadow: '0 0 28px rgba(15, 243, 163, 0.55)' }}
            >
              <span className="text-sm font-bold text-accent-green">WIREDLEAP AI v3.2.1</span>
            </div>
            <div
              className="bg-black/94 px-5 py-2.5 rounded-xl border-2 border-red-400 backdrop-blur-sm"
              style={{ boxShadow: '0 0 28px rgba(255, 100, 100, 0.55)' }}
            >
              <span className="text-sm font-bold text-red-400">THREATS: 3 ACTIVE</span>
            </div>
            <div
              className="bg-black/94 px-5 py-2.5 rounded-xl border-2 border-accent-green backdrop-blur-sm"
              style={{ boxShadow: '0 0 28px rgba(15, 243, 163, 0.55)' }}
            >
              <span className="text-sm font-bold text-accent-green">RESPONSE: ENGAGED</span>
            </div>
            <motion.div
              className="bg-black/94 px-5 py-2.5 rounded-xl border-2 border-accent-blue backdrop-blur-sm"
              style={{ boxShadow: '0 0 28px rgba(43, 177, 255, 0.55)' }}
              animate={{
                opacity: [0.75, 1, 0.75],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
              }}
            >
              <span className="text-sm font-bold text-accent-blue">ANALYZING...</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* STAGE 6: FINAL REVEAL - STAY HERE, NO AUTO-NAVIGATE */}
      <div className="relative z-30 flex items-center justify-center min-h-screen">
        <AnimatePresence>
          {stage >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-center px-8"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="text-7xl md:text-9xl font-black text-white mb-9"
                style={{
                  textShadow: `
                    0 0 110px rgba(15, 243, 163, 0.75),
                    0 0 75px rgba(43, 177, 255, 0.55),
                    0 5px 28px rgba(0, 0, 0, 0.9)
                  `,
                  letterSpacing: '-0.015em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #0ff3a3 50%, #2bb1ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                WiredLeap AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 1.8 }}
                className="text-3xl md:text-5xl font-light mb-18"
                style={{
                  background: 'linear-gradient(90deg, #0ff3a3 0%, #2bb1ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 28px rgba(15, 243, 163, 0.45))',
                }}
              >
                where chaos becomes intelligence
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.65, duration: 1.1 }}
                onClick={() => router.push("/explore")}
                className="group relative px-18 py-6 bg-gradient-to-r from-accent-green via-accent-blue to-accent-green rounded-2xl text-2xl font-bold text-black overflow-hidden mt-12 pointer-events-auto"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  boxShadow: '0 0 95px rgba(15, 243, 163, 0.95), 0 28px 65px rgba(0, 0, 0, 0.55)',
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-35"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10 flex items-center gap-3.5 font-extrabold">
                  Explore Solutions
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-3.5 transition-transform duration-450" />
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
