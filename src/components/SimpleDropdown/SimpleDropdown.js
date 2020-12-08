import React from "react";
import { Dropdown } from "primereact/dropdown";
class DemoDropdown extends Dropdown {
  constructor(props) {
    super(props);
  }
}

class SimpleDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
    };
  }
  render() {
    const citySelectItems = [
      { label: "New York", value: "NY" },
      { label: "Rome", value: "RM" },
      { label: "London", value: "LDN" },
      { label: "Istanbul", value: "IST" },
      { label: "Paris", value: "PRS" },
    ];
    return (
      <DemoDropdown
        panelClassName="customDropdown"
        panelStyle={{ width: "8rem", right: "0px" }}
        className="border-0 w-40 bg-gray-300"
        value={this.state.city}
        options={citySelectItems}
        appendTo={document.body}
        onChange={(e) => {
          this.setState({ city: e.value });
        }}
        placeholder="Select a City"
      />
    );
  }
}

export default SimpleDropdown;
