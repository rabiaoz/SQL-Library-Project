import React, { useState } from 'react';
import { mockUserProfile } from '../mockData';

function ProfilePage() {
  // Arkadaşının "My Loans Page" sözleşmesindeki sahte veriyi state olarak tutuyoruz
  // Böylece "Süre Uzat" butonuna basınca ekrandaki tarihlerin değiştiğini görebileceğiz.
  const [loans, setLoans] = useState([
    {
      id: 31,
      bookTitle: "Suç ve Ceza",
      borrowDate: "2026-06-01",
      dueDate: "2026-07-01",
      status: "ACTIVE"
    },
    {
      id: 32,
      bookTitle: "1984",
      borrowDate: "2026-05-10",
      dueDate: "2026-06-10",
      status: "RETURNED"
    }
  ]);

  // Süre uzatma fonksiyonu (Simülasyon)
  const handleExtendDuration = (loanId, days) => {
    setLoans(prevLoans => 
      prevLoans.map(loan => {
        if (loan.id === loanId) {
          // Mevcut teslim tarihini alıp üzerine gün ekliyoruz
          const currentDueDate = new Date(loan.dueDate);
          currentDueDate.setDate(currentDueDate.getDate() + days);
          
          // Yeni tarihi YYYY-MM-DD formatına çeviriyoruz
          const newDueDateStr = currentDueDate.toISOString().split('T')[0];
          
          alert(`"${loan.bookTitle}" kitabı için teslim süresi ${days} gün uzatıldı!`);
          return { ...loan, dueDate: newDueDateStr };
        }
        return loan;
      })
    );
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', color: '#fff' }}>
      
      <h1 style={{ borderBottom: '2px solid #555', paddingBottom: '10px', color: '#f1c40f' }}>
        👤 Profil Bilgilerim
      </h1>

      {/* Üst Kısım: Kullanıcı Kartı ve İstatistikler */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        
        {/* Sol Kart: Kişisel Bilgiler */}
        <div style={{ backgroundColor: '#fff', color: '#333', padding: '20px', borderRadius: '10px', flex: '1', minWidth: '280px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>{mockUserProfile.fullName}</h2>
          <p style={{ margin: '5px 0' }}><strong>E-posta:</strong> {mockUserProfile.email}</p>
          <p style={{ margin: '5px 0' }}><strong>Toplam Puanım:</strong> <span style={{ color: '#27ae60', fontWeight: 'bold' }}>{mockUserProfile.points} Puan</span></p>
        </div>

        {/* Sağ Kart: Sayısal Özetler */}
        <div style={{ display: 'flex', gap: '15px', flex: '1.5', minWidth: '300px' }}>
          <div style={{ backgroundColor: '#2980b9', padding: '20px', borderRadius: '10px', textWith: 'center', flex: '1', textAlign: 'center' }}>
            <h3 style={{ margin: '0', fontSize: '2rem' }}>{mockUserProfile.activeLoanCount}</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Aktif Kitap</p>
          </div>
          <div style={{ backgroundColor: '#27ae60', padding: '20px', borderRadius: '10px', textWith: 'center', flex: '1', textAlign: 'center' }}>
            <h3 style={{ margin: '0', fontSize: '2rem' }}>{mockUserProfile.completedLoanCount}</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Okunan Toplam</p>
          </div>
          <div style={{ backgroundColor: '#8e44ad', padding: '20px', borderRadius: '10px', textWith: 'center', flex: '1', textAlign: 'center' }}>
            <h3 style={{ margin: '0', fontSize: '2rem' }}>{mockUserProfile.reviewsCount}</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>Yapılan Yorum</p>
          </div>
        </div>

      </div>

      {/* Alt Kısım: Ödünç Alınan Kitaplar Listesi */}
      <h2 style={{ marginTop: '50px', borderBottom: '2px solid #555', paddingBottom: '10px' }}>
        📦 Ödünç Aldığım Kitaplar
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {loans.map((loan) => {
          const isActive = loan.status === 'ACTIVE';
          
          return (
            <div 
              key={loan.id}
              style={{
                backgroundColor: '#fff',
                color: '#333',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{loan.bookTitle}</h3>
                <p style={{ margin: '3px 0', fontSize: '0.9rem', color: '#7f8c8d' }}>
                  <strong>Alış Tarihi:</strong> {loan.borrowDate}
                </p>
                <p style={{ margin: '3px 0', fontSize: '0.9rem', color: isActive ? '#e67e22' : '#7f8c8d' }}>
                  <strong>Son Teslim Tarihi:</strong> {loan.dueDate}
                </p>
                <span style={{
                  display: 'inline-block',
                  marginTop: '5px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  backgroundColor: isActive ? '#ffeaa7' : '#e1f5fe',
                  color: isActive ? '#d63031' : '#0288d1'
                }}>
                  {isActive ? '⚠️ ELİMDE (AKTİF)' : '✅ İADE EDİLDİ'}
                </span>
              </div>

              {/* Eğer kitap hala aktif olarak elindeyse süre uzatma butonlarını göster */}
              {isActive && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => handleExtendDuration(loan.id, 15)}
                    style={{ padding: '8px 12px', backgroundColor: '#34495e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                  >
                    +15 Gün Uzat
                  </button>
                  <button 
                    onClick={() => handleExtendDuration(loan.id, 30)}
                    style={{ padding: '8px 12px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                  >
                    +30 Gün Uzat
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ProfilePage;