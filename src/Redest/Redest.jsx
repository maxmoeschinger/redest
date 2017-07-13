import React from 'react';
import { connect } from 'react-redux';
import buildProps from './buildProps';
import buildPropsForComponent from './buildPropsForComponent';
import check from './check';

export default (WrappedComponent, dataToRetrieve) => {
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

    return connect((state, ownProps) => buildProps(dataToRetrieve, state, ownProps))(hoc);
}