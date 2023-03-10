# Udagram Image Filtering Microservice

Image filtering microservice is part of Udagram a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

### Source
[GitHub Repo](https://github.com/akaMrQ/alx_cloud_dev.git)

### Host
[AWS Elastic Beanstalk](http://project-dev.us-east-1.elasticbeanstalk.com)

### Requirements and software
* Required 
  * [NodeJS](https://nodejs.org/en/download/)
  * [AWS EB CLI](https://github.com/aws/aws-elastic-beanstalk-cli-setup)
* Optional (Required on windows) [UnixUtils](https://sourceforge.net/projects/unxutils/)
* Optional 
  * [NVM](https://github.com/nvm-sh/nvm)
  * [Postman](https://www.postman.com/downloads/)

### Setup and run
1) Clone repo at [GitHub Repo](https://github.com/akaMrQ/alx_cloud_dev.git)
2) Open a new terminal within the project directory and run:
   1. Initialize a new project: `npm i`
   2. Run the development server with `npm run dev`
3) Open rest client (see optional download [Postman](https://www.postman.com/downloads/) if you don't have one)
   1. Import _ndcd.postman_collection.json_ into Postman ( see [import collection](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/))
   2. Add preferred authentication ( for now it just if auth header exist, to be enhanced for token auth in future.)
   3. Execute desired request(s)