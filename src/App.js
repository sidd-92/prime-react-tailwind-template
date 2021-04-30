import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));
const Page404 = React.lazy(() => import("./components/views/Page404/Page404"));
const Login = React.lazy(() => import("./components/views/Login/Login"));
const SignUp = React.lazy(() => import("./components/views/SignUp/SignUp"));
function App() {
  return (
    <Router basename="/">
      <React.Suspense fallback={<div>Loading..</div>}>
        <Switch>
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/login"
            name="Login"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/"
            name="Login"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/signup"
            name="Sign Up"
            render={(props) => <SignUp {...props} />}
          />
          <Route
            path="/home"
            name={"dash"}
            render={(props) => <DefaultLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;

/*
<React.Fragment>
      <Menubar
        className="flex xl:hidden"
        model={items}
        start={<InputText placeholder="Search" type="text" />}
        end={<Button label="Logout" icon="pi pi-power-off" />}
      />
      <div className="flex">
        <TieredMenu className="hidden xl:block sidenavbar" model={items} />
        <main className="p-4">
          <div className="font-bold text-4xl">Admin Panel Dashboard</div>
          <DataTable
            value={products}
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
              body={(rowdata) => <img src={rowdata.image} alt={rowdata.name} />}
            ></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
          </DataTable>
        </main>
      </div>
    </React.Fragment> */
