import React, {useState, useEffect} from "react";

function App(){
    //this api base will distinguish dev and prod
    const API_BASE = import.meta.env.VITE_API_BASE;
    //connect to the server and collect the data available
    const [data, setData] = useState(null);
    const [gotData, setGotData] = useState(false);
    useEffect(() => {
        const api = async () => {
        try {
            const response = await fetch(`${API_BASE}/`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            console.log("Data from express server:", data);
            setData(data);
            setGotData(true);
        } catch (error) {
            console.error(`Error fetching data from express server:`, error);
        }
        };
        api();
    }, []);

    //if data is retrieved, dynamically add a display message
    return(
    <div>
        <h1>Web Server Template</h1>
        {gotData ? data.map((datum) => (<h2 key={datum.id}>{datum.message}</h2> )): <h2>No Data Retrieved</h2>}
    </div>
    );
}

export default App;