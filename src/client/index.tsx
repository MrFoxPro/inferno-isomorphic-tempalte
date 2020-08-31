import { hydrate } from "inferno-hydrate";
import { BrowserRouter } from "inferno-router";
import App from "./components/App/App";
import { initDevTools } from "inferno-devtools";
const wrapper = (
   <BrowserRouter>
      <App />
   </BrowserRouter>
);
initDevTools();
hydrate(wrapper, document.getElementById("root"));
