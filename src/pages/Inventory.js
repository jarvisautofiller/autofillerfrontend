// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { TableWrapper, StyledTable, Button, Container, ButtonWrapper, ButtonWrapperLeft, ButtonWrapperRight } from './Common.styled.ts';

// import { v4 as uuidv4 } from 'uuid';

// const Inventory = () => {
//   const [rows, setRows] = useState([]);
//   const [filters, setFilters] = useState({ productNumber: '', qty: '', productName: '', sellPrice: '', mrp: '' });
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
// const merchantId = sessionStorage.getItem('userData');

//   useEffect(() => {
//     const handleSubmit = async () => {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/llp/getInventory`, {
//         headers: { 'merchantId': merchantId }
//       });
//       setRows(response.data);

//     };
//     handleSubmit();
//   }, []);

//   const handleEditRow = (productNumber, field, value) => {
//     setRows((prevRows) => prevRows.map((row) =>
//       row.productNumber === productNumber ? { ...row, [field]: value } : row
//     ));
//   };

//   const handleSave = async () => {
//     console.log(rows);
//     const savedRows = rows.filter(row => row.productName.trim() !== '');
//     console.log('Saved rows:', savedRows);
//     const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/putInventory`, savedRows, {});
//     console.log(response, 'res');
//   };

//   const handleFilterChange = (field, value) => {
//     setFilters({ ...filters, [field]: value });
//   };

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedRows = [...rows].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });

//   const filteredRows = sortedRows.filter(row =>
//     Object.keys(filters).every(key => {
//       console.log(key);
//       console.log(row);
//       if (row[key] !== null) {
//         console.log("I am in");
//         return row[key].toString().toLowerCase().includes(filters[key].toLowerCase());
//       }
//       return false;
//     })
//   );


//   const handleDeleteRow = (productNumber) => {
//     const updatedRows = rows.filter(row => row.productNumber !== productNumber);
//     setRows(updatedRows);
//   };
// import { v4 as uuidv4 } from 'uuid';
//   const generateUUID = () => { return uuidv4(); };

//   const handleAddRow = () => {
//     const highestProductNumber = rows.reduce((max, row) =>
//       (row.productNumber > max ? row.productNumber : max), rows[0] ? rows[0].productNumber : 0
//     );
//     const newRow = {
//       merchantId: merchantId,
//       productNumber: generateUUID(),
//       sellPrice: 0,
//       mrp: 0,
//       qty: 0,
//       productName: '',
//       age: 0
//     };
//     setRows([newRow,...rows]);
//   };

//   return (
//     <Container>
//       <h2>Search with Product Name</h2>
//       <input type="text" placeholder="Search..." value={filters.productName} onChange={(e) => handleFilterChange('productName', e.target.value)} />
//       <TableWrapper >
//         <StyledTable>
//           <thead>
//             <tr>
//               <th onClick={() => handleSort('barcode')}>Barcode</th>
//               <th onClick={() => handleSort('qty')}>Qty</th>
//               <th onClick={() => handleSort('productName')}>Product Name</th>
//               <th onClick={() => handleSort('sellPrice')}>Sell Price</th>
//               <th onClick={() => handleSort('mrp')}>MRP</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRows && filteredRows.map((row) => (
//               <tr key={row.productNumber}>
//                 <td>
//                   <input type="text" value={row.barcode} onChange={(e) => handleEditRow(row.productNumber, 'barcode', e.target.value)} />
//                 </td>
//                 <td>
//                   <input type="number" value={row.qty} onChange={(e) => handleEditRow(row.productNumber, 'qty', e.target.value)} />
//                 </td>
//                 <td>
//                   <input type="text" value={row.productName} onChange={(e) => handleEditRow(row.productNumber, 'productName', e.target.value)} />
//                 </td>
//                 <td>
//                   <input type="number" value={row.sellPrice} onChange={(e) => handleEditRow(row.productNumber, 'sellPrice', e.target.value)} />
//                 </td>
//                 <td>
//                   <input type="number" value={row.mrp} onChange={(e) => handleEditRow(row.productNumber, 'mrp', e.target.value)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </StyledTable>
//       </TableWrapper>
//       <ButtonWrapperRight>
//         <Button onClick={handleAddRow}>Add Row</Button>
//       </ButtonWrapperRight>
//       <ButtonWrapper>
//         <Button onClick={handleSave}>Save Changes</Button>
//       </ButtonWrapper>
//     </Container>
//   );
// };

// export default Inventory;


import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { v4 as uuidv4 } from 'uuid';
import BarcodeScanner from './Scanner';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [rowData, setRowData] = useState([]);
  const [deleteRows, setDeleteRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [columnDefs] = useState([
    { headerName: 'Barcode', field: 'barcode' },
    { headerName: 'Qty', field: 'qty' },
    { headerName: 'Product Name', field: 'productName' },
    { headerName: 'Sell Price', field: 'sellPrice' },
    { headerName: 'MRP', field: 'mrp' },
    {
      headerName: 'Actions', field: 'actions',
      cellRenderer: (params) => (
        <button className='btn btn-soft-danger' onClick={
          () => onDeleteRow(params.node.rowIndex)}><i class="fa-solid fa-trash"></i></button>),
    },

  ]);

  const merchantId = sessionStorage.getItem('userData');


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/llp/getInventory`, {
      headers: { 'merchantId': merchantId }
    })
      .then(response => response.json())
      .then(data => setRowData(data));
  }, []);

  const generateUUID = () => { return uuidv4(); };

  const onAddRow = () => {
    // Check if newRow is already there in prevRowData
    
    const newRow = {
      merchantId: merchantId,
      productNumber: generateUUID(),
      sellPrice: 0,
      mrp: 0,
      qty: 0,
      productName: '',
      age: 0,
      isNew: true
    };
 
    setRowData((prevRowData) => {
      const updatedRowData = [...prevRowData, newRow];
      setTimeout(() => {
        if (gridApi) {
          gridApi.paginationGoToLastPage();
          setTimeout(() => {
            gridApi.ensureIndexVisible(updatedRowData.length - 1);
          }, 0);
        }
      }, 0);
      return updatedRowData;
    });
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };


  const getRowStyle = (params) => {
    if (params.data.isNew) {
      return { backgroundColor: 'lightyellow' };
    }
    return null;
  };

  const onSave = () => {
    console.log(deleteRows)
    console.log(rowData);
    const productNames = rowData.map(row => row.productName.trim().toLowerCase());
    const hasDuplicates = productNames.some((name, index) => productNames.indexOf(name) !== index);

    // if (hasDuplicates) {
    //   const duplicateNames = productNames.filter((name, index) => productNames.indexOf(name) !== index);
    //   alert(`There are duplicate product names in the inventory: ${duplicateNames.join(', ')}`);
    //   return;
    // }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteInventory`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteRows),
    })
      .then(response => response.json()).then(data => { console.log('Success:', data); })
      .catch((error) => {
        console.error('Error:', error);
      });
    const savedRows = rowData.filter(row => row.productName.trim() !== '');
    fetch(`${process.env.REACT_APP_BACKEND_URL}/putInventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(savedRows),
    })
      .then(response => response.json()).then(data => { console.log('Success:', data); })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  

  const onDeleteRow = (rowIndex) => {
    setRowData((prevRowData) => {
      const rowToDelete = prevRowData[rowIndex];
      const updatedRowData = prevRowData.filter((_, index) => index !== rowIndex);
      setDeleteRows((prevDeleteRows) => [...prevDeleteRows, rowToDelete]);
      return updatedRowData;
    });
  };

  // useEffect(() => {
  //   console.log("deleteRows updated:", deleteRows);
  // }, [deleteRows]);



  return (
    <div className="main-content">

      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Inventory</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><Link to="/Purchaser">Purchaser</Link></li>
                                                <li className="breadcrumb-item active">Inventory</li>
                                                <li className="breadcrumb-item"><Link to="/Cart">Cart</Link></li>
                                               
                                                <li className="breadcrumb-item"><Link to="/Order">Order</Link></li>
                                              </ol>
                </div>

              </div>
            </div>
          </div>
          <div className="ag-theme-alpine" style={{ height: 500, width: '98%', margin: '0 auto' }}>
            <div className='row mb-3'>
              <div className='col-md-6'>
                <button className='btn btn-success add-btn' onClick={onAddRow}>
                  <i class="fa-solid fa-plus"></i>Add Row</button>
              </div>
              <div className='col-md-6 '>
                <button className="btn btn-primary waves-effect waves-light float-end" onClick={onSave}>Save</button>
              </div>
            </div>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{ editable: true, sortable: true, filter: true, floatingFilter: true }}
              pagination={true}
              paginationPageSize={10}
              getRowStyle={getRowStyle}
              onGridReady={onGridReady}
            />

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
