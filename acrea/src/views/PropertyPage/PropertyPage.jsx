import React from'react'
import Header from '../../components/Header';
import SecondHeader from '../../components/SecondHeader';
import Footer from '../../components/Footer';
import Styles from './css/PropertyPage.module.css';
import './css/PropertyPage.module.css'
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Config } from '../../config/Config';
import { useNavigate } from 'react-router-dom';



// function PropertyPage(){
//   return (
//     <div>
//     <Header />
//     <SecondHeader/>
//     <div>


//       {/* Property Header Image */}
//       <div>
//         <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
//           <img
//             src="images/properties/a1.jpg"
//             alt=""
//             style={{ objectFit: 'cover', height: '400px', width: '100%' }}
//           />
//         </div>
//       </div>

//       {/* Go Back div */}
//       <div>
//         <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px 16px' }}>
//           <a href="./properties.html" style={{ color: '#ef4444', display: 'flex', alignItems: 'center' }}>
//             <i className="fas fa-arrow-left" style={{ marginRight: '4px' }}></i>
//             Back to Properties
//           </a>
//         </div>
//       </div>

//       {/* Property Info div */}
//       <div style={{ backgroundColor: '#e0f2fe' }}>
//         <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '40px 16px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: '24px' }}>
//             <main>
//               {/* Main Property Info */}
//               <div
//                 style={{
//                   backgroundColor: 'white',
//                   padding: '24px',
//                   borderRadius: '8px',
//                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                   textAlign: 'center',
//                 }}
//               >
//                 <div style={{ color: '#6b7280', marginBottom: '16px' }}>Apartment</div>
//                 <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
//                   Boston Commons Retreat
//                 </h1>
//                 <div
//                   style={{
//                     color: '#f97316',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: '16px',
//                   }}
//                 >
//                   <i
//                     className="fa-solid fa-location-dot"
//                     style={{ fontSize: '20px', marginRight: '8px' }}
//                   ></i>
//                   <p>120 Tremont Street Boston, MA 02111</p>
//                 </div>
//               </div>

//               {/* Description & Details */}
//               <div
//                 style={{
//                   backgroundColor: 'white',
//                   padding: '24px',
//                   borderRadius: '8px',
//                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                   marginTop: '24px',
//                 }}
//               >
//                 <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
//                   Description & Details
//                 </h3>
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     gap: '16px',
//                     color: '#dc2626',
//                     marginBottom: '16px',
//                     fontSize: '20px',
//                   }}
//                 >
//                   <p>
//                     <i className="fa-solid fa-bed"></i> 3
//                     <span style={{ marginLeft: '4px' }}>Beds</span>
//                   </p>
//                   <p>
//                     <i className="fa-solid fa-bath"></i> 2
//                     <span style={{ marginLeft: '4px' }}>Baths</span>
//                   </p>
//                   <p>
//                     <i className="fa-solid fa-ruler-combined"></i>
//                     1,500 <span style={{ marginLeft: '4px' }}>sqft</span>
//                   </p>
//                 </div>
//                 <p style={{ color: '#6b7280', marginBottom: '16px' }}>
//                   This is a beautiful apartment located near the commons
//                 </p>
//                 <p style={{ color: '#6b7280', marginBottom: '16px' }}>
//                   We have a beautiful apartment located near the commons. It is a 2 bedroom
//                   apartment with a full kitchen and bathroom. It is available for weekly or
//                   monthly rentals.
//                 </p>
//               </div>

//               {/* Amenities */}
//               <div
//                 style={{
//                   backgroundColor: 'white',
//                   padding: '24px',
//                   borderRadius: '8px',
//                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                   marginTop: '24px',
//                 }}
//               >
//                 <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
//                   Amenities
//                 </h3>
//                 <ul
//                   style={{
//                     display: 'grid',
//                     gridTemplateColumns: '1fr 1fr',
//                     gap: '16px',
//                     listStyle: 'none',
//                   }}
//                 >
//                   {[
//                     'Wifi',
//                     'Full kitchen',
//                     'Washer & Dryer',
//                     'Free Parking',
//                     'Hot Tub',
//                     '24/7 Security',
//                     'Wheelchair Accessible',
//                     'Elevator Access',
//                     'Dishwasher',
//                     'Gym/Fitness Center',
//                     'Air Conditioning',
//                     'Balcony/Patio',
//                     'Smart TV',
//                     'Coffee Maker',
//                   ].map((amenity, index) => (
//                     <li key={index}>
//                       <i className="fas fa-check" style={{ color: '#16a34a', marginRight: '8px' }}></i>
//                       {amenity}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </main>

//             {/* Sidebar */}
//             <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//               <button
//                 style={{
//                   backgroundColor: '#1e3a8a',
//                   color: 'white',
//                   fontWeight: 'bold',
//                   width: '100%',
//                   padding: '12px 24px',
//                   borderRadius: '9999px',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   cursor: 'pointer',
//                   border: 'none',
//                   outline: 'none',
//                 }}
//               >
//                 <i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i>
//                 Contact
//               </button>
//               <button
//                 style={{
//                   backgroundColor: '#1e3a8a',
//                   color: 'white',
//                   fontWeight: 'bold',
//                   width: '100%',
//                   padding: '12px 24px',
//                   borderRadius: '9999px',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   cursor: 'pointer',
//                   border: 'none',
//                   outline: 'none',
//                 }}
//               >
//                 <i className="fa-solid fa-file-contract" style={{ marginRight: '8px' }}></i>
//                 Apply
//               </button>
//             </aside>
//           </div>
//         </div>
//       </div>
//       </div>
//       <Footer/>
//     </div>
//   )
// }

// export default PropertyPage;

function PropertyPage() {
  var navigation = useNavigate();

  return (
    
    <div className={Styles.propertyScreen} style={{backgroundColor:Config.color.secondaryColor200}}>
      <Header/>
      <SecondHeader/>

      {/* Property Header Image */}
      {/* <section className="w-full">
  <div className="w-full m-auto">
    <div className="grid grid-cols-1">
      <img
        src="/assets/a1.jpg"
        alt=""
        className="object-cover w-full h-[400px] "
        style={{width:'1800'}}
      />
    </div>
  </div>
</section> */}

      {/* Property Header Image
       <div>
         <div style={{ maxWidth: '1280px', margin: '0', width:'100%'}}>
           <img
             src="/assets/signinBackground.jpg"
             alt=""
             style={{ objectFit: 'cover', height: '400px', width: '100%' }}
           />
         </div>
       </div> */}


      {/* Go Back */}
      <section style={{backgroundColor:Config.color.background,paddingTop:'1rem',paddingBottom:'1rem'}}>
        <div className="container m-auto py-6 px-6">
          <a onClick={()=>{navigation("/viewAllProperties")}} style={{color:Config.color.primaryColor800, cursor:'pointer'}}>
            <ArrowBackIcon/> Back to Properties
          </a>
        </div>
      </section>

      {/* Property Info */}
      <section>
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className={Styles.optionalAuthCardLeft} style={{backgroundColor:Config.color.background}}>
              {/* <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"> */}
                <div className="mb-2">Apartment</div>
                <h1 className="text-3xl font-bold mb-2">Boston Commons Retreat</h1>
                <div className="mb-4 flex align-middle justify-center md:justify-start" style={{color:Config.color.primaryColor900}}>
                  <PlaceIcon/>
                    <p className="text-orange-700">120 Tremont Street Boston, MA 02111</p>
                </div>
              </div>

              <div className={Styles.optionalAuthCardLeft} style={{backgroundColor:Config.color.background}}>
                <h3 className="text-lg font-bold mb-6">Description & Details</h3>
                <div className="flex justify-center gap-4  mb-4 text-xl space-x-9" style={{color:Config.color.primaryColor900, fontSize:'1.2rem'}}>
                  <p>
                    <HotelIcon/> 3 <span>Beds</span>
                  </p>
                  <p>
                    <BathtubIcon/> 2 <span className="bg-blue-50">Baths</span>
                  </p>
                  <p>
                    <SquareFootIcon/> 1,500{' '}
                    <span className="hidden sm:inline">sqft</span>
                  </p>
                </div>
                <p className="text-gray-500 mb-4">
                  This is a beautiful apartment located near the commons
                </p>
                <p className="text-gray-500 mb-4">
                  We have a beautiful apartment located near the commons. It is a 2 bedroom apartment
                  with a full kitchen and bathroom. It is available for weekly or monthly rentals.
                </p>
              </div>

              <div className={Styles.optionalAuthCardLeft} style={{backgroundColor:Config.color.background}}>
                {/* className="bg-white p-6 rounded-lg shadow-md mt-6"> */}
                <h3 className="text-lg font-bold mb-6">Amenities</h3>
                {/* <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"> */}
                <ul
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    listStyle: 'none',
                  }}
                >
                  {[
                    'Wifi',
                    'Full kitchen',
                    'Washer & Dryer',
                    'Free Parking',
                    'Hot Tub',
                    '24/7 Security',
                    'Wheelchair Accessible',
                    'Elevator Access',
                    'Dishwasher',
                    'Gym/Fitness Center',
                    'Air Conditioning',
                    'Balcony/Patio',
                    'Smart TV',
                    'Coffee Maker',
                  ].map((amenity, index) => (
                    <li key={index}>
                      <i className="fas fa-check" style={{ color: '#16a34a', marginRight: '8px' }}></i>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </main>

            {/* Sidebar */}
            <aside class="space-y-4">       
            <button className={Styles.btn} style={{ color:Config.color.background}} 
            // class="bg-blue hover:bg-blue-dark text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
              <BookmarkIcon/> Favorite Property
            </button>
            <div className={Styles.optionalAuthCardRight} style={{backgroundColor:Config.color.background}}>
              <h3 class="font-bold mb-6" style={{fontSize:Config.fontSize.medium}}>Contact Property Manager</h3>
              <form >
              <div classname="mb-4">
                <input placeholder="Enter your name" classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" required=""/>
              </div>
                <div class="mb-4">
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" required=""/>
                </div>
                <div classname="mb-4">
                  <input classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Enter your phone number"/>
                </div>
                <div class="mb-4">
                  <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline" id="message" placeholder="Enter your message"></textarea>
                </div>
                <div>
                  <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center" type="submit">
                    <i class="fas fa-paper-plane mr-2"></i> Send Message
                  </button>
                </div>
              </form>
            </div>
          </aside>
            
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default PropertyPage;