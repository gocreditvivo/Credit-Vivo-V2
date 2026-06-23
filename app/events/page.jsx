import EventLogClient from "../../components/EventLogClient";

export const metadata = {
  title: "Event Log",
  description: "Internal Credit Vivo launch-preview event log.",
};

export default function EventsPage() {
  return <EventLogClient />;
}
