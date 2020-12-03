import React from "react";
import { Menubar } from "primereact/menubar";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { VoucherTable } from "./components/VoucherTable/VoucherTable";
import { Dropdown } from "primereact/dropdown";

import { Sidebar } from "primereact/sidebar";
const items = [
  {
    label: "Vouchers",
    icon: "pi pi-fw pi-file",
    className: "ml-6 border border-gray-200 transition duration-200 hover:bg-gray-300 rounded-md",
  },
];

const citySelectItems = [
  { label: "New York", value: "NY" },
  { label: "Rome", value: "RM" },
  { label: "London", value: "LDN" },
  { label: "Istanbul", value: "IST" },
  { label: "Paris", value: "PRS" },
];

const items_breadcrumb = [
  {
    label: "Vouchers",
    icon: "pi pi-fw pi-file",
    className: "text-lg",
  },
];
const home = { icon: "pi pi-home" };
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Menubar start={() => <div className="font-bold text-2xl">Voucher Screen</div>} model={items} />
        <BreadCrumb model={items_breadcrumb} home={home} />
        <Sidebar visible={this.state.visible} showCloseIcon={false} fullScreen onHide={() => this.setState({ visible: false })}>
          <div>
            <div className="font-bold text-3xl text-center">Create A New Voucher</div>

            <div className="mt-4">
              <div className="mb-4">
                <Panel header="Voucher Names">
                  <div className="p-fluid">
                    <div className="p-field p-grid">
                      <label htmlFor="firstname4" className="p-col-12 p-md-2">
                        Voucher Name (Internal)
                      </label>
                      <div className="p-col-12 p-md-10">
                        <InputText id="firstname4" type="text" />
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Name (Store Display)
                      </label>
                      <div className="p-col-12 p-md-10">
                        <InputText id="lastname4" type="text" />
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Name (Voucher Display)
                      </label>
                      <div className="p-col-12 p-md-10">
                        <InputText id="lastname4" type="text" />
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
              <div className="mb-4">
                <Panel header="Other Voucher Details">
                  <div className="p-fluid">
                    <div className="p-field p-grid">
                      <label htmlFor="firstname4" className="p-col-12 p-md-2">
                        Voucher Description
                      </label>
                      <div className="p-col-12 p-md-10">
                        <InputTextarea rows={5} cols={30} value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} autoResize />
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Category
                      </label>
                      <div className="p-col-12 p-md-6">
                        <Dropdown
                          value={this.state.city}
                          options={citySelectItems}
                          onChange={(e) => {
                            this.setState({ city: e.value });
                          }}
                          placeholder="Select a City"
                        />
                      </div>
                      <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                          <InputText placeholder="Add A New Category" />
                          <Button label="Add New Category" />
                        </div>
                      </div>
                    </div>

                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Name (Voucher Display)
                      </label>
                      <div className="p-col-12 p-md-10">
                        <InputText id="lastname4" type="text" />
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
            <Button onClick={(e) => this.setState({ visible: false })} className=" bg-gray-500" label="Back" icon="pi pi-arrow-left" />
          </div>
        </Sidebar>

        <div className="p-2 mt-4">
          <div className="flex items-center mb-4">
            <div>
              <Button onClick={(e) => this.setState({ visible: true })} className="w-56 bg-buttonGradient" label="Create A New Voucher" icon="pi pi-check" />
            </div>
          </div>
          <VoucherTable />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
