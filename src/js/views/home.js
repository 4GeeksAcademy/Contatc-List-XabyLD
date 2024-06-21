import React, { useContext, useEffect } from "react";
import Navbar from "../component/navbar";
import "../../styles/home.css";
import CreateCard from "../component/createCard";

import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const pickUser = (event) => {
    const user = event.target.value;
    if (event.key === "Enter") {
      if (!user) return alert("Introduzca un usuario por favor");
      actions.setUsername(user);
      actions.createUserAgenda();
      actions.getUserContacts();
      console.log(store.username);
      alert("Usuario creado en la API correctamente!");
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <label>Create User:</label>
        <input onChange={pickUser} onKeyDown={pickUser}></input>
      </div>
      <CreateCard />
    </>
  );
};
