import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Kamera listesi için örnek veri
let cameras: { id: string; url: string; name: string }[] = [];

// Tüm kameraları getir
app.get('/api/cameras', (req: Request, res: Response) => {
  res.json(cameras);
});

// Yeni kamera ekle
app.post('/api/cameras', (req: Request, res: Response) => {
  const { url, name } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL gerekli' });
  }

  if (cameras.length >= 16) {
    return res.status(400).json({ error: 'Maksimum 16 kamera eklenebilir' });
  }

  let embedUrl = url;
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  const newCamera = {
    id: Date.now().toString(),
    url: embedUrl,
    name: name || `Kamera ${cameras.length + 1}`
  };

  cameras.push(newCamera);
  res.status(201).json(newCamera);
});

// Kamera sil
app.delete('/api/cameras/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  cameras = cameras.filter(camera => camera.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 