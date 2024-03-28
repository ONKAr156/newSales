import React, { useState, useEffect } from 'react';

const CustomerTable = ({ params }) => {
    const [productFilter, setProductFilter] = useState('All');
    const [timeFrameFilter, setTimeFrameFilter] = useState('current month');
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        if (params.id) {
            fetchSalesData();
        }
    }, [productFilter, timeFrameFilter]);

    const fetchSalesData = async () => {
        const queryParameters = new URLSearchParams({
            product: productFilter !== 'All' ? productFilter : undefined, // Only add this if not 'All'
            timeFrame: timeFrameFilter,
        });

        try {
            const response = await fetch(`http://localhost:3000/api/customer/employee/total-amount-per-month/${params.id}?${queryParameters}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSalesData(data.data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    return <>
<pre>{JSON.ST}</pre>
        <div>
            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
                <option value="All">All Products</option>
                <option value="Product A">Product A</option>
                <option value="Product B">Product B</option>
                <option value="Product C">Product C</option>
                <option value="Product D">Product D</option>
            </select>

            <select value={timeFrameFilter} onChange={(e) => setTimeFrameFilter(e.target.value)}>
                <option value="current month">Current Month</option>
                <option value="last month">Last Month</option>
                <option value="quarterly">Quarterly</option>
                <option value="semi-annually">Semi-Annually</option>
                <option value="annually">Annually</option>
            </select>

            {salesData && (
                <div>
                    <h2>Sales Data</h2>
                    {/* This is where you'd map over the salesData and render it out */}
                    {salesData.map((dataItem) => (
                        <div key={dataItem._id}>
                            <p>{`Month: ${dataItem.month}, Year: ${dataItem.year}, Total: ${dataItem.totalAmount}`}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
}

export default CustomerTable