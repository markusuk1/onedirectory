export default function OpeningHours({ hours }: { hours: string[] }) {
  if (!hours.length) return null;

  return (
    <div>
      <h3 className="font-semibold text-text mb-2">Opening Hours</h3>
      <ul className="space-y-1">
        {hours.map((line) => {
          const [day, ...timeParts] = line.split(": ");
          const time = timeParts.join(": ");
          return (
            <li
              key={day}
              className="flex justify-between text-sm text-text-light"
            >
              <span className="font-medium text-text">{day}</span>
              <span>{time}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
