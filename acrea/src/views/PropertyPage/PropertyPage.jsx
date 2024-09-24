import React from 'react';
import Header from '../../components/Header';
import SecondHeader from '../../components/SecondHeader';
import Footer from '../../components/Footer';
import { useLocation } from 'react-router-dom';

function PropertyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <SecondHeader />
      <div style={{ flex: '1' }}> {/* Ensures content expands vertically */}
        {/* Property Header Image */}
        <div>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <img
              src="images/properties/a1.jpg"
              alt=""
              style={{ objectFit: 'cover', height: '400px', width: '100%' }}
            />
          </div>
        </div>

        {/* Go Back div */}
        <div>
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px 16px' }}>
            <a href="./properties.html" style={{ color: '#ef4444', display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '4px' }}></i>
              Back to Properties
            </a>
          </div>
        </div>

        {/* Property Info div */}
        <div style={{ backgroundColor: '#e0f2fe' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '40px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              <main>
                {/* Main Property Info */}
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ color: '#6b7280', marginBottom: '16px' }}>Apartment</div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                    Boston Commons Retreat
                  </h1>
                  <div
                    style={{
                      color: '#f97316',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ fontSize: '20px', marginRight: '8px' }}
                    ></i>
                    <p>120 Tremont Street Boston, MA 02111</p>
                  </div>
                </div>

                {/* Description & Details */}
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    marginTop: '24px',
                  }}
                >
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Description & Details
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '16px',
                      color: '#dc2626',
                      marginBottom: '16px',
                      fontSize: '20px',
                    }}
                  >
                    <p>
                      <i className="fa-solid fa-bed"></i> 3
                      <span style={{ marginLeft: '4px' }}>Beds</span>
                    </p>
                    <p>
                      <i className="fa-solid fa-bath"></i> 2
                      <span style={{ marginLeft: '4px' }}>Baths</span>
                    </p>
                    <p>
                      <i className="fa-solid fa-ruler-combined"></i>
                      1,500 <span style={{ marginLeft: '4px' }}>sqft</span>
                    </p>
                  </div>
                  <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                    This is a beautiful apartment located near the commons
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                    We have a beautiful apartment located near the commons. It is a 2 bedroom
                    apartment with a full kitchen and bathroom. It is available for weekly or
                    monthly rentals.
                  </p>
                </div>

                {/* Amenities */}
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    marginTop: '24px',
                  }}
                >
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Amenities
                  </h3>
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
              <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                  style={{
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    fontWeight: 'bold',
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  <i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i>
                  Contact
                </button>
                <button
                  style={{
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    fontWeight: 'bold',
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  <i className="fa-solid fa-file-contract" style={{ marginRight: '8px' }}></i>
                  Apply
                </button>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PropertyPage;
