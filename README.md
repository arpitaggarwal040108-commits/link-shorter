
# 🔗 Link Shortener

A modern URL Shortener web application built with **Python** and **Flask**. It allows users to convert long URLs into short, unique links, redirect to the original website, and track the number of clicks for each shortened URL.

---

## 📌 Features

- 🔗 Shorten long URLs
- 🎲 Generate unique 6-character short codes
- 🌐 Redirect short URLs to the original website
- 📊 Dashboard to view all shortened URLs
- 📈 Track click counts
- ✅ URL validation
- 💾 Store data locally using JSON
- 🔌 REST API for retrieving all stored links

---

## 🛠️ Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML5, CSS3
- **Template Engine:** Jinja2
- **Data Storage:** JSON

---

## 📂 Project Structure

```text
Link Shortener/
│
├── app.py
├── data.json
├── README.md
│
└── templates/
    ├── index.html
    ├── dashboard.html
    └── error.html
```

> **Note:** CSS is currently written directly inside the HTML files using the `<style>` tag. A separate `static` folder is not required unless you decide to move CSS or JavaScript into separate files.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/arpitaggarwal040108-commits/link-shortener.git
```

### 2. Open the project

```bash
cd link-shortener
```

### 3. Install Flask

```bash
pip install flask
```

### 4. Run the application

```bash
python app.py
```

---

## 🌍 Open the Application

Visit:

```
http://127.0.0.1:5000
```

---

## 📖 How It Works

1. Enter a valid URL.
2. Click the **Shorten** button.
3. A unique 6-character code is generated.
4. The URL is saved in `data.json`.
5. A shortened URL is displayed.
6. Opening the shortened URL redirects to the original website.
7. Each visit increases the click count.
8. The Dashboard displays all stored URLs and analytics.

---

## 📷 Screenshots

### 🏠 Home Page
<img width="1037" height="400" alt="image" src="https://github.com/user-attachments/assets/9de10b73-81cc-43bf-8960-cdc0e818c60c" />

### 📊 Dashboard
<img width="1481" height="790" alt="image" src="https://github.com/user-attachments/assets/179f9fc7-2d05-4134-a814-9bf6dd4f8ead" />
---

## 🔌 API

Retrieve all stored links:

```
GET /api/links
```

Example response:

```json
{
    "soUZ5J": {
        "url": "https://google.com",
        "clicks": 3
    }
}
```

---

## 📚 What I Learned

Through this project, I learned:

- Flask routing
- HTML forms
- POST requests
- Dynamic templates with Jinja2
- JSON file handling
- URL redirection
- REST APIs
- Click tracking
- Frontend and backend integration

---

## 🚀 Future Improvements

- Custom short URLs
- QR code generation
- Copy-to-Clipboard button
- Search and filter dashboard
- Delete links
- Edit links
- SQLite or MySQL database
- User authentication
- Dark mode
- Responsive mobile design

---

## 👨‍💻 Author

**Arpit Aggarwal**

GitHub: https://github.com/arpitaggarwal040108-commits

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
