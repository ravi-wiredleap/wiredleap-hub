"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Show detection boxes after 6 seconds (when city and crowd are visible)
    const detectionTimer = setTimeout(() => {
      setStage(2);
    }, 6000);

    return () => {
      clearTimeout(detectionTimer);
    };
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Stay on final frame for 1.5 seconds before showing text
    setTimeout(() => {
      setStage(3);
      // Auto-navigate to Solutions page after 2 seconds of showing text
      setTimeout(() => {
        setFadeOut(true);
        // Navigate after fade out animation completes
        setTimeout(() => {
          router.push("/explore");
        }, 1000);
      }, 2000);
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-black"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >

      {/* STAGE 0-1: VIDEO INTRODUCTION */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: stage >= 3 ? 0.15 : 1,
          filter: stage >= 3 ? 'blur(2px) brightness(0.3)' : 'blur(0px) brightness(1)'
        }}
        transition={{ duration: 1 }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          onEnded={handleVideoEnd}
          playsInline
          preload="auto"
        >
          <source src="/Wiredleap_Intro.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* STAGE 2: DETECTION BOXES OVERLAY */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-black/20">
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <pattern id="aiGrid" width="70" height="70" patternUnits="userSpaceOnUse">
                <rect width="70" height="70" fill="none" stroke="#0ff3a3" strokeWidth="0.4" opacity="0.25"/>
                <circle cx="35" cy="35" r="1.5" fill="#0ff3a3" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aiGrid)"/>
          </svg>

          {/* Detection Boxes - Sequential appearance: Fire -> Crowd -> Traffic */}
          {[
            { right: '8%', top: '15%', width: '320px', height: '280px', label: 'FIRE DETECTED', sublabel: 'EMERGENCY RESPONSE ACTIVE', conf: 98, threat: 'CRITICAL', delay: 0 },
            { left: '15%', top: '20%', width: '380px', height: '320px', label: 'CROWD DENSITY CRITICAL', sublabel: 'STAMPEDE RISK DETECTED', conf: 97, threat: 'CRITICAL', delay: 0.5 },
            { right: '8%', bottom: '15%', width: '480px', height: '160px', label: 'TRAFFIC GRIDLOCK', sublabel: 'SEVERE CONGESTION', conf: 96, threat: 'HIGH', delay: 1.0 },
          ].map((zone, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ ...zone }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + zone.delay, duration: 0.7, type: "spring", bounce: 0.3 }}
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

      {/* STAGE 3: FINAL REVEAL - WIREDLEAP AI TEXT */}
      <div className="relative z-30 flex items-center justify-center min-h-screen">
        {/* Subtle background overlay for text readability */}
        <motion.div
          className="absolute inset-0 bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-center px-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-8xl md:text-10xl font-black mb-8 relative z-20"
                style={{
                  textShadow: `
                    0 0 40px rgba(15, 243, 163, 0.5),
                    0 2px 15px rgba(0, 0, 0, 0.9)
                  `,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                }}
              >
                WiredLeap AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="text-3xl md:text-5xl font-light relative z-20"
                style={{
                  color: '#d1d5db',
                  textShadow: `0 2px 10px rgba(0, 0, 0, 0.8)`,
                }}
              >
                where chaos becomes intelligence
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}