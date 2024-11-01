import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React, { useState } from "react";
import { Data } from "../Utils/Data";
import { Bar, Line, Pie } from "react-chartjs-2";
Chart.register(CategoryScale);

const Home = () => {
  let [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "User Gained",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  });
  return (
    <div>
      <div className="w-full grid grid-flow-col p-[30px] mt-[100px]">
        <div className="w-[350px] h-[200px] bg-yellow-400 rounded-[10px] py-[20px]">
          <Line data={chartData} />
        </div>
        <div className="w-[350px] h-[200px] bg-orange-500 rounded-[10px] py-[20px]">
          <Bar data={chartData} className="w-full" />
        </div>
        <div className="w-[200px] h-[200px] bg-blue-400 rounded-[10px] p-[10px]">
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
