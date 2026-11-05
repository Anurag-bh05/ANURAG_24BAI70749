import React, { useMemo, useCallback, useState } from 'react';

const artificialSlowdown = (ms) => {
  const start = Date.now();
  while (Date.now() - start < ms) {} 
};

// 1. Memoized Event Card
const EventCard = React.memo(({ event, onDragStart }) => {
  artificialSlowdown(20); 
  console.log(`⚡ FAST Render: ${event.title}`);
  
  return (
    <div 
      className="event-card"
      draggable
      data-id={event.id} 
      onDragStart={onDragStart}
    >
      <div className="event-title">{event.title}</div>
      <div className="event-time">🕒 {event.time}</div>
      <div className="event-tag">{event.tag}</div>
    </div>
  );
});

// 2. Memoized Column Component
// This is an advanced technique: Isolating local state (isDragOver) inside a memoized child
// ensures that dragging over this column doesn't re-render the parent or sibling columns.
const DayColumn = React.memo(({ day, dayEvents, handleDrop, handleDragStart }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const onDragLeave = () => setIsDragOver(false);

  const onDrop = (e) => {
    setIsDragOver(false);
    handleDrop(e, day);
  };

  return (
    <div 
      className={`day-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="day-header">{day}</div>
      {dayEvents.map((ev) => (
        <EventCard 
          key={ev.id} 
          event={ev} 
          onDragStart={handleDragStart} 
        />
      ))}
    </div>
  );
});

export default function OptimizedCalendar({ events, days, setEvents }) {
  
  // Stable reference for dragging
  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData("eventId", e.target.dataset.id);
  }, []);

  // Stable reference for dropping
  const handleDrop = useCallback((e, day) => {
    e.preventDefault();
    const eventId = parseInt(e.dataTransfer.getData("eventId"));
    
    // Functional state update prevents re-creating this function on every event change
    setEvents(prev => prev.map(ev => 
      ev.id === eventId ? { ...ev, day: day } : ev
    ));
  }, [setEvents]);

  // Group events by day efficiently
  const eventsByDay = useMemo(() => {
    const grouped = {};
    days.forEach(day => grouped[day] = []);
    events.forEach(ev => {
      if(grouped[ev.day]) grouped[ev.day].push(ev);
    });
    return grouped;
  }, [events, days]);

  return (
    <div className="calendar-grid">
      {days.map((day) => (
        <DayColumn
          key={day}
          day={day}
          dayEvents={eventsByDay[day]}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
        />
      ))}
    </div>
  );
}