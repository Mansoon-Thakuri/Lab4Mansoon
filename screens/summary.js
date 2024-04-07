import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
    selectTotalAmount,
    selectTotalTransactions,
    selectHighestSpending,
    selectLeastAmountTransaction
} from '../redux/transactionSlice';

export default function SummaryScreen() {
    const totalAmount = useSelector(selectTotalAmount);
    const totalTransactions = useSelector(selectTotalTransactions);
    const highestSpending = useSelector(selectHighestSpending);
    const lowestSpending = useSelector(selectLeastAmountTransaction);

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.title}>Transactions: </Text>
                <Text style={styles.value}>{totalTransactions}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.title}>Balance: </Text>
                <Text style={styles.value}>${totalAmount}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.subTitle}>Highest Spending:</Text>
                <View style={styles.item}>
                    <Text>{highestSpending.title}</Text>
                    <Text style={styles.amount}>${highestSpending.amount}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.subTitle}>Lowest Spending:</Text>
                <View style={styles.item}>
                    <Text>{lowestSpending.title}</Text>
                    <Text style={styles.amount}>${lowestSpending.amount}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'blue',
        marginTop: 20,
        marginBottom: 10,
    },
    amount: {
        fontWeight: 'bold',
    },
});
