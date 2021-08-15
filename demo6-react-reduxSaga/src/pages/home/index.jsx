import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from '@/reducer/home';

/**
 * 1. @connect(state接收的redux state, nowProps 当前组件的props)
 */
@connect(({ home: { list, loading } }, nowProps) => {
  return {
    list,
    loading,
  };
}, { ...mapDispatchToProps })

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.findAll();
  }

  render() {
    const { list, loading } = this.props;
    return (
      <div>
        home
        <br></br>
        {String(loading)}
        {
          list.map(v => {
            return <div key={v.address}>{v.address}</div>;
          })
        }
      </div>
    );
  }
}
