"use client";
import React from 'react';
import Grid from './Grid.jsx';
import NotchedPageWrapper from './notch_back.jsx'; // Import the wrapper

const Rules = () => {
  const rules = [
    "Teams must have 2–4 participants (no solo participation, no multiple teams).",
    "Hackathon runs for 36 hours continuously.",
    "All work must be done during the event; only open-source tools/libraries allowed; any AI tools can be used.",
    "Any tech stack may be used; projects must align with at least one track.",
    "Internet access is permitted. Submissions must include: working prototype/demo, pitch deck or documentation, and GitHub repo with source code.",
    "Late submissions will not be accepted.",
    "Judging based on novelty, feasibility & impact, tech implementation, design & UX, open-source usage, and pitching.",
    "Judges’ decisions are final.",
    "Respect all participants and organizers; misconduct leads to disqualification.",
    "Teams must remain onsite throughout the hackathon."
  ];

  return (
    <NotchedPageWrapper>
      <Grid>
        {/* Added pb-16 for extra padding at the bottom */}
        <div id="rules" className="w-full max-w-6xl mx-auto p-6 sm:p-8 md:p-12 pb-12">
          <h1 
            className="text-center text-4xl sm:text-5xl md:text-7xl tracking-widest font-bold mt-12" 
            style={{ 
              fontFamily: '"Orbitron", sans-serif',
              color: '#000'
            }}
          >
            RULES
          </h1>
          <ul className="list-none p-0 m-0 flex flex-col gap-4 md:gap-6 mt-12 px-4 md:px-10 ">
            {rules.map((rule, index) => (
              <li 
                key={index} 
                className="text-base sm:text-lg md:text-xl" 
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  lineHeight: '1.7',
                  color: '#000'
                }}
              >
                • {rule}
              </li>
            ))}
          </ul>
        </div>
      </Grid>
    </NotchedPageWrapper>
  );
};

export default Rules;
