import React from "react";
import { Route, Switch } from "react-router-dom";
import EditList from "./components/EditList";
import Homepage from "./components/Homepage";
import ViewList from "./components/ViewList";

//Pages

function App() {
  return (
    <div className="m-10 mx-auto border-2 border-black shadow-xl max-w-7xl">
      <div className="px-8 py-2">
        <Switch>
          <Route path="/edit-post/:id" component={EditList} />
          <Route path="/view-post/:id" component={ViewList} />
          <Route path="/" component={Homepage} />
        </Switch>
      </div>
    </div>
  );
}
export default App;
