# 16 Kanal TV İzleme Platformu

Bu proje, 16 adede kadar farklı kamera veya TV kanalını aynı anda izleyebileceğiniz, modern ve kullanıcı dostu bir web uygulamasıdır. Uygulama; React (TypeScript), Node.js (Express, TypeScript) ve Python (Flask) teknolojileriyle geliştirilmiştir.

## Proje Klasör Yapısı
```
Video/
├── backend/            # Node.js + Express + TypeScript backend
│   └── ...
├── frontend/           # React + TypeScript frontend
│   └── ...
├── video-processor/    # (Opsiyonel) Python + Flask video işleme servisi
│   └── ...
├── LICENSE             # MIT Lisansı
├── README.md           # Proje dokümantasyonu
```

## Geliştiriciler için Kullanım ve Entegrasyon
Bu platformu, kendi projelerinizde (özellikle yapay zeka tabanlı projelerde veya farklı yazılım çözümlerinizde) kolayca kullanabilir, özelleştirebilir veya bir modül olarak entegre edebilirsiniz.

### Kullanım Senaryoları
- **Yapay Zeka Tabanlı Projeler:**
  - Canlı video akışlarını izleyip, AI tabanlı analiz (ör. görüntü işleme, nesne tanıma, hareket algılama) yapmak için kullanabilirsiniz.
  - `video-processor` servisini genişleterek Python tabanlı AI modellerinizi entegre edebilirsiniz.
- **Kendi Yazılım Çözümleriniz:**
  - Farklı kamera kaynaklarını merkezi bir panelde izlemek isteyen tüm uygulamalara kolayca entegre edilebilir.
  - Backend API'sini kullanarak kanal listesini başka bir sistemden dinamik olarak çekebilirsiniz.

### Entegrasyon Önerileri
- **Frontend Bileşeni Olarak Kullanım:**
  - `frontend/src/components/Camera.tsx` ve ana grid yapısını kendi React projenize kolayca dahil edebilirsiniz.
  - Kamera ekleme, silme ve tam ekran fonksiyonlarını kendi UI/UX akışınıza göre özelleştirebilirsiniz.
- **Backend API ile Entegrasyon:**
  - `backend` dizinindeki API uç noktalarını kendi sistemlerinizle entegre ederek kanal yönetimini merkezi hale getirebilirsiniz.
  - Kanal listesini başka bir veri kaynağından (ör. veritabanı, harici API) almak için backend'i kolayca genişletebilirsiniz.
- **AI/ML Servisleri ile Kullanım:**
  - `video-processor` servisini, OpenCV, TensorFlow, PyTorch gibi kütüphanelerle zenginleştirip, video akışları üzerinde gerçek zamanlı analizler yapabilirsiniz.
  - Örneğin, bir video akışında insan tespiti, yüz tanıma veya hareket analizi gibi işlemler için Flask API'ye yeni endpointler ekleyebilirsiniz.

### Örnek Entegrasyon Akışı
1. **Kendi React Projenize Dahil Etme:**
   - `Camera.tsx` bileşenini ve grid yapısını kendi projenize kopyalayın.
   - API adreslerini kendi backend'inize göre güncelleyin.
2. **AI Analiz için Kullanım:**
   - `video-processor/app.py` dosyasına yeni bir endpoint ekleyin:
     ```python
     @app.route('/api/analyze', methods=['POST'])
     def analyze_video():
         # Burada AI modelinizi çağırıp analiz yapabilirsiniz
         pass
     ```
   - Frontend veya backend'den bu endpoint'e video linki göndererek analiz sonuçlarını alabilirsiniz.
3. **Kendi Backend'inizle Entegrasyon:**
   - `backend/src/server.ts` dosyasındaki kamera yönetim API'larını kendi veri modelinize göre özelleştirin.

### Lisans ve Katkı
Bu projeyi MIT lisansı ile özgürce kullanabilir, değiştirebilir ve kendi projelerinize entegre edebilirsiniz. Katkılarınızı bekleriz!

## (Opsiyonel) Video İşleme Servisi Nedir?
`video-processor` klasöründe yer alan bu servis, Python ve Flask ile yazılmıştır ve **ana uygulamanın çalışması için zorunlu değildir**. Bu servis, video linklerinin doğruluğunu kontrol etmek, canlı olup olmadığını test etmek veya ileride gelişmiş video/görüntü işleme işlemleri yapmak için altyapı sağlar.

- Şu an temel bir Flask API olarak örnek kod içerir.
- İsterseniz video linklerinin çalışıp çalışmadığını kontrol etmek veya başka analizler yapmak için geliştirebilirsiniz.
- Frontend veya backend, bu servise HTTP üzerinden istek atarak video linklerini kontrol edebilir.
- Ana uygulamanız bu servis olmadan da tam çalışır.

Kullanmak için:
```bash
cd video-processor
python app.py
```

## Özellikler
- **16 Kanal Desteği:** Aynı anda 16 farklı canlı yayın veya kamera görüntüsü izleyebilirsiniz.
- **Kamera/Kanal Listesi:** Sol panelde eklediğiniz tüm kanallar listelenir.
- **Kanal Ekleme:** Manuel olarak veya CSV dosyası yükleyerek toplu kanal ekleme.
- **CSV Desteği:** CSV dosyasında ilk sütunda kanal adı, ikinci sütunda ise kanal linki (YouTube embed veya doğrudan link) olmalıdır. Noktalı virgül, virgül veya tab ayraçlı dosyalar desteklenir.
- **Kanal Silme:** Her bir kanalı tek tıkla kaldırabilirsiniz.
- **Tam Ekran:** Herhangi bir yayına tıklayarak tam ekran izleyebilirsiniz. ESC ile çıkış yapabilirsiniz.
- **Modern ve Responsive Tasarım:** Tüm cihazlarda şık ve kullanışlı arayüz.

## Kurulum
### 1. Depoyu Klonlayın
```bash
git clone https://github.com/Tuaghmohammad/Video-Channels
cd Video
```

### 2. Frontend Kurulumu (React + TypeScript)
```bash
cd frontend
npm install
```

### 3. Backend Kurulumu (Node.js + Express + TypeScript)
```bash
cd ../backend
npm install
```

### 4. Video İşleme Servisi (Python, opsiyonel)
```bash
cd ../video-processor
pip install -r requirements.txt
```

## Çalıştırma
Her servisi ayrı terminalde başlatın:

### 1. Backend
```bash
cd backend
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm start
```

### 3. (Opsiyonel) Video İşleme Servisi
```bash
cd video-processor
python app.py
```

## Kullanım
1. **Kanal Ekleme:**
   - Sol paneldeki input alanına YouTube embed linki veya doğrudan video linki girin, isterseniz kanal adı ekleyin ve "Kanal Ekle" butonuna tıklayın.
2. **CSV ile Toplu Ekleme:**
   - Sol paneldeki "CSV Dosyası Yükle" alanına tıklayın ve aşağıdaki formatta bir dosya seçin:

```
Kanal Adı;https://www.youtube.com/embed/xxxxxxx
Kanal 2;https://www.youtube.com/embed/yyyyyyy
```
   - Dosya ayraçları olarak noktalı virgül, virgül veya tab kullanılabilir.
3. **Kanal Listesi:**
   - Eklediğiniz kanallar sol panelde listelenir.
4. **Kanal Silme:**
   - Her bir yayının sağ üst köşesindeki çarpı (×) ikonuna tıklayarak kaldırabilirsiniz.
5. **Tam Ekran:**
   - Herhangi bir yayına tıklayarak tam ekran izleyebilirsiniz. ESC ile çıkış yapabilirsiniz.

## Örnek CSV
```
TV1;https://www.youtube.com/embed/n9f3mzUZzW0
TV2;https://www.youtube.com/embed/7HpElSUCQWc
TV3;https://www.youtube.com/embed/fot8_pXYqGQ
```

## Notlar
- Maksimum 16 kanal eklenebilir.
- YouTube linkleri otomatik olarak embed formatına dönüştürülür.
- Farklı platformlardan alınan embed linkleri de desteklenir.

## Geliştirici Bilgisi
- Frontend: React, TypeScript, styled-components
- Backend: Node.js, Express, TypeScript
- Video Servisi: Python, Flask (isteğe bağlı)

## Katkı ve Lisans
Katkıda bulunmak için lütfen bir pull request gönderin.

**Lisans:**

Bu proje [MIT Lisansı](./LICENSE) ile lisanslanmıştır.

---
Her türlü soru ve destek için iletişime geçebilirsiniz. 