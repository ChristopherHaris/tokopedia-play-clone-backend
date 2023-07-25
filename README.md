# tokopedia-play-clone-backend

## Project Readme
This Readme document provides an overview of the database structure and API architecture for our project. It also includes instructions on how to run the API locally, ensuring that it can easily run on your local machine.

## Database Structure
Our application utilizes a non relational database (MongoDB) to store relevant data. The database is designed with the following structure:

### Videos Collection :

|              | Type                                         | Description                                      |
| ------------ | -------------------------------------------- | ------------------------------------------------ |
| _id          | `ObjectID()`                                 | An automatically assigned id by mongodb          |
| thumbnailurl | `String`                                     | The URL of the video's thumbnail                 |
| videourl     | `String`                                     | The URL of the video                             |
| title        | `String`                                     | The title of the video                           |

### Products Collection:

|              | Type                                         | Description                                       |
| ------------ | -------------------------------------------- | ------------------------------------------------- |
| _id          | `ObjectID()`                                 | An automatically assigned id by mongodb           |
| producturl   | `String`                                     | The URL of the product                            |
| title        | `String`                                     | The product's name                                |
| price        | `Integer`                                    | The product's price                               |
| video_id     | `String`                                     | The ID of the video, in which the products are in |

### Comments Collection:

|              | Type                                         | Description                                       |
| ------------ | -------------------------------------------- | ------------------------------------------------- |
| _id          | `ObjectID()`                                 | An automatically assigned id by mongodb           |
| username     | `String`                                     | The commenter's name                              |
| comment      | `String`                                     | The message that are sent                         |
| video_id     | `String`                                     | The ID of the video, in which the comments are in |


## API Structure
Our API follows a RESTful architecture, utilizing HTTP methods for communication. The endpoints are structured as follows:

**GET /video**
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
        "title": string
    },
    {
        "_id": ObjectID,
        "thumbnailurl": string,
        "videourl": string,
        "title": string
    }
]
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "No videos found." }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: error.message }`

**GET /video/thumbnail**
----
  Returns all thumbnail in the system.
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
        "thumbnailurl": string
    },
    {
        "_id": ObjectID,
        "thumbnailurl": string
    }
]
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "No thumbnails found." }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: "Failed to fetch thumbnails.", error: error.message }`

**GET /video/:id**
----
  Returns a specific video.
* **URL Params**  
  *Required:* `id=[string]`
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
    "title": string
}
``` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "Video not found" }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: error.message }`

**GET /video/thumbnail/:id**
----
  Returns a specific thumbnail.
* **URL Params**  
  *Required:* `id=[string]`
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
    "thumbnailurl": string
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "Thumbnail not found." }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: "Failed to fetch thumbnail.", error: error.message }`

**GET /video/product/:id**
----
  Returns all product from the specified video.
* **URL Params**  
  *Required:* `id=[string]`
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
        "title": string,
        "price": integer
    },
    {
        "_id": ObjectID,
        "producturl": string,
        "title": string,
        "price": integer
    }
]
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ message: "No products found for the video." }`  
  OR  
  * **Code:** 500  
  **Content:** `{ message: "Failed to fetch products.", error: error.message }`

**GET /video/comment/:id**
----
  Returns all comments from the specified video.
* **URL Params**  
  *Required:* `id=[string]`
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
        "username": string,
        "comment": string,
        "created_at": Date(),
    },
    {
        "_id": ObjectID,
        "username": string,
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

**POST /video**
----
  Creates a new User and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    "thumbnail": string,
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

**POST /video/product**
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
        "title": string,
        "price": integer,
        "video_id": ObjectID,
    }
  ]
  ```

  **POST /video/comment**
----
  Creates a new User and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    "username": string,
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
        "username": string,
        "comment": string,
        "video_id": ObjectID
    }
  ]
  ``` 

iv. How to Run Locally
To run the API on your local machine, please follow these steps:

Clone the project repository from GitHub.
Ensure you have Node.js and npm (Node Package Manager) installed.
Install the project dependencies by running: npm install.
Set up the database by running the provided SQL scripts to create the necessary tables and relationships.
Configure the database connection in the project's configuration file.
Run the application by executing: npm start.
The API should now be accessible locally at http://localhost:3000/api/.
Ensure that the grader can easily follow these steps and run the API on their local machine without any issues. If there are any specific instructions or environment considerations, please provide them in this section.
