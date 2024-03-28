import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'next/navigation';

const LineChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const params = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/customer/employee/total-amount-per-month/${params.id}`);
        setMonthlyData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const amounts = monthlyData && monthlyData.map(item => item.totalAmount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Sales per Month',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: amounts
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default LineChart;
