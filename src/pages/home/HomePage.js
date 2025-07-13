import Home from "../Home";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState } from "react";


const HomePage = () => {

    const [rowData, setRowData] = useState([
        { date: "2025-01-10", event: "Event 1" },
        { date: "2025-01-11", event: "Event 2" },
    ]);

    const [nextId, setNextId] = useState(3);

    const columnDefs = [
        { headerName: "Date", field: "date", sortable: true, filter: true },
        { headerName: "Event", field: "event", sortable: true, filter: true },
    ];

    const handleAddRow = () => {
        const newRow = { date: `2025-01-${10 + nextId}`, event: `Event ${nextId}` };
        setRowData([...rowData, newRow]);
        setNextId(nextId + 1); // Increment the next ID for unique rows
    };

    const defaultColDef = {
        flex: 1,
    };

    return (
        <>
            <h1>Hello</h1>
            <div>
                <button onClick={handleAddRow} style={{ marginBottom: "10px" }}>
                    Add New Row
                </button>
                <div
                    className="ag-theme-alpine"
                    style={{ height: 400, width: "80%", flex:1 }}
                >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows
                        gridOptions={{suppressHorizontalScroll:false}}
                        suppressRowTransform={true}
                    />
                </div>
            </div>
        </>
    )
}

export default HomePage;



