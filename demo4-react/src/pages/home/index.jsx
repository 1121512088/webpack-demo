import React, { Component } from "react";
import { connect } from "react-redux";

import { GET_LIST } from '@/reducer/home';

/**
 * 1. @connect(state接收的redux state, nowProps 当前组件的props)
 */
@connect(({ home: { list, text } }, nowProps) => {
  return {
    list,
    text
  };
})

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: GET_LIST,
      text: "test"
    });
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        home
        <br></br>
        {text}
      </div>
    );
  }
}
