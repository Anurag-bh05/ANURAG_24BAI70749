import React, { useState } from 'react';
import NonOptimizedCalendar from './NonOptimizedCalendar';
import OptimizedCalendar from './OptimizedCalendar';
import './index.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const INITIAL_EVENTS = [
  { id: 1, title: 'Engineering Sync', time: '09:00 AM', tag: 'Meeting', day: 'Monday' },
  { id: 2, title: 'Code Review', time: '11:30 AM', tag: 'Dev', day: 'Monday' },
  { id: 3, title: 'UI/UX Design Session', time: '02:00 PM', tag: 'Design', day: 'Tuesday' },
  { id: 4, title: 'Client Presentation', time: '10:00 AM', tag: 'External', day: 'Wednesday' },
  { id: 5, title: 'Sprint Planning', time: '01:00 PM', tag: 'Agile', day: 'Thursday' },
  { id: 6, title: 'Deploy to Production', time: '04:00 PM', tag: 'DevOps', day: 'Friday' },
  { id: 7, title: 'Team Retrospective', time: '05:00 PM', tag: 'Culture', day: 'Friday' },
];

export default function App() {
  const [isOptimized, setIsOptimized] = useState(true);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [search, setSearch] = useState("");

  return (
    <div className="app-container">
      {/* Left Column: Controls & Theory */}
      <div className="sidebar">
        <h1>Experiment 4</h1>
        <h2>Calendar Optimization</h2>
        <p>
          Drag and drop events. Monitor rendering performance with React DevTools. Notice how the Optimized mode isolates re-renders.
        </p>
        
        <input 
          type="text" 
          className="search-input"
          placeholder="Type to trigger state updates..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <button 
          className={`toggle-btn ${isOptimized ? 'optimized' : 'slow'}`}
          onClick={() => setIsOptimized(!isOptimized)}
        >
          {isOptimized ? '⚡ Optimized Architecture' : '🐢 Legacy Architecture'}
        </button>
      </div>

      {/* Right Column: The Rendered Calendar */}
      <div className="render-area">
        {isOptimized ? (
          <OptimizedCalendar events={events} days={DAYS} setEvents={setEvents} />
        ) : (
          <NonOptimizedCalendar events={events} days={DAYS} setEvents={setEvents} />
        )}
      </div>
    </div>
  );
}