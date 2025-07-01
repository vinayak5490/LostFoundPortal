# TraceIt - Lost & Found Portal

TraceIt is a modern web application that helps users report, search, and recover lost items. Users can post lost/found items, chat in real-time, and contact each other securely.

## Features

- 🔎 **Post Lost or Found Items** with images and details
- 📧 **Contact Owner**: Founders can send their info to the item's owner via email
- 🛡️ **Authentication**: Secure login/signup
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Image Hosting:** Cloudinary
- **Email:** Nodemailer (Gmail SMTP)

## Getting Started

### 1. Clone the repository

```sh
https://github.com/vinayak5490/LostFoundPortal.git
cd traceit
```

### 2. Install dependencies

```sh
cd server
npm install
cd ../client
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `server` directory:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password
```

### 4. Run the app locally

**Backend:**
```sh
cd server
npm start
```

**Frontend:**
```sh
cd client
npm start
```

Visit [http://localhost:5173](http://localhost:5173) (or your Vite port).

## Deployment

- Frontend can be deployed on Vercel, Netlify, or similar.
- Backend can be deployed on Render, Railway, or similar.
- Set environment variables in your deployment dashboard.

## Screenshots

_Add screenshots or a demo GIF here!_

## License

MIT

---

**Made with ❤️ by vinayak**
