import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  // Form alanları için state tanımlamaları
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    // Arkadaşının beklediği Register Request yapısını simüle ediyoruz
    const registerPayload = {
      fullName: fullName,
      email: email,
      password: password
    };

    console.log("Backend'e gönderilecek kayıt verisi:", registerPayload);

    // Kullanıcıya kayıt başarılı mesajı gösterip Giriş sayfasına yönlendiriyoruz
    setMessage('Hesabınız başarıyla oluşturuldu! Giriş sayfasına yönlendiriliyorsunuz...');
    
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#fff', color: '#333', padding: '40px', borderRadius: '10px', width: '350px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>📝 Yeni Üye Kaydı</h2>

        {/* Başarı mesajı varsa yeşil kutu göster */}
        {message && (
          <div style={{ backgroundColor: '#e8f8f5', color: '#27ae60', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ad Soyad</label>
            <input 
              type="text" 
              required
              placeholder="Ali Yılmaz"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

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
            style={{ width: '100%', padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Kayıt Ol
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#7f8c8d' }}>
          Zaten hesabın var mı? <Link to="/login" style={{ color: '#2ecc71', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none' }}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;