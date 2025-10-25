export const InfoItem = ({
  label,
  value,
  icon,
  fullWidth = false,
}: {
  label: string;
  value: string;
  icon: string;
  fullWidth?: boolean;
}) => (
  <div className={fullWidth ? "col-span-full" : ""}>
    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100 hover:border-gray-200 transition-colors">
      <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
        <span>{icon}</span>
        {label}
      </p>
      <p className="text-sm font-medium text-[var(--text-dark)] break-words">
        {value}
      </p>
    </div>
  </div>
);
