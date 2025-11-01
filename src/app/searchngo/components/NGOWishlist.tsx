import React from "react";
import { Package, AlertCircle, Clock } from "lucide-react";

interface WishlistItem {
  item: string;
  fulfilled: boolean;
  urgency: "low" | "medium" | "high";
  itemId: string;
  quantity: string;
}

interface NGOWishlistProps {
  wishlist: WishlistItem[];
}

const NGOWishlist: React.FC<NGOWishlistProps> = ({ wishlist }) => {
  if (!wishlist || wishlist.length === 0) {
    return null;
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <AlertCircle size={16} className="text-red-600" />;
      case "medium":
        return <Clock size={16} className="text-orange-600" />;
      case "low":
        return <Package size={16} className="text-green-600" />;
      default:
        return <Package size={16} className="text-gray-600" />;
    }
  };

  const pendingItems = wishlist.filter((item) => !item.fulfilled);

  // Don't render if no pending items
  if (pendingItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center">
          <Package className="text-[var(--primary-color)]" size={22} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[var(--text-dark)]">
            Current Needs
          </h3>
          <p className="text-sm text-gray-600">
            Items this organization is seeking
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
          Urgent Needs ({pendingItems.length})
        </h4>
        {pendingItems.map((item) => (
          <div
            key={item.itemId}
            className="group relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-[var(--primary-color)]/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-semibold text-gray-900 capitalize">
                    {item.item}
                  </h5>
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getUrgencyColor(
                      item.urgency
                    )}`}
                  >
                    {getUrgencyIcon(item.urgency)}
                    <span className="capitalize">{item.urgency}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
              </div>
            </div>

            {/* <div className="mt-3 pt-3 border-t border-gray-100">
              <button className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                Help with this item
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGOWishlist;
