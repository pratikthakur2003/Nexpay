from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization, hashes
import base64
import os

def encode_base64(data):
    return base64.urlsafe_b64encode(data).decode('utf-8')

# TODO: carefully adjust the key_path later

def encrypt_data(data):
        key_path = os.path.join(os.path.dirname(__file__), 'public.pem')
        print(key_path)
        with open(key_path, 'rb') as key_file:
            public_key = serialization.load_pem_public_key(key_file.read())

        encrypted_data = public_key.encrypt(
            data.encode('utf-8'),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        encoded_data = encode_base64(encrypted_data)
        return encoded_data     
