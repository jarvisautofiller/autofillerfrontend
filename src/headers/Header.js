import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import app.css;
import { AiFillShop } from "react-icons/ai";
import ProImg from '../assests/images/avatar-1.jpg';

const Header = () => {
  const location = useLocation(); // Get the current location
  const [userData, setUserData] = useState(null);
  //export 'useHistory' (imported as 'useHistory') was not found in 'react-router-dom'

  const [cart, setCart] = useState(false);
  const [profile, setprofile] = useState(false);
  const cartShow = () => {
    setCart(!cart)
  }
  const Profilehandler = () => {
    setprofile(!profile)
  }
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const userData = sessionStorage.getItem('userData');
      //how to get current path 
      const currentPath = location.pathname;
      // If currentPath contains login or signup
      if (currentPath.includes('/login') || currentPath.includes('/signup') || currentPath.includes('/test')) {
        return; // Do nothing if the current path contains login or signup
      }
      if (!userData) {
        navigate('/login'); // Redirect to login page
      }
    };

    checkSession(); // Initial check when the component mounts


  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      getData();

    }, 200)



  }, [location]);



  const getData = async () => {
    console.log("userData" + sessionStorage.getItem('userData'))
    const data = sessionStorage.getItem('userData');
    console.log('useeffct run');

    setUserData(data);

  }

  const logout = () => {
    sessionStorage.clear();
    setUserData("");
    navigate('/');
  }
  console.log(userData)
  return (
    // <nav className="navbar">

    //   <ul className="navbar-links">
    //   <div className="navbar-logo">
    //     <span className="logo-text">MAA KIRANA</span>
    //   </div>
    //     {/* Conditional Rendering based on user login status */}
    //     {userData ? (
    //       <>
    //         <li style={{ marginLeft: 'auto' }}>
    //           <i className="fas fa-sign-out-alt logo-icon" style={{ cursor: 'pointer' }} onClick={logout}></i>
    //         </li>
    //       </>
    //     ) : (
    //       <>
    //         <li style={{ marginLeft: 'auto' }}>
    //           <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
    //         </li>
    //         <li>
    //           <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link>
    //         </li>


    //       </>
    //     )}
    //   </ul>
    // </nav>

    <header id="page-topbar">
      <div className="layout-width">
        {userData && (<div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box horizontal-logo">
              <a className="logo logo-dark">
                <span className="logo-sm">
                  <h3>Maa KIRANA</h3>
                </span>
                <span className="logo-lg">
                  <h3>Maa KIRANA</h3>
                </span>
              </a>

              <a className="logo logo-light">
                <span className="logo-sm">
                  <h2>Maa KIRANA</h2>
                </span>
                <span className="logo-lg">
                  <h2>Maa KIRANA</h2>
                </span>
              </a>
            </div>

          </div>

          <div className="d-flex align-items-center">

            {/* <div className="dropdown d-md-none topbar-head-dropdown header-item">
              <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa-solid fa-magnifying-glass fs-22"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input type="text" className="form-control"
                        placeholder="Search ..." aria-label="Recipient's username" />
                      <button className="btn btn-primary" type="submit"></button>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}




            {/* <div className="dropdown topbar-head-dropdown ms-1 header-item">
              <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-cart-dropdown"
                onClick={cartShow}>
                <i className="fa-solid fa-cart-shopping fs-22"></i>
                <span className="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info">5</span>
              </button>

              {cart && <div className={cart ? 'dropdown-menu dropdown-menu-end dropdown-menu-lg cartShow' : 'dropdown-menu dropdown-menu-end dropdown-menu-lg'} aria-labelledby="page-header-notifications-dropdown">

                <div class="dropdown-head bg-primary bg-pattern rounded-top" styles={{ maxHeight: '320px' }}>
                  <div class="p-3">
                    <div class="row align-items-center">
                      <div class="col">
                        <h6 class="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                      </div>
                      <div class="col-auto dropdown-tabs">
                        <span class="badge bg-light-subtle text-body fs-13"> 4 New</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="position-relative" id="notificationItemsTabContent">
                  <div class="py-2 ps-2" id="all-noti-tab" role="tabpanel">
                    <div class="pe-2">
                      <div class="text-reset notification-item d-block dropdown-item position-relative">
                        <div class="d-flex">
                          <div class="avatar-xs me-3 flex-shrink-0">
                            <span class="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                              <i class="bx bx-badge-check"></i>
                            </span>
                          </div>
                          <div class="flex-grow-1">
                            <Link class="stretched-link">
                              <h6 class="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic
                                Optimization <span class="text-secondary">reward</span> is
                                ready!
                              </h6>
                            </Link>
                            <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span><i class="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                            </p>
                          </div>
                          <div class="px-2 fs-15">
                            <div class="form-check notification-check">
                              <input class="form-check-input" type="checkbox"
                                value="" id="all-notification-check01" />
                              <label class="form-check-label" for="all-notification-check01"></label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="text-reset notification-item d-block dropdown-item position-relative">
                        <div class="d-flex">
                          <img src="assets/images/users/avatar-2.jpg"
                            class="me-3 rounded-circle avatar-xs flex-shrink-0" alt="user-pic" />
                          <div class="flex-grow-1">
                            <Link class="stretched-link">
                              <h6 class="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                            </Link>
                            <div class="fs-13 text-muted">
                              <p class="mb-1">Answered to your comment on the cash flow forecast's
                                graph 🔔.</p>
                            </div>
                            <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span><i class="mdi mdi-clock-outline"></i> 48 min ago</span>
                            </p>
                          </div>
                          <div class="px-2 fs-15">
                            <div class="form-check notification-check">
                              <input class="form-check-input" type="checkbox"
                                value="" id="all-notification-check02" />
                              <label class="form-check-label" for="all-notification-check02"></label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="text-reset notification-item d-block dropdown-item position-relative">
                        <div class="d-flex">
                          <div class="avatar-xs me-3 flex-shrink-0">
                            <span class="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                              <i class='bx bx-message-square-dots'></i>
                            </span>
                          </div>
                          <div class="flex-grow-1">
                            <Link class="stretched-link">
                              <h6 class="mt-0 mb-2 fs-13 lh-base">You have received <b class="text-success">20</b> new messages in the conversation
                              </h6>
                            </Link>
                            <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span><i class="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                            </p>
                          </div>
                          <div class="px-2 fs-15">
                            <div class="form-check notification-check">
                              <input class="form-check-input" type="checkbox"
                                value="" id="all-notification-check03" />
                              <label class="form-check-label" for="all-notification-check03"></label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="text-reset notification-item d-block dropdown-item position-relative">
                        <div class="d-flex">
                          <img src="assets/images/users/avatar-8.jpg"
                            class="me-3 rounded-circle avatar-xs flex-shrink-0" alt="user-pic" />
                          <div class="flex-grow-1">
                            <Link class="stretched-link">
                              <h6 class="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                            </Link>
                            <div class="fs-13 text-muted">
                              <p class="mb-1">We talked about a project on linkedin.</p>
                            </div>
                            <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span><i class="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                            </p>
                          </div>
                          <div class="px-2 fs-15">
                            <div class="form-check notification-check">
                              <input class="form-check-input" type="checkbox"
                                value="" id="all-notification-check04" />
                              <label class="form-check-label" for="all-notification-check04"></label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="my-3 text-center view-all">
                        <button type="button" class="btn btn-soft-success waves-effect waves-light">View
                          All Notifications <i class="ri-arrow-right-line align-middle"></i></button>
                      </div>
                    </div>

                  </div>




                  <div class="notification-actions" id="notification-actions">
                    <div class="d-flex text-muted justify-content-center">
                      Select <div id="select-content" class="text-body fw-semibold px-1">0</div> Result <button type="button" class="btn btn-link link-danger p-0 ms-3" data-bs-toggle="modal" data-bs-target="#removeNotificationModal">Remove</button>
                    </div>
                  </div>
                </div>
              </div>}
            </div> */}




            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button type="button"
                className="btn"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={Profilehandler}>
                <span className="d-flex align-items-center">
                  <img className="rounded-circle header-profile-user"
                    src={ProImg} alt="Header Avatar" />
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">All Pages</span>
                    <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">Details</span>
                  </span>
                </span>
              </button>
              {profile && <div className={profile ? 'dropdown-menu dropdown-menu-end cartShow' : 'dropdown-menu dropdown-menu-end'}>
                <h6 className="dropdown-header">Welcome!</h6>
                <Link to='/homepage' onClick={Profilehandler} className="dropdown-item">
                  <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">HomePage</span></Link>
                <Link to='/inventory' onClick={Profilehandler} className="dropdown-item">
                  <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Inventory</span></Link>
                {/* <Link to='/scanner' onClick={Profilehandler} className="dropdown-item">
                  <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Barcode (don't click testing phase)</span></Link> */}

                <Link to='/' className="dropdown-item" onClick={logout} ><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> 
                <span className="align-middle" data-key="t-logout">Logout</span></Link>
              </div>}
            </div>
          </div>
        </div>)}
      </div>
    </header >
  );
};

export default Header;