import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { rootReducer } from "./redux/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import Blog from "./components/Blog/Blog";
import { isLoggedIn } from "./components/Authentication/auth";
import Forumcomp from "./components/Forums/Forumcomp";
import Contactcomp from "./components/Contact/Contactcomp";
import BlogContent from "./components/BlogContent/BlogContent";
import Navbarcomp from "./components/Navbar/Navbarcomp";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:9000/",
  cache: new InMemoryCache(),
});

const store = createStore(rootReducer);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <Navbarcomp />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/blog"
              element={isLoggedIn() ? <Blog /> : <Navigate to="/login" />}
            />
            <Route path="/forums" element={<Forumcomp />} />
            <Route
              path="/contact"
              element={
                isLoggedIn() ? <Contactcomp /> : <Navigate to="/login" />
              }
            />
            <Route path="/blogContent/:id" element={<BlogContent />} />
          </Routes>
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
