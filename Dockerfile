# Use Node.js LTS as the base image
FROM node:20.11.1-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure the public/images directory exists in the build context
# and copy images. npm run build will then include public/* in build/*
# This step assumes your images from src/assets/images have been moved to public/images
# If you still have src/assets/images and want to use them, adjust this copy.
# For this setup, we assume all final images are in public/images.
# RUN mkdir -p public/images # Ensure public/images exists if not copied with `COPY . .`
# COPY src/assets/images/* public/images/ # This line is if you haven't moved them manually yet

# Build the React application
RUN npm run build

# No need to install 'serve' globally anymore
# EXPOSE 3000 (already exposed by Node.js apps on this port by convention, but good to keep)
EXPOSE 3000

# Start the application using our server.js
CMD ["node", "server.js"] 