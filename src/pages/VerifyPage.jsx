import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

/**
 * VerifyPage Component
 * Email doğrulama sayfası - Kullanıcı mail linkine tıkladığında buraya gelir
 * Otomatik olarak giriş yapar ve başvuru sayfasına yönlendirir
 */
const VerifyPage = () => {
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!supabase) {
      setStatus('error');
      setError('Supabase yapılandırılmamış');
      return;
    }

    let timeoutId;
    let subscription;

    const verifyEmail = async () => {
      try {
        // URL'deki hash fragment'i kontrol et (Supabase token'ı burada)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');

        // Eğer URL'de token yoksa, geçersiz link
        if (!accessToken || type !== 'email') {
          // Önce mevcut session'ı kontrol et (belki zaten giriş yapılmış)
          const { data: { session } } = await supabase.auth.getSession();
          if (session && session.user) {
            setStatus('success');
            timeoutId = setTimeout(() => {
              navigate('/basvuru', { replace: true });
            }, 1500);
            return;
          }
          
          setStatus('error');
          setError('Geçersiz doğrulama linki. Lütfen e-postanızdaki linki kontrol edin.');
          return;
        }

        // Supabase otomatik olarak hash fragment'i işler ve session oluşturur
        // onAuthStateChange event'ini dinleyerek session oluşturulduğunda yakalıyoruz
        subscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session && session.user) {
            setStatus('success');
            timeoutId = setTimeout(() => {
              navigate('/basvuru', { replace: true });
            }, 1500);
          } else if (event === 'TOKEN_REFRESHED' && session && session.user) {
            // Token yenilendi, session zaten var
            setStatus('success');
            timeoutId = setTimeout(() => {
              navigate('/basvuru', { replace: true });
            }, 1500);
          }
        });

        // Mevcut session'ı kontrol et (Supabase hash fragment'i zaten işlemiş olabilir)
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        // Eğer session zaten varsa, başarılı
        if (currentSession && currentSession.user) {
          setStatus('success');
          timeoutId = setTimeout(() => {
            navigate('/basvuru', { replace: true });
          }, 1500);
        } else {
          // Session henüz oluşturulmamış, onAuthStateChange event'ini bekliyoruz
          // 5 saniye timeout - eğer bu süre içinde session oluşturulmazsa hata ver
          timeoutId = setTimeout(() => {
            if (status === 'verifying') {
              setStatus('error');
              setError('Email doğrulama zaman aşımına uğradı. Lütfen tekrar deneyin.');
            }
          }, 5000);
        }
      } catch (error) {
        console.error('Email doğrulama hatası:', error);
        setStatus('error');
        setError(error.message || 'Email doğrulama sırasında bir hata oluştu.');
      }
    };

    verifyEmail();

    // Cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (subscription && subscription.data && subscription.data.subscription) {
        subscription.data.subscription.unsubscribe();
      }
    };
  }, [navigate, status]);

  // Eğer kullanıcı zaten giriş yapmışsa direkt yönlendir
  useEffect(() => {
    if (isAuthenticated && user && status === 'verifying') {
      setStatus('success');
      setTimeout(() => {
        navigate('/basvuru', { replace: true });
      }, 500);
    }
  }, [isAuthenticated, user, navigate, status]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Doğrulanıyor...</h2>
            <p className="text-gray-600">
              Hesabınız doğrulanıyor, lütfen bekleyin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Başarıyla Doğrulandı!</h2>
            <p className="text-gray-600 mb-6">
              Hesabınız başarıyla doğrulandı. Otomatik olarak giriş yapılıyor...
            </p>
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doğrulama Hatası</h2>
          <p className="text-gray-600 mb-6">
            {error || 'Email doğrulama sırasında bir hata oluştu.'}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/auth/login')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Giriş Sayfasına Git
            </button>
            <button
              onClick={() => navigate('/auth/register')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Tekrar Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
