import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import { SmallTableWrapper, TableWrapper, StyledTable, Button, Container, DarkLabel,HeadingStyled } from './Common.styled.ts';
import Select from 'react-select';
import { Link } from 'react-router-dom';
const Purchaser = () => {
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);
    const merchantId = sessionStorage.getItem('userData');
    const [data, setData] = useState([]);
    const [purchaserName, setPurchaserName] = useState([]);
    const [selectedPurchaserId, setSelectedPurchaserId] = useState([]);
    const [showValues, setShowValues] = useState([]);
    const [Inventory, setInventory] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const sortedValues = (showValues || []).filter(value => value !== null).sort((a, b) => new Date(b.dateValue) - new Date(a.dateValue));
    const [test, setTest] = useState([{
        id: 1,
        productName: '', // Or a unique identifier,
        Qty: 0,
        sellPrice: 0,
        Mrp: 0
    }]);
    
    const [test2, setTest2] = useState([{
        purchaserId: "test",
        productName: "test", // Or a unique identifier,
        Qty: selectedPurchaserId,
        sellPrice: 0,
        Mrp: 0
    }]);
    useEffect(() => {
        const handleSubmit = async () => {
            const purchaserResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/findPurchaser`, {
                headers: {
                    'merchantId': merchantId
                }
            });
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/llp/getInventory`, {
                headers: {
                    'merchantId': merchantId
                }
            });
            const timer = setInterval(
                () => {
                    setCurrentDateTime(new Date());

                }, 1000);

            setInventory(response.data);
            setRows(response.data);
            const data = purchaserResponse.data;
            setPurchaserName(data);
            console.log(data);
            if (data.length > 0) {
                setSelectedValue(data[0].purchaserName); // Set the initial selected value
                setSelectedPurchaserId(data[0].purchaserId); // Set the initial selected purchaserId
                // changeSavedValues(selectedPurchaserId);
                console.log(data[0]);
                console.log(data[0].purchaserId);
                changeSavedValues(data[0].purchaserId);
                console.log(selectedPurchaserId);
            }


            setRows();
            handleAddRow();

        };
        handleSubmit();
    }, []);


    const handleEditRow = (id, field, value) => {
        setTest(prevState => prevState.map(item => item.id === id ?
            { ...item, [field]: value } : item));
    };

    const handleSave = async () => {
       
        console.log(test);
        if (purchaserName.length == 0) {
            toast.error("Please create purchaser");

        }
        else {
            // test.setSelectedPurchaserId(selectedPurchaserId);

            setCurrentDateTime(new Date());
            const test2 = test.map(({ Qty, productName, sellPrice, Mrp }) =>
            ({
                purchaseId: selectedPurchaserId,
                price: sellPrice,
                qty: Qty,
                productName: productName,
                dateValue: currentDateTime
            }));

            const bodyH = JSON.stringify(test2);

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createPurchaserProducts`, bodyH, {
                headers: {
                    'Content-Type': 'application/json',
                    'merchantId': merchantId
                }
            });
            changeSavedValues(selectedPurchaserId);
        }




        // Now, you can use sortedValues to map over and render your table rows.

    };

    const filteredRows = rows.filter((row) =>
        Object.values(row)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    const handleAddRow = () => {
        const highestProductNumber = rows.reduce((max, row) => (row.productNumber > max ? row.productNumber : max), rows[0] ? rows[0].productNumber : 0);
        const newRow = {
            id: Number(highestProductNumber) + 1,
            productId: 0, // Or a unique identifier,
            purchaserId: selectedPurchaserId,
            price: 0,
            qty: 0,
            name: ""
        };
        setRows([newRow, ...rows]);
    };

    const changeSavedValues = async (temp) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/findPurchaserProducts`,
                { headers: { 'perchaserId': temp } }); setShowValues(response.data);

        } catch (error) { console.error("Error fetching data:", error); }
    };

    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (e) => {
        const selectedName = e.target.value; setSelectedValue(selectedName); // Find the selected purchaser's ID 
        const selectedPurchaser = purchaserName.find(p => p.purchaserName === selectedName);
        setSelectedPurchaserId(selectedPurchaser.purchaserId);
        changeSavedValues(selectedPurchaser.purchaserId);

    };

    const handleSelectChangeU = (id, event) => {
        const  value  = event.label;
       
        handleEditRow(id, 'productName', value);
    };

    const openPopup = () => {
        const popup = window.open('/createPurchaser', 'popupWindow', 'width=600,height=400,scrollbars=yes'); // Polling to check if the pop-up window is closed 
        const popupCheck = setInterval(() => {
            if (popup.closed) {
                clearInterval(popupCheck); window.location.reload(); // Refresh the parent window when pop-up is closed } 
            }
        }, 500);
    };

    return (
        <div className="main-content">

        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0">Purchaser</h4>

                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                                                                <li className="breadcrumb-item active">Purchaser</li>
                                                                                <li className="breadcrumb-item"><Link to="/Inventory">Inventory</Link></li>
                                                                                <li className="breadcrumb-item"><Link to="/Cart">Cart</Link></li>
                                                                               
                                                                                <li className="breadcrumb-item"><Link to="/Order">Order</Link></li>
                                                                              </ol>
                            </div>

                        </div>
                    </div>
                </div>
                
            
        <Container>
            <HeadingStyled>Select the Purchaser</HeadingStyled>

            <div> <label htmlFor="exampleDropdown">Choose an option:</label>
                <select id="exampleDropdown" value={selectedValue} onChange={handleSelectChange}>
                    {purchaserName && purchaserName.map((row) => (
                        <option value={row.purchaserName}>{row.purchaserName}</option>
                    ))}
                </select>
                <Button onClick={openPopup}>Create Purchaser</Button>
                <hr />
                <HeadingStyled>Add Item</HeadingStyled>
            </div>
           
             <SmallTableWrapper style={{ overflow: 'visible' }}>
                <StyledTable>
                    <thead>

                        <tr>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Sell Price</th>
                            <th>Mrp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {test && test.map((row) => (
                            <tr key={row.productName}>

                                <td>
                                    <Select
                                        value={{ value: row.productName, label: row.productName }}
                                        onChange={e => {
                                            handleSelectChangeU(row.id,  e );
                                            handleEditRow(row.id, 'selectedValue', e.value);
                                        }}
                                        options={Inventory.map((row) => ({
                                            value: row.id,
                                            label: row.productName
                                        }))}
                                    />
                                    {/* <select id="exampleDropdown" value={row.selectedValue} onChange={e => {
                                        handleSelectChangeU(row.id, e);
                                        handleEditRow(row.id, 'selectedValue', e.target.value);
                                    }

                                    }>
                                        {Inventory.map((row) => (
                                            <option value={row.id}>{row.productName}</option>
                                        ))}
                                    </select> */}

                                </td>

                                <td>
                                    <input
                                        type="text"
                                        value={row.Qty}
                                        onChange={(e) =>
                                            handleEditRow(row.id, 'Qty', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.sellPrice}
                                        onChange={(e) =>
                                            handleEditRow(row.id, 'sellPrice', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.Mrp}
                                        onChange={(e) =>
                                            handleEditRow(row.id, 'Mrp', e.target.value)
                                        }
                                    />
                                </td>

                            </tr>



                        ))}

                    </tbody>
                </StyledTable>
            </SmallTableWrapper>

            <Button onClick={handleSave}>Save Changes</Button>
            <TableWrapper>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>price</th>
                            <th>Qty</th>
                            <th>Product Name</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedValues && sortedValues.map((row) => (
                            <tr key={row.productId}>

                                <td>
                                    <DarkLabel
                                        type="text"
                                        value={row.price}
                                    />
                                </td>
                                <td>
                                    <DarkLabel
                                        type="text"
                                        value={row.qty}
                                    />
                                </td>
                                <td>
                                    <DarkLabel
                                        type="text"
                                        value={row.productName}
                                    />
                                </td>
                                <td>
                                    <DarkLabel
                                        type="text"
                                        value={row.dateValue}
                                    />
                                </td>



                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableWrapper>

        </Container>
        </div>
        </div>
    </div>
    );
};

export default Purchaser;
