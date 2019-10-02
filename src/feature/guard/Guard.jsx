import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectQuestIsInitialized } from "../../store/quest/selectors";

export function GuardComponent(props) {
	if (!props.questIsInitialized) {
		return <Redirect to="/initial"/>
	}

	return props.children;
}

const mapStateToProps = state => ({
	questIsInitialized: selectQuestIsInitialized(state),
});

export const Guard = connect(mapStateToProps)(GuardComponent);
