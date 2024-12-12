import PerformanceChart from "./performanceChart";


const TopPerformance = () => {
  return (
    <div className="grid ">
      <div className="col-span-3 w-full">
        <PerformanceChart />
      </div>
      {/* <div className="col-span-1 md:col-span-2">
        <TopCategories />
      </div> */}
    </div>
  );
};

export default TopPerformance;