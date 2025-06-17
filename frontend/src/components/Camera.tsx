import React, { useState } from 'react';
import styled from 'styled-components';

interface CameraProps {
  url: string;
  name: string;
  onRemove: () => void;
}

const CameraContainer = styled.div<{ isFullscreen: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.isFullscreen && `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    border-radius: 0;
  `}

  &:hover {
    transform: scale(1.02);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: none;
  z-index: 2;

  ${CameraContainer}:hover & {
    display: block;
  }
`;

const CameraName = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 2;
`;

const Camera: React.FC<CameraProps> = ({ url, name, onRemove }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isFullscreen) {
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  return (
    <CameraContainer isFullscreen={isFullscreen} onClick={toggleFullscreen}>
      <iframe
        src={url}
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
      <CameraName>{name}</CameraName>
      <RemoveButton onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}>
        ×
      </RemoveButton>
    </CameraContainer>
  );
};

export default Camera; 