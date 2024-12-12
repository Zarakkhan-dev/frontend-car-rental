import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Sales",
        data: [8, 18, 10, 22, 12, 8, 18],
        backgroundColor: "gray", // Vibrant teal
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white", // Rich navy blue
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white", // Rich navy blue
        },
      },
      y: {
        grid: {
          color: "gray", // Vibrant teal
        },
        ticks: {
          color: "white", // Rich navy blue
        },
      },
    },
  };

  return (
    <div className="bg-transparent  overflow-x-scroll md:overflow-x-hidden md:w-full scroll-smooth rounded-[10px] p-4">
      <h4 className="text-white mb-4 text-xl font-bold">Performance</h4>
      <div className="flex flex-col md:flex-row items-center justify-around mb-4">
        <div className="text-white mb-4 md:mb-0">
          <div className="text-xl">
            974 <span className="text-lg font-bold text-green-600">56% ↑</span>
          </div>
          <div className="">Top Cars</div>
        </div>
        <div className="text-white mb-4 md:mb-0">
          <div className="text-xl">
            1,218 <span className="text-lg font-bold text-red-600">34% ↓</span>
          </div>
          <div className="">Total Sales</div>
        </div>
        <div className="text-white">
          <div className="text-xl">
            42.8%{" "}
            <span className="text-lg font-bold text-green-600">22% ↑</span>
          </div>
          <div className="">Conversion Rate</div>
        </div>
      </div>
      <div className="w-full flex text-white items-center justify-center">
        <Bar data={data} options={options} height={150} />
      </div>
    </div>
  );
};

export default PerformanceChart;