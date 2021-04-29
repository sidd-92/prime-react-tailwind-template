import React from "react";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { data } from "./services/DemoService";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data,
      items: [
        {
          label: "File",
          icon: "pi pi-fw pi-file",
          items: [
            {
              label: "New",
              icon: "pi pi-fw pi-plus",
              items: [
                {
                  label: "Bookmark",
                  icon: "pi pi-fw pi-bookmark",
                },
                {
                  label: "Video",
                  icon: "pi pi-fw pi-video",
                },
              ],
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-trash",
            },
            {
              separator: true,
            },
            {
              label: "Export",
              icon: "pi pi-fw pi-external-link",
            },
          ],
        },
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Left",
              icon: "pi pi-fw pi-align-left",
            },
            {
              label: "Right",
              icon: "pi pi-fw pi-align-right",
            },
            {
              label: "Center",
              icon: "pi pi-fw pi-align-center",
            },
            {
              label: "Justify",
              icon: "pi pi-fw pi-align-justify",
            },
          ],
        },
        {
          label: "Users",
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "New",
              icon: "pi pi-fw pi-user-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-user-minus",
            },
            {
              label: "Search",
              icon: "pi pi-fw pi-users",
              items: [
                {
                  label: "Filter",
                  icon: "pi pi-fw pi-filter",
                  items: [
                    {
                      label: "Print",
                      icon: "pi pi-fw pi-print",
                    },
                  ],
                },
                {
                  icon: "pi pi-fw pi-bars",
                  label: "List",
                },
              ],
            },
          ],
        },
        {
          label: "Events",
          icon: "pi pi-fw pi-calendar",
          items: [
            {
              label: "Edit",
              icon: "pi pi-fw pi-pencil",
              items: [
                {
                  label: "Save",
                  icon: "pi pi-fw pi-calendar-plus",
                },
                {
                  label: "Delete",
                  icon: "pi pi-fw pi-calendar-minus",
                },
              ],
            },
            {
              label: "Archieve",
              icon: "pi pi-fw pi-calendar-times",
              items: [
                {
                  label: "Remove",
                  icon: "pi pi-fw pi-calendar-minus",
                },
              ],
            },
          ],
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <Menubar
          model={this.state.items}
          start={<InputText placeholder="Search" type="text" />}
          end={<Button label="Logout" icon="pi pi-power-off" />}
        />
        <div className="flex">
          <TieredMenu className="sidenavbar" model={this.state.items} />
          <main className="p-4">
            <div className="font-bold text-4xl">Admin Panel Dashboard</div>
            <DataTable
              value={this.state.products}
              paginator
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              rows={10}
              rowsPerPageOptions={[10, 20, 50]}
            >
              <Column field="code" header="Code"></Column>
              <Column
                field="image"
                header="Image"
                body={(rowdata) => (
                  <img src={rowdata.image} alt={rowdata.name} />
                )}
              ></Column>
              <Column field="name" header="Name"></Column>
              <Column field="category" header="Category"></Column>
              <Column field="quantity" header="Quantity"></Column>
            </DataTable>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
