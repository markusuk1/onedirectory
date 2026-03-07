import EventsPage from "@/app/events/page";

// This site uses /minibus-hire/* as the primary section (middleware redirects /events -> /minibus-hire/events).
// Re-export the generic events page here so both routes work.
export default EventsPage;
