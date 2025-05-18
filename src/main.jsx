import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import App from "./App";
import "./index.css"; 

function Root() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <App user={user} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
