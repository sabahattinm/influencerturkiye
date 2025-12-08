import { MessageCircle } from 'lucide-react';

/**
 * WhatsAppButton Component
 * Floating WhatsApp button - sağ alt köşede sabit
 */
const WhatsAppButton = () => {
  const phoneNumber = '905422125395'; // 0542 212 53 95 (0 olmadan, ülke kodu ile)
  const message = 'Merhaba, influencer marketing hakkında bilgi almak istiyorum.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 group"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      
      {/* Tooltip (optional - hover'da gösterilir) */}
      <div className="absolute right-full mr-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          WhatsApp ile iletişime geç
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
