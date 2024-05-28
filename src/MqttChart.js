import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { Line } from 'react-chartjs-2';

const MqttChart = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  useEffect(() => {
    const client = mqtt.connect('ws://your-mqtt-broker-url:port');
    
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('temperature');
    });

    client.on('message', (topic, message) => {
      if (topic === 'temperature') {
        const data = JSON.parse(message.toString());
        const { ts, value } = data;

        setTemperatureData((prevData) => [...prevData, value]);
        setTimeData((prevTime) => [...prevTime, new Date(ts).toLocaleTimeString()]);
      }
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const data = {
    labels: timeData,
    datasets: [
      {
        label: 'Temperature',
        data: temperatureData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h2>Real-Time Temperature Data</h2>
      <Line data={data} />
    </div>
  );
};

export default MqttChart;
