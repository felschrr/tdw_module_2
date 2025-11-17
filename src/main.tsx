import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./App";
import Layout from "./ex1/components/Layout";
import Ex1 from "./ex1/Ex1";
import Ex2 from "./ex2/Ex2";
import Ex3 from "./ex3/Ex3";
import Ex4 from "./ex4/Ex4";

import { store } from "./store/store";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "ex1", element: <Ex1 /> },
      { path: "ex2", element: <Ex2 /> },
      { path: "ex3", element: <Ex3 /> },
      { path: "ex4", element: <Ex4 /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
