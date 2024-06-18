//TODO -->
// Hacer que nos lleve al formulario correspondiente de los datos que queremos editar

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      listContacts: [],
      username: "",
      dataCard: {},
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
        const actions = getActions();
        setStore({ listContacts: [...store.listContacts, data] });
        console.log(data);
        actions.uploadContactApi(data);
        console.log(store.listContacts);
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
        const store = getStore();
        const newContacts = store.listContacts.filter(
          (listContact) => listContact.id !== id
        );
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.username}/contacts/${id}`,
            {
              method: "DELETE",
              headers: {
                accept: "aplication/json",
              },
            }
          );
          const data = await response.json();
          setStore({ listContacts: newContacts });
          console.log(newContacts);
        } catch (error) {
          console.log(error);
        }
      },
      editContact: async (cardID, updatedData) => {
        const store = getStore();
        const takeId = store.listContacts.find(
          (listContactId) => listContactId.id == id
        );

        store.dataCard = takeId;

        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${store.username}/contacts/${id}`,
            {
              method: "PUT",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          );
          const updatedCard = await response.json();
          setStore([
            listContacts.map((card) =>
              card.id === cardID ? updatedCard : card
            ),
          ]);
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
