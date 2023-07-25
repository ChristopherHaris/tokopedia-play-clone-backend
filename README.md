# tokopedia-play-clone-backend

## Project Readme
This Readme document provides an overview of the database structure and API architecture for our project. It also includes instructions on how to run the API locally, ensuring that it can easily run on your local machine.

## Database Structure
Our application utilizes a non relational database (MongoDB) to store relevant data. The database is designed with the following structure:

Videos Collection :
| ------ | -------------------------------------------- | ------------------------------------------------ |
| _id    | `/playlists`                                 | Get the list of all playlists                    |
| GET    | `/playlists/:playlistId`                     | Get details of a specific playlist               |
| GET    | `/playlists/:playlistId?sort_by=played`      | Sort tracks in a specific playlist by play count |
| POST   | `/playlists`                                 | Create a new playlist                            |
| PUT    | `/playlists/:playlistId`                     | Update details of a specific playlist            |
| DELETE | `/playlists/:playlistId`                     | Delete a specific playlist                       |
| GET    | `/playlists/:playlistId/tracks/:songId`      | Get details of a specific song from a playlist   |
| GET    | `/playlists/:playlistId/tracks/:songId/play` | Play a song from a playlist                      |
| POST   | `/playlists/:playlistId/tracks`              | Add a song to a specific playlist                |
| DELETE | `/playlists/:playlistId/tracks/:songId`      | Remove a specific song from a playlist           |
user_id (Primary Key): Unique identifier for each user.
username: The username chosen by the user for their account.
email: The email address associated with the user's account.
password: Hashed password for account security.
Posts Table:

post_id (Primary Key): Unique identifier for each post.
user_id (Foreign Key): References the user who created the post.
content: The content of the post.
timestamp: The date and time when the post was created.
Comments Table:

comment_id (Primary Key): Unique identifier for each comment.
user_id (Foreign Key): References the user who wrote the comment.
post_id (Foreign Key): References the post to which the comment belongs.
content: The content of the comment.
timestamp: The date and time when the comment was created.
This database structure allows us to maintain a record of users, their posts, and the comments they make on those posts.

ii. API Structure
Our API follows a RESTful architecture, utilizing HTTP methods for communication. The endpoints are structured as follows:

GET /api/posts

Description: Fetches a list of all posts.
Response: Array of post objects, each containing post_id, user_id, content, and timestamp.
GET /api/posts/:post_id

Description: Fetches a specific post by its post_id.
Response: Post object containing post_id, user_id, content, and timestamp.
POST /api/posts

Description: Creates a new post.
Request: JSON object containing user_id and content.
Response: Post object of the newly created post.
PUT /api/posts/:post_id

Description: Updates an existing post.
Request: JSON object containing user_id and updated content.
Response: Post object of the updated post.
DELETE /api/posts/:post_id

Description: Deletes a post.
Response: Success message indicating the post was deleted successfully.
GET /api/posts/:post_id/comments

Description: Fetches all comments for a specific post.
Response: Array of comment objects, each containing comment_id, user_id, post_id, content, and timestamp.
POST /api/posts/:post_id/comments

Description: Creates a new comment on a specific post.
Request: JSON object containing user_id and content.
Response: Comment object of the newly created comment.
DELETE /api/posts/:post_id/comments/:comment_id

Description: Deletes a comment on a specific post.
Response: Success message indicating the comment was deleted successfully.
iii. API Request and Response Format
For a detailed representation of the API request and response format, please refer to the following Gist link: API Request and Response Format

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
