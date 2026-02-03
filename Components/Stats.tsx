import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const rawData = [
  { name: 'Maldives', visitors: 4000 },
  { name: 'Bali', visitors: 3500 },
  { name: 'Egypt', visitors: 3200 },
  { name: 'Greece', visitors: 2800 },
  { name: 'Dubai', visitors: 2500 },
  { name: 'Thailand', visitors: 2100 },
];

const Stats: React.FC = () => {
  // Convert to percentages
  const data = useMemo(() => {
    const total = rawData.reduce((acc, curr) => acc + curr.visitors, 0);
    return rawData.map(item => ({
      name: item.name,
      percentage: Math.round((item.visitors / total) * 100)
    }));
  }, []);

  return (
    <section id="stats" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/3">
             <span className="text-sea uppercase tracking-widest text-xs font-bold">
                Community Favorites
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-navy mt-4 mb-6">
              Where Everyone is <br/> <span className="text-sand italic text-5xl">Flying</span>
            </h2>
            <p className="text-navy/60 font-light leading-relaxed mb-8">
              Join thousands of travelers exploring the world's most exotic corners. See the top destinations our community is choosing this season.
            </p>
          </div>

          <div className="w-full md:w-2/3 h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                    dataKey="name" 
                    stroke="#E2DAD1" 
                    tick={{ fill: '#0C4A6E', fontSize: 12, fontWeight: 500 }} 
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis hide />
                <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Travelers']}
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#E2DAD1', color: '#0C4A6E', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0C4A6E', fontWeight: 'bold' }}
                    cursor={{fill: '#FAFAF9'}}
                />
                <Bar dataKey="percentage" radius={[8, 8, 8, 8]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#E2DAD1' : '#0EA5E9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;