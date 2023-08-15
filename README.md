# tokopedia-play-clone-backend

This Readme document provides an overview of the database structure and API architecture for our project. It also includes instructions on how to run the API locally, ensuring that it can easily run on your local machine.

Hosted : tokopedia-play-clone-backend-production.up.railway.app

## Database Structure
Our application utilizes a non relational database (MongoDB) to store relevant data. The database is designed with the following structure:

### Videos Collection :

|              | Type                                         | Description                                      |
| ------------ | -------------------------------------------- | ------------------------------------------------ |
| _id          | `ObjectID()`                                 | An automatically assigned id by mongodb          |
| thumbnailurl | `String`                                     | The URL of the video's thumbnail                 |
| videourl     | `String`                                     | The URL of the video                             |
| title        | `String`                                     | The title of the video                           |
| user_id      | `String`                                     | the id of the owner of the video                 |

### Products Collection:

|              | Type                                         | Description                                       |
| ------------ | -------------------------------------------- | ------------------------------------------------- |
| _id          | `ObjectID()`                                 | An automatically assigned id by mongodb           |
| producturl   | `String`                                     | The URL of the product                            |
| productimg   | `String`                                     | The URL of the product image                      |
| title        | `String`                                     | The product's name                                |
| price        | `Integer`                                    | The product's price                               |
| video_id     | `String`                                     | The ID of the video, in which the products are in |

### Comments Collection:

|              | Type                                         | Description                                       |
| ------------ | -------------------------------------------- | ------------------------------------------------- |
| _id          | `ObjectID()`                                 | An automatically assigned id by mongodb           |
| user_id      | `String`                                     | The commenter's id                                |
| comment      | `String`                                     | The message that are sent                         |
| video_id     | `String`                                     | The ID of the video, in which the comments are in |


## API Structure
Our API follows a RESTful architecture, utilizing HTTP methods for communication. The endpoints are structured as follows:

**GET /api/video**
----
  Returns all videos in the system.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
[
    {
        "_id": ObjectID,
        "thumbnailurl": string,
        "videourl": string,
        "title": string,
        "user_id": string
    },
    {
        "_id": ObjectID,
        "thumbnailurl": string,
        "videourl": string,
        "title": string,
        "user_id": string
    }
]
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "No videos found." }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: error.message }`

**GET /api/video/search?q**
----
  Returns a videos using query in the system.
* **URL Params**  
  *Required:* `q=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
[
    {
        "_id": ObjectID,
        "thumbnailurl": string,
        "videourl": string,
        "title": string,
        "user_id": string
    },
    {
        "_id": ObjectID,
        "thumbnailurl": string,
        "videourl": string,
        "title": string,
        "user_id": string
    }
]
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "No thumbnails found." }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: "Failed to fetch thumbnails.", error: error.message }`

**GET /api/video/:videoId**
----
  Returns a specific video.
* **URL Params**  
  *Required:* `videoId=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**
```
{
    "_id": ObjectID,
    "thumbnailurl": string,
    "videourl": string,
    "title": string,
    "user_id": string
}
``` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "Video not found" }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: error.message }`

**GET /api/product/:videoId**
----
  Returns all product from the specified video.
* **URL Params**  
  *Required:* `videoId=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
[
    {
        "_id": ObjectID,
        "producturl": string,
        "productimg": string,
        "title": string,
        "price": integer,
        "video_id": string
    },
    {
        "_id": ObjectID,
        "producturl": string,
        "productimg": string,
        "title": string,
        "price": integer,
        "video_id": string
    }
]
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "No products found for the video." }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: "Failed to fetch products.", error: error.message }`

**GET /api/comment/:videoId**
----
  Returns all comments from the specified video.
* **URL Params**  
  *Required:* `videoId=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
[
    {
        "_id": ObjectID,
        "user_id": string,
        "comment": string,
        "created_at": Date(),
    },
    {
        "_id": ObjectID,
        "user_id": string,
        "comment": string,
        "created_at": Date(),
    }
]
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "No comments found for the video." }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: "Failed to fetch comments.", error: error.message }`

**POST /api/video**
----
  Creates a new User and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    "thumbnailurl": string,
    "videourl": string,
    "title": string
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:**
  ```
  [
    {
        "_id": ObjectID,
        "thumbnailurl": string,
        "videourl": string,
        "title": string
    }
  ]
  ``` 

**POST /api/product**
----
  Creates a new User and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    "producturl": string,
    "productimg": string,
    "title": string,
    "price": string,
    "video_id": ObjectID,
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:**
  ```
  [
    {
        "_id": ObjectID,
        "producturl": string,
        "productimg": string,
        "title": string,
        "price": integer,
        "video_id": ObjectID,
    }
  ]
  ```

**POST /api/comment**
----
  Creates a new User and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    "user_id": ObjectID,
    "comment": string,
    "video_id": ObjectID
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:**
  ```
  [
    {
        "_id": ObjectID,
        "user_id": ObjectID,
        "comment": string,
        "video_id": ObjectID
    }
  ]
  ``` 

## How to Run Locally
To run the API on your local machine, please follow these steps:

**1. Clone the project repository from GitHub.**
```bash
git clone https://github.com/ChristopherHaris/tokopedia-play-clone-backend.git
```
**2. Install Dependencies:**
Ensure you have Node.js and npm (Node Package Manager) installed. Then, navigate to the project directory and install the required dependencies by running:
```bash
npm install
```
**3. Set Up MongoDB Database:**
* Install MongoDB on your local machine if you haven't already. You can download it from the official website: [MongoDB](https://www.mongodb.com/try/download/compass).
* Install MongoDB compass on your system
* Start the MongoDB compass to run the database locally.

**4. Run the API:**
Start the API by executing the following command:
```node
npm run start
```
**5. Access the API:**
The API should now be accessible locally at 

`http://localhost:3000/api/`.
