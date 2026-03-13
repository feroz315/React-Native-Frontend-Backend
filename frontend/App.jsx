import { Provider } from 'react-redux';
import Navigation from "./src/screens/navigation";
import { store } from "./src/state/Store";
import Toast from 'react-native-toast-message';


const App = () => {
 return (
<>

  <Provider store={store}>    
    <Navigation />
       </Provider>
      <Toast />
</>
 
   );
}


export default App;