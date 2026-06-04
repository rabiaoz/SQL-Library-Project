import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockBooks } from '../mockData';

function BookDetailPage() {
  const { id } = useParams(); 
  
  // Kitabı state içinde tutuyoruz ki yeni yorum eklendiğinde ekran anında güncellensin
  const [book, setBook] = useState(mockBooks.find((b) => b.id === parseInt(id)));

  // Yorum formu için state'ler
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  // Tarayıcıdan giriş yapan kullanıcıyı alıyoruz (Giriş yapmamışsa null döner)
  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  // Kitap bulunamazsa hata ekranı
  if (!book) {
    return (
      <div style={{ padding: '30px', color: '#fff', textAlign: 'center' }}>
        <h2>Kitap bulunamadı!</h2>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>Ana Sayfaya Dön</Link>
      </div>
    );
  }
// Kitap ödünç alma butonuna basıldığında çalışacak fonksiyon
  const handleBorrow = (libraryName) => {
    // 1. Kural: Kullanıcı giriş yapmamışsa engelle
    if (!loggedInUser) {
      alert("Kitap ödünç almak için lütfen önce giriş yapın!");
      return;
    }

    // 2. Kural: Giriş yapmışsa başarılı mesajı ver
    alert(`Tebrikler! "${book.title}" kitabını ${libraryName}'nden başarıyla ödünç aldınız. Teslim tarihinizi profilinizden takip edebilirsiniz.`);
    
    // Not: Gerçek projede burada arkadaşının yazdığı Spring Boot API'sine (POST isteği) veri gönderilecek.
  };
  // Yorum gönderme butonuna basıldığında çalışacak fonksiyon
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Yeni yorum objesini arkadaşının "Review Response" formatına göre hazırlıyoruz
    const newReview = {
      userId: loggedInUser.id,
      userName: loggedInUser.fullName,
      rating: parseInt(rating),
      comment: comment,
      // Bugünün tarihini YYYY-MM-DD formatında alıyoruz
      reviewDate: new Date().toISOString().split('T')[0]
    };

    // Kitabın yorumlar listesine yeni yorumu anında ekliyoruz
    setBook({
      ...book,
      reviews: [newReview, ...(book.reviews || [])] // Yeni yorumu listenin en başına ekler
    });

    // Formu temizle ve başarı mesajı göster
    setComment('');
    setRating(5);
    setMessage('Yorumunuz başarıyla eklendi! (+5 Puan kazandınız)');

    // 3 saniye sonra yeşil başarı mesajını gizle
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      
      {/* Üst Menü / Geri Dön Butonu */}
      <Link to="/" style={{ textDecoration: 'none', color: '#3498db', fontSize: '1.1rem', fontWeight: 'bold' }}>
        ← Kitap Listesine Dön
      </Link>

      {/* Kitap Üst Bilgileri */}
      <div style={{ backgroundColor: '#fff', color: '#333', padding: '25px', borderRadius: '10px', marginTop: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{book.title}</h1>
        <p style={{ margin: '5px 0' }}><strong>Yazar:</strong> {book.author}</p>
        <p style={{ margin: '5px 0' }}><strong>Kategori:</strong> {book.category.name}</p>
        <p style={{ margin: '5px 0' }}><strong>ISBN:</strong> {book.isbn}</p>
        <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Toplam Ödünç Alınma:</strong> {book.borrowCount} kez</p>
      </div>

      {/* Kütüphaneler ve Stok Durumu */}
      <h2 style={{ marginTop: '40px', borderBottom: '2px solid #555', paddingBottom: '10px' }}>
        Mevcut Kütüphaneler
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {book.libraries.map((lib, index) => {
          const isNotAvailable = lib.availableCopies === 0;

          return (
            <div 
              key={index}
              style={{
                backgroundColor: '#fff',
                color: '#333',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: isNotAvailable ? 0.5 : 1,
                filter: isNotAvailable ? 'grayscale(100%)' : 'none'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>{lib.libraryName}</h3>
                <p style={{ margin: '0', color: isNotAvailable ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}>
                  {isNotAvailable ? 'Müsait Değil (Stok Tükendi)' : `Müsait (${lib.availableCopies} adet)`}
                </p>
              </div>
              
              <button 
                disabled={isNotAvailable}
                onClick={() => handleBorrow(lib.libraryName)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: isNotAvailable ? '#bdc3c7' : '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: isNotAvailable ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Ödünç Al
              </button>
            </div>
          );
        })}
      </div>

      <h2 style={{ marginTop: '40px', borderBottom: '2px solid #555', paddingBottom: '10px' }}>
        Kullanıcı Yorumları
      </h2>

      {/* YORUM EKLEME FORMU KONTROLÜ */}
      {loggedInUser ? (
        <div style={{ backgroundColor: '#ecf0f1', padding: '20px', borderRadius: '8px', marginTop: '20px', color: '#333' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>Bu kitap hakkında ne düşünüyorsun?</h3>
          
          {/* Başarı Mesajı */}
          {message && (
            <div style={{ backgroundColor: '#2ecc71', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontWeight: 'bold' }}>
              ✅ {message}
            </div>
          )}

          <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Puanın:</label>
              <select 
                value={rating} 
                onChange={(e) => setRating(e.target.value)}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', fontWeight: 'bold' }}
              >
                <option value="5">5 - Harika</option>
                <option value="4">4 - Çok İyi</option>
                <option value="3">3 - İdare Eder</option>
                <option value="2">2 - Kötü</option>
                <option value="1">1 - Berbat</option>
              </select>
            </div>

            <textarea 
              required
              placeholder="Kitapla ilgili düşüncelerini buraya yaz..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
            />

            <button 
              type="submit"
              style={{ alignSelf: 'flex-start', padding: '10px 20px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Yorumu Gönder
            </button>
          </form>
        </div>
      ) : (
        // Kullanıcı giriş yapmamışsa formu gizle ve uyarı ver
        <div style={{ backgroundColor: '#34495e', padding: '15px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
          Yorum yapabilmek için lütfen <Link to="/login" style={{ color: '#3498db', fontWeight: 'bold' }}>giriş yapın</Link>.
        </div>
      )}

      {/* MEVCUT YORUMLARIN LİSTELENMESİ */}
      {book.reviews && book.reviews.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {book.reviews.map((review, index) => (
            <div key={index} style={{ backgroundColor: '#2c3e50', padding: '20px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ color: '#f1c40f', fontSize: '1.1rem' }}>{review.userName}</strong>
                <span style={{ color: '#ecf0f1', backgroundColor: '#e67e22', padding: '3px 8px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {review.rating} / 5
                </span>
              </div>
              <p style={{ margin: '0 0 10px 0', fontSize: '1.05rem', lineHeight: '1.5' }}>"{review.comment}"</p>
              <p style={{ margin: '0', fontSize: '0.85rem', color: '#95a5a6' }}>Yorum Tarihi: {review.reviewDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', color: '#bdc3c7', marginTop: '20px' }}>Bu kitap için henüz yorum yapılmamış. İlk yorumu sen yap!</p>
      )}

    </div>
  );
}

export default BookDetailPage;