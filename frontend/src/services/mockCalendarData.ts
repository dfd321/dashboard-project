import { ICalendarData } from '../../../shared/types/api';

export const mockCalendarData: ICalendarData = {
  isAuthenticated: true,
  events: [
    {
      id: "1",
      summary: "Team Standup",
      start: { dateTime: "2024-11-07T09:00:00-08:00" },
      end: { dateTime: "2024-11-07T09:30:00-08:00" },
      location: "Zoom",
      htmlLink: "https://calendar.google.com/event?id=1"
    },
    {
      id: "2",
      summary: "Project Review",
      start: { dateTime: "2024-11-07T14:00:00-08:00" },
      end: { dateTime: "2024-11-07T15:00:00-08:00" },
      description: "Q4 project review meeting",
      htmlLink: "https://calendar.google.com/event?id=2"
    },
    {
      id: "3",
      summary: "Client Meeting",
      start: { dateTime: "2024-11-08T10:00:00-08:00" },
      end: { dateTime: "2024-11-08T11:30:00-08:00" },
      location: "Conference Room A",
      htmlLink: "https://calendar.google.com/event?id=3"
    },
    {
      id: "4",
      summary: "All Day Event",
      start: { date: "2024-11-09" },
      end: { date: "2024-11-09" },
      htmlLink: "https://calendar.google.com/event?id=4"
    },
    {
      id: "5",
      summary: "Design Workshop",
      start: { dateTime: "2024-11-10T13:00:00-08:00" },
      end: { dateTime: "2024-11-10T16:00:00-08:00" },
      location: "Office",
      description: "UI/UX design workshop for new features",
      htmlLink: "https://calendar.google.com/event?id=5"
    }
  ],
  calendars: [
    {
      id: "primary",
      summary: "Personal",
      primary: true
    }
  ]
};