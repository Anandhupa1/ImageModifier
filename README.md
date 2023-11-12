# Visual Canvas: Image Modifier 🖼️

🌐 **Live Link**: [Visual Canvas](https://visual-canvas-image-modifier.vercel.app)  
🔗 **Server Link**: [Backend Server](https://lovely-cow-houndstooth.cyclic.app/)

---

## Project Overview 📝

Visual Canvas is a robust web application designed to revolutionize the way users interact with images. It provides a secure, intuitive platform for image uploading, editing, and management, all while ensuring a seamless user experience.

## Key Features 🌟

- **User Authentication**: Secure access with Gmail integration. 🔒
- **Image Upload & Editing**: Effortless upload and in-browser editing tools. ✂️
- **Image Gallery**: A sleek gallery for easy image access and management. 🖼️
- **Responsive Design**: Fully adaptable to various devices and screens. 📱💻
- **Optimized Storage**: Advanced image size reduction and .webp conversion. 💾


## Tech Stack

**Client:** HTML, CSS , Javascript , Bootstrap

**Server:** NodeJS, Express

**Database:** MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/Anandhupa1/ImageModifier.git
```

Go to the project directory

```bash
  cd ImageModifier
```

## Environment Variables

To run the backend server of this project, you will need to add the following environment variables to your .env file inside Backend folder.

`MONGOURI=mongodb+srv://*****:*****@cluster0.j8dbuza.mongodb.net/ImageManager@latest?retryWrites=true&w=majority `
`PORT=4500`
`JWT_SECRET=secret1`
`SERVER_DEPLOYED_URL=http://localhost:4500`
after successfully creating backend server , you can run the server by following the below steps.

Run the server locally
```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```




