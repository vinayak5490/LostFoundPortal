import multer from 'multer'
import{ CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'lostFound',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        //ask cloudinary to auto-format, auto-quality and limit sizes to speed uploads & reduce bytes
        transformation: [
            {width: 1280, height: 1280, crop: 'limit', fetch_format: 'auto', quality: 'auto'}
        ]
    },
});

//add a server-side file size limit to reject huge upload early
const upload = multer({
    storage,
    limits: {fileSize: 2 * 1024 * 1024}
})

// const upload = multer({storage});

export default upload;