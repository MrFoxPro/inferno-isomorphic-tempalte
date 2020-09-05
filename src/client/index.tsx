import { hydrate } from "inferno-hydrate";
import { BrowserRouter } from "inferno-router";
import App from "./components/App/App";
const wrapper = (
   <BrowserRouter>
      <App />
   </BrowserRouter>
);
hydrate(wrapper, document.getElementById("root"));
