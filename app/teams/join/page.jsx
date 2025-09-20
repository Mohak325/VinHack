"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function JoinTeamPage() {
  const { status } = useSession();
  const router = useRouter();
  const [teamCode, setTeamCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!teamCode.trim()) {
      setError("Team code is required");
      return;
    }

    if (teamCode.trim().length !== 6) {
      setError("Team code must be 6 characters");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch('/api/teams/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamCode: teamCode.trim()
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join team');
      }

      setSuccess(result.message);
      
      setTimeout(() => {
        router.push("/onboarding");
      }, 2000);

    } catch (err) {
      console.error('Join team error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="w-full relative min-h-screen flex items-center justify-center" style={{ backgroundColor: "#000000" }}>
        <div className="text-orange-500 font-mono">Loading...</div>
      </div>
    );
  }

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
      <div className="absolute inset-0 grid grid-cols-8 gap-8 p-8 opacity-30">
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
            Join Team
          </motion.h2>
          
          <motion.p 
            className="text-lg text-orange-300 mb-12 text-center max-w-lg font-mono"
            variants={itemVariants}
          >
            Enter your team code to join your friends
          </motion.p>

          {/* Form Card */}
          <motion.div 
            className="w-full max-w-lg bg-black rounded-2xl shadow-2xl border border-orange-500/50 overflow-hidden"
            variants={formVariants}
          >
            {/* Background Glow */}
            {/* <div className="absolute inset-0 bg-orange-500 opacity-10 blur-xl"></div> */}
            
            {/* Content */}
            <div className="relative z-10 p-8">
              {/* Icon */}
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <div className="p-4 bg-orange-500/20 rounded-full backdrop-blur-sm">
                  <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Error/Success Messages */}
                {error && (
                  <motion.div 
                    className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 font-mono text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
                
                {success && (
                  <motion.div 
                    className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-green-300 font-mono text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {success}
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <label className="block text-orange-500 font-bold mb-2 font-mono">
                    Team Code
                  </label>
                  <motion.input
                    value={teamCode}
                    onChange={(e) => {
                      setTeamCode(e.target.value.toUpperCase());
                      if (error) setError("");
                      if (success) setSuccess("");
                    }}
                    className="w-full p-4 border-2 border-orange-500/30 rounded-xl bg-orange-500/10 text-orange-300 placeholder-orange-300/60 font-mono focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-300 backdrop-blur-sm"
                    type="text"
                    placeholder="Enter 6-digit team code"
                    required
                    maxLength="6"
                    disabled={isSubmitting}
                    style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500/20 text-orange-500 font-bold py-4 px-6 rounded-xl hover:bg-orange-500/30 transition-all duration-300 backdrop-blur-sm border border-orange-500/20 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                  variants={itemVariants}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Joining Team...' : 'Join Team →'}
                </motion.button>
              </form>

              {/* Team Info */}
              <motion.div 
                className="mt-6 p-4 bg-orange-500/10 rounded-xl backdrop-blur-sm"
                variants={itemVariants}
              >
                <p className="text-orange-300/80 text-sm font-mono text-center">
                  Don't have a code? Ask your team leader to share it
                </p>
              </motion.div>

              {/* Or Create Team */}
              <motion.div 
                className="mt-4 text-center"
                variants={itemVariants}
              >
                <p className="text-orange-300/60 text-sm font-mono mb-3">
                  Don't have a team yet?
                </p>
                <motion.button
                  onClick={() => router.push('/teams/create')}
                  className="text-orange-400 hover:text-orange-300 font-mono text-sm underline transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Create a new team instead
                </motion.button>
              </motion.div>
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

          {/* Additional Info */}
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-orange-300/60 font-mono text-sm">
              Teams can have 2-4 members • Join the hackathon adventure
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}