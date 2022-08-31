import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PlatformColor,
  Image,
  Dimensions,
} from "react-native";
import {
  adapty,
  activateAdapty,
  AdaptyPaywall,
  AdaptyProduct,
} from "react-native-adapty";
import { Navigation } from "react-native-navigation";

export const App= () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [paywalls, setPaywalls] = useState([]);

  useEffect(() => {
    async function fetchPaywalls(){
      try {
        await activateAdapty({
          sdkKey: "MY_PUBLIC_KEY",
        });

        const profile = await adapty.purchases.getInfo();
        const isSubscribed = profile.accessLevels.premium.isActive;
        setIsPremium(isSubscribed);

        if (!isSubscribed) {
          const result = await adapty.paywalls.getPaywalls();
          setPaywalls(result.paywalls);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaywalls();
  }, []);

  const renderContent = ()=> {
    if (isLoading) {
      return ;
    }

    if (isPremium) {
      return (
        {}
      );
    }

    return (
      <Button
        title="Show a paywall"
        onPress={() => {
          const paywall = paywalls.find(
            (paywall) => paywall.developerId === "cats_paywall"
          );

          if (!paywall) {
            return alert("There is no such a paywall");
          }

          Navigation.showModal({
            component: {
              name: "Paywall",
              passProps: {
                paywall,
                onRequestBuy: async (product) => {
                  const purchase = await adapty.purchases.makePurchase(product);
                  const isSubscribed =
                    purchase.purchaserInfo.accessLevels?.premium.isActive;
                  setIsPremium(isSubscribed);
                  Navigation.dismissAllModals();
                },
              },
            },
          });
        }}
      />
    );
  };

  return {renderContent()};
};
/* interface PaywallProps {
  paywall: AdaptyPaywall;
  onRequestBuy: (product: AdaptyProduct) => void | Promise;
} */
export const Paywall= ({ paywall, onRequestBuy }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    
      {paywall.products.map((product) => (
        
          {product.localizedTitle}
          <Button
            title={`Buy for ${product.localizedPrice}`}
            disabled={isLoading}
            onPress={async () => {
              try {
                setIsLoading(true);
                await onRequestBuy(product);
              } catch (error) {
                alert("An error occured :(");
              } finally {
                setIsLoading(false);
              }
            }}
          />
        
      ))}
    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  paywallContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: PlatformColor("secondarySystemBackground"),
  },
});