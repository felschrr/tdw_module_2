import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Provider } from 'react-redux'

import App from "./App";
import Layout from "./components/Layout";
import Ex1 from "./ex1/Ex1";
import Ex2 from "./ex2/Ex2";
import Ex3 from "./ex3/Ex3";
import { store } from './store/store'

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
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
