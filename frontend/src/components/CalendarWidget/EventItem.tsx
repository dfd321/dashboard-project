import { format } from 'date-fns';
import { ICalendarEvent } from '../../../../shared/types/api';

interface EventItemProps {
  event: ICalendarEvent;
}

export const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const formatEventTime = (event: ICalendarEvent) => {
    if (event.start.date) {
      // All-day event
      return 'All day';
    }
    
    const startTime = new Date(event.start.dateTime!);
    const endTime = new Date(event.end.dateTime!);
    
    return `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
  };

  const formatEventDate = (event: ICalendarEvent) => {
    const date = new Date(event.start.dateTime || event.start.date!);
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 truncate flex-1">{event.summary}</h3>
        <a 
          href={event.htmlLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 ml-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      <div className="text-sm text-gray-600 mb-1">
        {formatEventDate(event)}
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        {formatEventTime(event)}
      </div>
      
      {event.location && (
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>
      )}
    </div>
  );
};