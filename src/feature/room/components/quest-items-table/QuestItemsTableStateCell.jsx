import React, { useMemo } from "react";
import * as PropTypes from 'prop-types';
import { Badge } from "../../../../components/badge";
import { Table } from "../../../../components/table";

export function QuestItemsTableStateCell({ state }) {
	const stateLabel = useMemo(() => state ? 'Пройдено' : 'Не пройдено', [ state ]);

	return (
		<Table.Cell>
			<Badge success={state} label={stateLabel}/>
		</Table.Cell>
	)
}

QuestItemsTableStateCell.propTypes = {
	state: PropTypes.bool.isRequired
};
