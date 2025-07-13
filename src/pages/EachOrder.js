import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableWrapper, StyledTable ,Button ,Container,HeadingStyled} from './Common.styled.ts';
import { useLocation } from 'react-router-dom';

const EachOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const merchantId = sessionStorage.getItem('userData');
    const [customerNumber, setCustomerNumber] = useState([]);
    const location = useLocation(); 
  

    useEffect(() => {
        // Define the async function inside the useEffect
        const fetchData = async () => {
            try {
                
                const params = new URLSearchParams(location.search); 
                const id = params.get('id');
                const purchaserResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/viewCart`, {
                    headers: {
                        'orderId': id
                    }
                });
                setOrderData(purchaserResponse.data);
                
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
        <Container >
            <HeadingStyled>Complete Order Detail</HeadingStyled>
            < TableWrapper >
                <StyledTable>

                    <tr>
                        <th>Order ID</th>
                        <th>productName</th>
                        <th>qty</th>
                        <th>mrp</th>
                        
                        <th>itemTotal</th>
                    </tr>


                    {orderData && orderData.map((row) => (
                        <tr key={row.orderId}>

                            <td>
                                {row.orderId}


                            </td>

                            <td>
                                {row.productName}

                            </td>

                            <td>
                                {row.qty}
                            </td>

                            <td>
                                {row.mrp}

                            </td>


                           
                            <td>
                                {row.itemTotal}

                            </td>
                        </tr>
                    ))
                    }
                </StyledTable>
            </ TableWrapper >
        </Container>
    );
};
export default EachOrder;