import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Camera from './components/Camera';
import axios from 'axios';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  color: #1a73e8;
  margin-bottom: 20px;
`;

const AddCameraForm = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1557b0;
  }
`;

const CameraList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CameraListItem = styled.li`
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e8f0fe;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const FileUploadContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  border: 2px dashed #1a73e8;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e8f0fe;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadText = styled.p`
  color: #1a73e8;
  margin: 0;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  margin-top: 10px;
  font-size: 14px;
`;

interface CameraData {
  id: string;
  url: string;
  name: string;
}

const App: React.FC = () => {
  const [cameras, setCameras] = useState<CameraData[]>([]);
  const [newCameraUrl, setNewCameraUrl] = useState('');
  const [newCameraName, setNewCameraName] = useState('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const newCameras: CameraData[] = [];

        lines.forEach((line, index) => {
          if (!line.trim()) return;
          const [name, url] = line.split(/[;,	]/).map(item => item.trim());
          if (!name || !url) {
            setError(`Satır ${index + 1}: Geçersiz format. Kamera adı ve URL gerekli.`);
            return;
          }

          let embedUrl = url;
          if (url.includes('youtube.com/watch')) {
            const videoId = url.split('v=')[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          }

          newCameras.push({
            id: Date.now().toString() + index,
            name,
            url: embedUrl
          });
        });

        if (newCameras.length > 0) {
          setCameras(prevCameras => {
            const updatedCameras = [...prevCameras, ...newCameras];
            if (updatedCameras.length > 16) {
              setError('Maksimum 16 kamera eklenebilir. Bazı kameralar eklenmedi.');
              return updatedCameras.slice(0, 16);
            }
            return updatedCameras;
          });
          setError('');
        }
      } catch (err) {
        setError('CSV dosyası okunurken bir hata oluştu.');
      }
    };

    reader.readAsText(file);
  };

  const addCamera = () => {
    if (cameras.length >= 16) {
      setError('Maksimum 16 kamera ekleyebilirsiniz!');
      return;
    }

    if (!newCameraUrl) {
      setError('Lütfen geçerli bir URL girin!');
      return;
    }

    let embedUrl = newCameraUrl;
    if (newCameraUrl.includes('youtube.com/watch')) {
      const videoId = newCameraUrl.split('v=')[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    const newCamera: CameraData = {
      id: Date.now().toString(),
      url: embedUrl,
      name: newCameraName || `Kamera ${cameras.length + 1}`
    };

    setCameras([...cameras, newCamera]);
    setNewCameraUrl('');
    setNewCameraName('');
    setError('');
  };

  const removeCamera = (id: string) => {
    setCameras(cameras.filter(camera => camera.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCamera();
    }
  };

  return (
    <AppContainer>
      <Sidebar>
        <Title>Kamera Listesi</Title>
        <FileUploadContainer onClick={() => fileInputRef.current?.click()}>
          <FileInput
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
          <UploadText>CSV Dosyası Yükle</UploadText>
          <UploadText style={{ fontSize: '12px', color: '#666' }}>
            Format: Kamera Adı, URL
          </UploadText>
        </FileUploadContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <AddCameraForm>
          <Input
            type="text"
            placeholder="Kamera URL'sini girin"
            value={newCameraUrl}
            onChange={(e) => setNewCameraUrl(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Input
            type="text"
            placeholder="Kamera adını girin (opsiyonel)"
            value={newCameraName}
            onChange={(e) => setNewCameraName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={addCamera}>Kanal Ekle</Button>
        </AddCameraForm>
        <CameraList>
          {cameras.map(camera => (
            <CameraListItem key={camera.id}>
              {camera.name}
            </CameraListItem>
          ))}
        </CameraList>
      </Sidebar>
      <MainContent>
        <GridContainer>
          {cameras.map(camera => (
            <Camera
              key={camera.id}
              url={camera.url}
              name={camera.name}
              onRemove={() => removeCamera(camera.id)}
            />
          ))}
        </GridContainer>
      </MainContent>
    </AppContainer>
  );
};

export default App;
