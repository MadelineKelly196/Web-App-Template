# Web-Server-Template
Web server template using docker, react, and node

Note:
For the docker-compose proper connection between dev and production three environment files should be created within the react-client folder:
 - .env
     - VITE_EXPRESS_HOST
     - VITE_EXPRESS_PORT
 - .env.development
     - VITE_API_BASE
 - .env.production
     - VITE_API_BASE

For a local server deployment using docker:
 - deploy using `docker-compose up`
    - note that nginx.conf is relying on the network connection defined by the docker-compose file to allow the front end to be properly proxied and connected to the backend

For deployment on Render:
 - A project should be created to contain and connect all the services together
 - The front end service should be deployed as a static site with the build command `npm run build` and an environment variable for the `VITE_API_BASE` defined as the web url for the render served backend service
 - The back end service should be a web service deployed using the Dockerfile and should include an environment variable for the `FRONTEND_URL` defined as the web url served on render
    
