import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TableWrapper, StyledTable, Button,Container,HeadingStyled } from './Common.styled.ts';

const Order = () => {
    const [orderData, setOrderData] = useState([]);
    const merchantId = sessionStorage.getItem('userData');
    const [customerNumber, setCustomerNumber] = useState([]);
    const sortedValues = (orderData || []).filter(value => value !== null).sort((a, b) => new Date(b.date) - new Date(a.date));


    useEffect(() => {
        // Define the async function inside the useEffect
        const fetchData = async () => {
            try {
                const purchaserResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/viewOrders`, {
                    headers: {
                        'merchantId': merchantId
                    }
                });
                setOrderData(purchaserResponse.data);
                console.log("i am in");
                console.log(purchaserResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the async function
        fetchData();

        // Return the cleanup function (if any)
        return () => {
            console.log("Cleanup function called");
            // Add any necessary cleanup logic here
        };
    }, [merchantId]); // Adding merchantId as a dependency to re-run the effect if it changes

    return (
        <div className="main-content">

        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0">Order</h4>

                            <div className="page-title-right">
                                
                                
                            <ol className="breadcrumb m-0">
                               <li className="breadcrumb-item"><Link to="/Purchaser">Purchaser</Link></li>
                                                                               <li className="breadcrumb-item"><Link to="/Inventory">Inventory</Link></li>
                                                                               <li className="breadcrumb-item"><Link to="/Cart">Cart</Link></li>
                                                                              
                                                                               <li className="breadcrumb-item active">Order</li>
                                                                               </ol>
                            </div>

                        </div>
                    </div>
                </div>
                


        <Container >
            <HeadingStyled>View Orders</HeadingStyled>
            < TableWrapper >
                <StyledTable>

                    <tr>
                        <th>Order ID</th>
                        <th>CUSTOMER NUMBER</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DUE</th>
                        <th>DATE</th>
                        <th>TYPE</th>
                    </tr>



                    {sortedValues && sortedValues.map((row) => (
                        <tr key={row.orderId}>
                            
                            <td>
                            
                            <Link to={`/eachOrder?id=${row.orderId}`}>{row.orderId}</Link>
                              
                            </td>
                            
                            <td>
                                {row.customerNumber}
                                
                            </td>
                            
                            <td>
                            {row.total}
                            </td>
                            
                            <td>
                            {row.paid}
                              
                            </td>
                            

                            <td>
                            {row.due}
                               
                            </td>
                            <td>
                            {row.date}
                               
                            </td>
                            <td>
                            {row.type}
                               
                            </td>
                        </tr>
                    ))
                    }
                </StyledTable>
            </ TableWrapper >
        </Container>
        </div>
        </div>
    </div>
    );
};
export default Order;