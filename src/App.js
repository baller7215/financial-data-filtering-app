import { useState, useEffect } from 'react';
import './App.css';
import Switch from './Switch';
import axios from 'axios';
import { ChevronUp, ChevronDown, RefreshCcw } from 'lucide-react';


// custom colors
// background: "#1f1d35",
// darkBlue: '#48497f',
// purple: '#827ab3',
// lightBlue: '#b7badc',
// white: '#b7badc',


function App() {
  const emptyFilters ={ // filters
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  };

  const [theme, setTheme] = useState('dark');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
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
      console.log('filtered data', filteredData);
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
      <header className="py-5 px-5 sm:px-10">
        <Switch isChecked={theme === 'light'} onChange={toggleTheme} />
      </header>

      <div className="py-5 px-5 sm:px-10 flex flex-col gap-10">
        <div className={`grid gap-4 mb-4 ${theme === 'dark' ? 'text-lightBlue' : 'text-darkBlue'}`}>
          {/* date filter */}
          <div className='grid grid-cols-2 gap-4 justify-between'>
            <div className='flex flex-col gap-1'>
              <p>Start Date</p>
              <input className='w-full rounded-md px-5 py-2 shadow-md bg-white/50 text-darkBlue placeholder:text-darkBlue' type="date" name="startDate" value={filters.startDate ? filters.startDate : ''} placeholder='Start Date' onChange={handleFilterChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <p>End Date</p>
              <input className='w-full rounded-md px-5 py-2 shadow-md bg-white/50 text-darkBlue placeholder:text-darkBlue' type="date" name="endDate" value={filters.endDate ? filters.endDate : 'End Date'} placeholder='End Date' onChange={handleFilterChange} />
            </div>
          </div>
          
          {/* revenue filter */}
          <div className='grid grid-cols-2 gap-4 justify-between'>
            <div className='flex flex-col gap-1'>
              <p>Min Revenue</p>
              <input className='w-full rounded-md px-5 py-2 shadow-md bg-white/50 text-darkBlue placeholder:text-darkBlue' type="number" name="minRevenue" value={filters.minRevenue ? filters.minRevenue : ''} placeholder='Min Revenue' onChange={handleFilterChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Max Revenue</p>
              <input className='w-full rounded-md px-5 py-2 shadow-md bg-white/50 text-darkBlue placeholder:text-darkBlue' type="number" name="maxRevenue" value={filters.maxRevenue ? filters.maxRevenue : 'Max Revenue'} placeholder='Max Revenue' onChange={handleFilterChange} />
            </div>
          </div>
          
          {/* income filter */}
          <div className='grid grid-cols-2 gap-4 justify-between'>
            <div className='flex flex-col gap-1'>
              <p>Min Net Income</p>
              <input className='w-full rounded-md px-5 py-2 shadow-md bg-white/50 text-darkBlue placeholder:text-darkBlue' type="number" name="minNetIncome" value={filters.minNetIncome ? filters.minNetIncome : ''} placeholder='Min Net Income' onChange={handleFilterChange} />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Max Net Income</p>
              <input className='w-full rounded-md px-5 py-2 shadow-md bg-white/50 text-darkBlue placeholder:text-darkBlue' type="number" name="maxNetIncome" value={filters.maxNetIncome ? filters.maxNetIncome : ''} placeholder='Max Net Income' onChange={handleFilterChange} />
            </div>
          </div>
          
          <div className='flex flex-row gap-5 justify-center'>
            <button onClick={applyFilters} className={`${theme === 'dark' ? 'bg-lightBlue text-darkBlue hover:bg-white' : 'bg-darkBlue text-lightBlue hover:bg-background'} rounded w-fit cursor-pointer px-10 py-3`}>Apply Filters</button>
            <RefreshCcw 
              className='my-auto cursor-pointer' 
              size={28} 
              onClick={() => {
                setFilters(emptyFilters); // clear filters
                setFilteredData(data); // reset table data to original data
              }} 
            />
          </div>
          
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className={`${theme === 'dark' ? 'bg-lightBlue text-darkBlue' : 'bg-darkBlue text-lightBlue'}`}>
              <tr>
                {['date', 'revenue', 'netIncome'].map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className={`min-w-32 border px-4 py-2 cursor-pointer transition ease-in-out duration-300 sticky top-0 z-1 ${
                      theme === 'dark' ? 'hover:bg-darkBlue hover:text-lightBlue' : 'hover:bg-lightBlue hover:text-darkBlue'
                    } ${
                      sortConfig.key === key ? `sticky left-0 z-10 ${theme === 'dark' ? `bg-darkBlue text-lightBlue` : 'bg-lightBlue text-darkBlue'}` : ''
                    }`}
                  >
                    <div className="flex justify-between items-center capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      {sortConfig.key === key &&
                        (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </div>
                  </th>
                ))}
                <th className="border px-4 py-2">Gross Profit</th>
                <th className="border px-4 py-2">EPS</th>
                <th className="border px-4 py-2">Operating Income</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-600">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-purple/10">
                  {['date', 'revenue', 'netIncome'].map((key) => (
                    <td
                      key={key}
                      className={`border px-4 py-2 ${
                        sortConfig.key === key ? `sticky left-0 z-10 ${theme === 'dark' ? `bg-darkBlue text-lightBlue` : 'bg-lightBlue text-darkBlue'}` : ''
                      }`}
                    >
                      {key === 'date' ? item.date : `$${formatter.format(item[key])}`}
                    </td>
                  ))}
                  <td className="border px-4 py-2">${formatter.format(item.grossProfit)}</td>
                  <td className="border px-4 py-2">{item.eps}</td>
                  <td className="border px-4 py-2">${formatter.format(item.operatingIncome)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

