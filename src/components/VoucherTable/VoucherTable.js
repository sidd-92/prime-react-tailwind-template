import React from "react";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
export class VoucherTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalFilter: null,
    };
    this.renderAction = this.renderAction.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
  }
  renderAction(rowData) {
    let label = rowData.active === "Active" ? "De-Activate" : "Activate";
    return (
      <div className="flex items-center w-full sm:w-40">
        <Button
          onClick={(e) => this.props.actionHandler(e, rowData, label)}
          label={label}
          className={rowData.active === "Active" ? "bg-red-600 w-full sm:w-40" : "bg-green-500 w-full sm:w-40"}
        />
      </div>
    );
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <div className={`p-1 w-24 text-center rounded-sm hidden sm:block ${rowData.active.toLowerCase() === "active" ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}>
          {rowData.active}
        </div>
        <div className="flex sm:hidden items-center">
          <div className="font-bold mr-8">Status</div>
          <div className={`p-1 w-24 text-center rounded-sm  ${rowData.active.toLowerCase() === "active" ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}>
            {rowData.active}
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const header = (
      <div className="w-full flex items-center flex-wrap">
        <h5 className="flex-grow text-xl font-bold">Vouchers</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText className="w-40 sm:w-full" type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
        </span>
      </div>
    );
    return (
      <div className="datatable-responsive-demo">
        <DataTable
          emptyMessage="No Vouchers Found"
          className="p-datatable-responsive-demo p-datatable-sm p-datatable-striped"
          value={this.props.vouchers}
          paginator
          rows={100}
          globalFilter={this.state.globalFilter}
          header={header}
        >
          <Column
            field="name_store"
            header="Name"
            body={(rowData) => (
              <React.Fragment>
                <div className="hidden sm:block">{rowData.name_store}</div>
                <div className="flex sm:hidden">
                  <div className="font-bold mr-8">Name</div>
                  <div>{rowData.name_store}</div>
                </div>
              </React.Fragment>
            )}
          >
            Name
          </Column>
          <Column
            field="type"
            header="Type"
            body={(rowData) => (
              <React.Fragment>
                <div className="hidden sm:block">{rowData.type}</div>
                <div className="flex sm:hidden bg-gray-200 py-1">
                  <div className="font-bold mr-10">Type</div>
                  <div>{rowData.type}</div>
                </div>
              </React.Fragment>
            )}
          ></Column>
          <Column field="active" header="Status" body={this.statusBodyTemplate}></Column>
          <Column
            field="creation_date"
            header="Date Created"
            body={(rowData) => (
              <React.Fragment>
                <div className="hidden sm:block">{rowData.creation_date}</div>
                <div className="flex sm:hidden bg-gray-200 py-1">
                  <div className="font-bold mr-10">Date Created</div>
                  <div>{rowData.creation_date}</div>
                </div>
              </React.Fragment>
            )}
          ></Column>
          <Column field="action" header="Action" body={(rowData) => this.renderAction(rowData)}></Column>
        </DataTable>
      </div>
    );
  }
}
