import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { MachineSync } from "../../layouts/header/machine-sync";
import moment from "moment";
import { Print } from "./print.interface";

@Injectable({ providedIn: 'root' })
export class PrintService {
  public readonly machineDetails!: MachineSync;
  constructor(private readonly localStorage: LocalStorageService) {}

  printData(data: Print) {
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

  private buildHtml(data: Print): string {
    console.log('data', data);
   const branchName = this.localStorage.get('branchName');
   const name = this.localStorage.get('name');
   const registrationNo = this.localStorage.get('registrationNo');
   const currentDate = moment().format('YYYY-MM-DD');
   const currentTime = moment().format('HH:mm:ss');

   const content = `
      <div class="name ar text-center mb-7">${name}</div>
      <div class="registrationNo en text-center mb-7 font-600">${registrationNo}</div>
      <div class="branchName en text-center mb-12 font-600">${branchName}</div>
      <div class="flex-between mb-15 en">
        <div>${currentDate}</div>
        <div>${currentTime}</div>
      </div>
      <div class="ar text-center">مـسـنـاف</div>
      <div class="ar text-center font-600">mesnaf</div>
      <div class="ar text-center mb-15">شركة مسناف للتسوق (8008)</div>
      <div class="flex-between mb-7 en font-600">
        <div>Purchase</div>
        <div>شراء</div>
      </div>
      <div class="en mb-15">${this.maskNumber(data.cardNo)}</div>
      <div class="en mb-7">Purchase Amount: ${data.purchaseAmount} SAR</div>
      <div class="mb-7 text-right">
        <span class="ar">المبلغ</span>
        <span class="en">${data.purchaseAmount}</span>
        <span class="ar">ريال</span>
      </div>
      <div class="ar text-center">${data.purchaseStatus === 'SUCCESS' ? 'مقبولة' : 'مرفوض'}</div>
      <div class="en text-center font-600 mb-15">${data.purchaseStatus === 'SUCCESS' ? 'Approved' : 'Rejected'}</div>
      <div class="text-right">
        <span class="en">${data.purchaseTransId}</span>
        <span class="ar">رقم العملية</span>
      </div>
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
                border: 1px solid black;
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

