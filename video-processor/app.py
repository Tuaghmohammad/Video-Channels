from flask import Flask, request, jsonify
import cv2
import numpy as np
import requests
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

def process_video_stream(url):
    try:
        # Video stream'i aç
        cap = cv2.VideoCapture(url)
        
        if not cap.isOpened():
            return False, "Video stream açılamadı"
        
        # İlk frame'i al
        ret, frame = cap.read()
        
        if not ret:
            return False, "Frame okunamadı"
        
        # Stream'i kapat
        cap.release()
        
        return True, "Video stream başarılı"
    except Exception as e:
        return False, str(e)

@app.route('/api/check-stream', methods=['POST'])
def check_stream():
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({'error': 'URL gerekli'}), 400
    
    url = data['url']
    success, message = process_video_stream(url)
    
    return jsonify({
        'success': success,
        'message': message
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 