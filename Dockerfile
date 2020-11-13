#
## BUILD STAGE
#
FROM node:12 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#
## RUNTIME STAGE
#
FROM nginx:stable-alpine as runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
