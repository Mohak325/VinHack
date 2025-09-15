"use client";

import { useRef, useState } from "react";
import { orbitron } from "../fonts";
import GridPlusBackground from "./Grid";

export default function FaqSection() {
  return (
    <section id="faq" className="relative w-full py-10 bg-faq-pattern">
      <GridPlusBackground>
        <div className="relative max-w-6xl w-full mx-auto px-6 py-12 z-10">
          {/* Title */}
          <h1 className="text-center text-3xl font-bold mb-12 font-orbitron">
            FAQS
          </h1>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side - General + Hacking */}
            <div className="space-y-10">
              {/* General FAQs */}
              <div>
                <h2
                  className={`text-center text-[28px] font-bold text-black mb-6 ${orbitron.className}`}
                >
                  GENERAL FAQS
                </h2>
                <div className="space-y-4">
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
                </div>
              </div>

              {/* Hacking FAQs */}
              <div>
                <h2
                  className={`text-center text-[28px] font-bold text-black mb-6 ${orbitron.className}`}
                >
                  HACKING FAQS
                </h2>
                <div className="space-y-4">
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
                </div>
              </div>
            </div>

            {/* Right Side - VinHack + Signup */}
            <div className="space-y-10">
              {/* VinHack FAQs */}
              <div>
                <h2
                  className={`text-center text-[28px] font-bold text-black mb-6 ${orbitron.className}`}
                >
                  VINHACK FAQS
                </h2>
                <div className="space-y-4">
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
                </div>
              </div>

              {/* Sign Up FAQs */}
              <div>
                <h2
                  className={`text-center text-[28px] font-bold text-black mb-6 ${orbitron.className}`}
                >
                  SIGN UP FAQS
                </h2>
                <div className="space-y-4">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </GridPlusBackground>
    </section>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef(null);

  return (
    <details
      ref={detailsRef}
      className="border border-gray-700 rounded-lg overflow-hidden group"
      open={open}
      onToggle={() => setOpen(detailsRef.current?.open)}
    >
      <summary
        className={`font-poppins cursor-pointer px-3 py-2 text-base font-medium faq-no-arrow ${
          open ? "bg-[#D5D1BE] text-black" : "bg-[#2B1E1E] text-white"
        }`}
        style={{ listStyle: "none" }}
      >
        {question}
      </summary>
      {answer && (
        <div
          className={`font-poppins px-4 py-3 text-sm ${
            open ? "bg-[#332015] text-white" : "bg-[#f5f5f5] text-black"
          }`}
        >
          {answer}
        </div>
      )}
      <style jsx>{`
        summary::-webkit-details-marker,
        summary::marker {
          display: none;
        }
      `}</style>
    </details>
  );
}
