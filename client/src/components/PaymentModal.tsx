type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function PaymentModal({ onClose, onSuccess }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Secure Checkout
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This is a simulated payment for demo purposes.
        </p>

        <div className="space-y-4">
          <input
            placeholder="Card Number"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <div className="flex gap-4">
            <input
              placeholder="MM/YY"
              className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
            <input
              placeholder="CVV"
              className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={onSuccess}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Pay ₹499
          </button>
          <button
            onClick={onClose}
            className="flex-1 border py-3 rounded-lg dark:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
