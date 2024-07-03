from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization, hashes
import base64
import os

def decode_base64(data):
    return base64.urlsafe_b64decode(data)

def decrypt_data(encoded_data):
        key_path = os.path.join(os.path.dirname(__file__), 'private.pem')
        with open(key_path, "rb") as key_file:
            private_key = serialization.load_pem_private_key(
                key_file.read(),
                password=None,
            )

        decoded_data = decode_base64(encoded_data)
        
        decrypted_data = private_key.decrypt(
            decoded_data,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return decrypted_data.decode('utf-8')