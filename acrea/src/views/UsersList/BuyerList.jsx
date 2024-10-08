//acrea/src/views/UsersList/BuyerList.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from './css/BuyerList.module.css';
import useApi from '../../utils/useApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';

function BuyerList() {
    const [buyers, setBuyers] = useState([]);
    const userAuthData = useSelector((data) => data.AuthUserDetailsSlice);
    console.log("user auth data ---> ", userAuthData);

    async function fetchBuyersList() {
        try {
            const response = await useApi({
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
                url: "/buyerslist",
                method: "GET",
            });
    
            if (response && response.user_buyerlist_arr) {
                setBuyers(response.user_buyerlist_arr); // Correctly accessing the array
            } else {
                console.error("Failed to fetch buyers:", response.message); // Log the error message if no array is returned
            }
        } catch (error) {
            console.error("Error fetching buyers:", error);
        }
    }

    useEffect(() => {
        if (userAuthData.usrType === "admin") {
            fetchBuyersList();
        }
    }, [userAuthData]);
    
    return (
        <div className={`screen ${Styles.buyerScreen}`}>
            <Header />
            <div className={Styles.buyerListContainer}>
                <h1 style={{ textAlign: 'center', margin: '2rem' }}>Buyers List</h1>
                <table className={Styles.buyerTable}>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Bio</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers.length > 0 ? (
                            buyers.map((buyer) => (
                                <tr key={buyer._id}>
                                    <td>{buyer.usrFullName}</td>
                                    <td>{buyer.usrEmail}</td>
                                    <td>{buyer.usrMobileNumber}</td>
                                    <td>{buyer.userBio}</td>
                                    <td>
                                        <DeleteIcon style={{ cursor: 'pointer', color: 'red', margin: '10px' }} />
                                        <EditIcon style={{ cursor: 'pointer', color: 'blue' }} />
                                    </td>
                                </tr>
                            ))
                        ) : (                 
                            <tr>
                                <td colSpan="5">No buyers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default BuyerList;
