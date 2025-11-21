interface StatsCardProps {
  value: string | number;
  label: string;
  sublabel?: string;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo';
}

export default function StatsCard({ 
  value, 
  label, 
  sublabel,
  color = 'blue' 
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900 text-blue-700 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-900 text-green-700 text-green-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-900 text-orange-700 text-orange-600',
    red: 'bg-red-50 border-red-200 text-red-900 text-red-700 text-red-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-900 text-purple-700 text-purple-600',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-900 text-indigo-700 text-indigo-600',
  };

  const [bgColor, borderColor, valueColor, labelColor] = colorClasses[color].split(' ');

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      <div className={`text-sm ${labelColor}`}>{label}</div>
      {sublabel && <div className={`text-xs ${labelColor} mt-1`}>{sublabel}</div>}
    </div>
  );
}
