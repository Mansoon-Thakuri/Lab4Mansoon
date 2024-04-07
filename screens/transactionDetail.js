import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function TransactionDetailScreen({ route }) {
    const { title, amount, address, date } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.amount}>Amount: ${amount}</Text>
                <Text style={styles.title}>Title: {title}</Text>
                <Text style={styles.address}>Address: {address}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.dateContainer}>
                    <Text style={styles.label}>Transaction Date:</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#007bff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    amount: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    address: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    body: {
        padding: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    date: {
        fontSize: 16,
    },
});

export { TransactionDetailScreen }; 
