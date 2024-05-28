import React from 'react';
import './App.css';
import MqttChart from './MqttChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MQTT Temperature Chart</h1>
      </header>
      <MqttChart />
    </div>
  );
}

export default App;
