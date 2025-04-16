import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { MachineSync } from "../../layouts/header/machine-sync";
import moment from "moment";
import { Print } from "./print.interface";
import * as QRCode from 'qrcode';

@Injectable({ providedIn: 'root' })
export class PrintService {
  public readonly machineDetails!: MachineSync;
  public qrCodeDataUrl: string = '';
  constructor(private readonly localStorage: LocalStorageService) {}

  public async printData(data: Print) {
    this.qrCodeDataUrl = await this.generateQRCode(data.purchaseTransId);

    const html = this.buildHtml(data);

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '0';
    iframe.style.top = '0';
    iframe.style.width = '80mm';
    iframe.style.height = '1000px';
    iframe.style.visibility = 'hidden';
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

  private generateQRCode(transId: number): Promise<string> {
    return QRCode.toDataURL(transId.toString());
  }

  private buildHtml(data: Print): string {
   const branchName = this.localStorage.get('branchName');
   const name = this.localStorage.get('name');
   const registrationNo = this.localStorage.get('registrationNo');
   const date = moment(data.approvedRejectedDateTime).format('YYYY-MM-DD');
   const time = moment(data.approvedRejectedDateTime).format('HH:mm:ss');
   const itemsHtml = data?.itemList && data.itemList.map(item => `
    <div class="flex-between flex-center mb-10 p-5">
      <div class="ar width-33">${item.qty}</div>
      <div class="ar text-center width-33">${item.itemUnit}</div>
      <div class="ar text-right width-33">${item.itemName}</div>
    </div>
  `).join('');

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
      ${data?.itemList ? `
        <div class="items-list mb-25 border">
          <div class="flex-between flex-center p-5 border-bottom">
            <div class="ar font-600 width-33">الكمية</div>
            <div class="ar text-center font-600 width-33">الوحدة</div>
            <div class="ar text-right font-600 width-33">الصنف</div>
          </div>
          ${itemsHtml}
        </div>
      ` : ''}
      <div class="flex-between mb-7 en font-600">
        <div>Purchase</div>
        <div class="ar">شراء</div>
      </div>
      ${data.cardNo ? `<div class="en mb-15">${this.maskNumber(data.cardNo)}</div>` : ''}
      <div class="en mb-7">${data.refund ? 'Refund' : 'Purchase'} Amount: ${data.purchaseAmount} SAR</div>
      <div class="mb-7 text-right">
        <span class="ar">المبلغ</span>
        <span class="en">${data.purchaseAmount}</span>
        <span class="ar">ريال</span>
      </div>
      <div class="ar text-center">${data.purchaseStatus === 'SUCCESS' ? 'مقبولة' : 'مرفوض'}</div>
      <div class="en text-center font-600 mb-10">${data.purchaseStatus === 'SUCCESS' ? 'Approved' : 'Rejected'}</div>
      ${data.message ? `
        <div class="ar mb-15 text-center">(${data.message.trim()})</div>
      ` : ''}
      ${data.purchaseTransId > 0 ? 
        `
          <div class="text-right">
            <span class="ar">رقم العملية</span>
            <span class="en"> ${data.purchaseTransId}</span>
          </div>
        `
      : ''}
      
    `;

    return `
      <html>
        <head>
          <meta name="viewport" content="width=80mm" />
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
            .print {
              width: 100%;
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
            .border {
              border: 1px solid #ddd;
            }
            .border-bottom {
              border-bottom: 1px solid #ddd;
            }
            .p-5 {
              padding: 5px;
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
            .mb-25 {
              margin-bottom: 25px;
            }
            .flex-between {
              display: flex;
              justify-content: space-between;
            }
            .flex-center {
              display: flex;
              align-items: center;
            }
            .font-600 {
              font-weight: 600;
            }
            .width-33 {
              width: 33%;
            }
            .qr-wrapper img {
              width: 120px;
              height: 120px;
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

