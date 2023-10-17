import { create } from "zustand";

interface CartState {
  cartProducts: any;
  addProductToCart: (product: any) => void;
  removeProductFromCart: (productId: number | string) => void;
}

export const useCartState = create<CartState>()((set) => ({
  cartProducts: [],
  addProductToCart: (product) => {
    return set((state) => {
      const sameProductIndex = state.cartProducts.findIndex(
        (cp: any) => cp.id == product.id
      );
      if (sameProductIndex == -1) {
        return {
          cartProducts: [...state.cartProducts, product],
        };
      } else {
        state.cartProducts[sameProductIndex] = product;
        return {
          cartProducts: state.cartProducts,
        };
      }
    });
  },
  removeProductFromCart: (productId) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter(
        (prod: any) => prod?.id !== productId
      ),
    })),
}));
