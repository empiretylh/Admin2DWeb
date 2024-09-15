
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap-icons/font/bootstrap-icons.css";
import GiftScreen from "./screens/GiftScreen";
import GiftTypeScreen from "./screens/GiftTypeScreen";
import ETSScreen from "./screens/ETSScreen";
import VIPCODE from "./screens/VIPCode";


const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GiftScreen/>} />
          <Route path="/gifttype/:gifttype" element={<GiftTypeScreen/>} />
          <Route path="/ets" element={<ETSScreen/>} />
          <Route path="/vipcode" element={<VIPCODE/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

const Main = () => {
  return (
      <App />
  );
};
export default Main;
