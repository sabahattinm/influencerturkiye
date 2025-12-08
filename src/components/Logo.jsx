/**
 * Logo Component
 * Official INFLUENCER TÜRKİYE logo - Clean and simple design
 */
const Logo = ({ size = 'default', showText = true, className = '' }) => {
  // Size configurations
  const sizes = {
    small: { icon: 32, text: 'text-sm', subtext: 'text-[8px]', gap: 'gap-2' },
    default: { icon: 40, text: 'text-lg', subtext: 'text-xs', gap: 'gap-3' },
    large: { icon: 48, text: 'text-xl', subtext: 'text-sm', gap: 'gap-3' },
    xlarge: { icon: 56, text: 'text-2xl', subtext: 'text-base', gap: 'gap-4' }
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center ${currentSize.gap} ${className}`}>
      {/* Simple Box Icon */}
      <div 
        className="flex items-center justify-center rounded-xl bg-[#d3f26a]"
        style={{ 
          width: currentSize.icon, 
          height: currentSize.icon
        }}
      >
        {/* Simple "I" letter */}
        <span 
          className="font-bold text-[#171719]"
          style={{ fontSize: currentSize.icon * 0.5 }}
        >
          İ
        </span>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold text-white tracking-tight ${currentSize.text}`}>
            INFLUENCER
          </span>
          <span className={`font-semibold text-[#d3f26a] tracking-[0.15em] ${currentSize.subtext}`}>
            TÜRKİYE
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * LogoMark Component
 * Just the icon without text
 */
export const LogoMark = ({ size = 40, className = '' }) => {
  return (
    <div 
      className={`flex items-center justify-center rounded-xl bg-[#d3f26a] ${className}`}
      style={{ width: size, height: size }}
    >
      <span 
        className="font-bold text-[#171719]"
        style={{ fontSize: size * 0.5 }}
      >
        İ
      </span>
    </div>
  );
};

export default Logo;
