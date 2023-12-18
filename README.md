# Live Chat
An aesthetic realtime chat that focuses on Devops concepts and apply what i learnt so far.

![livechat](/assets/livechat.gif)

## Application Code
### Technology Stack
Front-End: NextJS (TypeScript)  
Back-End: NodeJS, ExpressJS (Websocket Server)  
Database: Supabase  
Tools used: TailwindCSS, Socketio for websocket, NGINX for reverse proxy, Docker to containerize and isolate the servers, Jenkins for CICD  
Future considerations: Deploy containers on EC2 instances ($$$), kubernetes for scaling and healing if there are more containers, Git webhook for CICD so production will be rebuilt automatically when pushed to main (if domain is used)

## System Architecture Diagram
Users sends requests to the nginx server which will fetch the pages for them from the nextjs server. When interacting with the realtime chat, the nextjs server will prompt the websocket (express) server for data which will be sent to all users who are connected to the channel. All 3 servers are containerized for isolation purposes and to make it lightweight and Jenkins is used to automate the test, build and deploying of containers.

![system](/assets/system.PNG)

## Chat Functionality
All users that are connected to the chat can see each other's messages in realtime and the data is being stored in the Supabase database.

![chat](/assets/chat.gif)

## Additional Information
### Docker
Consists of 3 images/containers namely, one for nextjs, another for express and the last one for nginx. A dockerfile was used in the express server to download the required dependencies and expose the 3001 port before running the server. Another dockerfile was used in the next server to download the dependencies and build the artifact.

![docker](/assets/docker.PNG)

### Jenkins
A pipeline is built in order to facilitate the automation of testing if needed, building of the containers and running it.

![jenkins](/assets/jenkins.PNG)

## How to run locally
Due to cost constraints, I did not deploy it on the cloud. However, you can run it locally by cloning the repository and just setup a new jenkin pipeline using github scm and run the jenkinsfile, or you could just do docker-compose up.
