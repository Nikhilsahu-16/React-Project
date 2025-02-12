import { configureStore, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        veg: [
            { source: "image/vegpizza.jpg", name: "Veg Pizza", para: "A delicious vegetarian pizza with fresh toppings.", price: 250 },
            { source: "react-final-project/public/image/chickenwings.jpg", name: "Chicken Wings", para: "Crispy and flavorful chicken wings served with sauce.", price: 300 },
            { source: "react-final-project/public/image/spagheti.jpg", name: "Spaghetti Pasta", para: "Delicious spaghetti served with a rich sauce.", price: 150 },
            { source: "react-final-project/public/image/Cheeseburger.jpg", name: "Cheeseburger", para: "A classic cheeseburger with fresh veggies and cheese.", price: 110 },
        ],
        nonVeg: [
            { source: "react-final-project/public/image/chicken.jpg", name: "Chicken", para: "A delicious Chicken with fresh toppings.", price: 430 },
            { source: "react-final-project/public/image/Mutton.jpg", name: "Mutton", para: "Crispy and flavorful Mutton served with sauce.", price: 300 },
            { source: "react-final-project/public/image/Fish.jpg", name: "Fish", para: "Delicious Fish served with a rich marinara sauce.", price: 190 },
            { source: "react-final-project/public/image/prawns.jpg", name: "Prawns", para: "A classic Prwan with fresh veggies and cheese.", price: 200 },

        ],
        dessert: [
            { source: "react-final-project/public/image/Applepie.jpg", name: "Apple Pie", para: "A delicious Apple Pie with fresh toppings.", price: 70 },
            { source: "react-final-project/public/image/Almond Malai Kulfi.jpg", name: "Almond Malai Kulfi", para: "Crispy and flavorful Almond Malai Kulfi.", price: 300 },
            { source: "react-final-project/public/image/Lemon Tart.jpg", name: " Lemon Tart", para: "Delicious  Lemon Tart.", price: 190 },
            { source: "react-final-project/public/image/Pistachio Phirni.jpg", name: "Pistachio Phirni", para: "A classic Pistachio Phirni with fresh Icecream and cheeries.", price: 200 },
        ],
        featured: [
            { source: "react-final-project/public/image/vegpizza.jpg", name: "Veg Pizza", para: "A delicious vegetarian pizza with fresh toppings.", price: 250 },
            { source: "react-final-project/public/image/Cheeseburger.jpg", name: "Cheese Burger", para: "A classic cheeseburger with fresh veggies and cheese.", price: 110 },
            { source: "react-final-project/public/image/spagheti.jpg", name: "Spaghetti Pasta", para: "Delicious spaghetti served with a rich sauce.", price: 150 }
        ],
        view: [
            { source: "https://tse4.mm.bing.net/th?id=OIP.6b_BciyVJSM1SPhCFADXBwHaE8&pid=Api&P=0&h=180", name: "Vegetarian", link: "veg-items" },
            { source: "https://tse2.mm.bing.net/th?id=OIP.wSMH81P0r1d2xFagucH5cAHaE7&pid=Api&P=0&h=180", name: "Non-Vegetarian", link: "non-veg-items" },
            { source: "https://tse2.mm.bing.net/th?id=OIP._QdjPTQbUpXN0mdW4MvXkwHaE8&pid=Api&P=0&h=180", name: "Desserts", link: "dessert" }
        ]
    },
    reducers: {}
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) =>
        {
            const item = state.find(item => item.name === action.payload.name);
            if (item)
            {
                item.quantity += 1;
            } else
            {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        increment: (state, action) =>
        {
            const item = state.find(item => item.name === action.payload.name);
            if (item)
            {
                item.quantity += 1;
            }
        },
        decrement: (state, action) =>
        {
            const item = state.find(item => item.name === action.payload.name);
            if (item && item.quantity > 1)
            {
                item.quantity -= 1;
            } else
            {
                return state.filter(item => item.name !== action.payload.name);
            }
        },
        remove: (state, action) =>
        {
            return state.filter(item => item.name !== action.payload.name);

        },
        clearCart: () => []
    }
})
const orderSlice = createSlice({
    name: 'order',
    initialState: [],
    reducers: {
        completePurchase: (state, action) =>
        {
            state.push(action.payload);
        }
    }
})
let authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: localStorage.getItem("username") ? true : false,
        user: localStorage.getItem("username") || "",
    },
    reducers: {
        login: (state, action) =>
        {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem("username", action.payload);
        },
        logout: (state) =>
        {
            state.isAuthenticated = false;
            state.user = "";
            localStorage.removeItem("username");
        }
    }
})
const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        order: orderSlice.reducer,
        auth: authSlice.reducer
    }
})
export const { addToCart, increment, decrement, remove, clearCart } = cartSlice.actions;
export const { completePurchase } = orderSlice.actions;
export const { login, logout } = authSlice.actions;
export default store;