import React from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

export function PortsTableHead() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>Путь</TableCell>
				<TableCell>Наименование</TableCell>
				<TableCell>Подключение</TableCell>
				<TableCell>Состояние</TableCell>
			</TableRow>
		</TableHead>
	)
}
