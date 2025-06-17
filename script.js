document.addEventListener('DOMContentLoaded', () => {
    const cameraUrlInput = document.getElementById('cameraUrl');
    const addCameraButton = document.getElementById('addCamera');
    const cameraList = document.getElementById('cameraList');
    const gridContainer = document.getElementById('gridContainer');
    
    let cameras = [];
    const MAX_CAMERAS = 16;

    // Kamera ekleme fonksiyonu
    function addCamera(url) {
        if (cameras.length >= MAX_CAMERAS) {
            alert('Maksimum 16 kamera ekleyebilirsiniz!');
            return;
        }

        if (!url) {
            alert('Lütfen geçerli bir URL girin!');
            return;
        }

        // URL'yi embed formatına çevir
        let embedUrl = url;
        if (url.includes('youtube.com/watch')) {
            const videoId = url.split('v=')[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        cameras.push(embedUrl);
        updateCameraList();
        updateGrid();
        cameraUrlInput.value = '';
    }

    // Kamera listesini güncelleme
    function updateCameraList() {
        cameraList.innerHTML = '';
        cameras.forEach((url, index) => {
            const li = document.createElement('li');
            li.textContent = `Kamera ${index + 1}`;
            li.onclick = () => toggleCamera(index);
            cameraList.appendChild(li);
        });
    }

    // Grid görünümünü güncelleme
    function updateGrid() {
        gridContainer.innerHTML = '';
        cameras.forEach((url, index) => {
            const cameraItem = document.createElement('div');
            cameraItem.className = 'camera-item';
            cameraItem.innerHTML = `
                <iframe src="${url}" allowfullscreen></iframe>
                <button class="remove-btn" onclick="removeCamera(${index})">×</button>
            `;
            cameraItem.onclick = () => toggleFullscreen(cameraItem);
            gridContainer.appendChild(cameraItem);
        });
    }

    // Kamera kaldırma fonksiyonu
    window.removeCamera = (index) => {
        event.stopPropagation();
        cameras.splice(index, 1);
        updateCameraList();
        updateGrid();
    };

    // Tam ekran modu
    function toggleFullscreen(element) {
        element.classList.toggle('fullscreen');
    }

    // ESC tuşu ile tam ekrandan çıkma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.camera-item.fullscreen').forEach(item => {
                item.classList.remove('fullscreen');
            });
        }
    });

    // Kamera ekleme butonu event listener
    addCameraButton.addEventListener('click', () => {
        addCamera(cameraUrlInput.value);
    });

    // Enter tuşu ile kamera ekleme
    cameraUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCamera(cameraUrlInput.value);
        }
    });
}); 