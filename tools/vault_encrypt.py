"""Encrypt a private app's content files for the in-app Vault (lib/vault.js).

Usage:  VAULT_CODE=12345678 python3 tools/vault_encrypt.py apps/<app> data/source.json [more.json ...]
Writes apps/<app>/data/vault.json (salt, iterations, a check value) once, and for each source
apps/<app>/data/<name>.enc.json. Sources are read from the given paths (keep them OUT of the repo).
AES-256-GCM, key = PBKDF2-SHA256(passcode, salt, 600000). The passcode is never written anywhere.
"""
import base64, json, os, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ITER = 600_000
b64 = lambda b: base64.b64encode(b).decode()

def key_for(code, salt, it):
    return PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=it).derive(code.encode())

def seal(key, data: bytes):
    iv = os.urandom(12)
    return {"iv": b64(iv), "ct": b64(AESGCM(key).encrypt(iv, data, None))}

def main():
    code = os.environ.get("VAULT_CODE", "")
    if len(code) < 4: sys.exit("set VAULT_CODE")
    app, sources = sys.argv[1], sys.argv[2:]
    mpath = os.path.join(app, "data", "vault.json")
    if os.path.exists(mpath):
        m = json.load(open(mpath)); key = key_for(code, base64.b64decode(m["salt"]), m["iter"])
        c = m["check"]; AESGCM(key).decrypt(base64.b64decode(c["iv"]), base64.b64decode(c["ct"]), None)  # raises if the code is wrong
    else:
        salt = os.urandom(16); key = key_for(code, salt, ITER)
        m = {"v": 1, "iter": ITER, "salt": b64(salt), "check": seal(key, b"ok")}
        json.dump(m, open(mpath, "w"))
    for src in sources:
        data = open(src, "rb").read(); json.loads(data)  # must be valid JSON
        name = os.path.basename(src).rsplit(".", 1)[0]
        out = os.path.join(app, "data", name + ".enc.json")
        json.dump(seal(key, data), open(out, "w")); print("sealed", out, len(data) // 1024, "KB")

if __name__ == "__main__":
    main()
