import fs from "fs";
import Jimp = require("jimp");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      console.debug(`Fetching image from ${inputURL}`);

      const photo = await Jimp.read(await downloadImage(inputURL));
      const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      console.debug(`storing filtered image to ${outpath}`);
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, () => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export function isImage(url:string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to clean up after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    console.debug(`deleting file ${file}`)
    fs.unlinkSync(file);
  }
}


const downloadImage = async (url : string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
}
