import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { RefreshControl, FlatList, StyleSheet, View, Text } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "./store/inventory";
import { RootState } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./App";
import ProductItem from "./ProductItem";

// HomeScreen component to display the inventory list
const HomeScreen = (props: StackScreenProps<StackParamList, "Home">) => {
    // Get fetching state and inventory data from the Redux store
    const fetching = useSelector((state: RootState) => state.inventory.fetching);
    const inventory = useSelector(selectors.selectInventory);
    const dispatch = useDispatch();

    // Fetch inventory data when the screen is focused
    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            dispatch(actions.fetchInventory());
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {/* App bar with title */}
            <Appbar.Header>
                <View style={styles.titleContainer}>
                    <Appbar.Content title="Inventory" titleStyle={styles.title} />
                </View>
            </Appbar.Header>

            {/* FlatList to display inventory items */}
            <FlatList
                data={inventory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductItem product={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={fetching}
                        onRefresh={() => dispatch(actions.fetchInventory())}
                    />
                }
                contentContainerStyle={styles.flatListContent}
            />

            {/* Floating action button to navigate to the camera screen */}
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

// Styles for the HomeScreen component
const styles = StyleSheet.create({
    flatListContent: {
        backgroundColor: '#ffffff',
        marginTop: 15,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdfbfc',
        paddingVertical: 10,
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#000000',
    },
    fab: {
        position: "absolute",
        bottom: 16,
        width: "100%",
        flex: 1,
        alignItems: "center"
    }
});

export default HomeScreen;