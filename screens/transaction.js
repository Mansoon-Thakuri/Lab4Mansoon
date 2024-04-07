import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ListItem from '../components/listItem';
import { firebaseHelper } from '../firebase';
import { addTransaction, fetchDataSuccess } from '../redux/transactionSlice';

function TransactionScreen(props) {
    const transactions = useSelector((store) => store.transaction);
    const [error, setError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [newTransaction, setNewTransaction] = useState({ title: '', amount: '', address: '', date: '' });

    const dispatch = useDispatch();

    useEffect(() => {
        fetchItems();
    }, [dispatch]);

    const fetchItems = async () => {
        const fetchedItems = [];
        setError('');

        try {
            const querySnapshot = await firebaseHelper.fetchTransactions();
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                data.id = doc.id;
                fetchedItems.push(data);
            });
            dispatch(fetchDataSuccess(fetchedItems));
        } catch (error) {
            setError("Error fetching data");
        }
    };

    const handleAddTransaction = async () => {
        try {
            const docRef = await firebaseHelper.addTransaction(newTransaction);
            const newTransactionWithId = { id: docRef.id, ...newTransaction };
            dispatch(addTransaction(newTransactionWithId));
            setModalVisible(false);
            setNewTransaction({ title: '', amount: '', address: '', date: '' });
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Transaction</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newTransaction.title}
                            onChangeText={(text) => setNewTransaction({ ...newTransaction, title: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Amount"
                            value={newTransaction.amount}
                            onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={newTransaction.address}
                            onChangeText={(text) => setNewTransaction({ ...newTransaction, address: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Date"
                            value={newTransaction.date}
                            onChangeText={(text) => setNewTransaction({ ...newTransaction, date: text })}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleAddTransaction}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            {error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                <FlatList
                    data={transactions}
                    renderItem={({ item }) => <ListItem transaction={item} navigation={props.navigation} />}
                    keyExtractor={(item) => item.id}
                />
            )}
            
            {transactions.length < 1 && (
                <View style={styles.noTransactionContainer}>
                    <Text style={styles.noTransactionText}>You don't have any transactions.</Text>
                </View>
            )}
            
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>Add Transaction</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
    noTransactionContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    noTransactionText: {
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TransactionScreen;
