//TODO -->
// Crear ternario para que edite en la misma card en el boton de save

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      listContacts: [],
      username: "",
      dataCard: {
        name: "",
        phone: "",
        email: "",
        address: "",
      },
      editCardContact: {
        name: "",
        phone: "",
        email: "",
        address: "",
      },
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      sendDataFlux: (data) => {
        const store = getStore();
        console.log(data);
        const actions = getActions();

        setStore({ listContacts: [...store.listContacts, data] });

        actions.uploadContactApi(data);
      },
      createUserAgenda: async () => {
        try {
          const store = getStore();
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.username}`,
            {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      setUsername: (newUser) => {
        const store = getStore();
        setStore({ username: newUser });
        console.log(store.username);
      },
      uploadContactApi: async (list) => {
        const store = getStore();
        const actions = getActions();
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.username}/contacts`,
            {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(list),
            }
          );
          const data = await response.json();
          actions.getUserContacts();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      getUserContacts: async () => {
        const store = getStore();
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.username}/contacts`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
              },
            }
          );
          const data = await response.json();
          if (!data) return;
          setStore({ listContacts: data.contacts });
        } catch (error) {
          console.log(error);
        }
      },
      deleteContact: async (id) => {
        console.log(id);
        const store = getStore();

        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.username}/contacts/${id}`,
            {
              method: "DELETE",
              headers: {
                accept: "application/json",
              },
            }
          );

          if (response.ok) {
            const newContacts = store.listContacts.filter(
              (contact) => contact.id !== id
            );
            setStore({
              listContacts: newContacts,
            });
            console.log(store.listContacts);
            alert("La tarea se ha eliminado correctamente");
          } else {
            alert("NO se ha podido eliminar la tarea");
          }
        } catch (error) {
          console.log(error);
          alert("Error al eliminar la tarea");
        }
      },
      editContact: async (id, updatedCard) => {
        const store = getStore();
        const actions = getActions();
        /* const takeId = store.listContacts.find(
          (listContactId) => listContactId.id == id
        );

        store.dataCard = takeId; */

        console.log("Edit");

        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.username}/contacts/${id}`,
            {
              method: "PUT",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedCard),
            }
          );
          const cartaActualizada = await response.json();
          console.log(cartaActualizada);
          /*  setStore([
            store.listContacts.map((card) =>
              card.id === id ? cartaActualizada : card
            ),
          ]); */
          const editList = store.listContacts.map((contact) =>
            contact.id === id ? cartaActualizada : contact
          );
          setStore({ listContacts: editList });
          actions.getUserContacts();
        } catch (error) {
          console.log(error);
        }
      },
      /* editContactFlux: (id) => {
        const store = getStore();
        const editList = store.listContacts.map((contact) =>
          contact.id === id ? store.editCardContact : contact
        );
        setStore({ listContacts: editList });
      }, */
    },
  };
};

export default getState;
