import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockBooks, mockUserProfile } from '../mockData'; // mockUserProfile içe aktarıldı

function BookDetailPage() {
  const { id } = useParams(); 
  const [book, setBook] = useState(mockBooks.find((b) => b.id === parseInt(id)));
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const loggedInUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  // Sözleşme Simülasyonu: Kullanıcı sadece iade ettiği kitaplara yorum yapabilir
  const mockUserLoans = [
    { bookTitle: "Crime and Punishment", status: "ACTIVE" },
    { bookTitle: "1984", status: "RETURNED" }
  ];

  const hasReturnedThisBook = mockUserLoans.some(
    (loan) => loan.bookTitle === book?.title && loan.status === "RETURNED"
  );

  if (!book) {
    return (
      <div style={{ padding: '30px', color: '#fff', textAlign: 'center' }}>
        <h2>Book not found!</h2>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>Return to Home Page</Link>
      </div>
    );
  }

  // Kitap ödünç alma fonksiyonu
  const handleBorrow = (libraryName) => {
    if (!loggedInUser) {
      alert("Please login to borrow a book!");
      return;
    }

    // SÖZLEŞME KURALI: Maksimum 3 aktif kitap sınırı kontrolü
    if (mockUserProfile.activeLoanCount >= 3) {
      alert("⚠️ Borrow Limit Exceeded!\n\nAccording to library rules, you can have a maximum of 3 active loans at the same time. Please return a book first.");
      return;
    }

    alert(`Congratulations! You have successfully borrowed "${book.title}" from ${libraryName}.\n\n🎉 Reward: +5 Points earned!\n\nYou can track your due date from your profile.`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      userId: loggedInUser.id,
      userName: loggedInUser.fullName,
      rating: parseInt(rating),
      comment: comment,
      reviewDate: new Date().toISOString().split('T')[0]
    };

    setBook({
      ...book,
      reviews: [newReview, ...(book.reviews || [])]
    });

    setComment('');
    setRating(5);
    setMessage('Your review has been successfully added!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#3498db', fontSize: '1.1rem', fontWeight: 'bold' }}>
        ← Return to Book List
      </Link>

      <div style={{ backgroundColor: '#fff', color: '#333', padding: '25px', borderRadius: '10px', marginTop: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{book.title}</h1>
        <p style={{ margin: '5px 0' }}><strong>Author:</strong> {book.author}</p>
        <p style={{ margin: '5px 0' }}><strong>Category:</strong> {book.category.name}</p>
        <p style={{ margin: '5px 0' }}><strong>ISBN:</strong> {book.isbn}</p>
        <p style={{ margin: '12px 0', padding: '10px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', fontStyle: 'italic', color: '#555' }}>
          <strong>Description:</strong> {book.description || "A wonderful masterpiece from world classics."}
        </p>
        <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Total Borrowed:</strong> {book.borrowCount} times</p>
      </div>

      <h2 style={{ marginTop: '40px', borderBottom: '2px solid #555', paddingBottom: '10px' }}>Available Libraries</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {book.libraries.map((lib, index) => {
          const isNotAvailable = lib.availableCopies === 0;
          return (
            <div key={index} style={{ backgroundColor: '#fff', color: '#333', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: isNotAvailable ? 0.5 : 1, filter: isNotAvailable ? 'grayscale(100%)' : 'none' }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>{lib.libraryName}</h3>
                <p style={{ margin: '0', color: isNotAvailable ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}>
                  {isNotAvailable ? 'Out of Stock' : `Available (${lib.availableCopies} copies)`}
                </p>
              </div>
              <button disabled={isNotAvailable} onClick={() => handleBorrow(lib.libraryName)} style={{ padding: '10px 20px', backgroundColor: isNotAvailable ? '#bdc3c7' : '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                Borrow
              </button>
            </div>
          );
        })}
      </div>

      <h2 style={{ marginTop: '40px', borderBottom: '2px solid #555', paddingBottom: '10px' }}>User Reviews</h2>
      {!loggedInUser ? (
        <div style={{ backgroundColor: '#34495e', padding: '15px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
          Please <Link to="/login" style={{ color: '#3498db', fontWeight: 'bold' }}>login</Link> to leave a review.
        </div>
      ) : !hasReturnedThisBook ? (
        <div style={{ backgroundColor: '#34495e', padding: '15px', borderRadius: '8px', marginTop: '20px', textAlign: 'center', color: '#f1c40f', fontWeight: 'bold' }}>
          ⚠️ You can only review books that you have successfully returned. (Currently ACTIVE or not borrowed yet)
        </div>
      ) : (
        <div style={{ backgroundColor: '#ecf0f1', padding: '20px', borderRadius: '8px', marginTop: '20px', color: '#333' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>What do you think about this book?</h3>
          {message && <div style={{ backgroundColor: '#2ecc71', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontWeight: 'bold' }}>✅ {message}</div>}
          <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Your Rating:</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', fontWeight: 'bold' }}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Terrible</option>
              </select>
            </div>
            <textarea required placeholder="Write your thoughts about the book here..." value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} />
            <button type="submit" style={{ alignSelf: 'flex-start', padding: '10px 20px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Submit Review</button>
          </form>
        </div>
      )}

      {book.reviews && book.reviews.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {book.reviews.map((review, index) => (
            <div key={index} style={{ backgroundColor: '#2c3e50', padding: '20px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong style={{ color: '#f1c40f', fontSize: '1.1rem' }}>{review.userName}</strong>
                <span style={{ color: '#ecf0f1', backgroundColor: '#e67e22', padding: '3px 8px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>{review.rating} / 5</span>
              </div>
              <p style={{ margin: '0 0 10px 0', fontSize: '1.05rem', lineHeight: '1.5' }}>"{review.comment}"</p>
              <p style={{ margin: '0', fontSize: '0.85rem', color: '#95a5a6' }}>Review Date: {review.reviewDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', color: '#bdc3c7', marginTop: '20px' }}>No reviews yet for this book. Be the first to review!</p>
      )}
    </div>
  );
}

export default BookDetailPage;