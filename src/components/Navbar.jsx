// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  // Tarayıcı hafızasından giriş yapmış kullanıcıyı kontrol ediyoruz
  const loggedInUser = localStorage.getItem('user');
  const user = loggedInUser ? JSON.parse(loggedInUser) : null;

  // Çıkış yap butonuna basıldığında çalışacak fonksiyon
  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı sil
    localStorage.removeItem('user');  // Kullanıcıyı sil
    navigate('/login');               // Login sayfasına yönlendir
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#2c3e50',
      color: 'white',
      fontFamily: 'sans-serif',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      {/* Sol Taraf: Logo / Proje Adı */}
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.3rem', fontWeight: 'bold' }}>
        📚 Library Management System
      </Link>

      {/* Sağ Taraf: Kullanıcı Durumuna Göre Değişen Menü */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ color: '#ecf0f1', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        
        {user ? (
          // EĞER KULLANICI GİRİŞ YAPMIŞSA BURASI GÖRÜNECEK
          <>
            {/* İşte 3. adımdaki profil linkinin eksiksiz ve kapatılmış hali: */}
            <Link 
              to="/profile" 
              style={{ 
                backgroundColor: '#27ae60', 
                padding: '5px 10px', 
                borderRadius: '15px', 
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              ⭐ {user.fullName} ({user.points} Points)
            </Link>
            
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          // EĞER KULLANICI GİRİŞ YAPMAMIŞSA BURASI GÖRÜNECEK
          <Link 
            to="/login" 
            style={{ 
              backgroundColor: '#3498db', 
              color: 'white', 
              padding: '8px 15px', 
              borderRadius: '5px', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;