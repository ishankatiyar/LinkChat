import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";
import messageReducer from "./messageSlice.jsx";
import socketReducer from "./socketSlice.jsx";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({
    user:userReducer,
    message:messageReducer,
    socket:socketReducer
 })

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;





// Let's break down the code step by step. This snippet sets up a Redux store for managing application state, combines multiple reducers, and persists the state between browser sessions using redux‑persist. We'll cover each part in depth.

// ---

// ## **1. Import Statements**

// ```javascript
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice.jsx";
// import messageReducer from "./messageSlice.jsx";
// import socketReducer from "./socketSlice.jsx";
// ```

// - **`combineReducers` and `configureStore`:**  
//   These functions come from Redux Toolkit, which is a set of tools that makes writing Redux logic easier and more efficient.  
//   - **`combineReducers`:** This function is used to combine multiple smaller reducer functions into one overall reducer. Each reducer handles updates to a specific slice (or part) of the state.  
//   - **`configureStore`:** This is a higher-level function to create the Redux store. It simplifies setting up the store by including good defaults like middleware, integration with the Redux DevTools extension, and more.

// - **`userReducer`, `messageReducer`, and `socketReducer`:**  
//   These are individual reducer functions that manage different pieces of the application's state. Each one is responsible for updating its respective slice of the state:
//   - **`userReducer`:** Manages state related to user data.
//   - **`messageReducer`:** Manages state related to messages.
//   - **`socketReducer`:** Manages state for socket connections (often used for real-time communication).

// ---

// ## **2. Redux Persist Imports and Configuration**

// ```javascript
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
// ```

// - **Redux Persist:**  
//   Redux Persist is a library that helps you save the Redux state to persistent storage (like localStorage in the browser). This means that even if the user refreshes the page, the state remains intact.

// - **`persistReducer`:**  
//   This function wraps your root reducer with additional functionality to handle storing and retrieving state.

// - **Action Types (`FLUSH`, `REHYDRATE`, etc.):**  
//   These are constants used by redux‑persist internally. They represent different phases in the persistence lifecycle (for example, rehydration is the process of loading the persisted state back into the store).

// - **`storage`:**  
//   This import gives you access to the default storage engine (usually the browser's localStorage). When Redux Persist saves the state, it writes it here.

// - **`persistConfig`:**  
//   The configuration object that tells Redux Persist how to work with your store:
//   ```javascript
//   const persistConfig = {
//     key: 'root',    // The key used in storage to save the state.
//     version: 1,     // Version number (useful for migrations).
//     storage,        // The storage engine to use.
//   }
//   ```

// ---

// ## **3. Combining Reducers**

// ```javascript
// const rootReducer = combineReducers({
//   user: userReducer,
//   message: messageReducer,
//   socket: socketReducer
// });
// ```

// - **`combineReducers`:**  
//   This function creates a single reducer function from the three reducers:
//   - The state managed by `userReducer` will be found under the `user` key.
//   - The state managed by `messageReducer` will be under the `message` key.
//   - The state managed by `socketReducer` will be under the `socket` key.
  
//   This modularity keeps the state organized and easier to manage, especially as your application grows.

// ---

// ## **4. Persisting the Root Reducer**

// ```javascript
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// ```

// - **Wrapping the Reducer:**  
//   The `persistReducer` function enhances the `rootReducer` so that it knows how to persist its state using the settings provided in `persistConfig`.
//   - Now, whenever the store updates, redux‑persist will automatically save the state to `localStorage` (or whichever storage you configured).

// ---

// ## **5. Configuring the Redux Store**

// ```javascript
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// export default store;
// ```

// ### **a. `configureStore`**
// - **Creating the Store:**  
//   `configureStore` creates the Redux store with the following parameters:
//   - **`reducer`:** Here, we pass the `persistedReducer`, so the store now has persistence capabilities.
  
// ### **b. Middleware Setup**
// - **Default Middleware:**  
//   Redux Toolkit comes with a set of default middleware (like `redux-thunk` for async actions, and a middleware that checks for non-serializable values in actions and state).

// - **Serializable Check and Ignored Actions:**  
//   Redux expects that actions and state be serializable (convertible to JSON) for reliability and debugging. However, redux‑persist uses some actions (like `REHYDRATE`) that include non-serializable values.  
//   To avoid warnings or errors, we tell the middleware to ignore these specific actions:
//   ```javascript
//   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//   ```
//   This ensures that Redux Toolkit’s middleware doesn’t flag these actions as problematic, keeping the development experience smooth.

// ### **c. Exporting the Store**
// - **`export default store;`:**  
//   Finally, the configured store is exported so it can be used in the application (for example, provided to the React app using `<Provider store={store}>`).

// ---

// ## **Summary**

// - **Combining Reducers:**  
//   Multiple slices of state (user, message, socket) are combined into one overall state object.

// - **Persistence Setup:**  
//   Redux Persist is configured to save the state to localStorage (or another storage), so the state persists across browser sessions.

// - **Store Configuration:**  
//   The Redux store is created with `configureStore`, using the persisted reducer. Middleware is configured to ignore specific actions from redux‑persist that might otherwise cause warnings.

// This setup creates a robust, scalable state management system that keeps your application state both organized and persistent.