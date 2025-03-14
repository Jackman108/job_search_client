import './App.css';
import {AppProviders} from '@app/providers';
import {AppRoutes} from "../routes/AppRoutes";
import {Header, Layout} from "@widgets";

function App() {
    return (
        <div className="App">
            <AppProviders>
                <Header/>
                <main>
                    <Layout>
                        <AppRoutes/>
                    </Layout>
                </main>
            </AppProviders>
        </div>
    );
}

export default App;
