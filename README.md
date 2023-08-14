# NestJS GraphQL with MongoDB

This project is a NestJS application that demonstrates how to use MongoDB as the database and implement a GraphQL API. It provides basic CRUD operations for managing resources using GraphQL queries and mutations.

## Features

- GraphQL API with MongoDB integration
- CRUD operations using GraphQL
- Error handling
- Validation

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/scavila/book-directory-api.git
   cd nestjs-graphql-mongo


   ## Install dependencies:
   -npm install

   ## Usage
   -npm run start:dev

   Open the GraphQL Playground (http://localhost:3001/graphql) and explore the API using the interactive documentation.

## Sample GraphQL query 
     query books {
      books {
         id
         title
         author
      }
   }

## Environment Variables
   rename env.example to env

