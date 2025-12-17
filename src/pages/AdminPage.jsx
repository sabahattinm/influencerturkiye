import { useState, useEffect } from 'react';
import { 
  Users, Building2, Download, RefreshCw, Filter, 
  CheckCircle2, XCircle, Clock, Eye, Search,
  Instagram, Youtube, Facebook, Twitter, Globe, Link as LinkIcon,
  Trash2
} from 'lucide-react';
import { 
  getAllInfluencerApplications, 
  getAllCustomerApplications,
  updateInfluencerApplicationStatus,
  updateCustomerApplicationStatus,
  deleteInfluencerApplication,
  deleteCustomerApplication,
  deleteMultipleInfluencerApplications,
  deleteMultipleCustomerApplications
} from '../services/dataService';

/**
 * AdminPage Component
 * Admin paneli - Hem influencer hem de marka başvurularını gösterir
 */
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('influencers'); // 'influencers' veya 'brands'
  const [influencerApplications, setInfluencerApplications] = useState([]);
  const [customerApplications, setCustomerApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'new', 'reviewed', 'accepted', 'rejected'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set()); // Seçili başvuru ID'leri

  // Başvuruları yükle
  const loadApplications = async () => {
    setLoading(true);
    try {
      const [influencers, customers] = await Promise.all([
        getAllInfluencerApplications(),
        getAllCustomerApplications()
      ]);
      setInfluencerApplications(influencers);
      setCustomerApplications(customers);
    } catch (error) {
      console.error('Başvurular yüklenirken hata:', error);
      alert('Başvurular yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // Seçimleri temizle tab değiştiğinde
  useEffect(() => {
    setSelectedIds(new Set());
  }, [activeTab]);

  // Durum güncelleme
  const handleStatusUpdate = async (type, id, newStatus) => {
    try {
      if (type === 'influencer') {
        await updateInfluencerApplicationStatus(id, newStatus);
        setInfluencerApplications(prev => 
          prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
        );
      } else {
        await updateCustomerApplicationStatus(id, newStatus);
        setCustomerApplications(prev => 
          prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
        );
      }
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      alert('Durum güncellenirken bir hata oluştu.');
    }
  };

  // Başvuru silme
  const handleDelete = async (type, id, name) => {
    // Onay dialogu göster
    const confirmMessage = type === 'influencer' 
      ? `${name} adlı influencer başvurusunu silmek istediğinizden emin misiniz?`
      : `${name} adlı marka başvurusunu silmek istediğinizden emin misiniz?`;
    
    if (!window.confirm(confirmMessage + '\n\nBu işlem geri alınamaz.')) {
      return;
    }

    try {
      if (type === 'influencer') {
        await deleteInfluencerApplication(id);
        setInfluencerApplications(prev => prev.filter(app => app.id !== id));
      } else {
        await deleteCustomerApplication(id);
        setCustomerApplications(prev => prev.filter(app => app.id !== id));
      }
      // Seçimden de kaldır
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      console.error('Başvuru silinirken hata:', error);
      alert('Başvuru silinirken bir hata oluştu: ' + (error.message || 'Bilinmeyen hata'));
    }
  };

  // Toplu silme
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) {
      alert('Lütfen silmek için en az bir başvuru seçin.');
      return;
    }

    const count = selectedIds.size;
    const confirmMessage = `${count} adet başvuruyu silmek istediğinizden emin misiniz?\n\nBu işlem geri alınamaz.`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const idsArray = Array.from(selectedIds);
      if (activeTab === 'influencers') {
        await deleteMultipleInfluencerApplications(idsArray);
        setInfluencerApplications(prev => prev.filter(app => !selectedIds.has(app.id)));
      } else {
        await deleteMultipleCustomerApplications(idsArray);
        setCustomerApplications(prev => prev.filter(app => !selectedIds.has(app.id)));
      }
      setSelectedIds(new Set());
      alert(`${count} adet başvuru başarıyla silindi.`);
    } catch (error) {
      console.error('Toplu silme hatası:', error);
      alert('Başvurular silinirken bir hata oluştu: ' + (error.message || 'Bilinmeyen hata'));
    }
  };

  // Tekil seçim toggle
  const toggleSelection = (id) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Tümünü seç/kaldır
  const toggleSelectAll = () => {
    if (selectedIds.size === currentApplications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(currentApplications.map(app => app.id)));
    }
  };

  // Filtreleme ve arama
  const filteredInfluencers = influencerApplications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = !searchTerm || 
      app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredCustomers = customerApplications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = !searchTerm || 
      app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Durum badge'i
  const StatusBadge = ({ status }) => {
    const config = {
      new: { label: 'Yeni', color: 'bg-blue-100 text-blue-800', icon: Clock },
      reviewed: { label: 'İncelendi', color: 'bg-yellow-100 text-yellow-800', icon: Eye },
      accepted: { label: 'Kabul Edildi', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      rejected: { label: 'Reddedildi', color: 'bg-red-100 text-red-800', icon: XCircle },
    };

    const { label, color, icon: Icon } = config[status] || config.new;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  // CSV export
  const exportToCSV = (data, filename) => {
    if (data.length === 0) {
      alert('Dışa aktarılacak veri yok.');
      return;
    }

    // Türkçe Excel için noktalı virgül delimiter kullan
    const delimiter = ';';

    // CSV değerini düzgün formatla (tırnak, noktalı virgül, yeni satır gibi özel karakterleri escape et)
    const escapeCSVValue = (value) => {
      if (value === null || value === undefined) {
        return '';
      }
      
      // Değeri string'e çevir
      const stringValue = String(value);
      
      // Tırnak karakterlerini çift tırnak yap ve tüm değeri tırnak içine al
      const escaped = stringValue.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    // Tarih formatını düzgün göster (Excel uyumlu: dd/mm/yyyy hh:mm)
    const formatDate = (dateString) => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        
        // Geçersiz tarih kontrolü
        if (isNaN(date.getTime())) {
          return dateString;
        }
        
        // Gün, ay, yıl, saat ve dakikayı formatla
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        // Excel uyumlu format: dd/mm/yyyy hh:mm
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      } catch (e) {
        console.error('Tarih formatlama hatası:', e);
        return dateString;
      }
    };

    // Durum değerlerini Türkçe'ye çevir
    const formatStatus = (status) => {
      const statusMap = {
        'new': 'Yeni',
        'reviewed': 'İncelendi',
        'accepted': 'Kabul Edildi',
        'rejected': 'Reddedildi'
      };
      return statusMap[status] || status;
    };

    // Platform değerlerini Türkçe'ye çevir
    const formatPlatform = (platform) => {
      const platformMap = {
        'instagram': 'Instagram',
        'youtube': 'YouTube',
        'tiktok': 'TikTok'
      };
      return platformMap[platform] || platform;
    };

    // İçerik tipi değerlerini Türkçe'ye çevir
    const formatContentType = (contentType) => {
      const contentTypeMap = {
        'reels': 'Reels',
        'story': 'Story',
        'pr': 'PR',
        'shorts': 'Shorts',
        'video': 'Video'
      };
      return contentTypeMap[contentType] || contentType;
    };

    // Headers'ı oluştur (Türkçe karakterler için düzgün başlık isimleri)
    const headerMap = {
      // Influencer fields
      id: 'ID',
      full_name: 'Ad Soyad',
      email: 'E-posta',
      phone_number: 'Telefon',
      gender: 'Cinsiyet',
      country: 'Ülke',
      city: 'Şehir',
      interests: 'İlgi Alanları',
      facebook_url: 'Facebook URL',
      youtube_url: 'YouTube URL',
      twitch_tv_url: 'Twitch URL',
      instagram_url: 'Instagram URL',
      twitter_url: 'Twitter URL',
      blog_url: 'Blog URL',
      other_social_media: 'Diğer Sosyal Medya',
      budget_per_share: 'Bütçe (TL)',
      status: 'Durum',
      created_at: 'Oluşturulma Tarihi',
      user_id: 'Kullanıcı ID',
      // Customer fields
      brand: 'Marka Adı',
      tax_number: 'Vergi Numarası',
      platform: 'Platform',
      content_type: 'İçerik Tipi',
      description: 'Açıklama'
    };

    const headers = Object.keys(data[0])
      .map(key => escapeCSVValue(headerMap[key] || key))
      .join(delimiter);

    // Satırları oluştur ve değerleri formatla
    const rows = data.map(row => 
      Object.keys(data[0])
        .map(key => {
          let value = row[key];
          
          // Özel formatlamalar
          if (key === 'created_at') {
            value = formatDate(value);
          } else if (key === 'status') {
            value = formatStatus(value);
          } else if (key === 'platform') {
            value = formatPlatform(value);
          } else if (key === 'content_type') {
            value = formatContentType(value);
          } else if (key === 'budget_per_share' && value) {
            // Bütçe değerini formatla
            value = parseFloat(value).toLocaleString('tr-TR', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            });
          }
          
          return escapeCSVValue(value);
        })
        .join(delimiter)
    ).join('\n');

    // UTF-8 BOM ekle (Excel'in Türkçe karakterleri doğru okuması için)
    const BOM = '\uFEFF';
    const csv = BOM + `${headers}\n${rows}`;
    
    // Blob oluştur - Excel uyumluluğu için
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    
    // Memory temizliği
    URL.revokeObjectURL(link.href);
  };

  const currentApplications = activeTab === 'influencers' ? filteredInfluencers : filteredCustomers;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Paneli</h1>
              <p className="text-gray-600">Başvuru sonuçlarını yönetin ve görüntüleyin</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => exportToCSV(
                  activeTab === 'influencers' ? influencerApplications : customerApplications,
                  `${activeTab === 'influencers' ? 'influencer' : 'customer'}-basvurular-${new Date().toISOString().split('T')[0]}.csv`
                )}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                CSV İndir
              </button>
              <button
                onClick={loadApplications}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Yenile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('influencers')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'influencers'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Influencer Başvuruları ({influencerApplications.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('brands')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'brands'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-5 h-5" />
                Marka Başvuruları ({customerApplications.length})
              </div>
            </button>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="new">Yeni</option>
                <option value="reviewed">İncelendi</option>
                <option value="accepted">Kabul Edildi</option>
                <option value="rejected">Reddedildi</option>
              </select>
            </div>
            {currentApplications.length > 0 && (
              <>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === currentApplications.length && currentApplications.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm text-gray-700 cursor-pointer">
                    Tümünü Seç ({selectedIds.size})
                  </label>
                </div>
                {selectedIds.size > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Seçilenleri Sil ({selectedIds.size})
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Yükleniyor...</p>
            </div>
          </div>
        ) : currentApplications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
            <div className="text-center text-gray-500">
              <p className="text-lg">Başvuru bulunamadı.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {currentApplications.map((app) => (
              <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(app.id)}
                    onChange={() => toggleSelection(app.id)}
                    className="w-5 h-5 mt-1 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <div className="flex-1">
                    {activeTab === 'influencers' ? (
                      <InfluencerApplicationCard 
                        app={app} 
                        onStatusUpdate={(newStatus) => handleStatusUpdate('influencer', app.id, newStatus)}
                        onDelete={() => handleDelete('influencer', app.id, app.full_name)}
                      />
                    ) : (
                      <CustomerApplicationCard 
                        app={app} 
                        onStatusUpdate={(newStatus) => handleStatusUpdate('customer', app.id, newStatus)}
                        onDelete={() => handleDelete('customer', app.id, app.brand || app.full_name)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Influencer Application Card Component
const InfluencerApplicationCard = ({ app, onStatusUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialMediaLinks = [
    { key: 'instagram_url', label: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { key: 'youtube_url', label: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { key: 'facebook_url', label: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { key: 'twitter_url', label: 'Twitter/X', icon: Twitter, color: 'text-gray-900' },
    { key: 'twitch_tv_url', label: 'Twitch', icon: Globe, color: 'text-purple-600' },
    { key: 'blog_url', label: 'Blog', icon: LinkIcon, color: 'text-blue-500' },
    { key: 'other_social_media', label: 'Diğer', icon: LinkIcon, color: 'text-gray-600' },
  ];

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{app.full_name}</h3>
            <StatusBadge status={app.status} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
            <div><strong>E-posta:</strong> {app.email}</div>
            <div><strong>Telefon:</strong> {app.phone_number}</div>
            <div><strong>Konum:</strong> {app.city}, {app.country}</div>
            <div><strong>Bütçe:</strong> {parseFloat(app.budget_per_share || 0).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
            <div><strong>Tarih:</strong> {new Date(app.created_at).toLocaleDateString('tr-TR')}</div>
            {app.gender && <div><strong>Cinsiyet:</strong> {app.gender}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusDropdown 
            currentStatus={app.status} 
            onStatusChange={onStatusUpdate}
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isExpanded ? 'Daralt' : 'Detay'}
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
            title="Başvuruyu Sil"
          >
            <Trash2 className="w-4 h-4" />
            Sil
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          {app.interests && (
            <div>
              <strong className="text-gray-700">İlgi Alanları:</strong>
              <p className="text-gray-600 mt-1">{app.interests}</p>
            </div>
          )}
          
          <div>
            <strong className="text-gray-700">Sosyal Medya Hesapları:</strong>
            <div className="mt-2 flex flex-wrap gap-3">
              {socialMediaLinks.map(({ key, label, icon: Icon, color }) => {
                if (!app[key]) return null;
                return (
                  <a
                    key={key}
                    href={app[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors ${color}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Customer Application Card Component
const CustomerApplicationCard = ({ app, onStatusUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const platformLabels = {
    instagram: 'Instagram',
    youtube: 'YouTube',
    tiktok: 'TikTok'
  };

  const contentTypeLabels = {
    reels: 'Reels',
    story: 'Story',
    pr: 'PR',
    shorts: 'Shorts',
    video: 'Video'
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{app.brand}</h3>
            <StatusBadge status={app.status} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
            <div><strong>İletişim:</strong> {app.full_name}</div>
            <div><strong>E-posta:</strong> {app.email}</div>
            <div><strong>Telefon:</strong> {app.phone_number}</div>
            <div><strong>Platform:</strong> {platformLabels[app.platform] || app.platform}</div>
            <div><strong>İçerik Tipi:</strong> {contentTypeLabels[app.content_type] || app.content_type}</div>
            <div><strong>Tarih:</strong> {new Date(app.created_at).toLocaleDateString('tr-TR')}</div>
            {app.tax_number && <div><strong>Vergi No:</strong> {app.tax_number}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusDropdown 
            currentStatus={app.status} 
            onStatusChange={onStatusUpdate}
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isExpanded ? 'Daralt' : 'Detay'}
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
            title="Başvuruyu Sil"
          >
            <Trash2 className="w-4 h-4" />
            Sil
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div>
            <strong className="text-gray-700">Proje Açıklaması:</strong>
            <p className="text-gray-600 mt-1 whitespace-pre-wrap">{app.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const config = {
    new: { label: 'Yeni', color: 'bg-blue-100 text-blue-800', icon: Clock },
    reviewed: { label: 'İncelendi', color: 'bg-yellow-100 text-yellow-800', icon: Eye },
    accepted: { label: 'Kabul Edildi', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
    rejected: { label: 'Reddedildi', color: 'bg-red-100 text-red-800', icon: XCircle },
  };

  const { label, color, icon: Icon } = config[status] || config.new;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// Status Dropdown Component
const StatusDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: 'new', label: 'Yeni', color: 'text-blue-600' },
    { value: 'reviewed', label: 'İncelendi', color: 'text-yellow-600' },
    { value: 'accepted', label: 'Kabul Edildi', color: 'text-green-600' },
    { value: 'rejected', label: 'Reddedildi', color: 'text-red-600' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Durum Değiştir
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
            {statusOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onStatusChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  currentStatus === option.value ? option.color : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPage;
