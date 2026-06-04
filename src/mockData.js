// src/mockData.js

export const mockBooks = [
  {
    id: 15,
    title: "Suç ve Ceza",
    author: "Fyodor Dostoyevski",
    isbn: "9780140449136",
    borrowCount: 126,
    available: true,
    category: {
      id: 1,
      name: "Roman"
    },
    libraries: [
      {
        libraryId: 3,
        libraryName: "Kadıköy İlçe Kütüphanesi",
        availableCopies: 2
      },
      {
        libraryId: 4,
        libraryName: "Beşiktaş İlçe Kütüphanesi",
        availableCopies: 0 // Frontend'de silik görünecek kütüphane
      }
    ],
    reviews: [
      {
        userId: 5,
        userName: "Ayşe Kaya",
        rating: 5,
        comment: "Çok etkileyici bir kitap.",
        reviewDate: "2026-06-01"
      }
    ]
  },
  {
    id: 16,
    title: "1984",
    author: "George Orwell",
    isbn: "9780141036144",
    borrowCount: 340,
    available: true,
    category: {
      id: 2,
      name: "Bilim Kurgu"
    },
    libraries: [
      {
        libraryId: 3,
        libraryName: "Kadıköy İlçe Kütüphanesi",
        availableCopies: 5
      }
    ],
    reviews: []
  }
];

export const mockUserProfile = {
  id: 7,
  fullName: "Ali Yılmaz",
  email: "ali@gmail.com",
  points: 45,
  activeLoanCount: 2,
  completedLoanCount: 9,
  reviewsCount: 4
};
