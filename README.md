# Remix Contacts App (Tutorial)
This project is a Contacts web application built by following the official Remix tutorial. It demonstrates how to create a feature rich, single page application, using core Remix concepts without setting up a database or backend API. The focus is on understanding how Remix handles routing, data loading, form actions, and optimistic UI updates.

## Purpose
The tutorial is designed to teach the fundamentals of Remix by building a small contacts manager. Even though the app doesn't use a real database, it simulates full CRUD (Create, Read, Update, Delete) operations and client-side navigation.

## Core Topics Covered
Nested Routes: Building layouts with parent and child routes using <Outlet />.


1. **Loaders**: Loading data server-side for route components with loader functions.

2. **Actions**: Handling form submissions and data mutations via action functions.

3. **Optimistic UI**: Updating the UI instantly while the server processes changes.

4. **Error Boundaries**: Graceful error handling at the route level.

## Installation and Usage

Install dependencies:

```shell
npm install
```
Start the development server:

```shell
npm run dev
```