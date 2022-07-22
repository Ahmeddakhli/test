
*** install
- Install [Node.js](https://nodejs.org/en/)

  on your local
- Clone the repository  "git clone https://github.com/Ahmeddakhli/test.git "
- run  "npm install "
- Run  "npm run start "
- go to `http://localhost:3000/api` to check express server is working or not. 

test cases
- Run  "npm run test "

Build project
- Run  "npm run build "

Prettier and lint
- Run  "npm run format " 

- Run  "npm run lint "

 To test the application
- Add few images (in .jpg format) under `public/oraginimages`
- Start the application
- Hit the `localhost:3000/api/image_api?filename=fjord&width=200&height=200` URL from your browser. Here `filename`, `width` and `height` are mandatory query parameters
- You can see that resized images under `public/resizedimages`.
- If you pass the same image name with same width and height, server will serve the images from `public/resizedimages` instead of resizing the images every time.
