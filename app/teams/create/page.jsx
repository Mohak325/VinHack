"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CreateTeamPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/onboarding");
  };

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

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
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
      <div className="absolute inset-0 grid grid-cols-8 gap-8 p-8 opacity-50">
        {Array.from({ length: 48 }, (_, index) => (
          <div key={index} className="flex items-center justify-center">
            <motion.div
              className="text-sm font-light select-none"
              style={{ color: "#ea8244" }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 8 + (index % 3) * 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              +
            </motion.div>
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center min-h-screen p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back button */}
          <motion.button
            onClick={() => router.back()}
            className="absolute top-8 left-8 text-orange-400 hover:text-orange-300 transition-colors font-mono flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: -5 }}
          >
            ← Back
          </motion.button>

          {/* Title */}
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-orange-500 text-center"
            variants={titleVariants}
          >
            Create Team
          </motion.h2>
          
          <motion.p 
            className="text-lg text-orange-300 mb-12 text-center max-w-lg font-mono"
            variants={itemVariants}
          >
            Start your hackathon journey by creating a new team
          </motion.p>

          {/* Form Card */}
          <motion.div 
            className="w-full max-w-lg bg-orange-500 rounded-2xl shadow-2xl border border-orange-400/30 overflow-hidden"
            variants={formVariants}
          >
            {/* Background Glow */}
            {/* <div className="absolute inset-0 bg-orange-400 opacity-20 blur-xl"></div> */}
            
            {/* Content */}
            <div className="relative z-10 p-8">
              {/* Icon */}
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <div className="p-4 bg-black/20 rounded-full backdrop-blur-sm">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                  </svg>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-black font-bold mb-2 font-mono">
                    Team Name
                  </label>
                  <motion.input
                    className="w-full p-4 border-2 border-black/20 rounded-xl bg-black/10 text-black placeholder-black/60 font-mono focus:outline-none focus:border-black/40 focus:bg-black/5 transition-all duration-300 backdrop-blur-sm"
                    type="text"
                    placeholder="Enter your team name"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-black font-bold mb-2 font-mono">
                    Team Description (Optional)
                  </label>
                  <motion.textarea
                    className="w-full p-4 border-2 border-black/20 rounded-xl bg-black/10 text-black placeholder-black/60 font-mono focus:outline-none focus:border-black/40 focus:bg-black/5 transition-all duration-300 backdrop-blur-sm resize-none"
                    rows="3"
                    placeholder="Describe your team's vision"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-black/20 text-black font-bold py-4 px-6 rounded-xl hover:bg-black/30 transition-all duration-300 backdrop-blur-sm border border-black/10 font-mono"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Team →
                </motion.button>
              </form>

              {/* Team Info */}
              <motion.div 
                className="mt-6 p-4 bg-black/10 rounded-xl backdrop-blur-sm"
                variants={itemVariants}
              >
                <p className="text-black/80 text-sm font-mono text-center">
                  You'll get a unique team code to share with members
                </p>
              </motion.div>
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

          {/* Additional Info */}
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-orange-300/60 font-mono text-sm">
              Teams can have 2-4 members • Invite your friends after creation
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}