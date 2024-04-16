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
| `GET`    | `/api/posts/:taskId`                     | Retrieve task by taskID.                 |
| `PUT`    | `/api/update/:taskId`                    | Update data in task by taskId.           |
| `DELETE` | `/api/delete/:taskId`                    | Delete task by taskId.                   |


## Pagination

This is one of the tricky parts. Depending on what type of API you’re doing, pagination is implemented in different ways.

If you're making an API to be used on the web, simple pagination using "pages" would work just fine. This is supported by our [Paginator package](https://github.com/nodes-vapor/paginator) and should work out of the box.

But if you’re making an API for the mobile team(s) then you need to do it in a bit more complex way. Because devices usually have a "load more" feature, we can’t use the "pages" approach, since we could risk getting duplicates or even miss new entries. Therefore we return the collection in "batches" instead of pages.

See the Response section for examples of how to return meta data for pagination.


### Errors

When errors occur the consumer will get a JSON payload verifying that an error occurred together with a reason for why the error occurred.

Error handling has changed from Vapor 1 through 3, these are the keys to expect from the different versions.

#### Vapor 3

| Endpoint   | Description                              |
| ---------- | ---------------------------------------- |
| `error`    | A boolean confirming an error occurred.  |
| `reason`   | A description of the error that occurred. For some errors this value provides extra information on non-production environments. |

#### Vapor 2

| Endpoint   | Description                              |
| ---------- | ---------------------------------------- |
| `error`    | A boolean confirming an error occurred.  |
| `reason`   | A description of the error that occurred. |
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

#### A single item

```
{
    "data": {
        "id": 1,
        "name": "Shane Berry",
        "email": "shane@berry.com"
        "created_at": "2015-03-02T12:59:02+0100",
        "updated_at": "2015-03-04T15:50:40+0100"
    }
}
```

#### An endpoint without meaningful data to return

```
{
    "status": "ok"
}
```

#### An error in Vapor 2 or 3

```
{
    "error": true,
    "reason": "Invalid email or password"
}
```

#### A collection of items

```
{
    "data": [
        {
            "id": 1,
            "name": "Shane Berry",
            "email": "shane@berry.com"
            "created_at": "2015-03-02T12:59:02+0100",
            "updated_at": "2015-03-04T15:50:40+0100"
        },
        {
            "id": 2,
            "name": "Albert Henderson",
            "email": "albert@henderson.com"
            "created_at": "2015-03-02T12:59:02+0100",
            "updated_at": "2015-03-04T15:50:40+0100"
        },
        {
            "id": 3,
            "name": "Miguel Phillips",
            "email": "miguel@phillips.com"
            "created_at": "2015-03-02T12:59:02+0100",
            "updated_at": "2015-03-04T15:50:40+0100"
        }
    ]
}
```

#### A paginated collection of items
```
{
    "data": [
        {
            "id": 1,
            "name": "Shane Berry",
            "email": "shane@berry.com"
            "created_at": "2015-03-02T12:59:02+0100",
            "updated_at": "2015-03-04T15:50:40+0100"
        },
        {
            "id": 4,
            "name": "Albert Henderson",
            "email": "albert@henderson.com"
            "created_at": "2015-03-02T12:59:02+0100",
            "updated_at": "2015-03-04T15:50:40+0100"
        }
    ],
    "meta": {
        "pagination": {
            "currentPage": 2,
            "links": {
                "next": "/api/users/?page=3&count=20",
                "previous": "/api/users/?page=1&count=20"
            },
            "perPage": 20,
            "total": 258,
            "totalPages": 13
        }
    }
}
```
