import React, { Component } from "react";
import { connect } from "react-redux";
import { GET_LIST } from '@/reducer/home';
import Api from "@/toolkit/request";

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

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: GET_LIST,
      text: "test"
    });

    const res = await Api.get("/home_list");
    console.log(res, "home");
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
