import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDate, isNewProduct } from './utils';

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const [expanded, setExpanded] = useState(false);  // State to handle expansion

    const handlePress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);  // Toggle the expanded state
    };

    const categories = Array.isArray(product.fields["Product Categories"])
        ? product.fields["Product Categories"]
        : (product.fields["Product Categories"] || '').split(',').map(category => category.trim());

    return (
        <TouchableOpacity onPress={handlePress} style={productItemStyles.container}>
            <View style={productItemStyles.contentWrapper}>
                <Image
                    source={product.fields["Product Image"] ? { uri: product.fields["Product Image"] } : require('./placeholder-image.png')}
                    style={[productItemStyles.image, expanded && productItemStyles.imageExpanded]} // Apply expanded image size
                />
                <View style={productItemStyles.textWrapper}>
                    <View style={productItemStyles.headerText}>
                        <Text style={productItemStyles.name} numberOfLines={1}>{product.fields["Product Name"]}</Text>
                        <Text style={productItemStyles.date}>{formatDate(product.fields.Posted)}</Text>
                    </View>
                    {expanded && (  // Only render the expanded content if expanded
                        <View style={productItemStyles.expandedContent}>
                            <View style={productItemStyles.tags}>
                                {categories.map(category => (
                                    <Text key={category} style={productItemStyles.tag}>{category}</Text>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* New Icon and Dropdown Wrapper */}
                <View style={productItemStyles.iconWrapper}>
                    {isNewProduct(product.fields.Posted) && (
                        <View style={productItemStyles.newIconWrapper}>
                            <Text style={productItemStyles.newIconText}>NEW</Text>
                        </View>
                    )}
                    <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#000" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const productItemStyles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f8f9fc',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: '4%',
        marginTop: '0.75%'// Adjusts space on the left and right sides
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align the image to the top
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10, // Add space between the image and the text
    },
    imageExpanded: {
        width: 100,
        height: 100, // Increase image size when expanded
    },
    textWrapper: {
        flex: 1,
    },
    headerText: {
        flexDirection: 'column', // Stacks name and date vertically
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    expandedContent: {
        flexDirection: 'column', // Categories appear vertically under the title
        marginTop: 10,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Tags appear in a row and wrap to the next line if needed
    },
    tag: {
        backgroundColor: '#d4e5ff',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 5,
        fontSize: 12,
    },
    iconWrapper: {
        flexDirection: 'row', // Make the "NEW" tag and arrow appear in the same row
        alignItems: 'center', // Vertically align both items
    },
    newIconWrapper: {
        backgroundColor: '#333333',     // Change background color to black
        borderTopRightRadius: 0,     // Square corner for the top-right
        borderTopLeftRadius: 7,     // Rounded top-left corner
        borderBottomRightRadius: 7, // Rounded bottom-right corner
        borderBottomLeftRadius: 7,  // Rounded bottom-left corner
        paddingHorizontal: 11,
        paddingVertical: 4,
        marginRight: 10,             // Space between "NEW" tag and dropdown arrow
        alignItems: 'center',
        justifyContent: 'center',
    },

    newIconText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default ProductItem;
