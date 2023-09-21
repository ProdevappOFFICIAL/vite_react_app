import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function Tab({ to, label }) {
  return (
    <li>
      <Link to={to}>{label}</Link>
    </li>
  );
}

function TabContent({ children }) {
  return <div>{children}</div>;
}

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, label: "Tab 1", to: "/tab/1" },
  ]);
  const [nextTabId, setNextTabId] = useState(2);

  const createNewTab = () => {
    const newTab = {
      id: nextTabId,
      label: `Tab ${nextTabId}`,
      to: `/tab/${nextTabId}`,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setNextTabId(nextTabId + 1);
  };

  return (
    <Router>
      <div>
        <ul>
          {tabs.map((tab) => (
            <Tab key={tab.id} to={tab.to} label={tab.label} />
          ))}
          <li>
            <button onClick={createNewTab}>New Tab</button>
          </li>
        </ul>

        <Switch>
          {tabs.map((tab) => (
            <Route key={tab.id} path={tab.to}>
              <TabContent>
                <h2>{tab.label}</h2>
                {/* Add content for each tab here */}
              </TabContent>
            </Route>
          ))}
          <Route path="/" exact>
            <TabContent>
              <h2>Welcome to Your Tabbed App</h2>
              <p>Click 'New Tab' to create a new tab.</p>
            </TabContent>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;