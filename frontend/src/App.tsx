import React from 'react';
import { observer } from "mobx-react";
import { useStore } from "./stores/ClientsStore";

const App = observer((props: any) => {
  const {clientsStore} = useStore()
  return (
    <div className="App">
      {/* {clientsStore.clients.map(c => <div>{c.id}</div>)} */}
    </div>
  );
})

export default App;
