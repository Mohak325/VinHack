"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ruigslay } from "../fonts";


export default function Welcome() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full relative" style={{ backgroundColor: "#000000" }}>
      {/* Grid lines background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Content overlay area */}
      <div className="relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center min-h-screen overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1
              className={`text-7xl sm:text-8xl md:text-[11rem] text-orange-500 ${ruigslay.className} mb-4`}
              variants={titleVariants}
            >
              VinHack
            </motion.h1>
            
            <motion.p 
              className="text-lg text-orange-300 mb-12 text-center max-w-md font-mono"
              // Apply Orbitron class here - replace 'font-mono' with your orbitron class
              // className={`text-lg text-orange-300 mb-12 text-center max-w-md ${orbitron.className}`}
              variants={itemVariants}
            >
              Choose your category to continue your hackathon journey
            </motion.p>

            {/* Enhanced Buttons - Black & Orange Theme */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-8 sm:gap-12"
              variants={itemVariants}
            >
              <Link href="/vit-form">
                <motion.button 
                  className="group relative flex flex-col items-center justify-center w-48 h-48 bg-orange-500 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 border border-orange-400/30"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="relative z-10 mb-4 p-4 bg-black/20 rounded-full backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                  </motion.div>
                  
                  {/* Text */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold text-black mb-1 group-hover:text-gray-800 transition-colors font-mono">
                      {/* Replace 'font-mono' with your orbitron class */}
                      {/* <h3 className={`text-xl font-bold text-black mb-1 group-hover:text-gray-800 transition-colors ${orbitron.className}`}> */}
                      VIT Students
                    </h3>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div 
                    className="absolute top-4 right-4 text-black/20 text-xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    +
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-4 left-4 text-black/20 text-lg"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    +
                  </motion.div>
                </motion.button>
              </Link>

              <Link href="/external-forms">
                <motion.button 
                  className="group relative flex flex-col items-center justify-center w-48 h-48 bg-black rounded-2xl shadow-2xl hover:shadow-black/50 transition-all duration-300 border border-orange-500/50"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"></div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="relative z-10 mb-4 p-4 bg-orange-500/20 rounded-full backdrop-blur-sm group-hover:bg-orange-500/30 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </motion.div>
                  
                  {/* Text */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold text-orange-500 mb-1 group-hover:text-orange-400 transition-colors font-mono">
                      {/* Replace 'font-mono' with your orbitron class */}
                      {/* <h3 className={`text-xl font-bold text-orange-500 mb-1 group-hover:text-orange-400 transition-colors ${orbitron.className}`}> */}
                      External Participants
                    </h3>
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}