import React from 'react';

const artificialSlowdown = (ms) => {
  const start = Date.now();
  while (Date.now() - start < ms) {} 
};

// Lacks React.memo
const EventCard = ({ event, onDragStart }) => {
  artificialSlowdown(20); 
  console.log(`🐢 SLOW Render: ${event.title}`);
  
  return (
    <div 
      className="event-card"
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
    >
      <div className="event-title">{event.title}</div>
      <div className="event-time">🕒 {event.time}</div>
      <div className="event-tag">{event.tag}</div>
    </div>
  );
};

export default function NonOptimizedCalendar({ events, days, setEvents }) {
  // Function recreated on every render
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("eventId", id);
  };

  const handleDrop = (e, day) => {
    e.preventDefault();
    const eventId = parseInt(e.dataTransfer.getData("eventId"));
    // Depends directly on 'events' state, causing massive re-renders
    setEvents(events.map(ev => 
      ev.id === eventId ? { ...ev, day: day } : ev
    ));
  };

  return (
    <div className="calendar-grid">
      {days.map((day, index) => {
        // Expensive filtering done inside render phase instead of useMemo
        const dayEvents = events.filter(e => e.day === day);
        
        return (
          <div 
            key={index} // Anti-pattern: Array index as key
            className="day-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, day)}
          >
            <div className="day-header">{day}</div>
            {dayEvents.map((ev, i) => (
              <EventCard 
                key={i} // Anti-pattern: Array index as key
                event={ev} 
                onDragStart={handleDragStart} 
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}