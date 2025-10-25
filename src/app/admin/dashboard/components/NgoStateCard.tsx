export const StatCard = ({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`${
        colorClasses[color as keyof typeof colorClasses]
      } rounded-xl p-4 flex items-center gap-4`}
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm font-medium opacity-80">{label}</p>
      </div>
    </div>
  );
};
