import { useEffect } from "react";

interface Notification {
  text: string;
  time: string;
  type: string;
  actions: string[];
  details?: {
    tenant?: string;
    unit?: string;
    property?: string;
    amount?: string;
    daysOverdue?: number;
    issueType?: string;
    description?: string;
  };
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notification: Notification | null;
}

const typeColor: Record<string, string> = {
  rent: "bg-red-100 text-red-700",
  maintenance: "bg-blue-100 text-blue-700",
  lease: "bg-gray-800 text-white",
  system: "bg-gray-200 text-gray-700",
};

const ViewNotificationModal = ({ open, onOpenChange, notification }: Props) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onOpenChange]);

  // If no notification, don't render the modal content
  if (!notification) return null;

  const d = notification.details;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => onOpenChange(false)}
        />
      )}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-transform ${
          open ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={() => onOpenChange(false)}
          >
            ✕
          </button>

          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              Notification Details
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${typeColor[notification.type]}`}
              >
                {notification.type}
              </span>
            </h2>
            <p className="text-sm text-gray-500">Review notification information</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400">Message</p>
              <p className="text-sm font-medium mt-1">{notification.text}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Time</p>
                <p className="text-sm font-medium">{notification.time}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Type</p>
                <p className="text-sm font-medium capitalize">{notification.type}</p>
              </div>
              {d?.tenant && (
                <div>
                  <p className="text-xs text-gray-400">Tenant</p>
                  <p className="text-sm font-medium">{d.tenant}</p>
                </div>
              )}
              {d?.unit && (
                <div>
                  <p className="text-xs text-gray-400">Unit</p>
                  <p className="text-sm font-medium">{d.unit}</p>
                </div>
              )}
              {d?.property && (
                <div>
                  <p className="text-xs text-gray-400">Property</p>
                  <p className="text-sm font-medium">{d.property}</p>
                </div>
              )}
              {d?.amount && (
                <div>
                  <p className="text-xs text-gray-400">Amount</p>
                  <p className="text-sm font-medium">{d.amount}</p>
                </div>
              )}
              {d?.daysOverdue !== undefined && (
                <div>
                  <p className="text-xs text-gray-400">Days Overdue</p>
                  <p className="text-sm font-medium text-red-600">{d.daysOverdue} days</p>
                </div>
              )}
              {d?.issueType && (
                <div>
                  <p className="text-xs text-gray-400">Issue Type</p>
                  <p className="text-sm font-medium">{d.issueType}</p>
                </div>
              )}
            </div>

            {d?.description && (
              <div>
                <p className="text-xs text-gray-400">Description</p>
                <p className="text-sm mt-1">{d.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNotificationModal;