import React from "react";
import { Menubar } from "primereact/menubar";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { vouchers } from "./services/dataservice";
import { VoucherTable } from "./components/VoucherTable/VoucherTable";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { SelectButton } from "primereact/selectbutton";
import { Dialog } from "primereact/dialog";
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

const voucherTypes = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];
const activateOptions = [
  { label: "Active", value: "Active" },
  { label: "Not Active", value: "Not Active" },
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
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      visible: false,
      file: null,
      voucherType: "",
    };
  }
  handleSelect(e) {
    var files = e.files;
    var file = files[0];
    this.setState({ file: file });
    console.log("Upload Handler Files", file);
  }

  render() {
    console.log("VOUCHERS", vouchers);
    return (
      <React.Fragment>
        <Menubar start={() => <div className="font-bold text-2xl">Voucher Screen</div>} model={items} />
        <BreadCrumb model={items_breadcrumb} home={home} />
        <Dialog blockScroll maximized={true} header="Create New Voucher" className="w-4/5" visible={this.state.visible} onHide={() => this.setState({ visible: false })}>
          <div>
            <div className="font-bold text-3xl text-center">Create A New Voucher</div>

            <div className="mt-4">
              <div className="mb-4">
                <Panel header="Voucher Basic">
                  <div className="p-fluid">
                    <div className="p-field p-grid">
                      <label htmlFor="firstname4" className="p-col-12 p-md-2">
                        Voucher Type
                      </label>
                      <div className="p-col-12 p-md-10">
                        <Dropdown
                          value={this.state.voucherType}
                          options={voucherTypes}
                          onChange={(e) => {
                            this.setState({ voucherType: e.value });
                          }}
                          placeholder="Select a Voucher Type"
                        />
                      </div>
                    </div>
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
                      <div className="p-col-12 p-lg-6">
                        <Dropdown
                          value={this.state.city}
                          options={citySelectItems}
                          onChange={(e) => {
                            this.setState({ city: e.value });
                          }}
                          placeholder="Select a City"
                        />
                      </div>
                      <div className="p-col-12 p-lg-4 mt-2 sm:mt-0">
                        <div className="p-inputgroup">
                          <InputText placeholder="Add A New Category" />
                          <Button label="Add New Category" />
                        </div>
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Is
                      </label>
                      <div className="p-col-12 p-md-2">
                        <SelectButton value={this.state.active} options={activateOptions} onChange={(e) => this.setState({ active: e.value })}></SelectButton>
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Image
                      </label>
                      <div className="p-col-12 p-md-10">
                        <FileUpload name="demo" auto={false} mode="basic" ref={(el) => (this.upldRef = el)} customUpload={true} onSelect={(e) => this.handleSelect(e)} />
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
            <Button onClick={(e) => this.setState({ visible: false })} className=" bg-gray-500" label="Back" icon="pi pi-arrow-left" />
            <Button
              onClick={(e) => {
                console.log("STATE", this.state.file);
              }}
              className=" bg-buttonGradient ml-3"
              label="Create New Voucher"
              icon="pi pi-plus"
            />
          </div>
        </Dialog>

        <div className="p-2 mt-4">
          <div className="flex items-center mb-4">
            <div>
              <Button onClick={(e) => this.setState({ visible: true })} className="w-56 bg-buttonGradient" label="Create A New Voucher" icon="pi pi-plus" />
            </div>
          </div>
          <VoucherTable vouchers={vouchers} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
