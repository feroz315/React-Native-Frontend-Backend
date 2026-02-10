import { Provider } from 'react-redux';
import Navigation from "./src/screens/navigation";
import { store } from "./src/ReduxFolder/Store";


const App = () => {
 return (

  <Provider store={store}>   
   
    <Navigation />
   
      </Provider>
 
   );
}


export default App;