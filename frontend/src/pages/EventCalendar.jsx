import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import '../styles/EventCalendar.css'
const formatScheduleXDate = (isoString) => {
  const date = new Date(isoString);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const EventCalendar = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    plugins: [eventsService],
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const res = await axios.get('http://localhost:3000/api/team/teams', {
          withCredentials: true,
        });
        
        const teams = res.data.teams;
        console.log('Fetched teams:', teams); 

        eventsService.getAll().forEach(event => {
          eventsService.remove(event.id);
        });

        teams.forEach((team) => {
          const event = team?.eventId;
          if (event?.date) {
            try {
              const formattedDate = formatScheduleXDate(event.date);
              console.log('Adding event:', { 
                id: event._id || team._id,
                title: `${event.title} (${team.name})`,
                start: formattedDate,
                originalDate: event.date
              });
              
              eventsService.add({
                id: event._id || team._id,
                title: `${event.title} (${team.name})`,
                start: formattedDate,
                end: formattedDate, 
                allDay: true,
                classNames: ['custom-event'],
              });
            } catch (eventError) {
              console.error('Error adding individual event:', eventError, event);
            }
          }
        });
        
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventsService]);

  return (
    <div style={{ padding: '20px' }}>
      {loading && (
        <p style={{ color: 'blue', marginBottom: '10px' }}>
          Loading events...
        </p>
      )}
      {error && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Failed to load events. Please try again.
        </p>
      )}
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default EventCalendar;