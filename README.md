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

`   `git clone https://github.com/your-repo-name.git

2\. Navigate to the project directory:

`   `cd rhodium-car-sale-backend

3\. Install the dependencies:

`   `npm install

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

`   `- Create a new user account.

`   `- Request Body:

`   `{ "email": "user@example.com", "password": "yourpassword" }

POST /user/login

`   `- Login an existing user.

`   `- Request Body:

`   `{ "email": "user@example.com", "password": "yourpassword" }
## **Car Listings**
POST /cars/post

`   `- Create a new car listing.

`   `- Request Body:

`   `{ "model": "Honda Civic", "postedBy": "User Name", "price": 15000, "phone\_number": "1234567890", "max\_pictures": 5, "pictures": ["url1", "url2", "url3"] }

GET /cars/get-cars

`   `- Retrieve all car listings.
## **AWS S3 URL Generation**
GET /s3Url

`   `- Generate a signed URL for uploading an image to AWS S3.
# **Database Models**
## **User Model (usersModel.js)**
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
`    `email: { type: String, required: true },
`    `password: { type: String, required: true },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
## **Car Model (carsModel.js)**
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
`    `model: { type: String, required: true, minlength: 3 },
`    `postedBy: { type: String, required: true },
`    `price: { type: Number, required: true },
`    `phone\_number: { type: String, required: true, maxlength: 11 },
`    `max\_pictures: { type: Number, required: true, min: 1, max: 10 },
`    `pictures: { type: [String], required: true },
});

const Cars = mongoose.model('Cars', carSchema);
module.exports = Cars;
# **AWS S3 Integration**
The backend utilizes AWS S3 for image storage. When a user uploads images, a signed URL is generated to allow direct uploading to S3.

generateURL function:

async function generateURL() {
`    `const rawBytes = await randomBytes(16);
`    `const imageName = rawBytes.toString('hex'); // Generate a unique image name

`    `const params = {
`        `Bucket: bucketName,
`        `Key: imageName,
`        `Expires: 60
`    `};

`    `const uploadURL = await s3.getSignedUrlPromise('putObject', params);
`    `return uploadURL;
}
# **Technologies Used**
Node.js: JavaScript runtime for server-side scripting.

Express: Web framework for building the API.

MongoDB: NoSQL database for storing user and car listings.

AWS S3: Cloud storage for image uploads.

dotenv: Environment variable management.
# **Project Structure**
/src
`  `/controllers
`    `carsController.js
`    `userController.js
`  `/models
`    `carsModel.js
`    `usersModel.js
`  `/routes
`    `cars.js
`    `users.js
`  `s3.js
`  `server.js
