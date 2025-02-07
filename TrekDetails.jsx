// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './../TrekDetails/trek-details.css';
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";

// const TrekDetails = () => {
//   const { trekName } = useParams();
//   const [trekDetails, setTrekDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTrekDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/trek-details/${encodeURIComponent(trekName)}`);
//         if (response.data.length > 0) {
//           setTrekDetails(response.data); // Updated: Assign full response data (array).
//         } else {
//           setTrekDetails(null);
//         }
//       } catch (err) {
//         setError("Unable to fetch trek details at this time.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrekDetails();
//   }, [trekName]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!trekDetails) {
//     return <div>No details available for this trek.</div>;
//   }

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="trek-details-page">
//         <h1>Details for {decodeURIComponent(trekName)}</h1>
//         {trekDetails.map((details, index) => (
//           <div key={index} className="trek-detail-card">
//             <h2 className="detail-title">{details.title}</h2>
//             <p><strong>Source:</strong> {details.site}</p>
//             <p><strong>Description:</strong> {details.description}</p>
//             <p><strong>Itinerary:</strong> {details.itinerary}</p>
//             <p><strong>Altitude:</strong> {details.altitude}</p>
//             <p><strong>Duration:</strong> {details.duration}</p>
//             <p><strong>Difficulty Level:</strong> {details.difficulty}</p>
//             <p><strong>Best Time to Visit:</strong> {details.bestTimeToVisit}</p>
//             <p><strong>State:</strong> {details.state}</p>
//             <a href={details.url} target="_blank" rel="noopener noreferrer">View Original Source</a>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TrekDetails;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './../TrekDetails/trek-details.css'; // Assume you have styles for this page
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const TrekDetails = () => {
//   const { trekName } = useParams();
//   const [trekDetails, setTrekDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTrekDetails = async () => {
//       try {
//         // Normalizing trekName to match the expected URL format in the server
//         const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');
        
//         const response = await axios.get(`http://localhost:5000/api/trek-details/${normalizedTrekName}`);
//         if (response.data.length > 0) {
//           setTrekDetails(response.data); // Updated: Assign full response data (array).
//         } else {
//           setTrekDetails(null);
//         }
//       } catch (err) {
//         setError("Unable to fetch trek details at this time.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrekDetails();
//   }, [trekName]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!trekDetails) {
//     return <div>No details available for this trek.</div>;
//   }

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="trek-details-page">
//         <h1>Details for {decodeURIComponent(trekName)}</h1>
//         {trekDetails.length > 0 ? (
//           trekDetails.map((details, index) => (
//             <div key={index} className="trek-detail-card">
//               <h2 className="trek-details-title">{details.title}</h2>
//               <p><strong>Source:</strong> {details.site}</p>
//               <p><strong>Description:</strong> {details.description}</p>
//               <p><strong>Itinerary:</strong> {details.itinerary}</p>
//               <p><strong>Altitude:</strong> {details.altitude}</p>
//               <p><strong>Duration:</strong> {details.duration}</p>
//               <p><strong>Difficulty Level:</strong> {details.difficulty}</p>
//               <p><strong>Best Time to Visit:</strong> {details.bestTimeToVisit}</p>
//               <p><strong>State:</strong> {details.state}</p>
//               <a href={details.url} target="_blank" rel="noopener noreferrer">View Original Source</a>
//             </div>
//           ))
//         ) : (
//           <div>No additional details found for this trek.</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default TrekDetails;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './../TrekDetails/trek-details.css'; // Import the new CSS for this page
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const TrekDetails = () => {
//   const { trekName } = useParams();
//   const [trekDetails, setTrekDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTrekDetails = async () => {
//       try {
//         const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');
        
//         const response = await axios.get(`http://localhost:5000/api/trek-details/${normalizedTrekName}`);
//         if (response.data.length > 0) {
//           setTrekDetails(response.data); 
//         } else {
//           setTrekDetails(null);
//         }
//       } catch (err) {
//         setError("Unable to fetch trek details at this time.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrekDetails();
//   }, [trekName]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!trekDetails) {
//     return <div>No details available for this trek.</div>;
//   }

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="trek-details-page">
//         {/* <h1 className="detailsHeader">Details for {decodeURIComponent(trekName)}</h1> */}
//         {trekDetails.map((details, index) => (
//           <div key={index} className="trek-detail-card">
//             <h2 className="trek-title">{details.title}</h2>
//             <p className="trek-source"><strong>Source:</strong> {details.site}</p>
//             <div className="trek-description" dangerouslySetInnerHTML={{ __html: details.description }}></div>
//             <div className="trek-itinerary" dangerouslySetInnerHTML={{ __html: details.itinerary }}></div>
//             <p className="trek-altitude"><strong>Altitude:</strong> {details.altitude}</p>
//             <p className="trek-duration"><strong>Duration:</strong> {details.duration}</p>
//             <p className="trek-difficulty"><strong>Difficulty Level:</strong> {details.difficulty}</p>
//             <p className="trek-best-time"><strong>Best Time to Visit:</strong> {details.bestTimeToVisit}</p>
//             <p className="trek-state"><strong>State:</strong> {details.state}</p>
//             <a href={details.url} target="_blank" rel="noopener noreferrer" className="original-source-link">View Original Source</a>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TrekDetails;



// LATEST WORKING TREKDETAILS.JSX

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './../TrekDetails/trek-details.css'; // Import the new CSS for this page
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const TrekDetails = () => {
//   const { trekName } = useParams();
//   const [trekDetails, setTrekDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   useEffect(() => {
//     const fetchTrekDetails = async () => {
//       try {
//         const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');
        
//         const response = await axios.get(`http://localhost:5000/api/trek-details/${normalizedTrekName}`);
//         if (response.data.length > 0) {
//           setTrekDetails(response.data); 
//         } else {
//           setTrekDetails(null);
//         }
//       } catch (err) {
//         setError("Unable to fetch trek details at this time.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrekDetails();
//   }, [trekName]);

//   const toggleDescription = () => {
//     setShowFullDescription(!showFullDescription);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!trekDetails) {
//     return <div>No details available for this trek.</div>;
//   }

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="trek-details-page">
//         {/* <h1>Details for {decodeURIComponent(trekName)}</h1> */}
//         {trekDetails.map((details, index) => (
//           <div key={index} className="trek-detail-card">
//             <h2 className="trek-title">{details.title}</h2>
//             <p className="trek-source"><strong>Source:</strong> {details.site}</p>
//             <div className="trek-description">
//               {showFullDescription ? (
//                 <>
//                   <div dangerouslySetInnerHTML={{ __html: details.description }}></div>
//                   <button onClick={toggleDescription} className="toggle-description-btn">Read less</button>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     {details.description.split(' ').slice(0, 30).join(' ')}...{' '}
//                   </div>
//                   <button onClick={toggleDescription} className="toggle-description-btn">Read more</button>
//                 </>
//               )}
//             </div>
//             <div className="trek-itinerary" dangerouslySetInnerHTML={{ __html: details.itinerary }}></div>
//             <p className="trek-altitude"><strong className="altitude">Altitude:</strong> {details.altitude}</p>
//             <p className="trek-duration"><strong className="duration" >Duration:</strong> {details.duration}</p>
//             <p className="trek-difficulty"><strong className="difficultyLevel">Difficulty Level:</strong> {details.difficulty}</p>
//             <p className="trek-best-time"><strong className="bestTime">Best Time to Visit:</strong> {details.bestTimeToVisit}</p>
//             <p className="trek-state"><strong className="state">State:</strong> {details.state}</p>
//             <a href={details.url} target="_blank" rel="noopener noreferrer" className="original-source-link">View Original Source</a>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TrekDetails;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './../TrekDetails/trek-details.css'; // Import the CSS for this page
// import Banner from "../../components/Banner/Banner";
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";

// const TrekDetails = () => {
//   const { trekName } = useParams();
//   const [trekDetails, setTrekDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);

//   useEffect(() => {
//     const fetchTrekDetails = async () => {
//       try {
//         const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');

//         const response = await axios.get(`http://localhost:5000/api/trek-details/${normalizedTrekName}`);
//         if (response.data.length > 0) {
//           setTrekDetails(response.data);
//         } else {
//           setTrekDetails(null);
//         }
//       } catch (err) {
//         setError("Unable to fetch trek details at this time.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrekDetails();
//   }, [trekName]);

//   const toggleCardExpansion = (index) => {
//     setExpandedCardIndex(expandedCardIndex === index ? null : index);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!trekDetails) {
//     return <div>No details available for this trek.</div>;
//   }

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="trek-details-page">
//         {trekDetails.map((details, index) => (
//           <div
//             key={index}
//             className={`trek-detail-card ${expandedCardIndex === index ? 'expanded' : ''}`}
//             onClick={() => toggleCardExpansion(index)}
//           >
//             <div className="card-content">
//               <div className="image-container">
//                 <img
//                   src={details.image || 'https://via.placeholder.com/150'} // Placeholder image
//                   alt={details.title}
//                   className="trek-image"
//                 />
//               </div>
//               <div className="text-details">
//                 <h2 className="trek-title">{details.title}</h2>
//                 <div className="rating-box">
//                   <span className="rating">4.5★</span> {details.ratings} Ratings & {details.reviews} Reviews
//                 </div>
//                 <a href={details.itineraryLink} target="_blank" rel="noopener noreferrer" className="itinerary-link">
//                   Itinerary Link
//                 </a>
//                 <div className="trek-details-info">
//                   <p><strong>Day/Night:</strong> {details.duration}</p>
//                   <p><strong>Guide to Trekkers Ratio:</strong> {details.guideRatio}</p>
//                   <p><strong>Avg Batch Size:</strong> {details.batchSize}</p>
//                   <p><strong>Rentals:</strong> {details.rentals}</p>
//                 </div>
//               </div>
//             </div>
//             {expandedCardIndex === index && (
//               <div className="trek-description">
//                 <p>{details.description}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TrekDetails;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './../TrekDetails/trek-details.css';
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const TrekDetails = () => {
//   const { trekName } = useParams();
//   const [trekDetails, setTrekDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);

//   useEffect(() => {
//     const fetchTrekDetails = async () => {
//       try {
//         const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');
        
//         const response = await axios.get(`http://localhost:5000/api/trek-details/${normalizedTrekName}`);
//         if (response.data.length > 0) {
//           setTrekDetails(response.data); 
//         } else {
//           setTrekDetails(null);
//         }
//       } catch (err) {
//         setError("Unable to fetch trek details at this time.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrekDetails();
//   }, [trekName]);

//   const toggleDescription = (index) => {
//     setExpandedCardIndex(expandedCardIndex === index ? null : index);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!trekDetails) return <div>No details available for this trek.</div>;

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="trek-details-container">
//         {trekDetails.map((details, index) => (
//           <div 
//             key={index} 
//             className="trek-card" 
//             onClick={() => toggleDescription(index)}
//           >
//             <div className="trek-card-content">
//               <div className="trek-card-left">
//                 <img 
//                   src={details.imageUrl || 'https://via.placeholder.com/150'} 
//                   alt={details.title} 
//                   className="trek-card-image" 
//                 />
//               </div>
              
//               <div className="trek-card-right">
//                 <div className="trek-card-header">
//                   <h2 className="trek-card-title">{details.title}</h2>
//                   <span className="trek-card-price">{details.price} Price</span>
//                 </div>
                
//                 <div className="trek-card-rating">{details.rating} 92,801 Ratings and 4,494 Reviews </div>
                
//                 <a 
//                   href={details.itineraryLink} 
//                   target="_blank" 
//                   rel="noopener noreferrer" 
//                   className="trek-card-itinerary-link"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   View Itinerary
//                 </a>
                
//                 <div className="trek-card-meta">
//                   <span><strong>Altitude:</strong> {details.altitude}</span>
//                   <span><strong>Duration:</strong> {details.duration}</span>
//                   <span><strong>Difficulty:</strong> {details.difficulty}</span>
//                   <span><strong>Avg Batch Size:</strong> {details.batchSize}</span>
//                   <span><strong>Rentals:</strong> {details.rentals}</span>
//                 </div>
//               </div>
//             </div>

//             {expandedCardIndex === index && (
//               <div className="trek-card-description">
//                 <button 
//                   className="toggle-description-btn"
//                   onClick={() => toggleDescription(index)}
//                 >
//                   Collapse Description
//                 </button>
//                 <div dangerouslySetInnerHTML={{ __html: details.description }} />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TrekDetails;




import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import './../TrekDetails/trek-details.css';
import Banner from "../../components/Banner/Banner"; 
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

const TrekDetails = () => {
  const { trekName } = useParams();
  const [trekDetails, setTrekDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

//   useEffect(() => {
//     const fetchTrekDetails = async () => {
//         try {
//             const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');
//             const response = await axios.get(`http://localhost:5000/api/trek-details/${normalizedTrekName}`);
//             console.log('Fetched Trek Details:', response.data); // Log data to confirm
//             if (response.data.length > 0) {
//                 setTrekDetails(response.data);
//             } else {
//                 setTrekDetails(null);
//             }
//         } catch (err) {
//             setError("Unable to fetch trek details at this time.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchTrekDetails();
// }, [trekName]);









//WORKINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
// useEffect(() => {
//   const fetchTrekDetails = async () => {
//     try {
//       const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');
//       const apiUrl = `http://localhost:5000/api/trek-details/${normalizedTrekName}`;
//       console.log("API URL for Fetching Trek Details:", apiUrl);
      
//       const response = await axios.get(apiUrl);
//       console.log('Fetched Trek Details:', response.data);
      
//       if (response.data.length > 0) {
//         setTrekDetails(response.data);
        
//       } else {
//         setTrekDetails(null);
//       }
//     } catch (err) {
//       setError("Unable to fetch trek details at this time.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchTrekDetails();
// }, [trekName]);




useEffect(() => {
  const fetchTrekDetails = async () => {
      try {
          // Normalizing the trekName to match how it's stored in the database
          const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');
          const response = await axios.get(`http://localhost:5000/api/trek-details/${normalizedTrekName}`);
          console.log('Fetched Trek Details:', response.data); // Log data to confirm
          if (response.data.length > 0) {
              setTrekDetails(response.data);
          } else {
              setTrekDetails(null);
          }
      } catch (err) {
          setError("Unable to fetch trek details at this time.");
      } finally {
          setLoading(false);
      }
  };

  fetchTrekDetails();
}, [trekName]);



















  const toggleDescription = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  // const handleItineraryLinkClick = (link) => {
  //   window.open(link, '_blank');
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!trekDetails) return <div>No details available for this trek.</div>;

  

  return (
    <>
      <Banner />
      <AdvanceSearch />
      <div className="trek-details-container">
        {trekDetails.map((details, index) => (
          <div 
            key={index} 
            className="trek-card" 
            onClick={() => toggleDescription(index)}
          >
            <div className="trek-card-content">
              <div className="trek-card-left">
                <img 
                  src={details.img_url} 
                  alt={details.title} 
                  className="trek-card-image" 
                />
              </div>
              
              <div className="trek-card-right">
                <div className="trek-card-header">
                  <h2 className="trek-card-siteName">{details.site_name}</h2>
                  
                {/* <h2 className="trek-card-title">{details["Trek Name"]}</h2> */}
             
                  <span className="trek-card-price">{details.price}</span>
                </div>
                
                <div className="trek-card-rating">{details.rating} Rating</div>
                
                {/* <a 
                  href={details.itineraryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trek-card-itinerary-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItineraryLinkClick(details.url);
                  }}
                >
                  View Itinerary
                </a> */}

<a
                href={details.itinerary_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="article-card-itinerary-link"
                onClick={(e) => e.stopPropagation()}
              >
                View Itinerary
              </a>





                
                <div className="trek-card-meta">
                  <span><strong>Day/Night:</strong> {details.day_and_night}</span>
                  <span><strong>Guide to Trekkers Ratio:</strong> {details.duration}</span>
                  <span><strong>Avg Batch Size:</strong> {details.batchSize}</span>
                  <span><strong>Rentals:</strong> {details.rentals}</span>
                  <span className="toggle-description-btn-trekDetailsExpand"><strong>Click here to view Description</strong> </span>
                </div>
              </div>
            </div>

            {expandedCardIndex === index && (
              <div className="trek-card-description">
                <button 
                  className="toggle-description-btn-trekDetails"
                  onClick={() => toggleDescription(index)}
                >
                  Collapse Description
                </button>
                <div dangerouslySetInnerHTML={{ __html: details.description }} />
              </div>
            )}
          </div>
        ))}
      </div>



      {/* <div className="trek-details-container">
        {trekDetails.map((details, index) => (
          <div 
            key={index} 
            className="trek-card" 
            onClick={() => toggleDescription(index)}
          >
            <div className="trek-card-content">
              <div className="trek-card-left">
                <img 
                  src={details.imageUrl || 'https://via.placeholder.com/150'} 
                  alt={details.siteName} 
                  className="trek-card-image" 
                />
              </div>
              
              <div className="trek-card-right">
                <div className="trek-card-header">
                  <h2 className="trek-card-title">{details.siteName}</h2>
                  <span className="trek-card-price">{details.price} Price</span>
                </div>
                
                <div className="trek-card-rating">{details.rating} 92,801 Ratings and 4,494 Reviews </div>
                
                <a 
                  href={details.itineraryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trek-card-itinerary-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItineraryLinkClick(details.url);
                  }}
                >
                  View Itinerary
                </a>
                
                <div className="trek-card-meta">
                  <span><strong>Day/Night:</strong> {details.altitude}</span>
                  <span><strong>Guide to Trekkers Ratio:</strong> {details.duration}</span>
                  <span><strong>Avg Batch Size:</strong> {details.batchSize}</span>
                  <span><strong>Rentals:</strong> {details.rentals}</span>
                </div>
              </div>
            </div>

            {expandedCardIndex === index && (
              <div className="trek-card-description">
                <button 
                  className="toggle-description-btn"
                  onClick={() => toggleDescription(index)}
                >
                  Collapse Description
                </button>
                <div dangerouslySetInnerHTML={{ __html: details.description }} />
              </div>
            )}
          </div>
        ))}
      </div> */}




      {/* <div className="trek-details-container">
        {trekDetails.map((details, index) => (
          <div 
            key={index} 
            className="trek-card" 
            onClick={() => toggleDescription(index)}
          >
            <div className="trek-card-content">
              <div className="trek-card-left">
                <img 
                  src={details.imageUrl || 'https://via.placeholder.com/150'} 
                  alt={details.title} 
                  className="trek-card-image" 
                />
              </div>
              
              <div className="trek-card-right">
                <div className="trek-card-header">
                  <h2 className="trek-card-title">{details.title}</h2>
                  <span className="trek-card-price">{details.price} Price</span>
                </div>
                
                <div className="trek-card-rating">{details.rating} 92,801 Ratings and 4,494 Reviews </div>
                
                <a 
                  href={details.itineraryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trek-card-itinerary-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItineraryLinkClick(details.url);
                  }}
                >
                  View Itinerary
                </a>
                
                <div className="trek-card-meta">
                  <span><strong>Day/Night:</strong> {details.altitude}</span>
                  <span><strong>Guide to Trekkers Ratio:</strong> {details.duration}</span>
                  <span><strong>Avg Batch Size:</strong> {details.batchSize}</span>
                  <span><strong>Rentals:</strong> {details.rentals}</span>
                </div>
              </div>
            </div>

            {expandedCardIndex === index && (
              <div className="trek-card-description">
                <button 
                  className="toggle-description-btn"
                  onClick={() => toggleDescription(index)}
                >
                  Collapse Description
                </button>
                <div dangerouslySetInnerHTML={{ __html: details.description }} />
              </div>
            )}
          </div>
        ))}
      </div> */}




      {/* <div className="trek-details-container">
        {trekDetails.map((details, index) => (
          <div 
            key={index} 
            className="trek-card" 
            onClick={() => toggleDescription(index)}
          >
            <div className="trek-card-content">
              <div className="trek-card-left">
                <img 
                  src={details.imageUrl || 'https://via.placeholder.com/150'} 
                  alt={details.title} 
                  className="trek-card-image" 
                />
              </div>
              
              <div className="trek-card-right">
                <div className="trek-card-header">
                  <h2 className="trek-card-title">{details.title}</h2>
                  <span className="trek-card-price">{details.price} Price</span>
                </div>
                
                <div className="trek-card-rating">{details.rating} 92,801 Ratings and 4,494 Reviews </div>
                
                <a 
                  href={details.itineraryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trek-card-itinerary-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItineraryLinkClick(details.url);
                  }}
                >
                  View Itinerary
                </a>
                
                <div className="trek-card-meta">
                  <span><strong>Day/Night:</strong> {details.altitude}</span>
                  <span><strong>Guide to Trekkers Ratio:</strong> {details.duration}</span>
                  <span><strong>Avg Batch Size:</strong> {details.batchSize}</span>
                  <span><strong>Rentals:</strong> {details.rentals}</span>
                </div>
              </div>
            </div>

            {expandedCardIndex === index && (
              <div className="trek-card-description">
                <button 
                  className="toggle-description-btn"
                  onClick={() => toggleDescription(index)}
                >
                  Collapse Description
                </button>
                <div dangerouslySetInnerHTML={{ __html: details.description }} />
              </div>
            )}
          </div>
        ))}
      </div> */}
    </>
  );
};

export default TrekDetails;