import express, {NextFunction} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, isImage} from './util/util';
import * as core from "express-serve-static-core";


(async () => {

  // Init the Express application
  const app : core.Express = express();

  // Set the network port
  const port : number = parseInt(process.env.PORT) || 8082;
  
  // Use the body parser middleware for post requests
  app.use(function(requestObj: express.Request,
                   responseObj: express.Response,
                   next:NextFunction) {
    if (requestObj.headers.authorization) {
      next();
      app.use(bodyParser.json());
    } else {
      return responseObj.status(403).json({error: 'No credentials sent!'});
    }
  });

  // image filter endpoint
  // takes in an image url,
  // filters image,
  // returns a filtered image
  // INPUTS
  //    inputURL: string - a publicly accessible url to an image file
  // RETURNS
  //    a filtered image
  app.get('/filteredimage', async (requestObj: express.Request, responseObj : express.Response) => {

    if (!requestObj.query.hasOwnProperty('image_url')){
      console.warn("No image url was provided.");
      return responseObj.status(400).send("No image url was provided. Please update request with query parameter image_url={{URL}}")
    }

    let imageUrl : string = requestObj.query.image_url.toString();

    if(!isImage(imageUrl)){
      return responseObj.status(422).send("Not a url of an image.")
    }

    let filteredImagePath : string = await filterImageFromURL(imageUrl);
    responseObj.status(200).sendFile(filteredImagePath);

    responseObj.on('finish', function(){
      if(filteredImagePath !== ""){
        deleteLocalFiles([filteredImagePath])
        console.info(`File deleted at ${filteredImagePath}`);
      }
    });
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (responseObj : express.Response) => {
    responseObj.send("try GET /filteredimage?image_url={{}}")
  } );

  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();