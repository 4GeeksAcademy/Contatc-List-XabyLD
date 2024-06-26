import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";
import { AddContact } from "./views/addContact";
import { Footer } from "./component/footer";
import CreateCard from "./component/createCard";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  // Route recibe 2 parámetros el path y el parámetro que queremos renderizar en element
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/card" element={<CreateCard />} />
            <Route path="/card/:id" element={<CreateCard />} />
            <Route path="/single/:theid" element={<Single />} />
            <Route path="/addContact" element={<AddContact />} />
            <Route path="/addContact/:id" element={<AddContact />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}; /*  */

export default injectContext(Layout);
