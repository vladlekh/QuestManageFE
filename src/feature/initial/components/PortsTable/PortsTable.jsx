import React from "react";
import { Table } from "@material-ui/core";
import { PortsTableHead } from "./PortsTableHead";
import { PortsTableBody } from "./PortsTableBody";

export function PortsTable() {
	return (
		<Table>
			<PortsTableHead/>
			<PortsTableBody/>
		</Table>
	)
}
