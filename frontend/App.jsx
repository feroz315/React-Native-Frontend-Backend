import { Provider } from 'react-redux';
import Navigation from "./src/screens/navigation";
import { store } from "./src/state/Store";


const App = () => {
 return (

  <Provider store={store}>   
   
    <Navigation />
   
      </Provider>
 
   );
}


export default App;