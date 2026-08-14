"use client";

import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-external-link-icon lucide-external-link"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);
export default function Home() {
  const [deposit, setDeposit] = useState(0);
  const [timePeriod, setTimePeriod] = useState(1);
  const [payoutFrequency, setPayoutFrequency] = useState("yearly");
  const [interestRate, setInterestRate] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [fiveYearData, setFiveYearData] = useState([1000, 0, 0, 0, 0]);
  const [commulativeRateOfReturn, setCummulativeRateOfReturn] = useState(0);

  // sample chart data
  const labels = ["1", "2", "3", "4", "5"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: fiveYearData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  async function calculateInterest() {
    try {
      if (deposit <= 0 || timePeriod <= 0 || interestRate <= 0) {
        console.log("Please set all values greater than 0");
        return;
      }

      // Determine compounding frequency
      let compoundingFrequency = 1;
      if (payoutFrequency === "quarterly") {
        compoundingFrequency = 4;
      } else if (payoutFrequency === "half-yearly") {
        compoundingFrequency = 2;
      } else {
        compoundingFrequency = 1; // yearly and maturity
      }

      // Calculate total amount using compound interest formula
      // A = P(1 + r/n/100)^(n*t)
      const rate = interestRate / compoundingFrequency / 100;
      const periods = compoundingFrequency * timePeriod;
      const totalAmount = deposit * Math.pow(1 + rate, periods);

      const interest = Math.floor(totalAmount) - Math.floor(deposit);
      const cumulativeRateOfReturn = (interest / deposit) * 100;

      // Calculate year-by-year data
      const yearlyData = [];
      for (let year = 1; year <= 5; year++) {
        const yearAmount =
          deposit * Math.pow(1 + rate, compoundingFrequency * year);
        yearlyData.push(Math.floor(yearAmount));
      }

      setFiveYearData(yearlyData);
      setMaturityAmount(() => Math.floor(totalAmount));
      setInterestEarned(interest);
      setCummulativeRateOfReturn(cumulativeRateOfReturn);
    } catch (error) {
      console.log(error);
    }
  }

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center min-h-screen w-full bg-white py-6 px-4 sm:px-8 lg:px-20 gap-6 lg:gap-10">
        {/* left side */}
        <div className="flex flex-col justify-start items-start gap-4 sm:gap-5 bg-white p-4 sm:p-6 lg:p-10 rounded-lg w-full lg:w-1/2 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-[#FFBF00]">
            FD Calculator
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Estimate how much your fix deposit inventment will grow over time
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">
            Deposit Amount
          </h2>
          <input
            type="range"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            min={10000}
            max={5000000}
            step={10000}
            className="w-full h-2 bg-[#FFBF00] rounded-lg appearance-none cursor-pointer dark:bg-gray-700 "
          />
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">
            Rate of Return(%)
          </h2>
          <input
            type="range"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min={5}
            max={30}
            step={1}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <h2 className="text-base sm:text-lg font-semibold text-gray-700">
            Interest Payouts
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Commulative Rate Of Return {commulativeRateOfReturn.toFixed(2)}%
          </p>
          <div className="flex flex-wrap gap-2 w-full">
            {[
              { value: "quarterly", label: "Quarterly" },
              { value: "half-yearly", label: "Half-Yearly" },
              { value: "yearly", label: "Yearly" },
              { value: "maturity", label: "Maturity" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPayoutFrequency(option.value)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded font-semibold transition-colors ${
                  payoutFrequency === option.value
                    ? "bg-[#FFBF00] text-black"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <h2 className="text-base sm:text-lg font-semibold text-gray-700">
            Time Period(Years)
          </h2>
          <input
            type="range"
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
            min={1}
            max={50}
            step={1}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <button
            onClick={calculateInterest}
            className="bg-[#FFBF00] hover:bg-[#e6a900] text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
          >
            Calculate
          </button>
        </div>

        {/* right side */}
        <div className="flex flex-col justify-start items-center gap-6 sm:gap-10 bg-[#FFBF00] p-4 sm:p-6 lg:p-10 rounded-lg w-full lg:w-1/2 min-w-0">
          <div className="flex flex-row justify-around items-center gap-2 w-full">
            <div className="flex flex-col justify-start items-start gap-2">
              <p className="text-gray-100 text-xs sm:text-sm">Maturity Amount</p>
              <h2 className="text-lg sm:text-xl font-bold">
                ${maturityAmount.toFixed(2)}
              </h2>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
              <p className="text-gray-100 text-xs sm:text-sm">Interest Earned</p>
              <h2 className="text-lg sm:text-xl font-bold">
                ${interestEarned.toFixed(2)}
              </h2>
            </div>
          </div>
          {/* bar chart  */}
          <div className="w-full bg-white rounded-lg p-2 sm:p-4">
            <ReactApexChart
              options={{
                chart: {
                  id: "bar-chart",
                  toolbar: { show: false },
                  parentHeightOffset: 0,
                },
                colors: ["#FFBF00"],
                dataLabels: { enabled: false },
                plotOptions: {
                  bar: {
                    columnWidth: "55%",
                    borderRadius: 4,
                  },
                },
                grid: {
                  borderColor: "#eee",
                  padding: { left: 0, right: 0 },
                },
                xaxis: {
                  categories: labels,
                  title: { text: "Year" },
                },
                yaxis: {
                  title: {
                    text: "Amount",
                  },
                  labels: {
                    formatter: (value: number) =>
                      value >= 100000
                        ? `${(value / 100000).toFixed(1)}L`
                        : `${Math.round(value)}`,
                  },
                },
                responsive: [
                  {
                    breakpoint: 640,
                    options: {
                      yaxis: { title: { text: undefined } },
                      plotOptions: { bar: { columnWidth: "70%" } },
                    },
                  },
                ],
              }}
              series={[
                {
                  name: "Amount",
                  data: fiveYearData,
                },
              ]}
              type="bar"
              height={260}
              width="100%"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-around items-stretch sm:items-start gap-3 sm:gap-2 w-full">
            {/* card 1 */}
            <div className="bg-stone-700 p-4 rounded-lg shadow min-h-36 w-full sm:w-48 relative pt-8">
              <div className="absolute top-2 right-2"> {svg}</div>
              <h3 className="text-base sm:text-lg font-bold text-light">
                Check Suitable Products for Your Investment
              </h3>
              <p className="text-gray-300 text-sm">exclusively for you</p>
            </div>

            {/* card 2 */}
            <div className="bg-gray-600 p-4 rounded-lg shadow min-h-36 w-full sm:w-48 relative pt-8">
              <div className="absolute top-2 right-2"> {svg}</div>

              <h3 className="text-base sm:text-lg font-bold text-light">
                Need Help Finding Right Product?
              </h3>
              <p className="text-gray-300 text-sm">
                Get Guidance from Wealth Manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
