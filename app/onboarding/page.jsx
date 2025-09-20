"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { orbitron } from "../fonts";
import ReviewTimeline from "../components/ReviewTimeline";

export default function OnboardingPage() {
  const { status } = useSession();
  const router = useRouter();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Project information form state
  const [projectForm, setProjectForm] = useState({
    track: '',
    projectTitle: '',
    githubLink: '',
    figmaLink: '',
    pptLink: '',
    otherLinks: '',
    projectDescription: ''
  });
  const [projectSaving, setProjectSaving] = useState(false);
  const [projectSaved, setProjectSaved] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    // Fetch team data
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/user/status');
        const data = await response.json();
        
        if (data.authenticated && !data.hasTeam) {
          // Middleware should prevent reaching here
          setTeamData(null);
          return;
        }

        if (data.team) {
          setTeamData(data.team);
          
          // Load project information if available
          if (data.team.projectInfo) {
            setProjectForm({
              track: data.team.projectInfo.track || '',
              projectTitle: data.team.projectInfo.projectTitle || '',
              githubLink: data.team.projectInfo.githubLink || '',
              figmaLink: data.team.projectInfo.figmaLink || '',
              pptLink: data.team.projectInfo.pptLink || '',
              otherLinks: data.team.projectInfo.otherLinks || '',
              projectDescription: data.team.projectInfo.projectDescription || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
        setTeamData(null);
      } finally {
        setLoading(false);
      }
    };

    // Only check team status if user is registered
    fetchTeamData();
  }, [status, router]);

  const handleLeaveTeam = async () => {
    setLeaving(true);
    try {
      const response = await fetch('/api/teams/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to leave team');
      }

      // Redirect to teams page after leaving
      router.push('/teams');
    } catch (error) {
      console.error('Error leaving team:', error);
      // Still redirect on error - user might not have a team anymore
      router.push('/teams');
    }
  };

  // Project form handlers
  const handleProjectFormChange = (field, value) => {
    setProjectForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProjectFormSubmit = async (e) => {
    e.preventDefault();
    setProjectSaving(true);

    try {
      const response = await fetch('/api/teams/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectForm)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save project information');
      }

      // Show success message
      setProjectSaved(true);
      setTimeout(() => setProjectSaved(false), 3000); // Hide after 3 seconds
      
      // Optionally refresh team data
      const statusResponse = await fetch('/api/user/status');
      const statusData = await statusResponse.json();
      if (statusData.team) {
        setTeamData(statusData.team);
      }

    } catch (error) {
      console.error('Error saving project info:', error);
      alert('Failed to save project information. Please try again.');
    } finally {
      setProjectSaving(false);
    }
  };

  // Show mobile restriction message
  if (isMobile) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black p-8">
        <div className="text-center max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <svg className="w-24 h-24 text-orange-500 mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>
            </svg>
          </motion.div>
          <h1 className={`text-2xl font-bold text-orange-400 mb-4 ${orbitron.className}`}>
            DESKTOP REQUIRED
          </h1>
          <p className={`text-gray-400 text-lg leading-relaxed ${orbitron.className}`}>
            This dashboard is optimized for desktop viewing. Please access from a larger screen for the best experience.
          </p>
        </div>
      </div>
    );
  }

  // Show loading while checking authentication or fetching team data
  if (status === "loading" || loading) {
    return (
      <div className="w-full relative min-h-screen flex items-center justify-center" style={{ backgroundColor: "#000000" }}>
        <div className={`text-orange-500 text-xl ${orbitron.className}`}>LOADING...</div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="w-full relative min-h-screen flex items-center justify-center" style={{ backgroundColor: "#000000" }}>
        <div className={`text-orange-500 text-xl ${orbitron.className}`}>NO TEAM DATA FOUND...</div>
      </div>
    );
  }

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


  return (
    <div className="w-full relative min-h-screen overflow-x-auto" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Enhanced grid background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1f1f1f 1px, transparent 1px),
            linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />

      {/* Animated plus symbols pattern */}
      <div className="absolute inset-0 grid grid-cols-16 gap-8 p-8 opacity-30">
        {Array.from({ length: 128 }, (_, index) => (
          <div key={index} className="flex items-center justify-center">
            <motion.div
              className={`text-lg font-light select-none text-orange-400 ${orbitron.className}`}
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 15 + (index % 6) * 3, 
                repeat: Infinity, 
                ease: "linear",
                scale: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              +
            </motion.div>
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Team Header */}
          <motion.h1 
            className={`text-6xl xl:text-7xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 ${orbitron.className} tracking-wider`}
            variants={itemVariants}
          >
            {loading ? 'LOADING...' : teamData?.name || 'TEAM DASHBOARD'}
          </motion.h1>

          {/* Top Row: Team Info and Timeline */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-8">
            {/* Team Info Section */}
            <motion.div 
              className="bg-gradient-to-br from-orange-400/90 to-orange-600/90 rounded-3xl shadow-2xl border border-orange-400/40 overflow-hidden backdrop-blur-sm"
              variants={cardVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent opacity-50"></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center justify-center mb-8">
                  <motion.div 
                    className="p-4 bg-black/30 rounded-full backdrop-blur-md border border-black/20"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </motion.div>
                </div>

                <h2 className={`text-2xl font-bold mb-8 text-black text-center ${orbitron.className} tracking-wide`}>TEAM MEMBERS</h2>
                
                {/* Team Code Display */}
                {teamData?.code && (
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 px-6 py-5 rounded-2xl backdrop-blur-md border-2 border-yellow-400/40 mb-8 cursor-pointer hover:from-yellow-400/40 hover:to-orange-400/40 hover:border-yellow-400/60 transition-all duration-300 shadow-lg"
                    variants={memberVariants}
                    onClick={() => {
                      navigator.clipboard.writeText(teamData.code).then(() => {
                        setShowCopied(true);
                        setTimeout(() => setShowCopied(false), 2000);
                      });
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <svg className="w-5 h-5 text-yellow-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        <p className={`text-sm text-black/80 font-bold ${orbitron.className} tracking-wider`}>TEAM CODE [CLICK TO COPY]</p>
                      </div>
                      <p className={`text-3xl font-bold text-black tracking-widest bg-black/15 py-3 px-6 rounded-xl ${orbitron.className}`}>{teamData.code}</p>
                    </div>
                  </motion.div>
                )}
                
                <motion.div className="flex flex-col gap-4 mb-8">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                    </div>
                  ) : teamData?.members ? (
                    teamData.members.map((member, idx) => (
                      <motion.div
                        key={member.id || idx}
                        className="flex items-center justify-between bg-black/25 px-6 py-4 rounded-2xl backdrop-blur-md border border-black/15 hover:bg-black/35 transition-all duration-300"
                        variants={memberVariants}
                        layout
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-center gap-4">
                          {member.isLeader && (
                            <motion.div
                              className="text-yellow-300"
                              title="Team Lead"
                              animate={{ 
                                rotate: [0, 15, -15, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          )}
                          <div className="flex flex-col">
                            <p className={`font-bold text-black text-lg ${orbitron.className}`}>{member.name}</p>
                            <p className={`text-sm text-black/70 ${orbitron.className} font-light`}>{member.email}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className={`text-center py-8 text-black/70 text-lg ${orbitron.className}`}>
                      NO TEAM MEMBERS FOUND
                    </div>
                  )}
                </motion.div>

                <motion.button 
                  onClick={() => setShowExitModal(true)}
                  disabled={leaving}
                  className={`w-full bg-red-500/80 text-white font-bold py-4 px-6 rounded-2xl hover:bg-red-500 transition-all duration-300 border border-red-400/40 text-lg disabled:opacity-60 disabled:cursor-not-allowed ${orbitron.className} tracking-wide`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {leaving ? 'EXITING...' : 'EXIT TEAM'}
                </motion.button>
              </div>
            </motion.div>
            </div>
            {/* Timeline Section */}
           <ReviewTimeline/>

          {/* Bottom Section - Project Info Form */}
          <motion.div 
            className="max-w-7xl mx-auto"
            variants={cardVariants}
          >
            <motion.div 
              className="bg-gradient-to-br from-orange-400/90 to-orange-600/90 rounded-3xl shadow-2xl border border-orange-400/40 overflow-hidden backdrop-blur-sm"
              variants={cardVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent opacity-50"></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center justify-center mb-8">
                  <motion.div 
                    className="p-4 bg-black/30 rounded-full backdrop-blur-md border border-black/20"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </motion.div>
                </div>

                <h2 className={`text-2xl font-bold mb-8 text-black text-center ${orbitron.className} tracking-wide`}>PROJECT INFORMATION</h2>
                
                {projectSaved && (
                  <motion.div 
                    className="bg-emerald-500/30 border border-emerald-500/40 text-emerald-800 px-6 py-4 rounded-2xl mb-6 text-center font-bold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span className={`text-lg ${orbitron.className} tracking-wide`}>✅ PROJECT INFORMATION SAVED SUCCESSFULLY!</span>
                  </motion.div>
                )}
                
                <form onSubmit={handleProjectFormSubmit} className="grid lg:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <motion.select
  value={projectForm.track}
  onChange={(e) => handleProjectFormChange("track", e.target.value)}
  className={`w-full p-4 border-2 border-black/30 rounded-2xl bg-black/15 text-black placeholder-black/60 focus:outline-none focus:border-black/50 focus:bg-black/10 transition-all duration-300 backdrop-blur-md text-lg font-bold tracking-wide ${orbitron.className}`}
  whileFocus={{ scale: 1.02 }}
>
  <option value="" disabled>
    TRACK CHOSEN
  </option>
  <option value="sponsor track">Sponsor Track</option>
  <option value="innovate for impact">Innovate for Impact</option>
  <option value="gravitech">Gravitech</option>
  <option value="taskmaster">Taskmaster</option>
  <option value="infiniloop">Infiniloop</option>
  <option value="cyberforge">Cyberforge</option>
  <option value="finovate">Finovate</option>
</motion.select>
</motion.div>
                  
                 <motion.div variants={itemVariants}>
  <motion.input
    type="text"
    placeholder="PROJECT TITLE"
    value={projectForm.projectTitle}
    onChange={(e) => handleProjectFormChange("projectTitle", e.target.value)}
    className={`w-full p-4 border-2 border-black/30 rounded-2xl bg-black/15 text-black placeholder-black/60 focus:outline-none focus:border-black/50 focus:bg-black/10 transition-all duration-300 backdrop-blur-md text-lg font-bold tracking-wide ${orbitron.className}`}
    whileFocus={{ scale: 1.02 }}
  />
</motion.div>

                  
                  <motion.div variants={itemVariants}>
                    <motion.input
                      type="url"
                      placeholder="GITHUB LINK"
                      value={projectForm.githubLink}
                      onChange={(e) => handleProjectFormChange('githubLink', e.target.value)}
                      className={`w-full p-4 border-2 border-black/30 rounded-2xl bg-black/15 text-black placeholder-black/60 focus:outline-none focus:border-black/50 focus:bg-black/10 transition-all duration-300 backdrop-blur-md text-lg font-bold tracking-wide ${orbitron.className}`}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <motion.input
                      type="url"
                      placeholder="Figma Link"
                      value={projectForm.figmaLink}
                      onChange={(e) => handleProjectFormChange('figmaLink', e.target.value)}
                      className={`w-full p-4 border-2 border-black/30 rounded-2xl bg-black/15 text-black placeholder-black/60 focus:outline-none focus:border-black/50 focus:bg-black/10 transition-all duration-300 backdrop-blur-md text-lg font-bold tracking-wide ${orbitron.className}`}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <motion.input
                      type="url"
                      placeholder="PPT Link"
                      value={projectForm.pptLink}
                      onChange={(e) => handleProjectFormChange('pptLink', e.target.value)}
                      className={`w-full p-4 border-2 border-black/30 rounded-2xl bg-black/15 text-black placeholder-black/60 focus:outline-none focus:border-black/50 focus:bg-black/10 transition-all duration-300 backdrop-blur-md text-lg font-bold tracking-wide ${orbitron.className}`}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <motion.input
                      type="url"
                      placeholder="Other Links"
                      value={projectForm.otherLinks}
                      onChange={(e) => handleProjectFormChange('otherLinks', e.target.value)}
                      className={`w-full p-4 border-2 border-black/30 rounded-2xl bg-black/15 text-black placeholder-black/60 focus:outline-none focus:border-black/50 focus:bg-black/10 transition-all duration-300 backdrop-blur-md text-lg font-bold tracking-wide ${orbitron.className}`}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <motion.textarea
                      placeholder="Project Description"
                      value={projectForm.projectDescription}
                      onChange={(e) => handleProjectFormChange('projectDescription', e.target.value)}
                      className="w-full p-3 border-2 border-black/20 rounded-lg bg-black/10 text-black placeholder-black/60 font-mono focus:outline-none focus:border-black/40 focus:bg-black/5 transition-all duration-300 backdrop-blur-sm resize-none text-sm"
                      rows="3"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={projectSaving}
                      className="w-full bg-black/20 text-black font-medium py-3 px-6 rounded-lg hover:bg-black/30 transition-all duration-300 backdrop-blur-sm border border-black/10 font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!projectSaving ? { scale: 1.02, y: -1 } : {}}
                      whileTap={!projectSaving ? { scale: 0.98 } : {}}
                    >
                      {projectSaving ? 'Saving...' : 'Save Project Info →'}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showCopied && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 border border-orange-500/40 text-orange-300 px-4 py-2 rounded-lg shadow-lg z-50 font-mono text-sm"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Team code copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>

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
                    onClick={handleLeaveTeam}
                    disabled={leaving}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-mono text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {leaving ? 'Exiting…' : 'Exit Team'}
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