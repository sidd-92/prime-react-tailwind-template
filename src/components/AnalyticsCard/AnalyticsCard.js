import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const COLOR = {
  RED: "bg-red-600",
  YELLOW: "bg-yellow-600",
  BLUE: "bg-blue-600",
  GREY: "bg-gray-600",
};

class DemoCard extends Card {
  constructor(props) {
    super(props);
  }
}

class AnalyticsCard extends React.Component {
  render() {
    const header = <div className={`${this.props.variant ? COLOR[this.props.variant] : "bg-green-600"} rounded-t-md h-4`}></div>;
    const footer = (
      <div className="w-full flex flex-col xl:flex-row items-center justify-between">
        <Button className="w-full xl:w-auto mb-1 xl:mb-0" label="Save" icon="pi pi-check" />
        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary w-full xl:w-auto" />
      </div>
    );
    return (
      <DemoCard className="shadow-lg" title="Title" subTitle="SubTitle" footer={footer} header={header}>
        Demo Card
      </DemoCard>
    );
  }
}

export default AnalyticsCard;
