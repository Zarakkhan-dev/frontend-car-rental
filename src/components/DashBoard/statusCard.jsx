/* eslint-disable react/prop-types */

const StatusCard = ({ title, value, icon }) => {
	return (
		<div className="w-full bg-ground rounded-[10px] p-8 flex items-center text-gray-800 ">
			<div className="flex-1">
				<h4 className=" font-bold">{title}</h4>
				<div className="text-2xl font-bold">{value}</div>
			</div>
			<div className="text-gray-900 bg-white p-2 rounded-full">{icon}</div>
		</div>
	);
};

export default StatusCard;
