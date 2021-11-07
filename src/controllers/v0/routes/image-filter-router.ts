import { Router, Request, Response } from "express";
import { filterImageFromURL, deleteLocalFiles } from "../../../util/util";
import { isWebUri } from "valid-url";
import fs from "fs";
const router: Router = Router();

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1
router.get("/", async (req: Request, resp: Response) => {
  var url: string = req.query.image_url;

  if (isNullOrWhiteSpace(url) || !isWebUri(url)) {
    resp.status(400).send("Query param image_url cannot be empty.");
  } else {
    try {
      const path: string = await filterImageFromURL(url);
      resp.status(200);
      resp.set("Content-Type", "image/jpeg");
      resp.sendFile(path, async function (err) {
        {
          if (fs.existsSync(path)) {
            await deleteLocalFiles([path]);
          }
        }
      });
    } catch (err) {
      console.log("Error while sending the file response", err);
      resp.status(500);
      resp.send("Error while filtering image");
    }
  }
});

function isNullOrWhiteSpace(str: String): Boolean {
  return str == null || str.trim() === "";
}

export const ImageFilterRouter: Router = router;
