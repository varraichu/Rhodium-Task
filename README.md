Rhodium Car Sale Backend

Table of Contents

1\. Installation

2\. Environment Variables

3\. API Endpoints

4\. Database Models

5\. AWS S3 Integration

6\. Technologies Used

7\. Project Structure
# **Installation**
1\. Clone the repository:

``git clone https://github.com/your-repo-name.git

2\. Navigate to the project directory:

``cd rhodium-car-sale-backend

3\. Install the dependencies:

``npm install

4\. Ensure MongoDB is running or configure the connection string in the .env file.
# **Environment Variables**
Ensure you have the following environment variables set up in your .env file:

MONGODB\_URI=<your-mongo-db-uri>

AWS\_ACCESS\_KEY\_ID=<your-aws-access-key>

AWS\_SECRET\_KEY\_ID=<your-aws-secret-key>

PORT=3000
# **API Endpoints**
## **User Authentication**
POST /user/signup

``- Create a new user account.

``- Request Body:

``{ "email": "user@example.com", "password": "yourpassword" }

POST /user/login

``- Login an existing user.

``- Request Body:

``{ "email": "user@example.com", "password": "yourpassword" }
## **Car Listings**
POST /cars/post

``- Create a new car listing.

``- Request Body:

``{ "model": "Honda Civic", "postedBy": "User Name", "price": 15000, "phone\_number": "1234567890", "max\_pictures": 5, "pictures": ["url1", "url2", "url3"] }

GET /cars/get-cars

``- Retrieve all car listings.
## **AWS S3 URL Generation**
GET /s3Url

``- Generate a signed URL for uploading an image to AWS S3.
# **Database Models**
## **User Model (usersModel.js)**
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
``email: { type: String, required: true },
``password: { type: String, required: true },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
## **Car Model (carsModel.js)**
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
``model: { type: String, required: true, minlength: 3 },
``postedBy: { type: String, required: true },
``price: { type: Number, required: true },
``phone\_number: { type: String, required: true, maxlength: 11 },
``max\_pictures: { type: Number, required: true, min: 1, max: 10 },
``pictures: { type: [String], required: true },
});

const Cars = mongoose.model('Cars', carSchema);
module.exports = Cars;
# **AWS S3 Integration**
The backend utilizes AWS S3 for image storage. When a user uploads images, a signed URL is generated to allow direct uploading to S3.

generateURL function:

async function generateURL() {
``const rawBytes = await randomBytes(16);
``const imageName = rawBytes.toString('hex'); // Generate a unique image name

``const params = {
``Bucket: bucketName,
``Key: imageName,
``Expires: 60
``};

``const uploadURL = await s3.getSignedUrlPromise('putObject', params);
``return uploadURL;
}
# **Technologies Used**
Node.js: JavaScript runtime for server-side scripting.

Express: Web framework for building the API.

MongoDB: NoSQL database for storing user and car listings.

AWS S3: Cloud storage for image uploads.

dotenv: Environment variable management.
# **Project Structure**
/src
``/controllers
``carsController.js
``userController.js
``/models
``carsModel.js
``usersModel.js
``/routes
``cars.js
``users.js
``s3.js
``server.js

# **Frontend Overview**
The `Car_Form` component is the main form used for creating and submitting car listings. It allows users to input essential details about a car they want to sell, including the car model, price, phone number, and the number of pictures they'd like to upload.

This component leverages Material-UI for the UI design, providing a clean and responsive interface with inputs for text, numbers, and file uploads. The form validates user inputs to ensure data accuracy and completeness. It also includes features like image uploading with AWS S3 and a dynamic carousel for displaying uploaded images.

Key Features:
Form Inputs: Users can input the car model, price, phone number, and maximum number of pictures they want to upload.
Image Upload: Users can select multiple images to upload, which are stored in AWS S3. The component handles the image upload asynchronously and displays a carousel of images after upload.
Submit: Once all fields are filled out, users can submit the car listing. The data is sent to the backend API, and the user is redirected to the newly created listing page.
Error Handling: Real-time validation checks ensure the user submits correct data (e.g., valid price, phone number, and image count).
Libraries and Tools Used:
Material-UI: The form UI is built with Material-UI, ensuring a responsive and accessible layout across various devices. Material-UI's TextField, Button, Card, Grid, and other components were used to structure the form and manage states.
Swiper: For the image carousel, Swiper was utilized, providing a smooth, responsive, and interactive carousel for the uploaded images.
AWS S3: The app integrates with AWS S3 to upload and store images. It uses signed URLs for direct file uploads from the front end to AWS.
React Router: The app uses React Router for navigation, enabling users to move between pages after submitting a listing.
Responsiveness and Fluid Design:
The Car_Form component is designed to be fully fluid and adaptive to different screen sizes. It adjusts the layout based on the viewport width, ensuring that users can fill out the form and view images easily on any device, from mobile phones to large desktop monitors. This is achieved through Material-UI's responsive layout features, including the sx prop for styling and custom media queries for different screen sizes.

# **Deployment**
## Backend Deployment (Rhodium)

The backend of this application is deployed in **Rhodium**, a cloud environment designed for robust and scalable deployments. It serves the application's API for handling user authentication, car listings, and image uploading functionality.

- **Backend URL:** [https://rhodium-backend-c7497f7bdb81.herokuapp.com/]

### Deployment Process:
1. The backend uses **Node.js**, **Express**, and **MongoDB** for managing data.
2. It is hosted on Rhodium and connected to a MongoDB database for persistence.
3. The application exposes RESTful API endpoints for user registration, login, car listing management, and image upload handling through AWS S3.

---

## Frontend Deployment (AWS S3)

The frontend of this application is hosted on **AWS S3** as a static website. It is fully responsive and utilizes Material-UI for UI components and Swiper for handling image carousels.

- **Frontend URL:** [http://rhodiumfrontend2.s3-website-us-east-1.amazonaws.com/]

### Features:
1. The frontend is built with **React** and styled using **Material-UI** to ensure a fluid and modern user experience.
2. The UI is adaptive and works seamlessly across different screen sizes and devices.
3. Swiper is used for an image carousel feature to allow smooth viewing of car images.
4. **AWS S3** is used for hosting the frontend, providing fast and reliable content delivery.
