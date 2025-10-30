"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { Plus, Package, AlertCircle } from "lucide-react";
import WishlistItem from "./WishlistItem";
import AddWishlistItemModal from "./AddWishlistItemModal";
import EmptyWishlistState from "./EmptyWishlistState";
import { WishlistItem as WishlistItemType } from "@/types/ngo";

interface WishlistSectionProps {
  orgId: string;
}

export default function WishlistSection({ orgId }: WishlistSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: wishlistItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist", orgId],
    queryFn: async () => {
      const orgRef = doc(db, "organizations", orgId);
      const orgSnap = await getDoc(orgRef);
      return orgSnap.exists() ? orgSnap.data().wishlist || [] : [];
    },
    enabled: !!orgId,
  });

  const addItemMutation = useMutation({
    mutationFn: async (newItem: Omit<WishlistItemType, "itemId">) => {
      const itemWithId = {
        ...newItem,
        itemId: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      const orgRef = doc(db, "organizations", orgId);
      await updateDoc(orgRef, {
        wishlist: arrayUnion(itemWithId),
        updatedAt: Timestamp.now(),
      });

      return itemWithId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", orgId] });
      setIsModalOpen(false);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({
      itemId,
      updates,
    }: {
      itemId: string;
      updates: Partial<WishlistItemType>;
    }) => {
      const updatedWishlist = wishlistItems.map((item: WishlistItemType) =>
        item.itemId === itemId ? { ...item, ...updates } : item
      );

      const orgRef = doc(db, "organizations", orgId);
      await updateDoc(orgRef, {
        wishlist: updatedWishlist,
        updatedAt: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", orgId] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const updatedWishlist = wishlistItems.filter(
        (item: WishlistItemType) => item.itemId !== itemId
      );

      const orgRef = doc(db, "organizations", orgId);
      await updateDoc(orgRef, {
        wishlist: updatedWishlist,
        updatedAt: Timestamp.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", orgId] });
    },
  });

  const activeItems = wishlistItems.filter(
    (item: WishlistItemType) => !item.fulfilled
  );
  const fulfilledItems = wishlistItems.filter(
    (item: WishlistItemType) => item.fulfilled
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-red-900 font-semibold">
              Error loading wishlist
            </h3>
            <p className="text-red-700 text-sm mt-1">
              Unable to load your wishlist items. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-dark)]">
                Needs & Wishlist
              </h2>
              <p className="text-gray-600 mt-1">
                Manage items you need. Share what would help your cause.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Need
          </button>
        </div>

        {/* Stats */}
        {wishlistItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <p className="text-orange-700 text-sm font-medium">Total Items</p>
              <p className="text-3xl font-bold text-orange-900 mt-1">
                {wishlistItems.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-purple-700 text-sm font-medium">
                Active Needs
              </p>
              <p className="text-3xl font-bold text-purple-900 mt-1">
                {activeItems.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-green-700 text-sm font-medium">Fulfilled</p>
              <p className="text-3xl font-bold text-green-900 mt-1">
                {fulfilledItems.length}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 ? (
        <EmptyWishlistState onAddClick={() => setIsModalOpen(true)} />
      ) : (
        <>
          {/* Active Items */}
          {activeItems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--text-dark)] flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span>
                Active Needs ({activeItems.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeItems.map((item: WishlistItemType) => (
                  <WishlistItem
                    key={item.itemId}
                    item={item}
                    onUpdate={(updates) =>
                      updateItemMutation.mutate({
                        itemId: item.itemId,
                        updates,
                      })
                    }
                    onDelete={() => deleteItemMutation.mutate(item.itemId)}
                    isUpdating={updateItemMutation.isPending}
                    isDeleting={deleteItemMutation.isPending}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Fulfilled Items */}
          {fulfilledItems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Fulfilled ({fulfilledItems.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fulfilledItems.map((item: WishlistItemType) => (
                  <WishlistItem
                    key={item.itemId}
                    item={item}
                    onUpdate={(updates) =>
                      updateItemMutation.mutate({
                        itemId: item.itemId,
                        updates,
                      })
                    }
                    onDelete={() => deleteItemMutation.mutate(item.itemId)}
                    isUpdating={updateItemMutation.isPending}
                    isDeleting={deleteItemMutation.isPending}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Add Item Modal */}
      <AddWishlistItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(item) => addItemMutation.mutate(item)}
        isAdding={addItemMutation.isPending}
      />
    </div>
  );
}
