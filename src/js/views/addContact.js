import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const AddContact = () => {
  const { store, actions } = useContext(Context);

  const params = useParams();
  console.log(params);
  const editCard = store.listContacts.find(
    (card) => card.id === Number(params.id)
  );

  //Pasar div a form, el botón dentro del form con type="submit", en lugar de onClick del botón, pondes en el tag de form onSubimt={handleSave

  const [dataContact, setDataContact] = useState({
    name: editCard?.name || "",
    phone: editCard?.phone || "",
    email: editCard?.email || "",
    address: editCard?.address || "",
  });

  const valueInputs = (e) => {
    const { name, value } = e.target;

    setDataContact((prevDataContact) => ({
      ...prevDataContact,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 className="text-center mt-2">Add a new Contact</h1>
      <div className="input-group d-flex flex-column">
        <label type="text" className="fw-bold mx-2">
          Full Name
        </label>
        <div className="d-flex justify-content-center p-2">
          <input
            onChange={valueInputs}
            type="text"
            className="form-control"
            placeholder="Full Name"
            name="name"
            value={dataContact.name}
          />
        </div>
        <label type="text" className="fw-bold mx-2">
          Email
        </label>
        <div className="d-flex justify-content-center p-2">
          <input
            type="text"
            onChange={valueInputs}
            className="form-control"
            placeholder="Enter Mail"
            name="email"
            value={dataContact.email}
          />
        </div>
        <label type="text" className="fw-bold mx-2">
          Phone
        </label>
        <div className="d-flex justify-content-center p-2">
          <input
            type="text"
            onChange={valueInputs}
            className="form-control"
            placeholder="Enter Phone"
            name="phone"
            value={dataContact.phone}
          />
        </div>
        <label type="text" className="fw-bold mx-2">
          Address
        </label>
        <div className="d-flex justify-content-center p-2">
          <input
            type="text"
            onChange={valueInputs}
            className="form-control"
            placeholder="Enter Full Address"
            name="address"
            value={dataContact.address}
          />
        </div>
        <label type="text" className="fw-bold mx-2">
          Photo
        </label>
        <div className="d-flex justify-content-center p-2">
          <input
            type="text"
            onChange={valueInputs}
            className="form-control"
            placeholder="Enter URL Photo"
            value={dataContact.photo}
            name="photo"
          />
        </div>
      </div>

      <Link to="/">
        {editCard ? (
          <button
            onClick={() => actions.editContact(params.id, dataContact)}
            type="button"
            className="btn btn-secondary w-100 mt-2"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => actions.sendDataFlux(dataContact)}
            className="btn btn-success w-100 mt-2"
          >
            Save
          </button>
        )}
      </Link>
    </>
  );
};
