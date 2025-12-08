import { ArrowUpRight, ArrowRight, Play } from 'lucide-react';

/**
 * ActionCard Component
 * Reusable card for CTA actions like "See how it's done" or "Show All"
 * 
 * @param {string} variant - 'lime' for lime background, 'purple' for purple background
 * @param {string} title - Main text of the card
 * @param {string} subtitle - Secondary text (optional)
 * @param {string} icon - 'video' for play icon, 'arrow' for arrow icon
 * @param {string} className - Additional CSS classes
 */
const ActionCard = ({ 
  variant = 'lime', 
  title, 
  subtitle, 
  icon = 'arrow',
  className = "" 
}) => {
  // Determine background and text colors based on variant
  const bgColor = variant === 'lime' ? 'bg-[#d3f26a]' : 'bg-[#ad7bff]';
  const textColor = variant === 'lime' ? 'text-black' : 'text-white';
  
  return (
    <div 
      className={`${bgColor} ${textColor} rounded-3xl p-6 flex flex-col justify-between cursor-pointer 
        hover:scale-[1.02] transition-transform duration-300 ${className}`}
    >
      {/* Icon at top */}
      <div className="mb-auto">
        {icon === 'video' ? (
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        ) : (
          <div className={`w-12 h-12 ${variant === 'lime' ? 'bg-black/10' : 'bg-white/20'} rounded-full flex items-center justify-center`}>
            <ArrowRight className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>
        {subtitle && (
          <p className={`text-sm mt-1 ${variant === 'lime' ? 'text-black/60' : 'text-white/70'}`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Arrow icon at bottom right for lime variant */}
      {variant === 'lime' && (
        <div className="flex justify-end mt-4">
          <ArrowUpRight className="w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default ActionCard;

