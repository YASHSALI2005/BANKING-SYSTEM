import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    CircularProgress
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'; // Assuming axios is still used for direct calls

const BankerDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dialogLoading, setDialogLoading] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchAccounts();
            setLoading(false);
        };
        fetchData();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('https://banking-backend-j46n.onrender.com/api/accounts');
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
            // Handle error
        }
    };

    const handleViewTransactions = async (accountNumber) => {
        try {
            setDialogLoading(true);
            const response = await axios.get(`https://banking-backend-j46n.onrender.com/api/accounts/number/${accountNumber}`); // Changed endpoint
            setSelectedAccount(response.data);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching account details:', error);
            // Handle error
        } finally {
            setDialogLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">Banker Dashboard</Typography>
            </Box>

            <Typography variant="h6" gutterBottom component="h2">Customer Accounts</Typography>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell>Account Number</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.length > 0 ? (
                            accounts.map((account) => (
                                <TableRow key={account._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{account.accountNumber}</TableCell>
                                    <TableCell>{account.userId.name}</TableCell>
                                    <TableCell>{account.userId.email}</TableCell>
                                    <TableCell>₹{account.balance.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleViewTransactions(account.accountNumber)}
                                            startIcon={<VisibilityIcon />}
                                            disabled={dialogLoading}
                                        >
                                            {dialogLoading && selectedAccount?.accountNumber === account.accountNumber ? (
                                                <CircularProgress size={16} />
                                            ) : (
                                                'View Transactions'
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No customer accounts found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Transaction History for {selectedAccount?.userId.name}</DialogTitle>
                <DialogContent>
                    {dialogLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                            <CircularProgress />
                        </Box>
                    ) : selectedAccount && selectedAccount.transactions.length > 0 ? (
                        <TableContainer component={Paper} elevation={1}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedAccount.transactions.map((transaction, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {new Date(transaction.timestamp).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell align="right">
                                                ₹{transaction.amount.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography>No transactions found for this account.</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default BankerDashboard; 
