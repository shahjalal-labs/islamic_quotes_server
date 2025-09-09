# 🕌 Islamic Quotes API Endpoints

Base URL: `http://localhost:5000/api/v1`

---

## 📜 Get All Quotes
```http
GET http://localhost:5000/api/v1/quotes

# Get Quotes by User Email
GET http://localhost:5000/api/v1/quotes?email=abdullah@example.com&limit=3

# Get Single Quote
GET http://localhost:5000/api/v1/quote/64b8e4f5c1a5e21a9f12cd34

# Delete a Quote (Admin Only)
DELETE http://localhost:5000/api/v1/quote/64b8e4f5c1a5e21a9f12cd34


#Update a Quote (Admin Only)
PATCH http://localhost:5000/api/v1/quote/64b8e4f5c1a5e21a9f12cd34
Content-Type: application/json

{
  "text": "Indeed, with hardship comes ease. — Surah Ash-Sharh 94:6"
}

# Create a Single Quote (Authenticated User)
POST http://localhost:5000/api/v1/quote
Content-Type: application/json

{
  "text": "The strong man is not the one who overcomes others with his strength, but the one who controls himself when angry. — Prophet Muhammad ﷺ",
  "author": "Hadith (Bukhari & Muslim)",
  "submittedBy": "64b8e4f5c1a5e21a9f12cd01",
  "status": "pending"
}


# Create Multiple Quotes (Bulk Insert)

POST http://localhost:5000/api/v1/quotes
Content-Type: application/json

[
  {
    "text": "Indeed, prayer prohibits immorality and wrongdoing. — Surah Al-Ankabut 29:45",
    "author": "Quran",
    "submittedBy": "abdullah@example.com",
    "status": "pending"
  },
  {
    "text": "He who does not thank people, does not thank Allah. — Hadith",
    "author": "Prophet Muhammad ﷺ",
    "submittedBy": "fatima@example.com",
    "status": "pending"
  },
  {
    "text": "The best among you are those who have the best manners and character. — Prophet Muhammad ﷺ",
    "author": "Hadith (Bukhari)",
    "submittedBy": "aisha@example.com",
    "status": "pending"
  },
  {
    "text": "Do not grieve; indeed Allah is with us. — Surah At-Tawbah 9:40",
    "author": "Quran",
    "submittedBy": "umar@example.com",
    "status": "pending"
  }
]

