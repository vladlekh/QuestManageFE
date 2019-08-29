import React from "react";
import { Table as MTable, TableBody, TableCell } from '@material-ui/core';
import { TableHead } from "./TableHeader";
import { TableRow } from "./TableRow";

export function Table(props) {
	return (
		<MTable>
			{props.children}
		</MTable>
	);
}

Table.Head = TableHead;
Table.Cell = TableCell;
Table.Row = TableRow;
Table.Body = TableBody;
