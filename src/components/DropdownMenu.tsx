import { useState } from 'react';
import "./DropdownMenu.css"

// Add this new component
const SettingsMenu = ({ onClearCounters }: { onClearCounters: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="settings-menu">
      <button 
        className="settings-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⚙️ Settings
      </button>
      {isOpen && (
        <div className="settings-dropdown">
          <button 
            className="danger-button"
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to clear all counters? This cannot be undone."
              );
              if (confirmed) {
                onClearCounters();
                setIsOpen(false);
              }
            }}
          >
            Clear All Counters
          </button>
          {/* Add more settings options here if needed */}
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;