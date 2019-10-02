import React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { TableBody } from "@material-ui/core";
import { selectPortsList } from "../../../../store/ports/selectors";
import { PortsTableRow } from "./PortsTableRow";

export function PortsTableBodyComponent({ ports }) {
	return (
		<TableBody>
			{ports.map((port) => <PortsTableRow key={port.path} data={port}/>)}
		</TableBody>
	)
}

PortsTableBodyComponent.propTypes = {
	ports: PropTypes.array,
};

const mapStateToProps = (state) => ({
	ports: selectPortsList(state),
});

export const PortsTableBody = connect(mapStateToProps)(PortsTableBodyComponent);
