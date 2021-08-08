import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { GET_LIST } from '@/reducer/role';

// 第一种方式
const mapDispatchToProps = (dispatch) => {
  return {
    getRoleList: (data) => {
      dispatch({
        type: GET_LIST,
        text: data
      });
    },
  };
};

// 第二种方式
const mapDispatchToProps2 = (dispatch) => {
  return bindActionCreators(
    {
      getRoleList: (data) => {
        return {
          type: GET_LIST,
          text: data
        }
      },
    },
    dispatch,
  );
};

@connect(({ role: { list, text } }, action) => {
  return {
    list,
    text
  };
}, mapDispatchToProps || mapDispatchToProps2)

export default class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { getRoleList } = this.props;
    getRoleList("send data");
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        Role
        <br></br>
        {text}
      </div>
    );
  }
}

