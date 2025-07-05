import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ICalendarEvent } from '../../../../shared/types/api';

interface TimeUntilNextProps {
  nextEvent: ICalendarEvent | null;
}

export const TimeUntilNext: React.FC<TimeUntilNextProps> = ({ nextEvent }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!nextEvent) return;

    const updateTimeLeft = () => {
      const eventDate = new Date(nextEvent.start.dateTime || nextEvent.start.date!);
      const now = new Date();
      
      if (eventDate > now) {
        setTimeLeft(formatDistanceToNow(eventDate, { addSuffix: true }));
      } else {
        setTimeLeft('Now');
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [nextEvent]);

  if (!nextEvent) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <div className="text-sm text-blue-600 font-medium">Next Event</div>
      <div className="text-blue-800 font-semibold">{nextEvent.summary}</div>
      <div className="text-blue-600 text-sm">{timeLeft}</div>
    </div>
  );
};