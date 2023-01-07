import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get('/filteredimage', async (requestObj, responseObj) => {

    if (requestObj.query.hasOwnProperty('image_url') == false){
      console.warn("No image url was provided.");
      return responseObj.status(400).send("No image url was provided. Please update request with query parameter image_url={{URL}}")
    }

    let imageUrl = requestObj.query.image_url;
    let filteredImagePath = await filterImageFromURL(imageUrl);
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
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();