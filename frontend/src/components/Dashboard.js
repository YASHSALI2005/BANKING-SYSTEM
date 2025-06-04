import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    styled
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Dashboard = () => {
    const { user } = useAuth();
    const [account, setAccount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchAccount();
        fetchTransactions();
    }, []);

    const fetchAccount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/accounts/my-account');
            setAccount(response.data);
        } catch (error) {
            console.error('Error fetching account:', error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/transactions/history');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleTransaction = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/transactions', {
                type: transactionType,
                amount: parseFloat(amount)
            });
            
            setSuccess(response.data.message);
            setError('');
            setOpenDialog(false);
            setAmount('');
            fetchAccount();
            fetchTransactions();
        } catch (error) {
            setError(error.response?.data?.message || 'Transaction failed');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Paper elevation={6} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
                    <Typography variant="h5" gutterBottom color="primary">
                        Account Overview
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Balance: ${account?.balance.toFixed(2) || '0.00'}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setTransactionType('deposit');
                                setOpenDialog(true);
                            }}
                        >
                            Deposit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setTransactionType('withdrawal');
                                setOpenDialog(true);
                            }}
                        >
                            Withdraw
                        </Button>
                    </Box>
                </Paper>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <Paper elevation={6} sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Transaction History
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="transaction table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Type</StyledTableCell>
                                    <StyledTableCell>Amount</StyledTableCell>
                                    <StyledTableCell>Date</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction, index) => (
                                    <StyledTableRow key={index}>
                                        <TableCell>{transaction.type}</TableCell>
                                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {new Date(transaction.timestamp).toLocaleString()}
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{transactionType === 'deposit' ? 'Deposit' : 'Withdraw'} Money</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleTransaction} color="primary" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard; 