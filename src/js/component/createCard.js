import React, { useContext } from "react";
import { Context } from "../store/appContext";

const CreateCard = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.listContacts.map((contact, index) => (
        <div
          key={index}
          id={contact.id}
          className="card"
          style={{ width: "40rem", height: "10rem" }}
        >
          <div className="card-body">
            <img src={contact.photo} className="card-img-top"></img>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.address}</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => actions.editContact(contact.id)}
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
      ))}
    </>
  );
};

export default CreateCard;
