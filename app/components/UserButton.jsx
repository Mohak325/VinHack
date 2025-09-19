"use client";
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function UserButton({ className = "" }) {
  const { data: session, status } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  if (status === "loading") {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <motion.button
        onClick={() => window.location.href = '/login'}
        className={`bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 font-bold py-2 px-4 rounded-lg transition-all duration-300 backdrop-blur-sm border border-orange-500/20 font-mono text-sm ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </motion.button>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 font-bold py-2 px-3 rounded-lg transition-all duration-300 backdrop-blur-sm border border-orange-500/20 font-mono text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {session.user.image && (
          <img 
            src={session.user.image} 
            alt={session.user.name || 'User'} 
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="hidden sm:inline">
          {session.user.name?.split(' ')[0] || 'User'}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </motion.button>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-orange-500/30 rounded-lg shadow-lg z-50"
        >
          <div className="p-3 border-b border-orange-500/20">
            <p className="text-orange-300 font-mono text-sm truncate">
              {session.user.email}
            </p>
          </div>
          <div className="py-2">
            <button
              onClick={() => {
                setShowDropdown(false)
                window.location.href = '/onboarding'
              }}
              className="w-full px-4 py-2 text-left text-orange-300 hover:text-orange-500 hover:bg-orange-500/10 transition-colors font-mono text-sm"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setShowDropdown(false)
                window.location.href = '/teams'
              }}
              className="w-full px-4 py-2 text-left text-orange-300 hover:text-orange-500 hover:bg-orange-500/10 transition-colors font-mono text-sm"
            >
              Teams
            </button>
            <hr className="my-2 border-orange-500/20" />
            <button
              onClick={() => {
                setShowDropdown(false)
                signOut({ callbackUrl: '/' })
              }}
              className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-mono text-sm"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}