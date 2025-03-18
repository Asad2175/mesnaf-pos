import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { MachineSync } from "../../layouts/header/machine-sync";
import moment from "moment";
import { Print } from "./print.interface";
import * as QRCode from 'qrcode';
import * as qz from 'qz-tray';

// declare const qz: any;


@Injectable({ providedIn: 'root' })
export class PrintNewService {
  public readonly machineDetails!: MachineSync;
  public qrCodeDataUrl: string = '';

  constructor(private readonly localStorage: LocalStorageService) {}

  public async printData(data: Print, useSilentPrint: boolean = true) {
    console.log('Not');
    if (useSilentPrint) {
      await this.printSilently(data);
    } else {
      await this.printViaIframe(data);
    }
  }

  private async printViaIframe(data: Print) {
    this.qrCodeDataUrl = await this.generateQRCode(data.purchaseTransId);
    const html = this.buildHtml(data);
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => document.body.removeChild(iframe), 1000);
      }, 100);
    }
  }

  private async printSilently(data: Print) {
    try {
      if (!qz.websocket.isActive()) {
        await qz.websocket.connect();
      }

      const printers = await qz.printers.find();

      console.log('printers', printers);

      if (!printers || !printers.length) {
        console.error('❌ No printers found. Please check printer connection.');
        return;
      }
  
      const printer = this.localStorage.get('printerName') || 'POS-80';
      const config = qz.configs.create(printer);
  
      const receiptText = await this.buildEscPosReceipt(data);
      const dataToPrint = [{ type: 'raw', data: receiptText }] as qz.PrintData[];
  
      await qz.print(config, dataToPrint);
      console.log('Silent print sent to printer');
    } catch (err) {
      console.error('Silent printing error:', err);
    }
  }

  private async buildEscPosReceipt(data: Print): Promise<string> {
    const branchName = this.localStorage.get('branchName');
    const name = this.localStorage.get('name');
    const registrationNo = this.localStorage.get('registrationNo');
    const date = moment(data.approvedRejectedDateTime).format('YYYY-MM-DD');
    const time = moment(data.approvedRejectedDateTime).format('HH:mm:ss');
    const qr = await this.generateQRCode(data.purchaseTransId); // Optional QR printing

    let receipt = '';
    receipt += '\x1B\x40';
    receipt += '\x1B\x61\x01';
    receipt += `${name}\n`;
    receipt += `${registrationNo}\n`;
    receipt += `${branchName}\n\n`;
    receipt += '\x1B\x61\x00';
    receipt += `Date: ${date}   Time: ${time}\n`;

    receipt += `--------------------------------\n`;
    receipt += `Purchase:               شراء\n`;
    if (data.cardNo) {
      receipt += `Card: ${this.maskNumber(data.cardNo)}\n`;
    }
    receipt += `Amount: ${data.purchaseAmount} SAR\n`;
    receipt += `المبلغ: ${data.purchaseAmount} ريال\n`;
    receipt += `--------------------------------\n`;

    receipt += `Status: ${data.purchaseStatus === 'SUCCESS' ? 'Approved (مقبولة)' : 'Rejected (مرفوض)'}\n`;
    if (data.charityName) {
      receipt += `Charity: ${data.charityName} (${data.charityNumber})\n`;
    }
    if (data.purchaseTransId > 0) {
      receipt += `Transaction ID: ${data.purchaseTransId}\n`;
    }

    receipt += `\n\n`;
    receipt += '\x1D\x56\x41'; // Full cut
    return receipt;
  }

  private generateQRCode(transId: number): Promise<string> {
    return QRCode.toDataURL(transId.toString());
  }

  private buildHtml(data: Print): string {
    // Your current HTML template (same as before)
    const branchName = this.localStorage.get('branchName');
    const name = this.localStorage.get('name');
    const registrationNo = this.localStorage.get('registrationNo');
    const date = moment(data.approvedRejectedDateTime).format('YYYY-MM-DD');
    const time = moment(data.approvedRejectedDateTime).format('HH:mm:ss');

    const content = `
      <div class="name ar text-center mb-7">${name}</div>
      <div class="registrationNo en text-center mb-7 font-600">${registrationNo}</div>
      <div class="branchName en text-center mb-12 font-600">${branchName}</div>
      <div class="flex-between mb-15 en">
        <div>${date}</div>
        <div>${time}</div>
      </div>
      <div class="ar text-center">مـسـنـاف</div>
      <div class="ar text-center font-600">mesnaf</div>
      ${(data.purchaseStatus === 'SUCCESS' && data.charityName) ? `<div class="ar text-center mb-7">${data.charityName} (${data.charityNumber})</div>` : ''}
      <div class="qr-wrapper text-center mb-15">
        <img src="${this.qrCodeDataUrl}" alt="QR Code" />
      </div>
      <div class="flex-between mb-7 en font-600">
        <div>Purchase</div>
        <div>شراء</div>
      </div>
      ${data.cardNo ? `<div class="en mb-15">${this.maskNumber(data.cardNo)}</div>` : ''}
      <div class="en mb-7">Purchase Amount: ${data.purchaseAmount} SAR</div>
      <div class="mb-7 text-right">
        <span class="ar">المبلغ</span>
        <span class="en">${data.purchaseAmount}</span>
        <span class="ar">ريال</span>
      </div>
      <div class="ar text-center">${data.purchaseStatus === 'SUCCESS' ? 'مقبولة' : 'مرفوض'}</div>
      <div class="en text-center font-600 mb-15">${data.purchaseStatus === 'SUCCESS' ? 'Approved' : 'Rejected'}</div>
      ${data.purchaseTransId > 0 ? 
        `<div class="text-right">
          <span class="en">${data.purchaseTransId}</span>
          <span class="ar">رقم العملية</span>
        </div>` : ''}
    `;

    return `
      <html>
        <head>
          <style>
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              body {
                font-size: 16px;
                width: 80mm;
                margin: 0;
                padding: 10px;
              }
            }
            @font-face {
              font-family: 'Droid Arabic Kufi';
              src: url('/assets/fonts/DroidKufi-Regular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'Axiforma';
              src: url('/assets/fonts/Axiforma-Regular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
            .ar {
              font-family: 'Droid Arabic Kufi', sans-serif !important;
            }
            .en {
              font-family: 'Axiforma', sans-serif !important;
            }
            .text-center {
              text-align: center;
            }
            .text-right {
              text-align: right;
            }
            .mb-7 {
              margin-bottom: 7px;
            }
            .mb-12 {
              margin-bottom: 12px;
            }
            .mb-15 {
              margin-bottom: 15px;
            }
            .flex-between {
              display: flex;
              justify-content: space-between;
            }
            .font-600 {
              font-weight: 600;
            }
            .qr-wrapper img {
              width: 200px;
              height: 200px;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
  }

  private maskNumber(number: string | undefined): string | undefined {
    const numStr = number?.toString();
    return numStr?.slice(-4).padStart(numStr.length, '*');
  }
}
