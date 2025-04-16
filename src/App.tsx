import { ToastContainer } from "react-toastify";
import RouterP from "./router/Router";

const App = () => {
  return (
    <>
      <ToastContainer
        toastClassName={() =>
          "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-gray-900"
        }
        bodyClassName={() => "text-white flex items-center"}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterP />;
    </>
  );
};

export default App;
