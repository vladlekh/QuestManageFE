import React from "react";
import { routerHistory } from "./history";
import { routerConfig } from "./config";
import { renderRoutes } from "react-router-config";
import { Router } from "react-router-dom";

export function AppRouter() {
	return <Router history={routerHistory}>{renderRoutes(routerConfig)}</Router>
}
