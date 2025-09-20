import React from 'react';
import { motion } from 'framer-motion';

// Mock data for demonstration
const timelineSteps = [
  { name: "Review 1", status: "completed", date: "Week 4", timing: "30 mins" },
  { name: "Review 2", status: "completed", date: "Week 8", timing: "45 mins" },
  { name: "Review 3", status: "current", date: "Week 12", timing: "45 mins" },
  { name: "Final Presentation", status: "pending", date: "Week 16", timing: "60 mins" }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function ReviewTimeline() {
  const getStepStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          dot: 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 shadow-orange-500/50',
          line: 'bg-gradient-to-b from-orange-500 to-orange-400',
          text: 'text-orange-400'
        };
      case 'current':
        return {
          dot: 'bg-gradient-to-br from-orange-400 to-orange-500 border-orange-300 shadow-orange-400/60',
          line: 'bg-gradient-to-b from-orange-400 to-gray-600',
          text: 'text-orange-300'
        };
      default:
        return {
          dot: 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600',
          line: 'bg-gradient-to-b from-gray-600 to-gray-700',
          text: 'text-gray-400'
        };
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-orange-400 mb-4 tracking-wider font-mono" style={{ fontFamily: 'Orbitron, monospace' }}>
            PROJECT REVIEW
          </h1>
          <p className="text-orange-300/80 text-lg font-light tracking-wide">
            Track your review progress
          </p>
        </motion.div>

        {/* PPT Template Link */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a 
            href="#ppt-template" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-black font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 border border-orange-400/30"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(249, 115, 22, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            Download PPT Template
          </motion.a>
        </motion.div>

        {/* Timeline Card */}
        <motion.div 
          className="bg-transparent rounded-3xl border-2 border-orange-500 overflow-hidden backdrop-blur-sm relative"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative elements - removed */}
          
          <div className="relative z-10 p-8">
            <div className="flex items-center justify-center mb-8">
              <motion.div 
                className="p-4 bg-orange-500/20 rounded-full backdrop-blur-md border border-orange-400/30"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </motion.div>
            </div>

            <h2 className="text-2xl font-bold mb-12 text-orange-400 text-center tracking-widest" style={{ fontFamily: 'Orbitron, monospace' }}>REVIEW TIMELINE</h2>
            
            <div className="relative">
              {/* Enhanced timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/50 via-orange-600/30 to-gray-700 rounded-full shadow-lg"></div>
              
              <div className="flex flex-col gap-8">
                {timelineSteps.map((step, i) => {
                  const styles = getStepStyles(step.status);
                  return (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-6 relative"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 8 }}
                    >
                      {/* Enhanced timeline dot */}
                      <motion.div 
                        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-white font-bold text-lg z-10 shadow-xl ${styles.dot}`}
                        whileHover={{ scale: 1.15 }}
                        animate={step.status === 'current' ? {
                          boxShadow: [
                            "0 0 20px rgba(249, 115, 22, 0.6)",
                            "0 0 40px rgba(249, 115, 22, 0.4)",
                            "0 0 20px rgba(249, 115, 22, 0.6)"
                          ]
                        } : {}}
                        transition={{
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        {step.status === 'completed' ? '✓' : i + 1}
                      </motion.div>
                      
                      {/* Enhanced connecting line */}
                      {i < timelineSteps.length - 1 && (
                        <div className={`absolute left-6 top-12 w-1 h-8 ${styles.line} rounded-full`}></div>
                      )}
                      
                      <div className="flex-1">
                        <motion.div 
                          className="bg-transparent rounded-2xl p-5 border border-orange-500/30 hover:border-orange-500 transition-all duration-300"
                          whileHover={{ 
                            borderColor: "rgba(249, 115, 22, 1)"
                          }}
                        >
                          <p className={`font-bold text-xl ${styles.text} tracking-wide mb-2`} style={{ fontFamily: 'Orbitron, monospace' }}>
                            {step.name}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className={`text-sm uppercase tracking-widest px-3 py-1 rounded-full border ${
                                step.status === 'completed' 
                                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' 
                                  : step.status === 'current'
                                  ? 'bg-orange-400/20 text-orange-200 border-orange-400/30'
                                  : 'bg-gray-700/20 text-gray-400 border-gray-600/30'
                              }`}>
                                {step.status}
                              </span>
                              <span className="text-sm text-gray-400 font-light tracking-wider">
                                {step.date}
                              </span>
                            </div>
                            <span className="text-sm text-orange-300 font-bold tracking-wide">
                              {step.timing}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Footer */}
            <motion.div 
              className="mt-12 pt-8 border-t border-orange-500/20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-orange-300/60 text-sm tracking-wide">
                Stay on track with your review milestones
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}