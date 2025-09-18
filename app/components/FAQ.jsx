"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { orbitron, poppins, t012 } from "../fonts";
import { GridPlusBackground } from "./Grid";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const faqItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function FaqSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <GridPlusBackground>
        <motion.div
          className="relative max-w-6xl w-full mx-auto px-6 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Title */}
          <motion.h2
            className={`text-center text-5xl font-black tracking-widest text-black mb-12 ${t012.className}`}
            variants={titleVariants}
          >
            FAQ
          </motion.h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side - General + Hacking */}
            <div className="space-y-10">
              {/* General FAQs */}
              <motion.div variants={sectionVariants}>
                <motion.h2
                  className={`text-center text-[28px] font-bold text-slate-700 mb-6 ${orbitron.className}`}
                  variants={faqItemVariants}
                >
                  GENERAL FAQS
                </motion.h2>

                <motion.div className="space-y-4" variants={containerVariants}>
                  <FaqItem
                    question="What is a hackathon?"
                    answer="A hackathon is an event where participants work together in teams to build a project. Hackathons are a great way to learn new skills, meet new people, and build something cool."
                  />
                  <FaqItem
                    question="What happens at a hackathon?"
                    answer="For 36 hours, participants work together in teams of 1 to 4 people to build a project. Teams can work on hardware or software projects. There is no limit on creativity. This hackathon acts as a sort of incubator to your mini projects as it provides a focused time to work on your idea with mentors and workshops to help you along."
                  />
                  <FaqItem
                    question="Do I need to know how to code to participate?"
                    answer="Not at all! The hackathon's purpose is to create a welcoming and supportive environment to learn. The hackathon has plenty of mentors and resources to help you work on your hack. It's the best place to try something new"
                  />
                  <FaqItem
                    question="Do I need to have a team to participate?"
                    answer="No, you don't need to have a team to participate. You can join a team on the Discord server. You can also form a team with your friends. You can also participate as an individual."
                  />
                  <FaqItem
                    question="Who organizes VinHack?"
                    answer="VinHack is organized by VinnovateIT. VinnovateIT is the official lab of SCORE School at VIT Vellore. It is an organization of students who are passionate about technology and innovation. VinnovateIT organizes hackathons, and events to help students learn and grow. VinnovateIT builds amazing products and projects."
                  />
                </motion.div>
              </motion.div>

              {/* Hacking FAQs */}
              <motion.div variants={sectionVariants}>
                <motion.h2
                  className={`text-center text-[28px] font-bold text-black mb-6 ${orbitron.className}`}
                  variants={faqItemVariants}
                >
                  HACKING FAQS
                </motion.h2>

                <motion.div className="space-y-4" variants={containerVariants}>
                  <FaqItem
                    question="What should I bring?"
                    answer="Make sure to bring your laptop, charger and any other required tech you'll need for your hack. You will find it helpful to bring along key items you would bring to a sleepover: pillows, blanket, toothbrush/toothpaste, deodorant, earphones, etc."
                  />
                  <FaqItem
                    question="But I don't have a team!"
                    answer="There will be opportunities for willing participants to look for, make or join a team before and at the hackathon through the Discord and after opening ceremonies. If you want to hack as a team, be sure to be proactive during these opportunities! Alternatively, if you have a team and want to find an additional member, these are also opportunities for your team."
                  />
                  <FaqItem
                    question="But I don't have any ideas!"
                    answer="Don't let this deter you from participating! There is a lot of time and inspiration at the event! A good recommendation for coming up with ideas is to think about annoyances in your everyday life that you could potentially solve. Talk to your friends and family to help you!"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side - VinHack + Signup */}
            <div className="space-y-10">
              {/* VinHack FAQs */}
              <motion.div variants={sectionVariants}>
                <motion.h2
                  className={`text-center text-[28px] font-bold text-black mb-6 ${orbitron.className}`}
                  variants={faqItemVariants}
                >
                  VINHACK FAQS
                </motion.h2>

                <motion.div className="space-y-4" variants={containerVariants}>
                  <FaqItem
                    question="What is the theme of VinHack?"
                    answer="The theme of this hackathon is Open Innovation. This theme is broad enough to allow you to build anything you want. You can build a website, an app, a game, a hardware project, or anything else you can think of. The only requirement is that it has to be a new project, and not submitted to any hackathon in the past."
                  />
                  <FaqItem
                    question="What is the format of the VinHack?"
                    answer="The VinHack will be held in hybrid mode. You can participate from anywhere in the world, or in-person at VIT Vellore, if you're selected. The hackathon will be held on Discord. You can join the Discord server by clicking the link on the homepage. The hackathon will be held over 36 hours. You can start working on your project at 10:00 AM on 2nd February and submit your project by 12:00 PM on 3rd February. You can find the schedule of the hackathon on the homepage."
                  />
                  <FaqItem
                    question="Can I join the hackathon physically?"
                    answer="Yes, you can join the hackathon physically at VIT Vellore. Unfortunately, we can only accommodate a limited number of participants. If you are selected, you will be notified via email. You can find the schedule of the hackathon on the homepage."
                  />
                  <FaqItem
                    question="What is the schedule of the VinHack?"
                    answer="The hackathon will be held over 36 hours. You can start working on your project at 10:00 AM on 2nd February and submit your project by 12:00 PM on 3rd February. You can find the schedule of the hackathon on the homepage."
                  />
                  <FaqItem
                    question="Where is VinHack hosted"
                    answer="VinHack is hosted virtually on Discord and physically at VIT Vellore. You can join the Discord server by clicking the link on the homepage."
                  />
                </motion.div>
              </motion.div>

              {/* Sign Up FAQs */}
              <motion.div variants={sectionVariants}>
                <motion.h2
                  className={`text-center text-[28px] font-bold text-black mb-6 ${orbitron.className}`}
                  variants={faqItemVariants}
                >
                  SIGN UP FAQS
                </motion.h2>

                <motion.div className="space-y-4" variants={containerVariants}>
                  <FaqItem
                    question="Where can I register for VinHack?"
                    answer="You can register for VinHack on Foundance. You can click on the button on homepage to register. You can also register by clicking here."
                  />
                  <FaqItem
                    question="When is the last date to register for VinHack?"
                    answer="TBD"
                  />
                  <FaqItem
                    question="Do I need to be a student to participate?"
                    answer="Yes, you need to be a student to participate. You can be a student of any grade, from any school or college. You can also be a student of any age."
                  />
                  <FaqItem
                    question="Do I need to be a VITIAN to participate?"
                    answer="No, you don't need to be a VITian to participate. You can be a student of any school or college."
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <div className="h-20"></div>
      </GridPlusBackground>
    </section>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div
      className="border border-gray-700 rounded-lg overflow-hidden"
      variants={faqItemVariants}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.button
        onClick={toggleOpen}
        className={`w-full text-left ${
          poppins.className
        } cursor-pointer px-3 py-2 text-base font-medium faq-no-arrow focus:outline-none transition-colors duration-300 ${
          isOpen ? "bg-[#D5D1BE] text-black" : "bg-[#2B1E1E] text-white"
        }`}
        style={{ listStyle: "none" }}
        aria-expanded={isOpen}
        whileHover={{ backgroundColor: isOpen ? "#C8C4B1" : "#3A2A2A" }}
      >
        {question}
      </motion.button>
      <motion.div
        ref={contentRef}
        className={`overflow-hidden ${
          isOpen ? "bg-[#332015] text-white" : "bg-[#f5f5f5] text-black"
        }`}
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className={`px-4 py-3 ${poppins.className} text-sm`}
          initial={{ y: -10 }}
          animate={{ y: isOpen ? 0 : -10 }}
          transition={{ duration: 0.2, delay: isOpen ? 0.1 : 0 }}
        >
          {answer}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
