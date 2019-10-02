import React from "react";
import { routerHistory } from "../router/history";

export class RouterHelper {
	static routesWithGuard = (menuConfig) => {
		return menuConfig.map(menuConfigItem => {
			if (menuConfigItem.guard) {
				const Component = menuConfigItem.render;
				return {
					...menuConfigItem,
					render: () => {
						const Guard = menuConfigItem.guard;
						return (
							<Guard>
								<Component/>
							</Guard>
						)
					}
				}
			}
			return { ...menuConfigItem };
		})
	};

	static goToFirstRoom = () => {
		routerHistory.push('/room1')
	};
}
