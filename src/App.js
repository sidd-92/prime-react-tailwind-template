import React from "react";
import { Menubar } from "primereact/menubar";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { VoucherTable } from "./components/VoucherTable/VoucherTable";
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
  }

  render() {
    return (
      <React.Fragment>
        <Menubar start={() => <div className="font-bold text-2xl">Voucher Screen</div>} model={items} />
        <BreadCrumb model={items_breadcrumb} home={home} />
        <div className="p-2 mt-4">
          <div className="flex items-center mb-4">
            <div>
              <Button className="w-56 bg-buttonGradient" label="Create A New Voucher" icon="pi pi-check" />
            </div>
          </div>
          <VoucherTable />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
