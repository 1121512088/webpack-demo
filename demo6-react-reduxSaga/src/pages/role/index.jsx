import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from '@/reducer/role';

@connect(({ role: { list, loading } }, nowProps) => {
  return {
    list,
    loading,
  };
}, { ...mapDispatchToProps })

export default class Role extends Component {
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
        Role
        <br></br>
        {String(loading)}
        {
          list.map(v => {
            return <div key={v}>{v}</div>;
          })
        }
      </div>
    );
  }
}

