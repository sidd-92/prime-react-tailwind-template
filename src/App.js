import React from "react";
import FlowyBlock from "./components/FlowyBlock/FlowyBlock";

import eye from "./assets/img/eye.svg";
import eyeBlue from "./assets/img/eyeblue.svg";
import action from "./assets/img/action.svg";
import actionBlue from "./assets/img/actionblue.svg";
import actionOrange from "./assets/img/actionorange.svg";
import more from "./assets/img/more.svg";
import time from "./assets/img/time.svg";
import timeblue from "./assets/img/timeblue.svg";
import error from "./assets/img/error.svg";
import errorblue from "./assets/img/errorblue.svg";
import database from "./assets/img/database.svg";
import databaseOrange from "./assets/img/databaseorange.svg";
import twitter from "./assets/img/twitter.svg";
import twitterorange from "./assets/img/twitterorange.svg";
import log from "./assets/img/log.svg";
import logred from "./assets/img/logred.svg";
import errorred from "./assets/img/errorred.svg";
import closeLeft from "./assets/img/closeleft.svg";
import closeRight from "./assets/img/closeright.svg";
import { TabView, TabPanel } from "primereact/tabview";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempblock: null,
      tempblock2: null,
      value1Snapped: false,
      currentTab: 0,
      openSideBar: false,
      hideSideBar: false,
    };
    this.drag = this.drag.bind(this);
    this.release = this.release.bind(this);
    this.snapping = this.snapping.bind(this);
  }
  componentDidMount() {
    const flowy = window.flowy;
    if (flowy) {
      flowy(document.getElementById("canvas"), this.drag, this.release, this.snapping);
    } else {
      alert("Flowy Not Initialized");
    }
  }
  snapping(drag, first) {
    var grab = drag.querySelector(".grabme");
    grab.parentNode.removeChild(grab);
    var blockin = drag.querySelector(".blockin");
    blockin.parentNode.removeChild(blockin);
    if (drag.querySelector(".blockelemtype").value == "1") {
      drag.innerHTML += `<div class='blockyleft'><img src=${eyeBlue}><p class='blockyname'>New visitor</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>When a <span>new visitor</span> goes to <span>Site 1</span></div>`;
    } else if (drag.querySelector(".blockelemtype").value == "2") {
      drag.innerHTML += `<div class='blockyleft'><img src=${actionBlue}><p class='blockyname'>Action is performed</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>When <span>Action 1</span> is performed</div>`;
    } else if (drag.querySelector(".blockelemtype").value == "3") {
      drag.innerHTML += `<div class='blockyleft'><img src=${timeblue}><p class='blockyname'>Time has passed</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>When <span>10 seconds</span> have passed</div>`;
    } else if (drag.querySelector(".blockelemtype").value == "4") {
      drag.innerHTML += `<div class='blockyleft'><img src=${errorblue}><p class='blockyname'>Error prompt</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>When <span>Error 1</span> is triggered</div>`;
    } else if (drag.querySelector(".blockelemtype").value == "5") {
      drag.innerHTML += `<div class='blockyleft'><img src=${databaseOrange}><p class='blockyname'>New database entry</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>Add <span>Data object</span> to <span>Database 1</span></div>`;
    } else if (drag.querySelector(".blockelemtype").value == "6") {
      drag.innerHTML += `<div class='blockyleft'><img src=${databaseOrange}><p class='blockyname'>Update database</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>Update <span>Database 1</span></div>`;
    } else if (drag.querySelector(".blockelemtype").value == "7") {
      drag.innerHTML += `<div class='blockyleft'><img src=${actionOrange}><p class='blockyname'>Perform an action</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>Perform <span>Action 1</span></div>`;
    } else if (drag.querySelector(".blockelemtype").value == "8") {
      drag.innerHTML += `<div class='blockyleft'><img src=${twitterorange}><p class='blockyname'>Make a tweet</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>Tweet <span>Thank you</span> to the account <span>@alyssaxuu</span></div>`;
    } else if (drag.querySelector(".blockelemtype").value == "9") {
      drag.innerHTML += `<div class='blockyleft'><img src=${logred}><p class='blockyname'>Add new log entry</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>Add new <span>success</span> log entry</div>`;
    } else if (drag.querySelector(".blockelemtype").value == "10") {
      drag.innerHTML += `<div class='blockyleft'><img src=${logred}><p class='blockyname'>Update logs</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>Edit <span>Log Entry 1</span></div>`;
    } else if (drag.querySelector(".blockelemtype").value == "11") {
      drag.innerHTML += `<div class='blockyleft'><img src=${errorred}><p class='blockyname'>Prompt an error</p></div><div class='blockyright'><img src=${more}></div><div class='blockydiv'></div><div class='blockyinfo'>Trigger <span>Error 1</span></div>`;
    }
    return true;
  }
  drag(block) {
    block.classList.add("blockdisabled");
    this.setState({ tempblock2: block });
  }

  release() {
    let tempblock2 = this.state.tempblock2;
    tempblock2.classList.remove("blockdisabled");
    this.setState({ tempblock2 });
  }
  render() {
    return (
      <React.Fragment>
        <div className="w-full flex items-center relative">
          <div
            onClick={() => this.setState({ hideSideBar: !this.state.hideSideBar })}
            className="bg-white cursor-pointer text-white w-12 p-2 absolute top-0 z-40"
            style={{ left: this.state.hideSideBar ? "0px" : "475px" }}
          >
            {this.state.hideSideBar ? (
              <img src={closeRight} alt="closeRight" className="w-12" style={{ transform: "rotate(180deg)" }} />
            ) : (
              <img src={closeLeft} alt="closeLeft" className="w-12" />
            )}
          </div>
          <div id="blocklist" className={`bg-white min-h-screen pt-6 ${this.state.hideSideBar ? "invisible" : "visible"}`} style={{ width: "490px" }}>
            <div className="font-bold text-2xl flex-grow p-1">Blocks</div>

            <TabView renderActiveOnly={true} activeIndex={this.state.currentTab} onTabChange={(e) => this.setState({ currentTab: e.index })}>
              <TabPanel header="Triggers">
                <FlowyBlock value={1} blockTitle="New Visitor" blockDesc="Triggers When Someone visits a specified page" blockIcon={eye} />
                <FlowyBlock value={2} blockTitle="Action is performed" blockDesc="Triggers when somebody performs a specified action" blockIcon={action} />
                <FlowyBlock value={3} blockTitle="Time has passed" blockDesc="Triggers after a specified amount of time" blockIcon={time} />
                <FlowyBlock value={4} blockTitle="Error Prompt" blockDesc="Triggers when a specified error happens" blockIcon={error} />
              </TabPanel>
              <TabPanel header="Actions">
                <FlowyBlock value={5} blockTitle="New Database entry" blockDesc="Adds new entry to a specified database" blockIcon={database} />
                <FlowyBlock value={6} blockTitle="Update Database" blockDesc="Edits and deletes database entries" blockIcon={database} />
                <FlowyBlock value={7} blockTitle="Perform an Action" blockDesc="Performs or edits a specified action" blockIcon={action} />
                <FlowyBlock value={8} blockTitle="Make a tweet" blockDesc="Makes a Tweet with a specified query" blockIcon={twitter} />
              </TabPanel>
              <TabPanel header="Loggers">
                <FlowyBlock value={9} blockTitle="Add New log entry" blockDesc="Adds a new log entry to this project" blockIcon={log} />
                <FlowyBlock value={10} blockTitle="Update logs" blockDesc="Edits and deletes log entries in this project" blockIcon={log} />
                <FlowyBlock value={11} blockTitle="Prompt an Error" blockDesc="Triggers a specified error" blockIcon={error} />
              </TabPanel>
            </TabView>
          </div>
          <div id="canvas" style={{ left: this.state.hideSideBar ? "0px" : "490px" }}></div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
