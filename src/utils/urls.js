// const SERVER_URL = "http://localhost:8080/api/v1"
const SERVER_URL = "https://expense-management-app-backend-bcjo.onrender.com/api/v1"

module.exports = {
    SERVER_URL,
    registerUrl : `${SERVER_URL}/users/register`,
    loginUrl : `${SERVER_URL}/users/login`,

    // Transaction URLs
    addTransaction : `${SERVER_URL}/transactions/add-transaction`,
    getAllTransactionsOfAUser : `${SERVER_URL}/transactions/get-all-transactions/:userId`
}