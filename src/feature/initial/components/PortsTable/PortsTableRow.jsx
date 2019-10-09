import React, { useMemo } from "react";
import * as PropTypes from 'prop-types';
import { connect } from "react-redux";
import { TableCell, TableRow } from "@material-ui/core";
import { Badge } from "../../../../components/badge";
import { Preloader } from "../../../../components/preloader";
import { selectPortsAreInitializing } from "../../../../store/ports/selectors";

export function PortsTableRowComponent({ data, initializing }) {
	const portConnectedCellContent = useMemo(() => {
		const label = data.connected ? 'Подключено' : 'Отключено';
		return (
			<Badge success={data.connected} error={!data.connected} label={label}/>
		);
	}, [ data.connected ]);

	const portInitializedCellContent = useMemo(() => {
		const label = !data.ready && initializing
			? <Preloader size={20}/>
			: data.ready
				? 'Готово'
				: 'Не готово';

		return (
			<Badge success={data.ready} primary={!data.ready && initializing} label={label}/>
		);
	}, [ data.ready, initializing ]);

	return (
		<TableRow>
			<TableCell>{data.path}</TableCell>
			<TableCell>{data.name}</TableCell>
			<TableCell>
				{portConnectedCellContent}
			</TableCell>
			<TableCell>
				{portInitializedCellContent}
			</TableCell>
		</TableRow>
	)
}

PortsTableRowComponent.propTypes = {
	data: PropTypes.object,
	initializing: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	initializing: selectPortsAreInitializing(state),
});

export const PortsTableRow = connect(mapStateToProps)(PortsTableRowComponent);
