import React, { createContext, useState, useEffect } from "react";
import getState from "./Flux.js";

export const AppContext = createContext(null);

const injectAppContext = PassedComponent => {
	const StoreWrapper = props => {
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);
		useEffect(() => {
			// run effects on [variable] change
			state.actions.getCurrentDateObj();
			const checkApiAndMe = async () => {
				// check is api is up on first mount
				let apiIsUp = await state.actions.fetchCheckApi();
				if (apiIsUp) {
					// check if me endpoint responds with 200
					await state.actions.fetchMeData();
					state.actions.setAuthLoading(false);
				} else {
					console.log("allowing use, no api...");
					state.actions.setAuthLoading(false);
				}
			};
			checkApiAndMe();

			return () => {
				// clean up before unmounting
			};
		}, []);
		return (
			<AppContext.Provider value={state}>
				<PassedComponent {...props} />
			</AppContext.Provider>
		);
	};
	return StoreWrapper;
};

export default injectAppContext;
