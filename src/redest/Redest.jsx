import React from 'react';
import PropTypes from 'prop-types';
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
            check(this.props, this.props.redest, dataToRetrieve);
        }
        render() {
            return (<WrappedComponent {...buildPropsForComponent(dataToRetrieve, this.props)}/>);
        }
    }

    hoc.propTypes = {
        redest: PropTypes.object.isRequired
    };

    return connect((state, ownProps) => ({ redest: state.redest }))(hoc);
}