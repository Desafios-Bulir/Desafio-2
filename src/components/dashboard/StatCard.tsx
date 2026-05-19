interface StatCardProps {
  icon: React.ElementType;
  iconBg: string;
  label: string;
  value: string;
  badge: string;
  badgeStyle: string;
}

export function StatCard({
  icon: Icon,
  iconBg,
  label,
  value,
  badge,
  badgeStyle,
}: StatCardProps) {
  const bgClass = iconBg.split(" ").find(cls => cls.startsWith("bg-")) || "bg-white";
  const textColor = iconBg.split(" ").find(cls => cls.startsWith("text-")) || "text-gray-500";

  return (
    <div className={`flex flex-col gap-4 rounded-2xl border border-white/60 ${bgClass} p-5 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ${textColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeStyle}`}>
          {badge}
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="mt-0.5 text-3xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
