interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler?: (response: SuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export interface SuccessResponse {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

interface ErrorResponse {
  code: number;
  description: string;
  error: {
    field?: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      payment_id?: string;
      order_id: string;
    };
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.success" | "payment.error" | "wallet.close",
    callback: (response: SuccessResponse | ErrorResponse) => void
  ) => void;
}

// razorpay.d.ts
export {};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
