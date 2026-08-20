import { useReducer, useCallback, createContext, useContext } from "react"

const initialState = {
  view: "web",
  selectedProductId: "croissant-pistacho",
  quantity: 1,
  variant: "clásico",
  orderStatus: "draft",
  cartItems: [],
  dashMetrics: { ventas: 1284600, pedidos: 85, ticket: 14937 },
  dashStock: { "croissant-pistacho": 12 },
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.view }
    case "SELECT_PRODUCT":
      return { ...state, selectedProductId: action.productId }
    case "SET_QUANTITY":
      return { ...state, quantity: action.quantity }
    case "SET_VARIANT":
      return { ...state, variant: action.variant }
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { productId: state.selectedProductId, qty: state.quantity, variant: state.variant },
        ],
        orderStatus: "confirmed",
      }
    case "CONFIRM_ORDER":
      return { ...state, orderStatus: "confirmed" }
    case "RECEIVE_ORDER":
      return {
        ...state,
        orderStatus: "preparing",
        dashMetrics: {
          ...state.dashMetrics,
          pedidos: state.dashMetrics.pedidos + 1,
          ventas: state.dashMetrics.ventas + 14800,
        },
        dashStock: {
          ...state.dashStock,
          "croissant-pistacho": (state.dashStock["croissant-pistacho"] || 12) - 1,
        },
      }
    case "PREPARE_ORDER":
      return { ...state, orderStatus: "preparing" }
    case "RESET":
      return { ...state, ...initialState }
    default:
      return state
  }
}

const StoryContext = createContext(null)

export function StoryProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setView = useCallback((view) => dispatch({ type: "SET_VIEW", view }), [])
  const selectProduct = useCallback((id) => dispatch({ type: "SELECT_PRODUCT", productId: id }), [])
  const setQuantity = useCallback((q) => dispatch({ type: "SET_QUANTITY", quantity: q }), [])
  const setVariant = useCallback((v) => dispatch({ type: "SET_VARIANT", variant: v }), [])
  const addToCart = useCallback(() => dispatch({ type: "ADD_TO_CART" }), [])
  const confirmOrder = useCallback(() => dispatch({ type: "CONFIRM_ORDER" }), [])
  const receiveOrder = useCallback(() => dispatch({ type: "RECEIVE_ORDER" }), [])
  const prepareOrder = useCallback(() => dispatch({ type: "PREPARE_ORDER" }), [])

  return (
    <StoryContext.Provider
      value={{
        state,
        setView,
        selectProduct,
        setQuantity,
        setVariant,
        addToCart,
        confirmOrder,
        receiveOrder,
        prepareOrder,
      }}
    >
      {children}
    </StoryContext.Provider>
  )
}

export function useProductStory() {
  const ctx = useContext(StoryContext)
  if (!ctx) throw new Error("useProductStory must be used within StoryProvider")
  return ctx
}
