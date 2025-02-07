// import React, { useEffect, useState } from "react";
// import { Container, Row, Navbar, Offcanvas, Nav } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import "../Header/header.css";
// import peakPlannerLogo from "./../../../assets/images/Peakplanner-logo.png";

// const Header = () => {
//   const [open, setOpen] = useState(false);

//   const toggleMenu = () => {
//     setOpen(!open);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", isSticky);
//     return () => {
//       window.removeEventListener("scroll", isSticky);
//     };
//   });

//   //   sticky header
//   const isSticky = (e) => {
//     const header = document.querySelector(".header-section");
//     const scrollTop = window.scrollY;
//     scrollTop >= 120
//       ? header.classList.add("is-sticky")
//       : header.classList.remove("is-sticky");
//   };

//   // const closeMenu =()=>{
//   //   if(window.innerWidth <= 991){
//   //     setOpen(false)
//   //   }
//   // }

//   return (
//     <header className="header-section">
//       <Container>
//         <Row>
//           <Navbar expand="sm" className="p-0">
//             {/* Logo Section */}
//             {/* <Navbar.Brand href="#">
//               <NavLink to="/">
//                 <img
//                   src="/path/to/logo.png" // replace this with the actual path to your logo file
//                   alt=""
//                   style={{ height: "40px" }} // Adjust the height as needed
//                 />
//               </NavLink>
//             </Navbar.Brand> */}
//             <Navbar.Brand href="#">
//               <NavLink to="/">
//                 <img
//                   className="imgLogo"
//                   src={peakPlannerLogo} // replace this with the actual path to your logo file
//                   alt=""
//                 />
//               </NavLink>
//             </Navbar.Brand>
//             {/* End of Logo Section */}
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-lg`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
//               placement="start"
//               show={open}
//             >
//               {/* Mobile Logo Section */}
//               <Offcanvas.Header>
//                 <h1 className="Logo">Peak Planner</h1>
//                 <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
//                   <i className="bi bi-x-lg"></i>
//                 </span>
//               </Offcanvas.Header>
//               {/* End of Mobile Logo Section */}
//               <Offcanvas.Body>
//                 <Nav className="justify-content-center flex-grow-1 pe-3">
//                   <Nav.Link className="mx-1 nav-link" to="/" href="top-treks">
//                     Top Treks
//                   </Nav.Link>
//                   <Nav.Link
//                     className="mx-1 nav-link"
//                     to="/"
//                     href="upcoming-treks"
//                   >
//                     Upcoming Treks
//                   </Nav.Link>
//                   <Nav.Link
//                     className="mx-1 nav-link"
//                     to="/"
//                     href="hiking-schools"
//                   >
//                     Hiking Schools
//                   </Nav.Link>
//                   <Nav.Link className="mx-1 nav-link" to="/" href="articles">
//                     Articles
//                   </Nav.Link>
//                   <Nav.Link className="mx-1 nav-link" to="/" href="Seasonal Treks">
//                     Seasonal Treks
//                   </Nav.Link>
//                   <Nav.Link
//                     className="mx-1 nav-link"
//                     to="/about-us"
//                     href="about-us"
//                   >
//                     About Us
//                   </Nav.Link>

//                   <Nav.Link className="mx-1 nav-link" to="/" href="contact-us">
//                     Contact Us
//                   </Nav.Link>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//             <div className="ms-md-4 ms-2 me-4">
//               <NavLink className="primaryBtn d-sm-inline-block">Login</NavLink>
//             </div>
//             <div className="ms-md-1 ms-1 me-4">
//               <NavLink className="primaryBtn d-sm-inline-block">
//                 Sign Up
//               </NavLink>
//               <li className="d-inline-block d-lg-none ms-3 toggle_btn">
//                 <i
//                   className={open ? "bi bi-lg" : "bi bi-list"}
//                   onClick={toggleMenu}
//                 ></i>
//               </li>
//             </div>
//           </Navbar>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Header;

// import React, { useEffect, useState } from "react";
// import { Container, Row, Navbar, Offcanvas, Nav } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import "../Header/header.css";
// import peakPlannerLogo from "./../../../assets/images/Peakplanner-logo.png";

// const Header = () => {
//   const [open, setOpen] = useState(false);

//   const toggleMenu = () => {
//     setOpen(!open);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", isSticky);
//     return () => {
//       window.removeEventListener("scroll", isSticky);
//     };
//   });

//   // Sticky header function
//   const isSticky = () => {
//     const header = document.querySelector(".header-section");
//     const scrollTop = window.scrollY;
//     scrollTop >= 120
//       ? header.classList.add("is-sticky")
//       : header.classList.remove("is-sticky");
//   };

//   return (
//     <header className="header-section">
//       <Container>
//         <Row>
//           <Navbar expand="sm" className="p-0">
//             {/* Logo Section */}
//             <Navbar.Brand href="#">
//               <NavLink to="/">
//                 <img
//                   className="imgLogo"
//                   src={peakPlannerLogo}
//                   alt="Peak Planner Logo"
//                 />
//               </NavLink>
//             </Navbar.Brand>
//             {/* End of Logo Section */}

//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-lg`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
//               placement="start"
//               show={open}
//               onHide={toggleMenu}
//             >
//               {/* Mobile Logo Section */}
//               <Offcanvas.Header closeButton>
//                 <h1 className="Logo">Peak Planner</h1>
//               </Offcanvas.Header>
//               {/* End of Mobile Logo Section */}

//               <Offcanvas.Body>
//                 <Nav className="justify-content-center flex-grow-1 pe-3">
//                   <NavLink className="mx-1 nav-link" to="/top-treks">
//                     Top Treks
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/upcoming-treks">
//                     Upcoming Treks
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/hiking-schools">
//                     Hiking Schools
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/articles">
//                     Articles
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/seasonal-treks">
//                     Seasonal Treks
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/about-us">
//                     About Us
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/contact-us">
//                     Contact Us
//                   </NavLink>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>

//             <div className="ms-md-4 ms-2 me-4">
//               <NavLink to="/login" className="primaryBtn d-sm-inline-block">
//                 Login
//               </NavLink>
//             </div>
//             <div className="ms-md-1 ms-1 me-4">
//               <NavLink to="/signup" className="primaryBtn d-sm-inline-block">
//                 Sign Up
//               </NavLink>
//               <li className="d-inline-block d-lg-none ms-3 toggle_btn">
//                 <i
//                   className={open ? "bi bi-x-lg" : "bi bi-list"}
//                   onClick={toggleMenu}
//                 ></i>
//               </li>
//             </div>
//           </Navbar>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Header;

// import React, { useEffect, useState } from "react";
// import { Container, Row, Navbar, Offcanvas, Nav, NavDropdown } from "react-bootstrap";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../Header/header.css";
// import peakPlannerLogo from "./../../../assets/images/Peakplanner-logo.png";

// const Header = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setOpen(!open);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", isSticky);
//     return () => {
//       window.removeEventListener("scroll", isSticky);
//     };
//   });

//   // Sticky header function
//   const isSticky = () => {
//     const header = document.querySelector(".header-section");
//     const scrollTop = window.scrollY;
//     scrollTop >= 120
//       ? header.classList.add("is-sticky")
//       : header.classList.remove("is-sticky");
//   };

//   const handleSeasonSelect = (season) => {
//     navigate(`/seasonal-treks/${season}`);
//   };

//   return (
//     <header className="header-section">
//       <Container>
//         <Row>
//           <Navbar expand="sm" className="p-0">
//             {/* Logo Section */}
//             <Navbar.Brand href="#">
//               <NavLink to="/">
//                 <img
//                   className="imgLogo"
//                   src={peakPlannerLogo}
//                   alt="Peak Planner Logo"
//                 />
//               </NavLink>
//             </Navbar.Brand>
//             {/* End of Logo Section */}

//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-lg`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
//               placement="start"
//               show={open}
//               onHide={toggleMenu}
//             >
//               {/* Mobile Logo Section */}
//               <Offcanvas.Header closeButton>
//                 <h1 className="Logo">Peak Planner</h1>
//               </Offcanvas.Header>
//               {/* End of Mobile Logo Section */}

//               <Offcanvas.Body>
//                 <Nav className="justify-content-center flex-grow-1 pe-3">
//                   <NavLink className="mx-1 nav-link" to="/top-treks">
//                     Top Treks
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/upcoming-treks">
//                     Upcoming Treks
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/hiking-schools">
//                     Hiking Schools
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/articles">
//                     Articles
//                   </NavLink>

//                   {/* Seasonal Treks Dropdown */}
//                   <NavDropdown title="Seasonal Treks" id="seasonal-treks-dropdown">
//                     <NavDropdown.Item onClick={() => handleSeasonSelect('spring')}>Spring</NavDropdown.Item>
//                     <NavDropdown.Item onClick={() => handleSeasonSelect('summer')}>Summer</NavDropdown.Item>
//                     <NavDropdown.Item onClick={() => handleSeasonSelect('autumn')}>Autumn</NavDropdown.Item>
//                     <NavDropdown.Item onClick={() => handleSeasonSelect('winter')}>Winter</NavDropdown.Item>
//                   </NavDropdown>

//                   <NavLink className="mx-1 nav-link" to="/about-us">
//                     About Us
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/contact-us">
//                     Contact Us
//                   </NavLink>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>

//             <div className="ms-md-4 ms-2 me-4">
//               <NavLink to="/login" className="primaryBtn d-sm-inline-block">
//                 Login
//               </NavLink>
//             </div>
//             <div className="ms-md-1 ms-1 me-4">
//               <NavLink to="/signup" className="primaryBtn d-sm-inline-block">
//                 Sign Up
//               </NavLink>
//               <li className="d-inline-block d-lg-none ms-3 toggle_btn">
//                 <i
//                   className={open ? "bi bi-x-lg" : "bi bi-list"}
//                   onClick={toggleMenu}
//                 ></i>
//               </li>
//             </div>
//           </Navbar>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Header;




// LAST WORKING HEADER 
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Navbar,
//   Offcanvas,
//   Nav,
//   NavDropdown,
// } from "react-bootstrap";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../Header/header.css";
// import peakPlannerLogo from "./../../../assets/images/Peakplanner-logo.png";

// const Header = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setOpen(!open);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", isSticky);
//     return () => {
//       window.removeEventListener("scroll", isSticky);
//     };
//   });

//   // Sticky header function
//   const isSticky = () => {
//     const header = document.querySelector(".header-section");
//     const scrollTop = window.scrollY;
//     scrollTop >= 120
//       ? header.classList.add("is-sticky")
//       : header.classList.remove("is-sticky");
//   };

//   const handleSeasonSelect = (season) => {
//     navigate(`/seasonal-treks/${season}`);
//   };

//   return (
//     <header className="header-section">
//       <Container>
//         <Row>
//           <Navbar expand="sm" className="p-0">
//             {/* Logo Section */}
//             <Navbar.Brand href="#">
//               <NavLink to="/">
//                 <img
//                   className="imgLogo"
//                   src={peakPlannerLogo}
//                   alt="Peak Planner Logo"
//                 />
//               </NavLink>
//             </Navbar.Brand>
//             {/* End of Logo Section */}

//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-lg`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
//               placement="start"
//               show={open}
//               onHide={toggleMenu}
//             >
//               {/* Mobile Logo Section */}
//               <Offcanvas.Header closeButton>
//                 <h1 className="Logo">Peak Planner</h1>
//               </Offcanvas.Header>
//               {/* End of Mobile Logo Section */}

//               <Offcanvas.Body>
//                 <Nav className="justify-content-center flex-grow-1 pe-3">
//                   <NavLink className="mx-1 nav-link" to="/top-treks">
//                     Top Treks
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/upcoming-treks">
//                     Upcoming Treks
//                   </NavLink>

//                   {/* <NavLink className="mx-1 nav-link" to="/hiking-schools">
//                     Hiking Schools
//                   </NavLink> */}

//                   {/* Hiking Schools Dropdown */}
//                   <NavDropdown
//                     title="Hiking Schools"
//                     id="hiking-schools-dropdown"
//                   >
//                     <NavDropdown.Item
//                       href="https://www.nimindia.net/"
//                       target="_blank"
//                     >
//                       Nehru Institute of Mountaineering (NIM)
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       href="https://www.abvimas.org/course/list-of-courses/"
//                       target="_blank"
//                     >
//                       Atal Bihari Vajpayee Institute of Mountaineering and
//                       Allied Sports (ABVIMAS)
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       href="https://hmidarjeeling.com/courses-offered/"
//                       target="_blank"
//                     >
//                       Himalayan Mountaineering Institute (HMI)
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       href="https://jawaharinstitutepahalgam.com/Mountaineering.php#gsc.tab=0"
//                       target="_blank"
//                     >
//                       Jawahar Institute of Mountaineering & Winter Sports
//                       (JIM&WS)
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       href="https://nimasdirang.com/Mountaineering-courses"
//                       target="_blank"
//                     >
//                       National Institute of Mountaineering and Allied Sports
//                       (NIMAS)
//                     </NavDropdown.Item>
//                   </NavDropdown>

//                   <NavLink className="mx-1 nav-link" to="/articles">
//                     Articles
//                   </NavLink>

//                   {/* Seasonal Treks Dropdown */}
//                   <NavDropdown
//                     title="Seasonal Treks"
//                     id="seasonal-treks-dropdown"
//                   >
//                     <NavDropdown.Item
//                       className="season-dropdown spring"
//                       onClick={() => handleSeasonSelect("spring")}
//                     >
//                       Spring
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       className="season-dropdown summer"
//                       onClick={() => handleSeasonSelect("summer")}
//                     >
//                       Summer
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       className="season-dropdown autumn"
//                       onClick={() => handleSeasonSelect("autumn")}
//                     >
//                       Autumn
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       className="season-dropdown winter"
//                       onClick={() => handleSeasonSelect("winter")}
//                     >
//                       Winter
//                     </NavDropdown.Item>
//                   </NavDropdown>

//                   <NavLink className="mx-1 nav-link" to="/about-us">
//                     About Us
//                   </NavLink>
//                   <NavLink className="mx-1 nav-link" to="/contact-us">
//                     Contact Us
//                   </NavLink>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>

//             <div className="ms-md-4 ms-2 me-4">
//               <NavLink to="/login" className="primaryBtn d-sm-inline-block">
//                 Login
//               </NavLink>
//             </div>
//             <div className="ms-md-1 ms-1 me-4">
//               <NavLink to="/signup" className="primaryBtn d-sm-inline-block">
//                 Sign Up
//               </NavLink>
//               <li className="d-inline-block d-lg-none ms-3 toggle_btn">
//                 <i
//                   className={open ? "bi bi-x-lg" : "bi bi-list"}
//                   onClick={toggleMenu}
//                 ></i>
//               </li>
//             </div>
//           </Navbar>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Header;



import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../Header/header.css";
import peakPlannerLogo from "./../../../assets/images/Peakplanner-logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  // Sticky header function
  const isSticky = () => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 120
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  const handleSeasonSelect = (season) => {
    navigate(`/seasonal-treks/${season}`);
  };

  return (
    <header className="header-section">
      <Container>
        <Row>
          <Navbar expand="sm" className="p-0">
            {/* Logo Section */}
            <Navbar.Brand href="#">
              <NavLink to="/">
                <img
                  className="imgLogo"
                  src={peakPlannerLogo} 
                  alt="Peak Planner Logo"
                />
              </NavLink>
            </Navbar.Brand>
            {/* End of Logo Section */}

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="start"
              show={open}
              onHide={toggleMenu}
            >
              {/* Mobile Logo Section */}
              <Offcanvas.Header closeButton>
                <h1 className="Logo">Peak Planner</h1>
              </Offcanvas.Header>
              {/* End of Mobile Logo Section */}

              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  <NavLink className="mx-1 nav-link" to="/top-treks">
                    Top Treks
                  </NavLink>
                  <NavLink className="mx-1 nav-link" to="/upcoming-treks">
                    Upcoming Treks
                  </NavLink>

                  <NavDropdown
                    title="Seasonal Treks"
                    id="seasonal-treks-dropdown"
                  >
                    <NavDropdown.Item
                      className="season-dropdown summer"
                      onClick={() => handleSeasonSelect("summer")}
                    >
                      Summer
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="season-dropdown monsoon"
                      onClick={() => handleSeasonSelect("monsoon")}
                    >
                      Monsoon
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="season-dropdown winter"
                      onClick={() => handleSeasonSelect("winter")}
                    >
                      Winter
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="season-dropdown all-seasons"
                      onClick={() => handleSeasonSelect("all seasons")}
                    >
                      All Seasons
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Hiking Schools Dropdown */}
                  <NavDropdown
                    title="Hiking Schools"
                    id="hiking-schools-dropdown"
                  >
                    <NavDropdown.Item
                      href="https://www.nimindia.net/"
                      target="_blank"
                    >
                      Nehru Institute of Mountaineering (NIM)
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://www.abvimas.org/course/list-of-courses/"
                      target="_blank"
                    >
                      Atal Bihari Vajpayee Institute of Mountaineering and
                      Allied Sports (ABVIMAS)
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://hmidarjeeling.com/courses-offered/"
                      target="_blank"
                    >
                      Himalayan Mountaineering Institute (HMI)
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://jawaharinstitutepahalgam.com/Mountaineering.php#gsc.tab=0"
                      target="_blank"
                    >
                      Jawahar Institute of Mountaineering & Winter Sports
                      (JIM&WS)
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://nimasdirang.com/Mountaineering-courses"
                      target="_blank"
                    >
                      National Institute of Mountaineering and Allied Sports
                      (NIMAS)
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavLink className="mx-1 nav-link" to="/articles">
                    Articles
                  </NavLink>

                  {/* Seasonal Treks Dropdown */}
                

                  <NavLink className="mx-1 nav-link" to="/about-us">
                    About Us
                  </NavLink>
                  <NavLink className="mx-1 nav-link" to="/contact-us">
                    Contact Us
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            
            <div className="ms-md-4 ms-2 me-4">
            <span className="signUpBtn">
              <NavLink to="/login" className="primaryBtn my-custom-login-button d-sm-inline-block">
              Login
              </NavLink>
              </span>
            </div>
            
            <div className="ms-md-1 ms-1 me-4">
            <span className="loginBtn">
              <NavLink to="/signup" className="primaryBtn my-custom-signUp-button d-sm-inline-block">
                Sign Up
              </NavLink>
              </span>
              <li className="d-inline-block d-lg-none ms-3 toggle_btn">
                <i
                  className={open ? "bi bi-x-lg" : "bi bi-list"}
                  onClick={toggleMenu}
                ></i>
              </li>
            </div>
          </Navbar>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
