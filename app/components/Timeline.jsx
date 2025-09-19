import React, { useState, useEffect, useRef } from 'react';
import { day1Events,day2Events } from './timeline/data';
import TimelineGrid from './timeline/TimeLineGrid';
import EventCard from './timeline/EventCard';
import { t012} from "../fonts";
// Font configuration (simulating localFont)
const type12 = t012;

const TimelineHeader = ({ isTimelineVisible }) => (
  <header className={`absolute top-0 left-0 right-0 z-20 flex flex-col sm:flex-row justify-between items-startp-4 sm:p-6 lg:p-8 gap-4 transition-transform duration-500 ${
    isTimelineVisible ? 'translate-y-0' : '-translate-y-full'
  }`}>
    <h1 className={`text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-[0.1em] sm:tracking-[0.2em] lg:tracking-[0.3em]  bg-black ${type12.className}`}>
      TIMELINE
    </h1>
    {/* <CrosshairSVG className="hidden lg:block right-5"/> */}
  </header>
);


const HorizontalTimeline = ({ events }) => {
  const containerRef = useRef(null);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentCard = 0;
    const totalCards = events.length;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, -containerRect.top) / (container.offsetHeight - window.innerHeight);
      const newIndex = Math.min(Math.floor(scrollProgress * totalCards), totalCards - 1);
      
      if (newIndex !== currentCard) {
        currentCard = newIndex;
        setCurrentIndex(newIndex);
      }

      // Check if timeline is visible
      const timelineVisible = containerRect.top <= 0 && containerRect.bottom >= window.innerHeight;
      setIsTimelineVisible(timelineVisible);

      // Horizontal scroll effect
      const wrapper = container.querySelector('.timeline-wrapper');
      if (wrapper) {
        const translateX = -scrollProgress * (window.innerWidth * (totalCards - 1));
        wrapper.style.transform = `translateX(${translateX}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [events.length]);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: `${events.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div 
          className="timeline-wrapper flex h-full transition-transform duration-100 ease-linear"
          style={{ width: `${events.length * 100}vw` }}
        >
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Timeline Component
const Timeline = () => {
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Show timeline header when user scrolls past hero section
      setIsTimelineVisible(scrollY > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <TimelineGrid>
      <TimelineHeader isTimelineVisible={isTimelineVisible} />
      <HorizontalTimeline events={day1Events} />
      <HorizontalTimeline events={day2Events} />
    </TimelineGrid>
  );
};

export default Timeline;