import '../styles/globals.scss'
import {Layout} from "../components/layout/layout";
import {Provider} from "react-redux";
import {store} from "../store/store";

function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default MyApp;
