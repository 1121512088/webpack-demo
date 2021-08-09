import React, { Component } from "react";
import { connect } from "react-redux";

import { GET_LIST } from '@/reducer/user';

@connect(
  ({ home: { list } }, nowProps) => {
    return {
      list,
    };
  },
  null,
  (stateProps, dispatchProps, ownProps) => { // [redux state], [dispatch], [当前的props]
    return { ...stateProps, ...dispatchProps, ...ownProps };
  }
)

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: GET_LIST,
    });
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        user
        <br></br>
      </div>
    );
  }
}
