import { Provider } from "@/components/ui/provider";
import { ReactRouter } from "@/routes";

function App() {
  return (
    <Provider>
      <ReactRouter />
    </Provider>
  );
}

export default App;
