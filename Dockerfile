ARG NODE=18-alpine

# Use an alias for the base image
FROM node:$NODE AS nodeDeps

WORKDIR /app
ENV HUSKY_SKIP_INSTALL=1

# Copying necessary files for the installation
COPY package.json yarn.lock tsconfig.json tsconfig.base.json ./

# Ensure the entire backend directory is copied
COPY be/ ./be/
RUN yarn install

RUN yarn workspace be build

# Second stage to prepare the runtime image
FROM node:$NODE

RUN apk update && apk add tini

WORKDIR /app
EXPOSE 5500

# Copy built files and node modules from the previous stage
COPY --from=nodeDeps /app/be/dist .
COPY --from=nodeDeps /app/be/package.json .
COPY --from=nodeDeps /app/node_modules ./node_modules

CMD ["tini", "--", "node", "--experimental-specifier-resolution=node", "src/app.js"]
