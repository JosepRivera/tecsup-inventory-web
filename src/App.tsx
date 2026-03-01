import { BrowserRouter } from "react-router-dom";
import { BottomNav } from "@/components/shared/BottomNav";
import { AppRouter } from "@/router";

const App = () => {
  return (
    <BrowserRouter>
      <BottomNav />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
