import { memo, useMemo } from 'react';
import { Instagram, Users, Heart } from 'lucide-react';

/**
 * InfluencerCard Component
 * Displays an influencer's portrait image with name, category, Instagram link, engagement rate, and followers
 * Matches the card structure from PortfolioPage.jsx
 * 
 * @param {string} image - The URL of the influencer's image
 * @param {string} name - The influencer's name
 * @param {string} category - The influencer's category (optional)
 * @param {string} instagramUrl - The Instagram profile URL
 * @param {string} engagementRate - The engagement rate (e.g., "8%", "12%")
 * @param {number|string} followers - The follower count (number or formatted string like "7.8M")
 * @param {string} alt - Alt text for the image
 * @param {string} className - Additional CSS classes
 */
const InfluencerCard = memo(({ 
  image, 
  name, 
  category,
  instagramUrl, 
  engagementRate, 
  followers,
  alt = "Influencer", 
  className = "" 
}) => {
  // Format follower count - memoized
  const formattedFollowers = useMemo(() => {
    if (!followers) return null;
    if (typeof followers === 'string') return followers;
    if (followers >= 1000000) return `${(followers / 1000000).toFixed(1)}M`;
    if (followers >= 1000) return `${(followers / 1000).toFixed(0)}K`;
    return followers.toString();
  }, [followers]);

  // Format engagement rate - remove % if already present, ensure it's a string
  const formattedEngagement = useMemo(() => {
    if (!engagementRate) return null;
    if (typeof engagementRate === 'string') {
      // If it starts with %, use as is, otherwise add %
      return engagementRate.startsWith('%') ? engagementRate : `%${engagementRate.replace('%', '')}`;
    }
    return `${engagementRate}%`;
  }, [engagementRate]);

  return (
    <div className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all ${className}`}>
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {/* Content - Left Bottom */}
      <div className="absolute left-0 bottom-0 p-3 pr-16 md:pr-20">
        <h3 className="text-white font-semibold text-sm md:text-base">{name}</h3>
        {category && (
          <p className="text-gray-300 text-xs md:text-sm mb-2">{category}</p>
        )}
        
        {/* Stats */}
        <div className="flex items-center gap-2 md:gap-3">
          {formattedFollowers && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
              <span className="text-white text-xs md:text-sm font-medium">{formattedFollowers}</span>
            </div>
          )}
          {formattedEngagement && (
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
              <span className="text-white text-xs md:text-sm font-medium">{formattedEngagement}</span>
            </div>
          )}
        </div>
      </div>

      {/* Platform Badge - Bottom Right */}
      {instagramUrl && (
        <a 
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 hover:scale-110 transition-transform"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
            <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
        </a>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-all duration-300" />
    </div>
  );
});

InfluencerCard.displayName = 'InfluencerCard';

export default InfluencerCard;

