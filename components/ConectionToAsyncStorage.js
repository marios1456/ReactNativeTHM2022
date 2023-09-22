import AsyncStorage from '@react-native-async-storage/async-storage';

const TICKETS = "myTickets";
const USERS = "users";
const NEXTID = "nextID";
const USERNAME = "username";
const PASSWORD = "password";

export class Data {

  updateTicket = async (id, ticket)=> {
    let tickets = (await this.#getData(TICKETS));
    tickets[id] = ticket;
    return (await this.#savedata(TICKETS, tickets));
  }

  #savedata = async (key, data)=>{
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('Data saved');
      return true;
    } catch (error) {
      console.log('Error at saving the data: ', error);
      return false;
    }
  }


  deleteTicket = async (id)=> {
    let tickets = (await this.#getData(TICKETS));
    delete(tickets[id]);
    // not deleting just overrighting
    return this.#savedata(TICKETS, tickets);
  };

  getTickets = async () => {
    let tickets = (await this.#getData(TICKETS));
    if (tickets === null || tickets === undefined){ 
      tickets = {nextID: 1};
    }
    return (tickets);
  };

  loginUser = async (user) => {
    let users = await this.#getData(USERS);
    for (u in users){
      if (users[u][USERNAME] === user[USERNAME] && users[u][PASSWORD] === user[PASSWORD]){
        console.log("user found");
        return users[u];
      }
    }
    return null;
  };

  addTicket = async (ticket) => {
    let tickets = await this.#getData(TICKETS);
    // if db is empty dont crush
    if (tickets === null || tickets === undefined){ 
      tickets = {nextID: 1}
    }
    // set data to the object
    let newTicketId = tickets[NEXTID];
    tickets[newTicketId] = ticket
    tickets[NEXTID] = newTicketId +1;
    // save the object
    return this.#savedata(TICKETS, tickets);
  };

  addUser = async (user) => {
    let users = await this.#getData(USERS);
    if (await this.#checkIfUsernameExistsInDB(users, user[USERNAME])){
      console.log("User with Username: " + user[USERNAME] + " already exists");
      return false;
    }
    // if db is empty dont crush
    if (users === undefined || users === null){
      users = {nextID: 1};
    }
    // set data to the object
    let newUserId = users[NEXTID];
    users[newUserId] = user;
    users[NEXTID] = newUserId + 1;
    return this.#savedata(USERS, users);
  };

  #checkIfUsernameExistsInDB = async (users, username) => {
    for (u in users){
      if (users[u][USERNAME] === undefined){
        console.log("undef skipped");
      }
      else if ( users[u][USERNAME] === username){
        return true;
      }
    }
    return false;
  }

  #getData = async (collection) => {
    try {
        let data  = await AsyncStorage.getItem(collection);
        console.log("Data fetched successfully " +JSON.parse(data));
        return JSON.parse(data)
      } catch (error) {
        console.log('Error at loading the data: ', error);
        return {};
      }
  }
}




// // Daten löschen
// const removeData = async () => {
//   // try {
//   //   await AsyncStorage.removeItem("tickets");
//   //   console.log('Daten gelöscht');
//   // } catch (error) {
//   //   console.log('Fehler beim Löschen der Daten:', error);
//   // }
//   try{
//     await AsyncStorage.clear()
//   } catch (error) {
    
//   }
// };
