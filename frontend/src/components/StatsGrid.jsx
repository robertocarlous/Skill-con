import StatsCard from './StatsCard';

const StatsGrid = ({ statsData }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    {statsData.map((stat, index) => (
      <StatsCard key={index} {...stat} />
    ))}
  </div>
);

export default StatsGrid;
