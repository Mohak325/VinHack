"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingPage() {
  const [teamName] = useState("Team Alpha");
  const [members, setMembers] = useState([
    { name: "John Doe", isLead: true },
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
  ]);
  const [showExitModal, setShowExitModal] = useState(false);

  const removeMember = (name) => {
    setMembers(members.filter((m) => m.name !== name));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  const cardVariants = {
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

  const memberVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  const timelineSteps = [
    { name: "Review 1", status: "completed" },
    { name: "Review 2", status: "current" },
    { name: "Review 3", status: "upcoming" },
    { name: "Final Presentation", status: "upcoming" }
  ];

  const getStepColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-500 border-green-400";
      case "current": return "bg-blue-500 border-blue-400";
      case "upcoming": return "bg-gray-400 border-gray-300";
      default: return "bg-gray-400 border-gray-300";
    }
  };

  const getLineColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "current": return "bg-blue-500";
      default: return "bg-gray-300";
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

      {/* Plus symbols pattern - reduced orange */}
      <div className="absolute inset-0 grid grid-cols-12 gap-6 p-6 opacity-10">
        {Array.from({ length: 72 }, (_, index) => (
          <div key={index} className="flex items-center justify-center">
            <motion.div
              className="text-xs font-light select-none"
              style={{ color: "#f97316" }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 10 + (index % 4) * 2, 
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
      <div className="relative z-10 min-h-screen p-4 sm:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Team Header */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 sm:mb-12 text-orange-400 font-mono"
            variants={itemVariants}
          >
            {teamName}
          </motion.h1>

          <div className="grid xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Section - Team Info */}
            <motion.div 
              className="xl:col-span-1 bg-gradient-to-br from-orange-400/80 to-orange-500/80 rounded-2xl shadow-2xl border border-orange-400/30 overflow-hidden"
              variants={cardVariants}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-orange-400 opacity-10 blur-xl"></div>
              
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-center mb-6">
                  <motion.div 
                    className="p-3 bg-black/20 rounded-full backdrop-blur-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </motion.div>
                </div>

                <h2 className="text-xl font-bold mb-6 text-black text-center font-mono">Team Members</h2>
                
                <motion.div className="flex flex-col gap-3 mb-6">
                  {members.map((member, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between bg-black/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-black/10"
                      variants={memberVariants}
                      layout
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center gap-3">
                        {member.isLead && (
                          <motion.div
                            className="text-yellow-300"
                            title="Team Lead"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                        <p className="font-medium text-black font-mono text-sm">{member.name}</p>
                      </div>
                      {!member.isLead && (
                        <motion.button
                          onClick={() => removeMember(member.name)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100/20 transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button 
                  onClick={() => setShowExitModal(true)}
                  className="w-full bg-red-500/70 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-500/90 transition-all duration-300 font-mono border border-red-400/30 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Exit Team
                </motion.button>
              </div>
            </motion.div>

            {/* Middle Section - Timeline */}
            <motion.div 
              className="xl:col-span-1 bg-gray-900/90 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
              variants={cardVariants}
            >
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-center mb-6">
                  <motion.div 
                    className="p-3 bg-blue-500/20 rounded-full backdrop-blur-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </motion.div>
                </div>

                <h2 className="text-xl font-bold mb-8 text-blue-400 text-center font-mono">Review Timeline</h2>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                  
                  <div className="flex flex-col gap-6">
                    {timelineSteps.map((step, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-4 relative"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        {/* Timeline dot */}
                        <motion.div 
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-white font-bold text-xs z-10 ${getStepColor(step.status)}`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {i + 1}
                        </motion.div>
                        
                        {/* Connecting line to next step */}
                        {i < timelineSteps.length - 1 && (
                          <div className={`absolute left-4 top-8 w-0.5 h-6 ${getLineColor(step.status)}`}></div>
                        )}
                        
                        <div className="flex-1">
                          <p className={`font-medium font-mono text-sm ${
                            step.status === 'completed' ? 'text-green-400' :
                            step.status === 'current' ? 'text-blue-400' : 'text-gray-400'
                          }`}>
                            {step.name}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">{step.status}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section - Project Info Form */}
            <motion.div 
              className="xl:col-span-1 bg-gradient-to-br from-orange-400/60 to-orange-500/60 rounded-2xl shadow-2xl border border-orange-400/30 overflow-hidden"
              variants={cardVariants}
            >
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-center mb-6">
                  <motion.div 
                    className="p-3 bg-black/20 rounded-full backdrop-blur-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </motion.div>
                </div>

                <h2 className="text-xl font-bold mb-6 text-black text-center font-mono">Project Information</h2>
                
                <div className="flex flex-col gap-4">
                  {[
                    { placeholder: "Track Chosen", type: "text" },
                    { placeholder: "Project Title", type: "text" },
                    { placeholder: "GitHub Link", type: "url" },
                    { placeholder: "Figma Link", type: "url" },
                    { placeholder: "PPT Link", type: "url" },
                    { placeholder: "Other Links", type: "url" }
                  ].map((field, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <motion.input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full p-3 border-2 border-black/20 rounded-lg bg-black/10 text-black placeholder-black/60 font-mono focus:outline-none focus:border-black/40 focus:bg-black/5 transition-all duration-300 backdrop-blur-sm text-sm"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>
                  ))}
                  
                  <motion.div variants={itemVariants}>
                    <motion.textarea
                      placeholder="Project Description"
                      className="w-full p-3 border-2 border-black/20 rounded-lg bg-black/10 text-black placeholder-black/60 font-mono focus:outline-none focus:border-black/40 focus:bg-black/5 transition-all duration-300 backdrop-blur-sm resize-none text-sm"
                      rows="3"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Project info saved!");
                      }}
                      className="w-full bg-black/20 text-black font-medium py-3 px-6 rounded-lg hover:bg-black/30 transition-all duration-300 backdrop-blur-sm border border-black/10 font-mono text-sm"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save Project Info →
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <div className="mb-4">
                  <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono">Exit Team?</h3>
                <p className="text-gray-400 mb-6 font-mono text-sm">Are you sure you want to exit the team? This action cannot be undone.</p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={() => setShowExitModal(false)}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 font-mono text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      // Handle exit logic here
                      setShowExitModal(false);
                      alert("Exited team successfully!");
                    }}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-mono text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Exit Team
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}