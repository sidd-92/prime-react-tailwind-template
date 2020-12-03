import React from "react";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
export class VoucherTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.state = {
      vouchers: [
        {
          id: 1,
          name: "Discounted Apples1",
          status: "Active",
          type: 1,
          creationDate: new Date().toDateString(),
        },
        {
          id: 2,
          name: "Discounted Apples2",
          status: "Not Active",
          type: 2,
          creationDate: new Date().toDateString(),
        },
        {
          id: 3,
          name: "Discounted Apples3",
          status: "Active",
          type: 3,
          creationDate: new Date().toDateString(),
        },
        {
          id: 4,
          name: "Discounted Apples14",
          status: "Active",
          type: 2,
          creationDate: new Date().toDateString(),
        },
        {
          id: 5,
          name: "Discounted Apples22",
          status: "Not Active",
          type: 3,
          creationDate: new Date().toDateString(),
        },
        {
          id: 6,
          name: "Discounted Apples32",
          status: "Not Active",
          type: 1,
          creationDate: new Date().toDateString(),
        },
      ],
    };
  }
  renderAction(rowData) {
    return (
      <div className="flex items-center w-40">
        <Button label={rowData.status === "Active" ? "De-Activate" : "Activate"} className={rowData.status === "Active" ? "bg-red-600 w-40" : "bg-green-500 w-40"} />
      </div>
    );
  }

  statusBodyTemplate(rowData) {
    return (
      <div className={`p-1 w-24 text-center rounded-sm ${rowData.status.toLowerCase() === "active" ? "bg-green-500 text-white" : "bg-red-600 text-white"}`}>{rowData.status}</div>
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
          className="p-datatable-responsive-demo p-datatable-sm p-datatable-striped"
          value={this.state.vouchers}
          paginator
          rows={100}
          globalFilter={this.state.globalFilter}
          header={header}
        >
          <Column field="name" header="Name">
            Name
          </Column>
          <Column field="type" header="Type"></Column>
          <Column field="status" header="Status" body={this.statusBodyTemplate}></Column>
          <Column field="creationDate" header="Date Created"></Column>
          <Column field="action" header="Action" body={(rowData) => this.renderAction(rowData)}></Column>
        </DataTable>
      </div>
    );
  }
}
