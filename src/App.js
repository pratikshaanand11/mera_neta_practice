import "./App.css";
import Login from "./login/Login";
import store from "./store";
import { Provider } from "react-redux";
import Navigation from "./navigation/Index";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
