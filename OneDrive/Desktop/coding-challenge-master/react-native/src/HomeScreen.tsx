import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, DataTable, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "./store/inventory";
import { RootState } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./App";
import ProductItem from "./ProductItem";

export default (props: StackScreenProps<StackParamList, "Home">) => {
  const fetching = useSelector((state: RootState) => state.inventory.fetching);
  const inventory = useSelector(selectors.selectInventory);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(actions.fetchInventory());
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
      <View style={{ flex: 1 }}>
          <Appbar.Header>
              <View style={styles.titleContainer}>
                  <Appbar.Content title="Inventory" titleStyle={styles.title} />
              </View>
          </Appbar.Header>

          <ScrollView
              style={styles.scrollView}
              refreshControl={
                  <RefreshControl
                      refreshing={fetching}
                      onRefresh={() => dispatch(actions.fetchInventory())}
                  />
              }
          >
              {inventory.map((product) => (
                  <ProductItem key={product.id} product={product} />
              ))}
          </ScrollView>

          <SafeAreaView style={styles.fab}>
              <FAB
                  icon={() => <MaterialCommunityIcons name="barcode" size={24} color="#0B5549" />}
                  label="Scan Product"
                  onPress={() => props.navigation.navigate('Camera')}
              />
          </SafeAreaView>
      </View>

  );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#ffffff', // Set background color for the ScrollView
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',  // Center vertically
        alignItems: 'center',      // Center horizontally
        backgroundColor: '#fdfbfc', // Background color for the title container
        paddingVertical: 10,       // Optional: Add some vertical padding
    },
    title: {
        textAlign: 'center',       // Center text alignment
        fontWeight: 'bold',
    },
  fab: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    flex: 1,
    alignItems: "center"
  }
});
