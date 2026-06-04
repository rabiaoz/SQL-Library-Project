import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockBooks } from '../mockData';

function HomePage() {
  // Kullanıcının arama çubuğuna yazdığı metni hafızada tutacak state
  const [searchQuery, setSearchQuery] = useState('');

  // Arama filtresi: Kitap adında veya yazar adında kullanıcının yazdığı harfler geçiyor mu?
  const filteredBooks = mockBooks.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Üst Başlık ve Arama Alanı Kapsayıcısı */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
        <h1 style={{ color: '#2c3e50', margin: '0' }}>
          📚 Library Book List
        </h1>

        {/* İŞTE YENİ EKLEDİĞİMİZ ARAMA ÇUBUĞU */}
        <input 
          type="text"
          placeholder="Search by book title or author..."
          value={searchQuery}
          // Kullanıcı her harf yazdığında burası tetiklenir ve arama güncellenir
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '12px 20px',
            width: '300px',
            borderRadius: '25px',
            border: '2px solid #3498db',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}
        />
      </div>
      
      {/* Kitapları listeleyen Grid alanı */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '30px' }}>
        
        {/* Eğer arama sonucunda kitap bulunduysa listele */}
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div 
              key={book.id} 
              style={{ 
                border: '1px solid #ddd', 
                padding: '20px', 
                borderRadius: '10px', 
                width: '280px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                backgroundColor: '#fff',
                color: '#333'
              }}
            >
              <h2 style={{ fontSize: '1.2rem', margin: '0 0 10px 0', color: '#34495e' }}>{book.title}</h2>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><strong>Author:</strong> {book.author}</p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><strong>Category:</strong> {book.category.name}</p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#7f8c8d' }}>
                <strong>Borrowed:</strong> {book.borrowCount} times
              </p>
              
              <Link 
                to={`/book/${book.id}`} 
                style={{ 
                  display: 'block', 
                  textAlign: 'center',
                  marginTop: '15px', 
                  padding: '10px', 
                  backgroundColor: '#3498db', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          // Eğer aranan kelimeye uygun kitap bulunamadıysa bu uyarı çıkacak
          <div style={{ color: '#bdc3c7', fontSize: '1.2rem', fontStyle: 'italic', marginTop: '20px' }}>
            No books found matching your criteria...
          </div>
        )}

      </div>
    </div>
  );
}

export default HomePage;