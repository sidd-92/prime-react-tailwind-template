import React from "react";
import SideBar from "./containers/SideBar";
import TopNav from "./containers/TopNav";
import AnalyticsCard from "./components/AnalyticsCard";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopNav />
        <SideBar />
        <main className="mt-6 sm:ml-20 p-4">
          <div>Dashboard</div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <AnalyticsCard variant="YELLOW" />
            <AnalyticsCard variant="RED" />
            <AnalyticsCard variant="BLUE" />
            <AnalyticsCard variant="GREY" />
            <AnalyticsCard />
            <AnalyticsCard variant="YELLOW" />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
