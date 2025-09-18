"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TeamPage() {
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
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98,
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
    <div className="w-full relative min-h-screen" style={{ backgroundColor: "#000000" }}>
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

      {/* Plus symbols pattern */}
     

      {/* Content overlay */}
      <div className="relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center min-h-screen p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-orange-500"
            variants={titleVariants}
          >
            Team Setup
          </motion.h2>
          
          <motion.p 
            className="text-lg text-orange-300 mb-12 text-center max-w-lg font-mono"
            variants={itemVariants}
          >
            Choose how you'd like to participate in the hackathon
          </motion.p>

          {/* Team Options */}
          <motion.div 
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-4xl"
            variants={itemVariants}
          >
            {/* Create Team Card */}
            <Link href="/teams/create" className="flex-1">
              <motion.div 
                className="group relative bg-orange-500 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 border border-orange-400/30 overflow-hidden h-80"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Icon and Title */}
                  <div className="flex flex-col items-center text-center">
                    <motion.div 
                      className="mb-6 p-4 bg-black/20 rounded-full backdrop-blur-sm group-hover:bg-black/30 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                      </svg>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-gray-800 transition-colors font-mono">
                      Create Team
                    </h3>
                    
                    <p className="text-black/80 text-center leading-relaxed font-mono">
                      Start a new team and invite your friends to join the hackathon adventure
                    </p>
                  </div>

                  {/* Button */}
                  <motion.button 
                    className="w-full bg-black/20 text-black font-bold py-3 px-6 rounded-xl hover:bg-black/30 transition-all duration-300 backdrop-blur-sm border border-black/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Creating →
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <motion.div 
                  className="absolute top-4 right-4 text-black/20 text-2xl"
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
              </motion.div>
            </Link>

            {/* Join Team Card */}
            <Link href="/teams/join" className="flex-1">
              <motion.div 
                className="group relative bg-black rounded-2xl shadow-2xl hover:shadow-black/50 transition-all duration-300 border border-orange-500/50 overflow-hidden h-80"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"></div>
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Icon and Title */}
                  <div className="flex flex-col items-center text-center">
                    <motion.div 
                      className="mb-6 p-4 bg-orange-500/20 rounded-full backdrop-blur-sm group-hover:bg-orange-500/30 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                      </svg>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-orange-500 mb-3 group-hover:text-orange-400 transition-colors font-mono">
                      Join Team
                    </h3>
                    
                    <p className="text-orange-300/80 text-center leading-relaxed font-mono">
                      Already have a team code? Join your friends and start building together
                    </p>
                  </div>

                  {/* Button */}
                  <motion.button 
                    className="w-full bg-orange-500/20 text-orange-500 font-bold py-3 px-6 rounded-xl hover:bg-orange-500/30 transition-all duration-300 backdrop-blur-sm border border-orange-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Now →
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <motion.div 
                  className="absolute top-4 right-4 text-orange-500/20 text-2xl"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  +
                </motion.div>
                <motion.div 
                  className="absolute bottom-4 left-4 text-orange-500/20 text-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                >
                  +
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <p className="text-orange-300/60 font-mono text-sm">
              Teams can have 2-4 members • Mix of skills encouraged
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}