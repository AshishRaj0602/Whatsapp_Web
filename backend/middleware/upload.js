const multer =require('multer');
const  { GridFsStorage } = require('multer-gridfs-storage');

const dotenv = require('dotenv');

dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
const url=process.env.URI;

const storage = new GridFsStorage({
    url: `${url}`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

 module.exports= multer({storage}); 

