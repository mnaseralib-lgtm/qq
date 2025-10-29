
import React from "https://esm.sh/react@18.2.0";
import {ReportIcon, ScanIcon} from "./icons.js";

const Header = ({setView, currentView, scanCount}) => {
  return React.createElement('header', {className: 'bg-gray-800 text-white shadow-lg sticky top-0 z-10'},
    React.createElement('div',{className:'container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center'},
      React.createElement('div',{className:'flex items-center gap-2 sm:gap-4'},
        React.createElement('h1',{className:'text-xl sm:text-2xl font-bold tracking-wide'}, 'نظام الحضور الذكي'),
        currentView === 'SCANNER' ? React.createElement('div',{className:'bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full'},
          React.createElement('span', null, 'العدد:'),
          React.createElement('span',{className:'mr-1 font-mono'}, String(scanCount))
        ) : null
      ),
      React.createElement('div', null,
        React.createElement('button', {onClick: ()=> setView(currentView === 'SCANNER' ? 'REPORTS' : 'SCANNER'), className:'p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200'},
          currentView === 'SCANNER' ? React.createElement(ReportIcon, {className:'w-6 h-6'}) : React.createElement(ScanIcon, {className:'w-6 h-6'})
        )
      )
    )
  );
};

export default Header;
