import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  // Form girdilerini takip etmek için state'lerimizi tanımlıyoruz
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Sayfalar arası yönlendirme yapabilmek için useNavigate kancasını (hook) kullanıyoruz
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Sayfanın kendi kendine yenilenmesini engelliyoruz

    // Arkadaşının sözleşmede verdiği örnek giriş bilgileriyle sahte bir kontrol yapıyoruz
    if (email === 'ali@gmail.com' && password === '123456') {
      
      // Giriş başarılı! Arkadaşının sözleşmede döndüğü "Login Response" paketinin aynısını simüle ediyoruz
      const mockLoginResponse = {
        token: "jwt_token_ali_123",
        user: {
          id: 1,
          fullName: "Ali Yılmaz",
          email: "ali@gmail.com",
          points: 25,
          role: "USER"
        }
      };

      // Giriş yapan kullanıcı bilgilerini tarayıcının hafızasına (localStorage) kalıcı olarak yazıyoruz
      localStorage.setItem('token', mockLoginResponse.token);
      localStorage.setItem('user', JSON.stringify(mockLoginResponse.user));

      setError('');
      // Kullanıcıyı başarılı giriş sonrası otomatik olarak Ana Sayfa'ya yönlendiriyoruz
      navigate('/');
    } else {
      // Bilgiler yanlışsa ekranda kırmızı uyarı göstereceğiz
      setError('E-posta veya şifre hatalı! (İpucu: ali@gmail.com / 123456)');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#fff', color: '#333', padding: '40px', borderRadius: '10px', width: '350px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>🔐 Üye Girişi</h2>

        {/* Hata mesajı varsa ekrana kırmızı kutu basıyoruz */}
        {error && (
          <div style={{ backgroundColor: '#fde8e8', color: '#e74c3c', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>E-posta Adresi</label>
            <input 
              type="email" 
              required
              placeholder="ali@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Şifre</label>
            <input 
              type="password" 
              required
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit"
            style={{ width: '100%', padding: '12px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Giriş Yap
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#7f8c8d' }}>
  Hesabın yok mu? <Link to="/register" style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}>Kayıt Ol</Link>
</p>
      </div>
    </div>
  );
}

export default LoginPage;
