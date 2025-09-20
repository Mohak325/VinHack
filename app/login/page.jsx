"use client";
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/api/auth/callback'
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // No client-side redirect
  }, [])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', {
        callbackUrl: '/api/auth/callback',
        redirect: true
      })
    } catch (error) {
      console.error('Sign in error:', error)
      setIsLoading(false)
    }
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
  }

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
  }

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
  }

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
          {/* Logo/Title */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-orange-500"
            variants={titleVariants}
          >
            VinHack 25
          </motion.h1>
          
          <motion.p 
            className="text-lg text-orange-300 mb-12 text-center max-w-lg font-mono"
            variants={itemVariants}
          >
            Sign in with your Google account to join the hackathon
          </motion.p>

          {/* Login Card */}
          <motion.div 
            className="w-full max-w-md bg-black rounded-2xl shadow-2xl border border-orange-500/50 overflow-hidden"
            variants={itemVariants}
          >
            <div className="relative p-8">
              {/* Icon */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
              >
                <div className="p-4 bg-orange-500/20 rounded-full backdrop-blur-sm">
                  <svg className="w-12 h-12 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </motion.div>

              {/* Sign In Button */}
              <motion.button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 font-bold py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-orange-500/20 font-mono flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </motion.button>

              {/* Info Text */}
              <motion.div 
                className="mt-6 p-4 bg-orange-500/10 rounded-xl backdrop-blur-sm"
                variants={itemVariants}
              >
                <p className="text-orange-300/80 text-sm font-mono text-center">
                  Use your institutional email for VIT students (@vitstudent.ac.in) or personal email for external participants
                </p>
              </motion.div>

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
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-orange-300/60 font-mono text-sm">
              Secure authentication powered by Google
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}