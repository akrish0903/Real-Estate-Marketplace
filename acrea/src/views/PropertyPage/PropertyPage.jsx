import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SecondHeader from '../../components/SecondHeader';
import Footer from '../../components/Footer';
import Styles from './css/PropertyPage.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Config } from '../../config/Config';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import { Message } from '@mui/icons-material';
import axios from 'axios';

function PropertyPage() {
    const location = useLocation();
    const propertyData = location.state;
    const userAuthData = useSelector(data => data.AuthUserDetailsSlice);
    const navigation = useNavigate();
    const [isFavorited, setIsFavorited] = useState(false);
    // Check if userAuthData is defined to avoid potential errors
    if (!userAuthData) {
        return <div>Loading...</div>;
    }

    

    return (
        <div className={`screen ${Styles.propertyScreen}`}>
            <Header />
            <SecondHeader/>
      {/* Property Header Image */}
      {/* <div className={Styles.Styles.propertyHeader}>
        <div className={Styles.propertyImageContainer}>
          <img src="/assets/a1.jpg" alt="" className={Styles.propertyImage} />
        </div>
      </div> */}

            {/* Go Back */}
            <div className={Styles.goBackSection}>
                <div className={Styles.goBackContainer}>
                    <a onClick={() => { navigation("/viewAllProperties") }} style={{ color: Config.color.primaryColor800, cursor: 'pointer' }}>
                        <ArrowBackIcon /> Back to Properties
                    </a>
                </div>
            </div>

            {/* Property Info */}
            <div className={Styles.propertyInfo}>
                <div className={Styles.propertyInfoContainer}>
                    <main>
                        <div className={Styles.propertyDetails}>
                            <div className={Styles.propertyType}>{propertyData.userListingType}</div>
                            <h1>{propertyData.usrListingName}</h1>
                            <div className={Styles.propertyAddress} style={{ color: Config.color.primaryColor800 }}>
                                <PlaceIcon />
                                <p>{propertyData.location.street}, {propertyData.location.city}, {propertyData.location.state} {propertyData.location.pinCode}</p>
                            </div>
                        </div>

                        <div className={Styles.descriptionSection}>
                            <h3>Description & Details</h3>
                            <div className={Styles.propertyDetailsGrid} style={{ color: Config.color.primaryColor900 }}>
                                <p><HotelIcon /> {propertyData.usrExtraFacilities.beds} Beds</p>
                                <p><BathtubIcon /> {propertyData.usrExtraFacilities.bath} Baths</p>
                                <p><SquareFootIcon /> {propertyData.usrListingSquareFeet} sqft</p>
                            </div>
                            <p>{propertyData.usrListingDescription}</p>
                        </div>

                        <div className={Styles.amenitiesSection}>
                            <h3>Amenities</h3>
                            <ul className={Styles.amenitiesList}>
                                {propertyData.usrAmenities.map((amenity, index) => (
                                    <li key={index}><CheckIcon /> {amenity}</li>
                                ))}
                            </ul>
                        </div>
                    </main>

                    {/* Sidebar */}
                    {userAuthData.usrType === 'buyer' && (
                        <aside className={Styles.sidebar}>
                            <button className={Styles.favoriteButton} style={{ color: Config.color.background }}>
                                <BookmarkIcon /> Favorite Property
                            </button>
                            {/* <button 
                                className={`${Styles.favoriteButton} ${isFavorited ? Styles.favorited : ''}`}
                                style={{
                                    color: Config.color.background,
                                    backgroundColor: isFavorited ? '#FFD700' : (Config.color.primaryColor900 || '#FF5733')
                                }}
                                onClick={isFavorited ? handleUnfavorite : handleFavorite} // Toggle function
                            >
                                <BookmarkIcon /> {isFavorited ? 'Favorited' : 'Favorite Property'}
                            </button> */}

                            <div className={Styles.contactFormSection}>
                                <h3>Contact Property Agent</h3>
                                <form>
                                    <div className={Styles.inputGroup}>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" id="name" placeholder="Enter your name" value={userAuthData.usrFullName} required disabled />
                                    </div>
                                    <div className={Styles.inputGroup}>
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" placeholder="Enter your email" value={userAuthData.usrEmail} required disabled />
                                    </div>
                                    <div className={Styles.inputGroup}>
                                        <label htmlFor="phone">Phone:</label>
                                        <input type="text" id="phone" placeholder="Enter your phone number" value={userAuthData.usrMobileNumber} disabled />
                                    </div>
                                    <div className={Styles.inputGroup}>
                                        <label htmlFor="message">Message:</label>
                                        <textarea id="message" placeholder="Enter your message" required></textarea>
                                    </div>
                                    <center>
                                        <button type="submit" className={Styles.sendMessageButton}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log('Chat Button Clicked');
                                            console.log('User Auth Data:', userAuthData);
                                            console.log('Passing data:', {
                                                buyerId: userAuthData.usrEmail, 
                                                agentId: propertyData.agentId, 
                                                propertyId: propertyData._id
                                            });
                                            navigation('/chat', {
                                                state: {
                                                    buyerId: userAuthData.usrEmail, // Pass buyer ID
                                                    agentId: propertyData.agentId, // Pass agent ID
                                                    propertyId: propertyData._id // Pass property info
                                                }
                                            });
                                        }}>
                                            
                                            <SendIcon /> Send Message
                                        </button>
                                    </center>
                                </form>
                            </div>

                            {/* Chat Button */}
                            <button
                                className={Styles.chatButton}
                                onClick={() => {
                                    console.log('Chat Button Clicked');
                                    console.log('User Auth Data:', userAuthData);
                                    console.log('Passing data:', {
                                        buyerId: userAuthData.usrEmail, 
                                        agentId: propertyData.agentId, 
                                        propertyId: propertyData._id
                                    });
                                    navigation('/chat', {
                                        state: {
                                            buyerId: userAuthData.usrEmail, // Pass buyer ID
                                            agentId: propertyData.agentId, // Pass agent ID
                                            propertyId: propertyData._id // Pass property info
                                        }
                                    });
                                }}
                                style={{ marginTop: '10px', backgroundColor: Config.color.primaryColor800, color: '#fff' }}
                            >
                                <ChatIcon /> Chat with Agent
                            </button>

                        </aside>
                    )}

                     {/* Only render if the user is a agent */}
                     {(userAuthData.usrType === 'agent' || userAuthData.usrType === 'admin' )&& (
                        <aside className={Styles.sidebar}>
                            <button 
                              className={Styles.editBtn} 
                              style={{ color: Config.color.background }} 
                              onClick={() => { navigation('/EditProperty', { state: propertyData })}} 
                            >
                              <EditIcon /> EDIT
                            </button>
                        </aside>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PropertyPage;
