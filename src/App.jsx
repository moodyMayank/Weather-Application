import DataProvider from "./context/DataProvider";
import Home from "./pages/Home";

const App = () => {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
};

export default App;
