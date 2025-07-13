import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SmallTableWrapper, TableWrapper, StyledTable, Button, Container, ButtonWrapper, ButtonWrapperRight,ButtonWrapperLeft, FlexContainer, DarkLabel ,
  HeadingStyled
} from '../Common.styled.ts';
import { ToastContainer,toast } from "react-toastify";
import Select from 'react-select';
import { Link } from "react-router-dom";
// Removed all unassigned values in the complete file.
const Cart = () => {
  const [search] = useState('');
  const [rows, setRows] = useState([]);
  const merchantId = sessionStorage.getItem('userData');
  const [, setData] = useState([]);
  const [purchaserName, setPurchaserName] = useState([]);
  const [selectedPurchaserId, setSelectedPurchaserId] = useState([]);
  const [showValues, setShowValues] = useState([]);
  const [Inventory, setInventory] = useState([]);
  const [] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const speak = async () => {
    const productNames = showValues.map((item) => item.productName); // Extract product names
    const text = productNames.join(", "); // Join them
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const indianVoice = voices.find((voice) =>
      voice.lang.includes("en-IN") // Looks for English (India) voices
    );
    if (indianVoice) {
      utterance.voice = indianVoice;
    } else {
      console.warn("Indian English voice not found. Using default voice.");
    }
    synth.speak(utterance);
  };
  const [test, setTest] = useState([{

    id: 0,
    productName: '', // Or a unique identifier,
    Qty: 0,
    sellPrice: 0,
    mrp: 0,
    itemTotal: 0
  }]);
  const [test2, setTest2] = useState([{
    purchaserId: "test",
    productName: "test", // Or a unique identifier,
    Qty: selectedPurchaserId,
    sellPrice: 0,
    Mrp: 0
  }]);
  const [completeRow, setCompleteRow] = useState([]);
  const [totalValue, setTotalValue] = useState([]);
  const [paid, setPaid] = useState([]);
  const [customerNumber, setCustomerNumber] = useState([]);
  const [customerAmount, setCustomerAmount] = useState([]);
  const [changeAmount, setChangeAmount] = useState([]);
  const [selectedOption, setSelectedOption] = useState("cash");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
      
      setInventory(response.data);
      setRows(response.data);
      setCompleteRow(response.data);
      const data = purchaserResponse.data;
      setPurchaserName(data);
      if (data.length > 0) {
        setSelectedValue(undefined); // Set the initial selected value
        setSelectedPurchaserId(data[0].purchaserId); // Set the initial selected purchaserId
        // changeSavedValues(selectedPurchaserId);
        changeSavedValues(data[0].purchaserId);
      }


      // setRows();
      handleAddRow();


    };
    handleSubmit();

  }, []);
  useEffect(() => {

    calculateTotal();


  }, [showValues]);


  const handleEditRowTest = (id, field, value) => {
    setTest(prevState => prevState.map(item => item.id === id ?
      { ...item, [field]: value } : item));
  };
  const handleEditRowShowValues = (id, field, value) => {
    setShowValues(prevState => prevState.map(item => item.productName === id ?
      { ...item, [field]: value } : item));
  };


  const handleAddItem = () => {
    const isProductNameExist = showValues.some(item => item.productName === test[0].productName);
    if (!isProductNameExist) {
      
      setShowValues([...showValues, ...test]);
     
    }
    else{
      toast.error("Already Item in the CART");
    }
  };

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
      // setShowValues(response.data);

    } catch (error) { console.error("Error fetching data:", error); }
  };

  const [selectedValue, setSelectedValue] = useState('');


  const handleSelectChangeU = (id, event) => {
    const { value } = event.target;
    handleEditRowTest(id, 'productName', value);
  };


  const calculateTotal = () => {
    setTotalValue(showValues.reduce((sum, item) => sum + item.itemTotal, 0));
  }
  const saveItems = async () => {

    if(totalValue==0){
      toast.error("Please add in cart");
      return ; 
    }
   
    if(totalValue != paid && customerNumber!=null){
      
      toast.error("please add customerNumber, total and paid is not matching");
      return ; 
    }

    const itemsWithoutId = showValues.map(({ id, ...rest }) => rest);
    setCurrentDateTime(new Date());
    const createField = {
      'merchantId': merchantId,
      'customerNumber': customerNumber,
      'total': totalValue,
      'paid': paid,
      'dateValue': currentDateTime,
      'due': Number(totalValue) - Number(paid),
      'type': selectedOption,

      'Content-Type': 'application/json'
    }

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createCart`, itemsWithoutId, { headers: createField });


    setShowValues([]);
    setChangeAmount("");
    setCustomerAmount("");

  };

  const exitItems = async () => {
    setShowValues([]);
  };


  return (
    <div className="main-content">

    <div className="page-content">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">Cart</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                              <li className="breadcrumb-item"><Link to="/Purchaser">Purchaser</Link></li>
                              <li className="breadcrumb-item"><Link to="/Inventory">Inventory</Link></li>
                              <li className="breadcrumb-item active">Cart</li>
                              <li className="breadcrumb-item"><Link to="/Order">Order</Link></li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
          
    <Container>
      <HeadingStyled>Add Items</HeadingStyled>
      <SmallTableWrapper style={{ overflow: 'visible' }}>
        <StyledTable>
          <tr>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Sell Price</th>
            <th>Mrp</th>
            <th>Item Total</th>
          </tr>
          {test && test.map((row) => (
            <tr key={row.productName}>
              <td>
                <Select
                  value={{ value: row.productName, label: row.productName }}
                  onChange={(selectedOption) => {
                    handleSelectChangeU(row.id, { target: { value: selectedOption.value } });
                    handleEditRowTest(row.id, 'selectedValue', selectedOption.value);
                    const selectedProduct = completeRow.find(f => f.productName === selectedOption.value);
                    if (selectedProduct) {
                      setIsButtonDisabled(false);
                      handleEditRowTest(row.id, 'qty', 1);
                      handleEditRowTest(row.id, 'sellPrice', selectedProduct.sellPrice);
                      handleEditRowTest(row.id, 'mrp', selectedProduct.mrp);
                      handleEditRowTest(row.id, 'itemTotal', Number(1) * Number(selectedProduct.sellPrice));
                    } else {
                      setIsButtonDisabled(true);
                      toast.error("Please select Option from dropDown");
                    }
                  }}
                  options={Inventory.map((row) => ({ value: row.productName, label: row.productName }))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) => {
                    handleEditRowTest(row.id, 'qty', e.target.value);
                    handleEditRowTest(row.id, 'itemTotal', Number(e.target.value) * Number(row.sellPrice));
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.sellPrice}
                  onChange={(e) => {
                    handleEditRowTest(row.id, 'sellPrice', e.target.value);
                    handleEditRowTest(row.id, 'itemTotal', Number(row.qty) * Number(e.target.value));
                  }}
                />
              </td>
              <td>
                <DarkLabel type="number" value={row.mrp} />
              </td>
              <td>
                <DarkLabel type="number" value={row.itemTotal} />
              </td>
            </tr>
          ))}
        </StyledTable>
      </SmallTableWrapper>
      <ButtonWrapperRight>
        <Button onClick={handleAddItem} disabled={isButtonDisabled}>Add Items</Button>
      </ButtonWrapperRight>
      <hr />
      <HeadingStyled>Cart</HeadingStyled>
      <div className="table-container">
        <TableWrapper>
          <StyledTable>
            <tr>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Sell Price</th>
              <th>MRP</th>
              <th>Item Total</th>
            </tr>
            {showValues && showValues.map((row) => (
              <tr key={row.productId}>
                <td>
                  <DarkLabel type="text" value={row.productName} />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) => {
                      handleEditRowShowValues(row.productName, 'qty', e.target.value);
                      handleEditRowShowValues(row.productName, 'itemTotal', Number(e.target.value) * Number(row.sellPrice));
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.sellPrice}
                    onChange={(e) => {
                      handleEditRowShowValues(row.productName, 'sellPrice', e.target.value);
                      handleEditRowShowValues(row.productName, 'itemTotal', Number(row.qty) * Number(e.target.value));
                    }}
                  />
                </td>
                <td>
                  <input type="number" value={row.mrp} />
                </td>
                <td>
                  <DarkLabel type="number" value={row.itemTotal} />
                </td>
              </tr>
            ))}
          </StyledTable>
        </TableWrapper>
      </div>
      <ButtonWrapperRight>
        <Button onClick={exitItems}>CLEAR</Button>
      </ButtonWrapperRight>
      <ButtonWrapperLeft>
        <Button onClick={speak}>SPEAK</Button>
      </ButtonWrapperLeft>
      <hr />
      <HeadingStyled>Billing Page</HeadingStyled>
      
      <FlexContainer>
        <h4>TOTAL BILL: {totalValue}</h4>
      </FlexContainer>
      <FlexContainer>

      
      <h4>Choose Payment Options: </h4>
      <select
        id="options"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="" disabled>
          -- Select an option --
        </option>
        <option value="cash">CASH</option>
        <option value="upi">UPI</option>
        <option value="card">CARD</option>
      </select>
    
    </FlexContainer> 
      <FlexContainer>
        <h4>Customer Amount</h4>
        <input type="text" value={customerAmount} onChange={e => 
          
          {setCustomerAmount(e.target.value);
            if(totalValue<e.target.value){
            setChangeAmount(totalValue - e.target.value);
            }
            else{
              setChangeAmount(0);
            }

          }} />
        
      </FlexContainer>
      <FlexContainer>
      <h6>Remaining Amount:{changeAmount}</h6>
      </FlexContainer>
      
      <FlexContainer>
        <h4>Customer PhoneNumber Number</h4>
        <input type="text" value={customerNumber} onChange={e => setCustomerNumber(e.target.value)} />
      </FlexContainer>
      <FlexContainer>
        <h4>Paid:</h4>
        <input type="text" value={paid} onChange={e => setPaid(e.target.value)} />
      </FlexContainer>
      <ButtonWrapper>
        <Button onClick={saveItems}>SAVE AND EXIT</Button>
      </ButtonWrapper>
    </Container>
   
    </div>
    </div>
</div>

  );
}


export default Cart;