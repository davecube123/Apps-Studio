"""Decrypt a private app's sealed content for editing OUTSIDE the repo.

Usage:  VAULT_CODE=12345678 python3 tools/vault_decrypt.py apps/<app> data/<name>.enc.json /path/outside/repo/<name>.json
"""
import base64, json, os, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

def main():
    code = os.environ.get("VAULT_CODE", "")
    app, enc, out = sys.argv[1], sys.argv[2], sys.argv[3]
    if os.path.abspath(out).startswith(os.path.abspath(".")): sys.exit("write the plain file outside the repository")
    m = json.load(open(os.path.join(app, "data", "vault.json")))
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=base64.b64decode(m["salt"]), iterations=m["iter"]).derive(code.encode())
    b = json.load(open(os.path.join(app, enc)))
    data = AESGCM(key).decrypt(base64.b64decode(b["iv"]), base64.b64decode(b["ct"]), None)
    os.makedirs(os.path.dirname(out), exist_ok=True); open(out, "wb").write(data); print("opened", out, len(data) // 1024, "KB")

if __name__ == "__main__":
    main()
