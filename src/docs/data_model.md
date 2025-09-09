# 🗄️ Data Model — Islamic Quotes Management App

---

## 📌 Users Collection

```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "role": "string (user | admin)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 📌 Quotes Collection

```json
{
  "_id": "ObjectId",
  "text": "string", // Islamic quote text
  "author": "string", // Quran, Hadith, or Scholar name
  "submittedBy": "ObjectId", // Reference to Users Collection
  "status": "string (pending | approved)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
