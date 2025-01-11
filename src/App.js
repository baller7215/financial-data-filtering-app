import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import { Landmark } from 'lucide-react';
import Switch from './Switch';


function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-bl from-background to-purple text-white' : 'bg-gradient-to-bl from-white to-darkBlue text-gray-900'}`}>
      <header className="py-5 px-10">
        <Switch isChecked={theme === 'light'} onChange={toggleTheme} />
      </header>
    </div>
  );
}

export default App;

