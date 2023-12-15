# Next.js Assignment Instructions

## Users

### Requirements:
1. **User Schema**:
    - Properties: `id` (string), `name` (string), `image` (string).

2. **Database Setup**:
    - Store a list of fake users in the database for testing purposes.

3. **Fake Login**:
    - Implement a fake login feature using cookies.
    - The login form should be a client component that calls a server action
    - Validate if the user exists in the database.

4. **User Details Page**:
    - Display the user's details when navigated to `/users/[user_id]`.

## Profile Page

### Requirements:
1. **Authenticated View**:
    - If a user is logged in, show their details and posts on the home page.
    - Implement a logout button.

## Create Post

### Requirements:
1. **Post Schema**:
    - Properties: `id` (string), `createdAt` (string), `content` (string).

2. **Post Creation**:
    - Restrict post viewing to logged-in users only.
    - Implement server action to save posts to the database.
    - Revalidate the home page feed after a new post is created.
    - Redirect to the home page feed after posting.
    - Enforce post content length: minimum 5 characters, maximum 140 characters.
    - The post form should be a client component that calls a server action

## Home Feed

### Requirements:
1. **Display Posts**:
    - Show all posts from all users.
    - Implement a SQL query to join user and post tables, returning data in the specified format.

## Search Page

### Requirements:
1. **Search Functionality**:
    - Implement a search feature that displays posts containing the search term.
    - Use a SQL query to filter results; avoid filtering in JavaScript.

## Other Requirements

1. **Version Control**:
    - Commit and push changes frequently with meaningful commit messages.

2. **Code Quality**:
    - Write clean, well-documented, and efficient code.

3. **Error Handling**:
    - Implement appropriate error and loading states for login and post creation. 

4. **Data Handling**:
    - Query data in server components and handle post data in server actions.


# Assignment Rubric

| Criteria                       | Description                                                                                                                                                    | Points |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **User Management**            | - Correct implementation of user schema. <br> - Functional fake login. <br> - Accurate user validation in the database. <br> - Proper display of user details. | 15     |
| **Profile Page Functionality** | - Correct display of user details and posts for logged-in users. <br> - Functional logout button.                                                              | 10     |
| **Post Creation**              | - Enforcement of post content length. <br> - Successful saving of posts to the database. <br> - Correct redirection and feed revalidation.                     | 20     |
| **Home Feed Display**          | - Proper display of all user posts. <br> - Correct implementation of SQL join queries.                                                                         | 20     |
| **Search Functionality**       | - Accurate filtering of posts with search terms. <br> - Efficient SQL query implementation for search.                                                         | 15     |
| **Error and Loading States**   | - Appropriate handling and display of error/loading states for login and post creation.                                                                        | 10     |
| **Version Control**            | - Frequent and meaningful commits. <br> - Clean code and use of next.js features                                                                               | 10     |
| **Total**                      |                                                                                                                                                                | 100    |

*Note: Each criterion must be met satisfactorily to earn the full points in that category.*
