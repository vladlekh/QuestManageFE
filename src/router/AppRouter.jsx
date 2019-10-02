import React from "react";
import { Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { RouterHelper } from "../utils/router.helper";
import { routerHistory } from "./history";

export function AppRouter({ routerConfig }) {
	return <Router history={routerHistory}>{renderRoutes(RouterHelper.routesWithGuard(routerConfig))}</Router>
}
