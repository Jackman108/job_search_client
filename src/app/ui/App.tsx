import './App.css';
import {AppProviders} from '@app/providers';
import {AppRoutes} from "../routes/AppRoutes";
import {Header, Layout} from "@widgets";
import {ErrorBoundary} from '@ui';

function App() {
    return (
        <div className="App">
            <AppProviders>
                <ErrorBoundary>
                    <Header/>
                    <main>
                        <Layout>
                            <AppRoutes/>
                        </Layout>
                    </main>
                </ErrorBoundary>
            </AppProviders>
        </div>
    );
}

export default App;
