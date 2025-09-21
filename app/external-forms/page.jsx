"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { orbitron } from "../fonts";



export default function ExternalFormPage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    year: "",
    phone: "",
    branch: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.name) {
      setFormData(prev => ({ ...prev, name: session.user.name }));
    }
  }, [session, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = ()=> {
    const newErrors= {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = "College name is required";
    }

    if (!formData.branch.trim()) {
      newErrors.branch = "Branch/Department is required";
    }

    if (!formData.year) {
      newErrors.year = "Year of study is required";
    } else {
      const yearNum = parseInt(formData.year);
      if (yearNum < 1 || yearNum > 6) {
        newErrors.year = "Year must be between 1 and 6";
      }
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/external-participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
          userEmail: session.user.email
        }),
      });

      const result= await response.json();

      if (response.ok && result.success) {
        // Update user registration status
        await fetch('/api/user/status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isRegistered: true }),
        });

        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Registration successful!');
        
        // Clear form
        setFormData({
          name: "",
          collegeName: "",
          year: "",
          phone: "",
          branch: "",
          city: "",
        });

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/teams");
        }, 2000);
      } else {
        setSubmitStatus('error');
        
        if (result.code === 'DUPLICATE_PHONE') {
          setSubmitMessage('A participant with this phone number is already registered.');
          setErrors({ phone: 'Phone number already registered' });
        } else if (result.details) {
          // Handle validation errors
          const fieldErrors= {};
          result.details.forEach(detail => {
            fieldErrors[detail.field] = detail.message;
          });
          setErrors(fieldErrors);
          setSubmitMessage('Please correct the errors below.');
        } else {
          setSubmitMessage(result.error || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full min-h-screen relative" style={{ backgroundColor: "#000000" }}>
      {/* Background grid */}
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

      <div className="absolute inset-0 grid grid-cols-5 gap-8 p-8 opacity-50">
        {Array.from({ length: 30 }, (_, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              className="text-md font-light select-none"
              style={{ color: "#ea8244" }}
            >
              +
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          {/* Back Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => router.push("/")}
            className="mb-6 flex items-center text-orange-400 hover:text-orange-300 transition-colors font-mono group"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </motion.button>

          {/* Form */}
          <motion.div
            variants={formVariants}
            className="relative bg-black/80 backdrop-blur-sm border border-orange-500/30 shadow-2xl rounded-2xl p-8 hover:shadow-orange-500/20 transition-all duration-300"
          >
            <motion.h2
              variants={itemVariants}
              className={`text-3xl font-bold mb-8 text-orange-500 text-center ${orbitron.className}`}
            >
              External Participant Registration
            </motion.h2>

            {/* Status Messages */}
            <AnimatePresence>
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-6 p-4 rounded-xl font-mono text-sm ${
                    submitStatus === 'success'
                      ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                      : 'bg-red-500/20 border border-red-500/40 text-red-400'
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              {/* Full Name */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  required
                  className={`w-full bg-black/40 border p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono ${
                    errors.name ? 'border-red-500/60' : 'border-orange-500/40'
                  }`}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-400 text-sm font-mono"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              {/* College Name */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  type="text"
                  placeholder="College Name"
                  required
                  className={`w-full bg-black/40 border p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono ${
                    errors.collegeName ? 'border-red-500/60' : 'border-orange-500/40'
                  }`}
                />
                {errors.collegeName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-400 text-sm font-mono"
                  >
                    {errors.collegeName}
                  </motion.p>
                )}
              </motion.div>

              {/* Branch */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  type="text"
                  placeholder="Branch/Department"
                  required
                  className={`w-full bg-black/40 border p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono ${
                    errors.branch ? 'border-red-500/60' : 'border-orange-500/40'
                  }`}
                />
                {errors.branch && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-400 text-sm font-mono"
                  >
                    {errors.branch}
                  </motion.p>
                )}
              </motion.div>

              {/* Year */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  type="number"
                  placeholder="Year of Study"
                  min={1}
                  max={6}
                  required
                  className={`w-full bg-black/40 border p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono ${
                    errors.year ? 'border-red-500/60' : 'border-orange-500/40'
                  }`}
                />
                {errors.year && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-400 text-sm font-mono"
                  >
                    {errors.year}
                  </motion.p>
                )}
              </motion.div>

              {/* City */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  required
                  className={`w-full bg-black/40 border p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono ${
                    errors.city ? 'border-red-500/60' : 'border-orange-500/40'
                  }`}
                />
                {errors.city && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-400 text-sm font-mono"
                  >
                    {errors.city}
                  </motion.p>
                )}
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className={`w-full bg-black/40 border p-4 rounded-xl text-orange-100 placeholder-orange-300/60 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 font-mono ${
                    errors.phone ? 'border-red-500/60' : 'border-orange-500/40'
                  }`}
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-400 text-sm font-mono"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className={`group relative font-bold py-4 px-8 rounded-xl transition-all duration-300 font-mono text-lg shadow-lg mt-4 ${
                  isSubmitting
                    ? 'bg-orange-300 cursor-not-allowed'
                    : 'bg-orange-500 text-black hover:bg-orange-400 hover:shadow-orange-500/25'
                }`}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                <div className={`absolute inset-0 rounded-xl bg-orange-400 opacity-0 transition-opacity duration-300 blur-xl ${
                  !isSubmitting ? 'group-hover:opacity-20' : ''
                }`}></div>
                <div className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-2 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Submit Registration</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}