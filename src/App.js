import React from "react";
import { Menubar } from "primereact/menubar";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
//import { vouchers } from "./services/dataservice";
import { VoucherTable } from "./components/VoucherTable/VoucherTable";
import { Toast } from "primereact/toast";
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
    this.tableActionHandler = this.tableActionHandler.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.fieldsEmpty = this.fieldsEmpty.bind(this);
    this.state = {
      visible: false,
      file: null,
      voucherTypes: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ],
      activateOptions: [
        { label: "Active", value: "Active" },
        { label: "Not Active", value: "Not Active" },
      ],
      categories: [
        { label: "Books", value: "Books" },
        { label: "Grocery", value: "Grocery" },
        { label: "Beauty", value: "Beauty" },
        { label: "Shoes", value: "Shoes" },
        { label: "Clothing", value: "Clothing" },
        { label: "Garden", value: "Garden" },
      ],
      vouchers: [],
      voucherDetails: {
        name_internal: "",
        name_voucher: "",
        name_store: "",
        description: "",
        newCategory: "",
        category: "",
        active: "Not Active",
        image: null,
        type: "",
        creation_date: new Date().toDateString(),
      },
    };
  }
  handleSelect(e) {
    var files = e.files;
    var file = files[0];
    this.setState({ voucherDetails: { ...this.state.voucherDetails, image: file } });
  }

  handleAddCategory() {
    if (this.state.voucherDetails && this.state.voucherDetails.newCategory !== "") {
      let categoryToAdd = {
        label: this.state.voucherDetails.newCategory,
        value: this.state.voucherDetails.newCategory,
      };
      let cate = this.state.categories;
      cate.push(categoryToAdd);
      this.setState(
        {
          categories: cate,
          voucherDetails: { ...this.state.voucherDetails, newCategory: "", category: categoryToAdd.value },
        },
        () => {
          this.toast.show({ severity: "success", summary: "Success Message", detail: "Category Added" });
        }
      );
    }
  }

  fieldsEmpty() {
    let vd = this.state.voucherDetails;
    if (vd.name_internal !== "" && vd.name_store !== "" && vd.name_voucher !== "" && vd.type !== "" && vd.category !== "") {
      return false;
    } else {
      return true;
    }
  }
  tableActionHandler(e, rowData, action) {
    debugger;
    let currentVouchers = [...this.state.vouchers];
    let vc_index = -1;
    for (let i = 0; i < currentVouchers.length; i++) {
      if (currentVouchers[i].name_store === rowData.name_store) {
        vc_index = i;
        if (action === "De-Activate") {
          console.log();
          currentVouchers[vc_index].active = "Not Active";
        } else if (action === "Activate") {
          currentVouchers[vc_index].active = "Active";
        }
      }
    }
    console.log("ACTION", currentVouchers);
    this.setState({ vouchers: currentVouchers });
  }

  render() {
    return (
      <React.Fragment>
        <Menubar start={() => <div className="font-bold text-2xl">Referal App</div>} model={items} />
        <BreadCrumb model={items_breadcrumb} home={home} />
        <Toast ref={(el) => (this.toast = el)} />
        <Dialog blockScroll maximized={true} header="" className="w-4/5" visible={this.state.visible} onHide={() => this.setState({ visible: false })}>
          <div>
            <div className="font-bold text-3xl text-left sm:text-center">Create A New Voucher</div>

            <div className="mt-4">
              <div className="mb-4">
                <Panel header="Voucher Basic">
                  <div className="p-fluid">
                    <div className="p-field p-grid">
                      <label htmlFor="firstname4" className="p-col-12 p-md-2">
                        Voucher Type *
                      </label>
                      <div className="p-col-12 p-md-10">
                        <Dropdown
                          value={this.state.voucherDetails && this.state.voucherDetails.type}
                          options={this.state.voucherTypes}
                          onChange={(e) => {
                            this.setState({ voucherDetails: { ...this.state.voucherDetails, type: e.value } });
                          }}
                          placeholder="Select a Voucher Type"
                        />
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="firstname4" className="p-col-12 p-md-2">
                        Voucher Name (Internal) *
                      </label>
                      <div className="p-col-12 p-md-10">
                        <InputText
                          id="firstname4"
                          type="text"
                          value={this.state.voucherDetails && this.state.voucherDetails.name_internal}
                          onChange={(e) => {
                            this.setState({ voucherDetails: { ...this.state.voucherDetails, name_internal: e.target.value } });
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Name (Store Display) *
                      </label>
                      <div className="p-col-12 p-md-10">
                        <InputText
                          id="lastname4"
                          type="text"
                          value={this.state.voucherDetails && this.state.voucherDetails.name_store}
                          onChange={(e) => {
                            this.setState({ voucherDetails: { ...this.state.voucherDetails, name_store: e.target.value } });
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Name (Voucher Display) *
                      </label>
                      <div className="p-col-12 p-md-10">
                        <InputText
                          id="lastname4"
                          type="text"
                          value={this.state.voucherDetails && this.state.voucherDetails.name_voucher}
                          onChange={(e) => {
                            this.setState({ voucherDetails: { ...this.state.voucherDetails, name_voucher: e.target.value } });
                          }}
                        />
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
                        <InputTextarea
                          rows={5}
                          cols={30}
                          value={this.state.voucherDetails && this.state.voucherDetails.description}
                          onChange={(e) => this.setState({ voucherDetails: { ...this.state.voucherDetails, description: e.target.value } })}
                          autoResize
                        />
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Category *
                      </label>
                      <div className="p-col-12 p-lg-6">
                        <Dropdown
                          value={this.state.voucherDetails && this.state.voucherDetails.category}
                          options={this.state.categories}
                          onChange={(e) => {
                            this.setState({ voucherDetails: { ...this.state.voucherDetails, category: e.value } });
                          }}
                          placeholder="Select a Category"
                        />
                      </div>
                      <div className="p-col-12 p-lg-4 mt-2 sm:mt-0">
                        <div className="p-inputgroup">
                          <InputText
                            placeholder="Add A New Category"
                            value={this.state.voucherDetails && this.state.voucherDetails.newCategory}
                            onChange={(e) => {
                              this.setState({ voucherDetails: { ...this.state.voucherDetails, newCategory: e.target.value } });
                            }}
                          />
                          <Button label="Add Category" className="text-sm" onClick={this.handleAddCategory} />
                        </div>
                      </div>
                    </div>
                    <div className="p-field p-grid">
                      <label htmlFor="lastname4" className="p-col-12 p-md-2">
                        Voucher Is
                      </label>
                      <div className="p-col-12 p-md-2">
                        <SelectButton
                          value={this.state.voucherDetails && this.state.voucherDetails.active}
                          options={this.state.activateOptions}
                          onChange={(e) => this.setState({ voucherDetails: { ...this.state.voucherDetails, active: e.value } })}
                        ></SelectButton>
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
            <Button onClick={(e) => this.setState({ visible: false })} className="w-full sm:w-auto mb-2 sm:mb-0 bg-gray-500" label="Back" icon="pi pi-arrow-left" />
            <Button
              onClick={(e) => {
                if (!this.fieldsEmpty()) {
                  this.setState(
                    {
                      vouchers: [this.state.voucherDetails, ...this.state.vouchers],
                      visible: false,
                      voucherDetails: {
                        name_internal: "",
                        name_voucher: "",
                        name_store: "",
                        description: "",
                        newCategory: "",
                        category: "",
                        active: "Not Active",
                        image: null,
                        type: "",
                        creation_date: new Date().toDateString(),
                      },
                    },
                    () => {
                      console.log("vouchers", this.state.vouchers);
                      this.toast.show({ severity: "success", summary: "Success Message", detail: "Voucher Created" });
                    }
                  );
                } else {
                  this.toast.show({ severity: "error", summary: "Error Message", detail: "Please Fill Required Fields" });
                }
              }}
              className="w-full sm:w-auto bg-buttonGradient ml-0 sm:ml-3"
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
          <VoucherTable vouchers={this.state.vouchers} actionHandler={this.tableActionHandler} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
