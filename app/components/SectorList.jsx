import React from 'react';

export default function SectorList({ sectors, selectedSectors, onSectorClick, error }) {
  return (
    <div className="flex flex-col">
      <div className="bg-white h-72 overflow-y-scroll rounded-sm">
        {sectors?.map(sector => (
          <div
            key={sector.id}
            className={`cursor-pointer ${selectedSectors.has(sector.id) ? 'bg-gray-300 text-blue-400' : ''}`}
            onClick={() => onSectorClick(sector.id)}
          >
            <div style={{ paddingLeft: `${sector.depth * 10}px` }}>-{sector.name}</div>
          </div>
        ))}
      </div>
      <p className={`text-red-500 min-h-5`}>{error}</p>
    </div>
  );
}
