import express from 'express'; //iimport express 
import imageProcessingApi from './imgApi/imageProcessingApi'; //iimport Api
const routes =express.Router();//express.Router
routes.use('/image_api',imageProcessingApi); // main routes
routes.get('/', (req: express.Request, res: express.Response): void => {
    res.send('test image apis projects');
  }); // test
  export default routes; // export routes 


