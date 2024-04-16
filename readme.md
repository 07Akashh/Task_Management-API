# Task Management API

## Table of Contents

- [Introduction](#introduction)
- [Endpoints](#endpoints)
  - [Anatomy of an endpoint](#anatomy-of-an-endpoint)
  - [Request methods](#request-methods)
  - [Examples](#examples)
- [Pagination](#pagination)
  - [Errors](#errors)
    - [Vapor 1](#vapor-1)
    - [Vapor 2](#vapor-2)
  - [Examples](#examples-4)
    - [A single item](#a-single-item)
    - [An endpoint without meaningful data to return](#an-endpoint-without-meaningful-data-to-return)
    - [An error in Vapor 2](#an-error-in-vapor-2)
    - [A collection of items](#a-collection-of-items)
    - [A paginated collection of items](#a-paginated-collection-of-items)

## Introduction

This is the Task Management API, a powerful tool for managing tasks efficiently and effectively. Our API provides developers with a simple yet comprehensive solution for organizing tasks, tracking progress, and collaborating on projects seamlessly.

## Endpoints

Endpoints with literal and readable URLs is what makes an API awesome. So to make everything easy and convenient for you, we have specified how you should do it. No more thinking about if it should be plural or where you should put your slug.

Here is the documentation of postman: https://documenter.getpostman.com/view/33128498/2sA3Bj9Zoj#ea7bf517-adc5-4b53-ac15-6f151da017d6

### Anatomy of an endpoint

The anatomy of an endpoint should look like this:

```
/api/tasks             // Collection of tasks
/api/search/{taskId}    // Specific task identified by taskId
/api/add                 // Add a new task
/api/update/{taskId}     // Update a task identified by taskId
/api/remove/{taskId}     // Remove a task identified by taskId

```

### Request methods

The request method is the way we distinguish what kind of action our endpoint is being "asked" to perform. For example, `GET` pretty much gives itself. But we also have a few other methods that we use quite often.

| Method   | Description                              |
| -------- | ---------------------------------------- |
| `GET`    | Used to retrieve a single item or a collection of tasks. |
| `POST`   | Used when creating  new tasks |
| `PUT`    | Used to update taaks data or information. |
| `DELETE` | Used to delete an tasks.                  |



### Examples

Now that we’ve learned about the anatomy of our endpoints and the different request methods that we should use, it’s time for some examples:

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/tasks`                             | Retrieve all tasks.                      |
| `POST`   | `/api/add`                               | Add a new post.                          |
| `GET`    | `/api/search/:taskId`                    | Retrieve task by taskID.                 |
| `PUT`    | `/api/update/:taskId`                    | Update data in task by taskId.           |
| `DELETE` | `/api/delete/:taskId`                    | Delete task by taskId.                   |


## Validation

The validations feature in our project enhances data integrity and security by enforcing constraints on the input data received by the API endpoints. With validations implemented, we ensure that incoming data meets certain criteria and is valid before processing it further. This helps prevent potential errors, improve data quality, and mitigate security risks.

## Key Features

- **Mandatory Field Validation**: Checks that all required fields (title, description, status, due_date) are present in the request body, returning a 400 status with an error message if any are missing.
- **Due Date Validation**: Verifies that the due date provided in the request body is in the future, preventing tasks with past due dates from being created.
- **Status Value Validation**: Ensures that the status value provided in the request body is one of the valid options (pending, in-progress, completed), rejecting requests with invalid status values.

## Usage

To utilize the validations feature:

1. **Submit Valid Data**: When making requests to create tasks, ensure that all required fields are included in the request body and that the data provided adheres to the specified format and constraints.
2. **Handle Validation Errors**: Handle validation errors gracefully on the client side by examining error messages returned by the API and providing appropriate feedback to users.
3. **Maintain Data Integrity**: Maintain data integrity by enforcing validation rules consistently across all API endpoints.


## Pagination

The pagination feature in our project allows users to navigate through large datasets efficiently by breaking them down into smaller, more manageable chunks of data called "pages." With pagination implemented, users can view data one page at a time, reducing load times and improving overall user experience.


### Errors

When errors occur the consumer will get a JSON payload verifying that an error occurred together with a reason for why the error occurred.

Error handling has changed from Vapor 1 through 3, these are the keys to expect from the different versions.


#### Vapor 2

| Endpoint   | Description                              |
| ---------- | ---------------------------------------- |
| `error`    | A boolean confirming an error occurred.  |
| `reason`   | Task details are not provided.           |
| `message`  | All the fields are mandatory             |
| `metadata` | Any custom metadata that might be included. **Only** available on a non-production environment. |

#### Vapor 1

| Key        | Description                              |
| ---------- | ---------------------------------------- |
| `code`     | The HTTP code.                           |
| `error`    | A boolean confirming an error occurred.  |
| `message`  | A description of the error that occurred. |
| `metadata` | Any custom metadata that might be included. **Only** available on a non-production environment. |

### Examples

Just to round it all off, here’s a few examples of how our response will return depending on whether you’re about to return a single item, a collection or a paginated result set.

#### A single task

```
{
    "task": {
        "_id": "661d59e34cd03605d4ef9d7e",
        "title": "task3",
        "description": "completed 1part",
        "status": "completed",
        "due_date": "2029-02-01T18:30:00.000Z",
        "createdAt": "2024-04-15T16:46:27.306Z",
        "updatedAt": "2024-04-16T06:58:21.573Z",
        "__v": 0
    }
}
```

#### An endpoint without meaningful data to return

```
{
    "result": true
}
```

#### An error in Vapor 2 or 3

```
{
    "error": false,
    "reason": "Invalid email or password"
}
```

#### A collection of tasks

```
{
    "data": [
    {
        "_id": "661d59e34cd03605d4ef9d7e",
        "title": "task3",
        "description": "completed 1part",
        "status": "completed",
        "due_date": "02-02-2029",
        "createdAt": "2024-04-15T16:46:27.306Z",
        "updatedAt": "2024-04-16T06:58:21.573Z",
        "__v": 0
    },
    {
        "_id": "661e163b30a9f384bc7692b8",
        "title": "task1",
        "description": "this is the task",
        "status": "pending",
        "due_date": "02-02-2029",
        "createdAt": "2024-04-16T06:10:03.495Z",
        "updatedAt": "2024-04-16T06:10:03.495Z",
        "__v": 0
    },
    {
        "_id": "661e1fecf0ca9eee33739b0a",
        "title": "task111",
        "description": "this is the task",
        "status": "pending",
        "due_date": "02-02-2029",
        "createdAt": "2024-04-16T06:51:24.965Z",
        "updatedAt": "2024-04-16T06:51:24.965Z",
        "__v": 0
    }
]
}
```

#### A paginated collection of items
```
{
    "tasks": [
        {
            "_id": "661d59e34cd03605d4ef9d7e",
            "title": "task3",
            "description": "completed 1part",
            "status": "completed",
            "due_date": "2029-02-01T18:30:00.000Z",
            "createdAt": "2024-04-15T16:46:27.306Z",
            "updatedAt": "2024-04-16T06:58:21.573Z",
            "__v": 0
        },
        {
            "_id": "661e163b30a9f384bc7692b8",
            "title": "task1",
            "description": "this is the task",
            "status": "pending",
            "due_date": "2029-02-01T18:30:00.000Z",
            "createdAt": "2024-04-16T06:10:03.495Z",
            "updatedAt": "2024-04-16T06:10:03.495Z",
            "__v": 0
        },
        {
            "_id": "661e1fecf0ca9eee33739b0a",
            "title": "task111",
            "description": "this is the task",
            "status": "pending",
            "due_date": "2029-02-01T18:30:00.000Z",
            "createdAt": "2024-04-16T06:51:24.965Z",
            "updatedAt": "2024-04-16T06:51:24.965Z",
            "__v": 0
        },
        {
            "_id": "661e6ea00f774308c110b767",
            "title": "task111",
            "description": "this is the",
            "status": "completed",
            "due_date": "2025-02-01T18:30:00.000Z",
            "createdAt": "2024-04-16T12:27:13.002Z",
            "updatedAt": "2024-04-16T12:27:13.002Z",
            "__v": 0
        },
        {
            "_id": "661e705c34e409aa08e474eb",
            "title": "task111",
            "description": "this is the",
            "status": "completed",
            "due_date": "2025-02-01T18:30:00.000Z",
            "createdAt": "2024-04-16T12:34:38.298Z",
            "updatedAt": "2024-04-16T12:34:38.298Z",
            "__v": 0
        }
    ],
    "totalPages": 1,
    "currentPage": 1,
    "hasNextPage": false,
    "hasPrevPage": false
}
```
