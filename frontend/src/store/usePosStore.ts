import { create } from 'zustand';

export interface PosCartItem {
  id: string; // Unique ID for cart item
  productVariantId: number;
  medicineId?: number; // Needed for drug interaction check
  name: string;
  sku: string;
  unitName: string;
  sellingPrice: number;
  quantity: number;
  maxQuantity: number;
}

interface PosStore {
  cart: PosCartItem[];
  addItem: (item: Omit<PosCartItem, 'id' | 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
}

export const usePosStore = create<PosStore>((set) => ({
  cart: [],
  totalAmount: 0,
  
  addItem: (item) => set((state) => {
    const existingItem = state.cart.find(i => i.productVariantId === item.productVariantId);
    let newCart;
    if (existingItem) {
      newCart = state.cart.map(i => 
        i.productVariantId === item.productVariantId
          ? { ...i, quantity: Math.min(i.quantity + 1, i.maxQuantity) }
          : i
      );
    } else {
      newCart = [...state.cart, { ...item, id: crypto.randomUUID(), quantity: 1 }];
    }
    
    return {
      cart: newCart,
      totalAmount: newCart.reduce((sum, i) => sum + i.sellingPrice * i.quantity, 0)
    };
  }),

  updateQuantity: (id, quantity) => set((state) => {
    const newCart = state.cart.map(i => {
      if (i.id === id) {
        return { ...i, quantity: Math.max(1, Math.min(quantity, i.maxQuantity)) };
      }
      return i;
    });
    
    return {
      cart: newCart,
      totalAmount: newCart.reduce((sum, i) => sum + i.sellingPrice * i.quantity, 0)
    };
  }),

  removeItem: (id) => set((state) => {
    const newCart = state.cart.filter(i => i.id !== id);
    return {
      cart: newCart,
      totalAmount: newCart.reduce((sum, i) => sum + i.sellingPrice * i.quantity, 0)
    };
  }),

  clearCart: () => set({ cart: [], totalAmount: 0 }),
}));
