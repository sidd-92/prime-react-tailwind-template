import React from "react";
import SideBar from "./containers/SideBar";
import TopNav from "./containers/TopNav";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopNav />
        <SideBar />
        <main className="mt-6 sm:ml-20 p-4">
          <div>Dashboard</div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
