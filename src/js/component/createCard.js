import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreateCard = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const handleClick = (id) => {
    console.log(store.dataCard.name);

    navigate(`/addContact/${id}`);
  };

  return (
    <>
      <ul>
        {store.listContacts === undefined ? (
          <p className="text-center fs-3"> Lista de contactos vacia</p>
        ) : (
          store.listContacts.map((contact, index) => (
            <li
              key={index}
              id={contact.id}
              className="card row"
              style={{ width: "40rem", height: "20rem" }}
            >
              <div className="card-header col">
                <img src={contact.image} alt="Aqui va la imagen"></img>
              </div>
              <div className="card-body col ">
                <div className="d-flex justify-content-between">
                  <div className="justify-content-column">
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <p>{contact.address}</p>
                  </div>
                  <div className="btn btn-group">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleClick(contact.id)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => actions.deleteContact(contact.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default CreateCard;
