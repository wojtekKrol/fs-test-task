# Application Setup and Testing Guide

This guide provides instructions on how to set up and test the application both locally and using Docker. Follow these steps to ensure your development environment is correctly configured.

## Prerequisites

Ensure you have `node` >18 `yarn` installed on your system, which you can get from [Yarn's official website](https://yarnpkg.com/getting-started/install).

## Local Setup

### 0. Install Dependencies

Before running the application, install the necessary dependencies:

```bash
yarn install
```
### 1. Configure Environment Variables

```bash
cd be && ./scripts/createEnvs.sh &&  cd ..
```

### 2. Seed the Database

To populate the database with initial data, run the seeding script:

```bash
yarn run seed
```

### 3. Run the Client Side

Start the client-side application with the following command:

```bash
yarn run dev:fe
```

### 4. Run the Backend Server Locally

To run the backend server locally (outside of Docker), use:

```bash
yarn run dev:be
```

## Docker Setup

### Run Services Using Docker

You can also run the server side within Docker, which includes three main services: `backend`, `mongo`, and `mongorestore`.

- **server**: This service runs the backend application.
- **mongo**: This service manages the MongoDB database.
- **mongorestore**: This service is responsible for restoring the database from a dump.

To start all services, execute:

```bash
docker-compose up --build
```

## Testing

Currently, the application's tests are not configured to work with the TypeScript setup due to incomplete Jest configuration. The tests need proper integration with the `tsconfig` settings.

## Additional Information

- **Client-Side Configuration**: The frontend part of the project was not fully configured. Specifically, Tailwind CSS was not set up, and it’s unclear if this was intentional. I've made necessary adjustments to ensure the project works by adding  Tailwind CSS configs.
- **Project Structure**: This project uses Yarn workspaces for managing multiple packages, which is not supported by npm. This decision necessitated adjustments in several configuration settings to make the project compatible with Yarn.
- **Other thoughts**: While working on this projects I reflected on why I didn't use a template for this Express, MongoDB, and TypeScript project from the start, it would be so less work to do. 
