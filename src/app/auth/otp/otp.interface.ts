import { ExpiryHMSFormat } from "../../helper/expiry-hms.interface";

export interface Otp {
  cardNo: string;
  mobile: string;
  otpNo: string;
  expiryDateTime: string;
  expired: boolean;
  msg: string;
  expiryHMSFormat: ExpiryHMSFormat;
}
