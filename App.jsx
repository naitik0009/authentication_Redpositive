import { CurrentNavigation } from './src/routes/app.routes';
import { AuthContextProvider } from './src/context/auth.context';
export const App = ()=>{
    return(
       
           <AuthContextProvider>
             <CurrentNavigation/>
           </AuthContextProvider>
    );
}