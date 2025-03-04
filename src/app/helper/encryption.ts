import * as CryptoJS from 'crypto-js';

export class Encryption {
    public static getEncryptionCode(item: string): string {
        const keyBase64 = "o9szYIOq1rRMiouNhNvaq96lqUvCekxR";
        const key = CryptoJS.enc.Base64.parse(keyBase64);
        const srcs = CryptoJS.enc.Utf8.parse(item);  
        const encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.toString();
    }
}