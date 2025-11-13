# TraceIt - Lost & Found Portal

TraceIt is a modern web application that helps users report, search, and recover lost items. Users can post lost/found items, and contact each other securely.

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

![image](https://github.com/user-attachments/assets/2dc595ec-973a-4bde-b8e1-d69aea1f8c97)
![image](https://github.com/user-attachments/assets/6e82ea39-78f8-4c22-9029-6b9df8060e4c)
![image](https://github.com/user-attachments/assets/a2802674-b810-4b94-81d1-da1f886d3a48)
![image](https://github.com/user-attachments/assets/581e8e5f-f856-4370-bac5-71ad7323544f)
![image](https://github.com/user-attachments/assets/f3154e9d-b113-485d-9bfb-8f90e3281cf2)
![image](https://github.com/user-attachments/assets/fbef8bd4-2175-4bf2-88c2-eda1d797430a)




https://github.com/user-attachments/assets/0843c347-45a3-460c-a5f1-ea17f0e222d4



**Made with ❤️ by vinayak**
