const hackathonEvents = [
  {
    id: 1,
    time: "09:00 AM",
    date: "22 SEP",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ CHECK-IN",
    description: "Registration opens. Participants receive their welcome kits, team assignments, and venue orientation. Network with fellow hackers and grab some coffee."
  },
  {
    id: 2,
    time: "11:30 AM", 
    date: "22 SEP",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ SPEAKER SESSION",
    description: "Keynote presentations from industry leaders sharing insights on cutting-edge technology trends, innovation strategies, and the future of digital transformation."
  },
  {
    id: 3,
    time: "01:00 PM",
    date: "22 SEP", 
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ LUNCH BREAK",
    description: "Networking lunch with gourmet food options. Connect with mentors, sponsors, and fellow participants while recharging for the challenges ahead."
  },
  {
    id: 4,
    time: "02:00 PM",
    date: "22 SEP",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ CTF + TYPING CHALLENGE",
    description: "Mini competitive events featuring Capture The Flag cybersecurity challenges and speed typing competitions. Test your technical skills and reflexes."
  },
  {
    id: 5,
    time: "04:00 PM",
    date: "22 SEP",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ REVIEW SESSION 1",
    description: "First progress review with mentors. Present your initial concepts, get feedback, and refine your approach based on expert guidance."
  },
  {
    id: 6,
    time: "07:00 PM",
    date: "22 SEP",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ DINNER",
    description: "Evening meal with diverse cuisine options. Relax, socialize, and discuss project ideas with your team and other participants."
  },
  {
    id: 7,
    time: "10:00 PM",
    date: "22 SEP",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ NEGATIVE MINI HACKATHON",
    description: "Unique reverse-engineering challenge. Break down existing solutions, identify flaws, and propose innovative alternatives. Think outside the box!"
  },
  {
    id: 8,
    time: "02:00 AM",
    date: "23 SEP",
    image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ REVIEW SESSION 2",
    description: "Late-night progress check. Present your developments, receive crucial feedback, and strategize for the final push toward completion."
  },
  {
    id: 9,
    time: "06:00 AM",
    date: "23 SEP", 
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ BREAK TIME",
    description: "Much-needed rest period. Recharge with breakfast, stretch, and prepare mentally for the final development phase and presentations."
  },
  {
    id: 10,
    time: "08:00 AM",
    date: "23 SEP",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", 
    eventName: "/ REPORT BACK TO VENUE",
    description: "Return to main venue for the final day. Team check-ins, venue setup verification, and preparation for the final countdown phase."
  },
  {
    id: 11,
    time: "10:00 AM",
    date: "23 SEP",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ FINAL COUNTDOWN", 
    description: "Intense final development phase. Polish your projects, prepare presentations, and put the finishing touches on your innovative solutions."
  },
  {
    id: 12,
    time: "12:00 PM",
    date: "23 SEP",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ LUNCH",
    description: "Pre-presentation lunch break. Final meal before the big presentations. Network and calm your nerves before showcasing your hard work."
  },
  {
    id: 13,
    time: "01:30 PM", 
    date: "23 SEP",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ REVIEW SESSION 3",
    description: "Final review session before presentations. Last-minute refinements, presentation rehearsals, and final mentor feedback sessions."
  },
  {
    id: 14,
    time: "05:00 PM",
    date: "23 SEP",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ FINAL PRESENTATIONS",
    description: "The moment you've been working toward! Present your innovative solutions to judges, sponsors, and fellow participants. Showcase your creativity and technical skills."
  },
  {
    id: 15,
    time: "07:00 PM",
    date: "23 SEP", 
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ CLOSING CEREMONY",
    description: "Celebration time! Awards presentation, winner announcements, networking opportunities, and commemoration of an incredible hackathon journey."
  }
];

export default hackathonEvents;