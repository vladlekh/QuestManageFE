import React from "react";
import { Table as MTable, TableBody } from '@material-ui/core';
import { TableHead } from "./TableHeader";
import { TableCell } from "./TableCell";
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
