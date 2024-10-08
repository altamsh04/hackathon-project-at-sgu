import { Router } from 'express';
import ImageKit from 'imagekit';
import multer, { memoryStorage } from 'multer';

const imagekit = new ImageKit({
  publicKey: 'PUBLIC_KEY',
  privateKey: 'PRIVATE_KEY',
  urlEndpoint: 'URL_END_POINT',
});

const storage = memoryStorage();
const upload = multer({ storage });
const router = Router();

const uploadImages = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    res.json({ message: 'Image uploaded successfully', url: result.url });

  } catch (error) {
    console.error('Error uploading image:', error);

    res.status(500).json({
      message: 'Failed to upload image',
      error: error.message || 'Unknown error occurred'
    });
  }
};

router.post('/upload', upload.single('image'), uploadImages);

export default router;
