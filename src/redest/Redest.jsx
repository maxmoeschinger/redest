import React from 'react';
import { connect } from 'react-redux';
import buildPropsForComponent from './buildPropsForComponent';
import check from './check';
import validateUserInput from './validateUserInput';

export default (WrappedComponent, dataToRetrieve) => {
    if (!validateUserInput(dataToRetrieve)) {
        return () => (
            <WrappedComponent/>
        );
    }

    class hoc extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentWillMount() {
            this.check();
        }
        componentWillUpdate() {
            this.check();
        }
        check() {
            check(this.props, dataToRetrieve);
        }
        render() {
            return (<WrappedComponent {...buildPropsForComponent(dataToRetrieve, this.props)}/>);
        }
    }

    return connect((state, ownProps) => ({ redest: state.redest }))(hoc);
}