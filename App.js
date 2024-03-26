import Main from "./Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";



const stripeKey =
  "pk_test_51OqiCKKVKhFMk3HkO7nAdf8nPt6NTq9WmBdl5x0RGvPTAHcXzDjss5I6IZj5hIF9JZj1a8xlavsAXn5dbuOfwHgp00jufSjCZD";

export default function App() {
  return (
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
      merchantIdentifier="6-pack-ecom.com"
      publishableKey={stripeKey}
    >
      <Provider store={store}>
        
        
          
        <Main />
        
      </Provider>
    </StripeProvider>
  );
}