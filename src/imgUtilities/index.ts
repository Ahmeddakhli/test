import sharp from 'sharp';
import path from 'path';
export const resizedImages = 
async (img_file_name: string,img_width: number,img_height: number): Promise<void> => {
  await 
  sharp( path.join(__dirname, '../../public/oraginimages', `${img_file_name}.jpg`))
    .resize(img_width, img_height)
    .toFile(path.join(__dirname, '../../public/resizedimages',`${img_file_name}-${img_width}-${img_height}-thumb.jpg` ));
};