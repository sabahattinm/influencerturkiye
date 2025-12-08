/**
 * InfluencerCard Component
 * Displays an influencer's portrait image with rounded corners and follower count
 * 
 * @param {string} image - The URL of the influencer's image
 * @param {string} alt - Alt text for the image
 * @param {string|number} followers - Follower count (e.g., "125K" or 125000)
 * @param {string} className - Additional CSS classes
 */
const InfluencerCard = ({ image, alt = "Influencer", followers, className = "" }) => {
  // Format follower count if it's a number
  const formatFollowers = (count) => {
    if (!count) return null;
    if (typeof count === 'string') return count;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const formattedFollowers = formatFollowers(followers);

  return (
    <div className={`relative overflow-hidden rounded-3xl group ${className}`}>
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay - always visible when followers exist, enhanced on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent ${formattedFollowers ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
      
      {/* Follower count badge */}
      {formattedFollowers && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <svg 
              className="w-4 h-4 text-pink-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-800">{formattedFollowers}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerCard;

