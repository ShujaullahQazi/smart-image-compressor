import { useEffect } from 'react';

const ErrorNotification = ({ error, onClose }) => {
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // Auto-dismiss after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [error, onClose]);

    if (!error) return null;

    return (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
            <div className="bg-red-600 text-white rounded-lg shadow-2xl p-4 flex items-start gap-3">
                <div className="flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold mb-1">Error</h3>
                    <p className="text-sm opacity-90">{error}</p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-white hover:bg-red-700 rounded-full p-1 transition-colors"
                    aria-label="Close notification"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ErrorNotification;
