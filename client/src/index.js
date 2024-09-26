import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { api } from "state/api";

const rootReducer = combineReducers({
	auth: authReducer, // Combine auth reducer
	[api.reducerPath]: api.reducer, // Combine api reducer
});

const persistConfig = { key: "root", storage, version: 1, whitelist: ["auth"] };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}).concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
