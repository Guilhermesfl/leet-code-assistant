interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercentage?: boolean;
  colorFrom?: string;
  colorTo?: string;
}

export default function ProgressBar({ 
  percentage, 
  label, 
  showPercentage = true,
  colorFrom = 'blue-500',
  colorTo = 'purple-600'
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-gray-700">{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`bg-gradient-to-r from-${colorFrom} to-${colorTo} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
