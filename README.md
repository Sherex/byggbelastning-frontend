# Byggbelastning Frontend
Vue frontend for the Byggbelastning project.

This one talks to the Byggbelastning API to get the data it displays.

## Related repositories
- [byggbelastning-data-poller](https://github.com/vtfk/byggbelastning-data-poller)
- [byggbelastning-api](https://github.com/vtfk/byggbelastning-api)

## Usage
> Note: This project is still in development!
### Docker
> Note: There is currently no image on DockerHub
```sh
# Clone the repo, then cd into it
git clone https://github.com/vtfk/byggbelastning-frontend
cd byggbelastning-frontend/

# Use the compose-file to build the image and start a container
npm run docker:start #--build # Use the --build option to force-build

# Stop the container
npm run docker:stop

# Read and follow the logs for the created container
docker logs -f byggbelastning-frontend
```

### NodeJS
```sh
# Clone the repo, then cd into it
git clone https://github.com/vtfk/byggbelastning-frontend
cd byggbelastning-frontend/

# Install dependencies
npm install

# Rename template.env to .env then edit it
mv template.env .env

# Build the application
npm run build

# Then serve the files in ./dist somehow (for ex. using Nginx or Apache)
npm start
```

## Development
```sh
# Clone the repo
git clone https://github.com/vtfk/byggbelastning-frontend
cd byggbelastning-frontend/

# Install dependencies
npm install

# Rename template.env to .env then edit it
mv template.env .env

# Start the app with hot-reload
npm run serve
```

## LICENSE
[MIT](LICENSE)