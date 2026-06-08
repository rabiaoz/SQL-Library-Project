export const mockBooks = [
  {
    id: 15,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    category: { name: "Novel" },
    isbn: "978-0140449136",
    borrowCount: 126,
    libraries: [
      { libraryName: "Kadikoy District Library", availableCopies: 3 },
      { libraryName: "Besiktas Public Library", availableCopies: 0 },
      { libraryName: "Uskudar City Library", availableCopies: 5 }
    ],
    reviews: [
      {
        userId: 101,
        userName: "Ayse Demir",
        rating: 5,
        comment: "A psychological masterpiece! Absolutely loved the character development.",
        reviewDate: "2026-05-12"
      },
      {
        userId: 102,
        userName: "Mehmet Kaya",
        rating: 4,
        comment: "Very deep, but a bit slow in the middle chapters.",
        reviewDate: "2026-04-20"
      }
    ]
  },
  {
    id: 16,
    title: "1984",
    author: "George Orwell",
    category: { name: "Science Fiction" },
    isbn: "978-0451524935",
    borrowCount: 340,
    libraries: [
      { libraryName: "Kadikoy District Library", availableCopies: 0 },
      { libraryName: "Besiktas Public Library", availableCopies: 2 }
    ],
    reviews: []
  }
];

export const mockUserProfile = {
  id: 1,
  fullName: "Ali Yilmaz",
  email: "ali@gmail.com",
  points: 25,
  activeLoanCount: 2,
  completedLoanCount: 12,
  reviewsCount: 4,
  role: "USER"
};