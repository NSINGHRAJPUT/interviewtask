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
  const [timePeriod, setTimePeriod] = useState(0);
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
      console.log("timePeriod", timePeriod);
      const totalAmount =
        deposit * Math.pow(1 + interestRate / 100, timePeriod);
      const interest = Math.floor(totalAmount) - Math.floor(deposit);
      const commulativeRateOfReturn = (interest / deposit) * 100;
      // console.log("Total Amount: ", Math.floor(totalAmount));
      // console.log("Interest Earned: ", interest, deposit);
      const firstYearAmount = Math.floor(
        deposit * Math.pow(1 + interestRate / 100, 1),
      );
      const secondYearAmount = Math.floor(
        deposit * Math.pow(1 + interestRate / 100, 2),
      );
      const thirdYearAmount = Math.floor(
        deposit * Math.pow(1 + interestRate / 100, 3),
      );
      const fourthYearAmount = Math.floor(
        deposit * Math.pow(1 + interestRate / 100, 4),
      );
      const fifthYearAmount = Math.floor(
        deposit * Math.pow(1 + interestRate / 100, 5),
      );
      setFiveYearData([
        firstYearAmount,
        secondYearAmount,
        thirdYearAmount,
        fourthYearAmount,
        fifthYearAmount,
      ]);

      setMaturityAmount(() => Math.floor(totalAmount));
      setInterestEarned(interest);
      setCummulativeRateOfReturn(commulativeRateOfReturn);
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
      <div className="flex flex-row justify-between items-center h-screen w-full bg-white py-10 px-20 gap-10">
        {/* left side */}
        <div className="flex flex-col justify-start items-start gap-5 bg-white p-10 rounded-lg ">
          <h1 className="text-2xl font-bold text-[#FFBF00]">FD Calculator</h1>
          <p className="text-gray-500">
            Estimate how much your fix deposit inventment will grow over time
          </p>
          <h2 className="text-lg font-semibold text-gray-700">
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
          <h2 className="text-lg font-semibold text-gray-700">
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

          <h2 className="text-lg font-semibold text-gray-700">
            Interest Payouts
          </h2>
          <p className="text-gray-500">
            Commulative Rate Of Return {commulativeRateOfReturn.toFixed(2)}%
          </p>
          <select
            value={timePeriod}
            className="w-full h-10 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 p-2"
            onChange={(e) => setTimePeriod(Number(e.target.value))}
          >
            <option value="quarterly" className="text-gray-300 p-2">
              Quarterly
            </option>
            <option value="half-yearly">Half-Yearly</option>
            <option value="yearly">Yearly</option>
            <option value="maturity">Maturity</option>
          </select>

          <h2 className="text-lg font-semibold text-gray-700">
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
            className="bg-[#FFBF00] hover:bg-[#e6a900] text-white font-bold py-2 px-4 rounded"
          >
            Calculate
          </button>
        </div>

        {/* right side */}
        <div className="flex flex-col justify-start items-center gap-10 bg-[#FFBF00] p-10 rounded-lg">
          <div className="flex flex-row justify-around items-center gap-2 w-full">
            <div className="flex flex-col justify-start items-start gap-2">
              <p className="text-gray-100 text-sm">Maturity Amount</p>
              <h2 className="text-xl font-bold">
                ${maturityAmount.toFixed(2)}
              </h2>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
              <p className="text-gray-100 text-sm">Interest Earned</p>
              <h2 className="text-xl font-bold">
                ${interestEarned.toFixed(2)}
              </h2>
            </div>
          </div>
          {/* bar chart  */}
          <div>
            <ReactApexChart
              options={{
                chart: {
                  id: "bar-chart",
                },
                xaxis: {
                  categories: labels,
                },
                yaxis: {
                  title: {
                    text: "Amount",
                  },
                },
              }}
              series={[
                {
                  name: "Amount",
                  data: fiveYearData,
                },
              ]}
              type="bar"
              height={240}
              width={500}
              style={{ margin: "0 auto" }}
            />
          </div>
          <div className="flex flex-row justify-around items-start gap-2 w-full ">
            {/* card 1 */}
            <div className="bg-stone-700 p-4 rounded-lg shadow h-36 w-48 relative pt-8">
              <div className="absolute top-2 right-2"> {svg}</div>
              <h3 className="text-lg font-bold text-light">
                Check Suitable Products for Your Investment
              </h3>
              <p className="text-gray-300">exclusively for you</p>
            </div>

            {/* card 2 */}
            <div className="bg-gray-600 p-4 rounded-lg shadow h-36 w-48   relative pt-8">
              <div className="absolute top-2 right-2"> {svg}</div>

              <h3 className="text-lg font-bold text-light">
                Need Help Finding Right Product?
              </h3>
              <p className="text-gray-300">Get Guidance from Wealth Manager</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
