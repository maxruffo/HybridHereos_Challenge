import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatDate, isNewProduct } from './utils';

// Define the props for the ProductItem component
interface ProductItemProps {
    product: {
        fields: {
            "Product Categories": string | string[];
            "Product Image": string;
            "Product Name": string;
            Posted: string;
        };
    };
}

// ProductItem component to display product details
const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    // State to manage the expanded/collapsed state of the product item
    const [expanded, setExpanded] = useState(false);

    // Handle press event to toggle the expanded state with animation
    const handlePress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    // Process categories to ensure they are in an array format and filter out empty strings
    const categories = Array.isArray(product.fields["Product Categories"])
        ? product.fields["Product Categories"].filter(category => category.trim().length > 0)
        : (product.fields["Product Categories"] || '').split(',').map(category => category.trim()).filter(category => category.length > 0);

    return (
        <TouchableOpacity onPress={handlePress} style={productItemStyles.container}>
            <View style={productItemStyles.contentWrapper}>
                {/* Display product image or a placeholder if the image is missing */}
                <Image
                    source={product.fields["Product Image"] ? { uri: product.fields["Product Image"] } : require('./placeholder-image.png')}
                    style={[productItemStyles.image, expanded && productItemStyles.imageExpanded]}
                />
                <View style={productItemStyles.textWrapper}>
                    <View style={productItemStyles.headerText}>
                        {/* Display product name and posted date */}
                        <Text style={productItemStyles.name} numberOfLines={1}>{product.fields["Product Name"]}</Text>
                        <Text style={productItemStyles.date}>{formatDate(product.fields.Posted)}</Text>
                    </View>
                    {/* Display categories as tags if the item is expanded */}
                    {expanded && categories.length > 0 && (
                        <View style={productItemStyles.expandedContent}>
                            <View style={productItemStyles.tags}>
                                {categories.map(category => {
                                    return (
                                        <Text key={category} style={productItemStyles.tag}>{category}</Text>
                                    );
                                })}
                            </View>
                        </View>
                    )}
                </View>
                <View style={productItemStyles.iconWrapper}>
                    {/* Display "NEW" icon if the product was posted within the last 7 days */}
                    {isNewProduct(product.fields.Posted) && (
                        <View style={productItemStyles.newIconWrapper}>
                            <Text style={productItemStyles.newIconText}>NEW</Text>
                        </View>
                    )}
                    {/* Display expand/collapse icon */}
                    <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#5e646e" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Styles for the ProductItem component
const productItemStyles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f8f9fc',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: '4%',
        marginTop: '0.75%'
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    imageExpanded: {
        width: 100,
        height: 100,
    },
    textWrapper: {
        flex: 1,
    },
    headerText: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 16,
        fontWeight: '900',
        color: '#1b2633',
    },
    date: {
        fontSize: 12,
        color: '#1b2633',
        marginTop: 4,
    },
    expandedContent: {
        flexDirection: 'column',
        marginTop: 10,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#d4e5ff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 5,
        fontSize: 12,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newIconWrapper: {
        backgroundColor: '#333333',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newIconText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
});

export default ProductItem;