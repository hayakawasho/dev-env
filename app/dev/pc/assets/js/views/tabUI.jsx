import React from 'react';
import ReactDOM from 'react-dom';

const KEYCODE_LEFT  = 37;
const KEYCODE_RIGHT = 39;

class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0
    };
  }
  updateIndex(i, fn) {
    this.setState({index: i}, () => {
      ReactDOM.findDOMNode(this.refs['tab' + i]).focus();
    });
  }
  onClickTab(i) {
    this.updateIndex(i);
  }
  onMoveFocus(e) {
    let curtIndex = this.state.index;
    switch(e.keyCode) {
      case KEYCODE_LEFT:
        if (curtIndex !== 0) {
          this.updateIndex(curtIndex - 1);
        }
        break;
      case KEYCODE_RIGHT:
        if (curtIndex !== this.props.children.length - 1) {
          this.updateIndex(curtIndex + 1);
        }
        break;
    }
  }
  render() {
    let curtIndex = this.state.index;
    let tabs = this.props.children.map((child, i) => {
      return (
        <li role="presentation" key={i}>
          <button role="tab"
                  ref={'tab' + i}
                  tabIndex={curtIndex === i ? '0' : '-1'}
                  aria-selected={curtIndex === i ? 'true' : 'false'}
                  aria-controls={child.props.id}
                  onKeyUp={this.onMoveFocus.bind(this)}
                  onClick={this.onClickTab.bind(this, i)}>
            {child.props.label}
          </button>
        </li>
      );
    });
    let panels = this.props.children.map((child, i) => {
      return (
        <div role="tabpanel"
             key={i}
             id={child.props.id}
             aria-hidden={curtIndex === i ? 'false' : 'true'}>
          {child}
        </div>
      );
    });
    return (
      <div>
        <ul role="tablist" className={this.props.className}>
          {tabs}
        </ul>
        {panels}
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Tabs>
      <div id="tabset1" label="1st Panel">
        <h2>1st Panel</h2>
        <ul>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
        </ul>
      </div>
      <div id="tabset2" label="2nd Panel">
        <h2>2nd Panel</h2>
        <ul>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
        </ul>
      </div>
      <div id="tabset3" label="3rd Panel">
        <h2>3rd Panel</h2>
        <ul>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
          <li><a href="http://example.com" target="_blank">example.com</a></li>
        </ul>
      </div>
    </Tabs>
  </div>,
  document.getElementById('example')
);
