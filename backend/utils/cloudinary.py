import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from configs import CLOUDNAMECLOUDINARY, APIKEYCLOUDINARY, APISECRETCLOUDINARY
# Configuration       
cloudinary.config( 
    cloud_name = CLOUDNAMECLOUDINARY,
    api_key = APIKEYCLOUDINARY, 
    api_secret = APISECRETCLOUDINARY,
    secure=True
)

# Fungsi untuk upload file audio ke Cloudinary
def upload_audio_to_cloudinary(audio_path):
    try:
        # Meng-upload audio ke Cloudinary
        response = cloudinary.uploader.upload(audio_path, resource_type='video')  # Audio dianggap sebagai video
        print("Upload berhasil!")
        print(f"URL Audio: {response['url']}")  # Menampilkan URL audio yang diupload
        return response['url']  # Mengembalikan URL file audio yang diupload
    except Exception as e:
        print(f"Error saat meng-upload audio ke Cloudinary: {e}")
        return None