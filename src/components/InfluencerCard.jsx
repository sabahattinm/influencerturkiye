import { Instagram } from 'lucide-react';

/**
 * InfluencerCard Component
 * Displays an influencer's portrait image with name, Instagram link, engagement rate, and followers
 * 
 * @param {string} image - The URL of the influencer's image
 * @param {string} name - The influencer's name
 * @param {string} instagramUrl - The Instagram profile URL
 * @param {string} engagementRate - The engagement rate (e.g., "%2", "%8")
 * @param {number} followers - The follower count
 * @param {string} alt - Alt text for the image
 * @param {string} className - Additional CSS classes
 */
const InfluencerCard = ({ 
  image, 
  name, 
  instagramUrl, 
  engagementRate, 
  followers,
  alt = "Influencer", 
  className = "" 
}) => {
  // Format follower count
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
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300" />
      
      {/* Instagram Icon - Top Right Corner */}
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Instagram className="w-5 h-5 text-pink-600" />
        </a>
      )}
      
      {/* Follower Badge - Top Left Corner */}
      {formattedFollowers && (
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <svg 
              className="w-4 h-4 text-red-600" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-800">{formattedFollowers}</span>
          </div>
        </div>
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        {/* Name */}
        {name && (
          <h3 className="text-white text-xl font-bold mb-2">
            {name}
          </h3>
        )}
        
        {/* Engagement Rate */}
        {engagementRate && (
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-lg w-fit">
            <span className="text-sm font-semibold text-gray-800">
              Etkileşim Oranı: {engagementRate}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerCard;

