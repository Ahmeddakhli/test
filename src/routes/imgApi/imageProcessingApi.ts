import path from 'path'
import fs from 'fs'
import express from 'express'
import { resizedImages } from '../../imgUtilities'
const app = express.Router()
app.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const img_height: number = parseInt(req.query?.height as string)
    const img_width: number = parseInt(req.query?.width as string)
    const img_file_name = req.query?.filename as string
    if (!img_file_name || !img_width || !img_height) {
      res
        .status(500)
        .send(
          'img_file_name, img_width and img_height are mandatory . Please hit the api again'
        )
    } else {
      const image_path: string = path.join(
        __dirname,
        '../../../public/oraginimages',
        `${img_file_name}.jpg`
      )
      if (!fs.existsSync(image_path)) {
        // If there is no such file
        res
          .status(404)
          .send(`${img_file_name} does not exist .check the file name`)
      } else {
        const resizedImage: string = path.join(
          __dirname,
          '../../../public/resizedimages',
          `${img_file_name}-${img_width}-${img_height}-thumb.jpg`
        )

        if (fs.existsSync(resizedImage)) {
          // Return resizedImage, If we already have resized image

          res.sendFile(resizedImage)
        } else {
          await resizedImages(img_file_name, img_width, img_height) // If there is no resized file for that Name.
          // Send  image to client.
          res.sendFile(
            path.join(
              __dirname,
              '../../../public/resizedimages',
              `${img_file_name}-${img_width}-${img_height}-thumb.jpg`
            )
          )
        }
      }
    }
  }
)
export default app
