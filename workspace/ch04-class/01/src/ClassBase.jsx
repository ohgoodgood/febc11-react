import { Component } from "react";
import PropTypes from "prop-types";

class ClickMe extends Component {
  // state/setState는 부모(Component)에 정의되어 있는 이름
  // 함수형 컴포넌트에서는 state 변수를 여러 개 지정 가능(useState Hook 사용해서)
  // 그러나 클래스형 컴포넌트에서 상태에 대해 state 변수 하나만 사용 가능함. 여러 개의 상태를 관리하려면 객체로 지정

  state = { count: 0 };

  // 주의: handler method는 arraow function으로 작성해야 어디서 호출되든 생성 당시 context의 this에 접근 가능
  handleClick = () => {
    this.setState({ count: this.state.count + (this.props.level || 1) });
  };

  render() {
    return (
      <div>
        클릭 횟수 X {this.props.level || 1}: {this.state.count}
        <button onClick={this.handleClick}>클릭</button>
      </div>
    );
  }
}

ClickMe.propTypes = {
  level: PropTypes.number,
};

class Parent extends Component {
  render() {
    return (
      <div>
        <h1>01 클래스 컴포넌트</h1>
        <ClickMe level={2} />
        <ClickMe level={5} />
        <ClickMe />
      </div>
    );
  }
}

export default Parent;
