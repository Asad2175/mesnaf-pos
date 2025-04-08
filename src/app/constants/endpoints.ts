export const END_POINTS = {
    LoginAuth: 'Basic bWVzbmFmX2ZlX2NsaWVudDptZXNuYWY=',
    login: '/oauth/token',
    logout: '/oauth/logout',
    generateOtp: '/api/v1/branches/sms/web/otp',
    verifyOtp: '/api/v1/branches/sms/validate',
    machineSync: '/api/v1/branches/pos-machine/merchant-info',
    accessCode: '/api/v1/purchases/do-purchase',
    verifyCoupen: (coupen: string) => {
        return `/api/v1/feed/consume/step1/${coupen}`
    },
    coupen: '/api/v1/feed/consume/final-step',
    updateInvoice: '/api/v1/purchases/invoice/update',
    refundStepOne: '/api/v1/refund/step/one',
    refundStepTwo: '/api/v1/refund/step/final',
    transactions: '/api/v1/purchases/pos-machine/report/latest-transaction',
    monthlyReport: (startDate: string, endDate: string) => {
        return `/api/v1/purchases/pos-machine/report/mini-report?frmDate=${startDate}&toDate=${endDate}`
    }
};