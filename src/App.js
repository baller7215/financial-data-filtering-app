import { useState, useEffect } from 'react';
import './App.css';
import Switch from './Switch';
import axios from 'axios';
import { ChevronUp, ChevronDown } from 'lucide-react';


// custom colors
// background: "#1f1d35",
// darkBlue: '#48497f',
// purple: '#827ab3',
// lightBlue: '#b7badc',
// white: '#b7badc',


function App() {
  const [theme, setTheme] = useState('dark');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ // filters
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.documentElement.setAttribute('data-theme', theme);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = process.env.REACT_APP_DEVELOPMENT_BACKEND_SERVER;

  const fetchData = async () => {
    try {
      console.log('api url:', `${apiUrl}/financial-data`);
      const response = await axios.get(`${apiUrl}/financial-data`);
      setData(response.data);
      console.log('data', data);
      setFilteredData(response.data);
      console.logt('filtered data', filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const {
      startDate, endDate, minRevenue, maxRevenue, minNetIncome, maxNetIncome,
    } = filters;

    const newFilteredData = data.filter(item => {
      const date = item.date;
      const revenue = item.revenue;
      const netIncome = item.netIncome;

      return (!startDate || date >= startDate)
        && (!endDate || date <= endDate)
        && (!minRevenue || revenue >= minRevenue)
        && (!maxRevenue || revenue <= maxRevenue)
        && (!minNetIncome || netIncome >= minNetIncome)
        && (!maxNetIncome || netIncome <= maxNetIncome);
    });

    setFilteredData(newFilteredData);
  };

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && (sortConfig.direction === 'desc' || sortConfig.direction === '')) {
      direction = 'asc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  const formatter = new Intl.NumberFormat('en-US');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-bl from-background to-purple text-white' : 'bg-gradient-to-bl from-white to-purple text-gray-900'}`}>
      <header className="py-5 px-10">
        <Switch isChecked={theme === 'light'} onChange={toggleTheme} />
      </header>

      <div className="p-5">
        <div className="grid gap-4 mb-4">
          <input type="date" name="startDate" placeholder="Start Date" onChange={handleFilterChange} />
          <input type="date" name="endDate" placeholder="End Date" onChange={handleFilterChange} />
          <input type="number" name="minRevenue" placeholder="Min Revenue" onChange={handleFilterChange} />
          <input type="number" name="maxRevenue" placeholder="Max Revenue" onChange={handleFilterChange} />
          <input type="number" name="minNetIncome" placeholder="Min Net Income" onChange={handleFilterChange} />
          <input type="number" name="maxNetIncome" placeholder="Max Net Income" onChange={handleFilterChange} />
          <button onClick={applyFilters} className="bg-blue-500 text-white py-2 px-4 rounded">Apply Filters</button>
        </div>

        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('date')} 
                className="border border-gray-500 px-4 py-2 cursor-pointer"
              >
                <div className="flex justify-center items-center gap-1">
                  Date
                  {sortConfig.key === 'date' && (
                    sortConfig.direction === 'asc' 
                      ? <ChevronUp size={20} className='my-auto' /> 
                      : <ChevronDown size={20} className='my-auto' />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('revenue')} 
                className="border border-gray-500 px-4 py-2 cursor-pointer"
              >
                <div className="flex justify-center items-center gap-1">
                  Revenue
                  {sortConfig.key === 'revenue' && (
                    sortConfig.direction === 'asc' 
                      ? <ChevronUp size={20} className='my-auto' /> 
                      : <ChevronDown size={20} className='my-auto' />
                  )}
                </div>
              </th>
              <th
                onClick={() => handleSort('netIncome')}
                className="border border-gray-500 px-4 py-2 cursor-pointer"
              >
                <div className="flex justify-center items-center gap-1">
                  Net Income
                  {sortConfig.key === 'netIncome' && (
                    sortConfig.direction === 'asc' 
                      ? <ChevronUp size={20} className='my-auto' /> 
                      : <ChevronDown size={20} className='my-auto' />
                  )}
                </div>
              </th>
              <th className="border border-gray-500 px-4 py-2">Gross Profit</th>
              <th className="border border-gray-500 px-4 py-2">EPS</th>
              <th className="border border-gray-500 px-4 py-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-500 px-4 py-2">{item.date}</td>
                <td className="border border-gray-500 px-4 py-2">${formatter.format(item.revenue)}</td>
                <td className="border border-gray-500 px-4 py-2">${formatter.format(item.netIncome)}</td>
                <td className="border border-gray-500 px-4 py-2">${formatter.format(item.grossProfit)}</td>
                <td className="border border-gray-500 px-4 py-2">{item.eps}</td>
                <td className="border border-gray-500 px-4 py-2">${formatter.format(item.operatingIncome)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

