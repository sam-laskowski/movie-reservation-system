"use client";
import { CheckCircle } from "lucide-react";

export default function PurchaseComplete() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle
            className="text-green-500"
            size={120}
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Thank You for Your Purchase!
        </h1>

        <p className="text-gray-600 mb-8">
          Your reservation has been confirmed.
        </p>
      </div>
    </div>
  );
}
