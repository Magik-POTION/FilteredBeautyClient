import { Switch } from "react-native";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false); 

    return (
        <AuthContext.Provider value={{isLoggedIn, setLoggedIn }} >
            Is the user logged in?? {JSON.stringify(isLoggedIn)}
            <div className= "LogInPage">
                <Router history={createBrowserHistory()}>
                    <Header/> 
                    <Switch>
                        {routes.map(route => (
                            <Router
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                                />
                        ))}
                    </Switch>
                </Router>          
            </div>
        </AuthContext.Provider>
    );
}
const rootElement = document.getElementById("root"); 
