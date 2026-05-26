import React from 'react';

const Sidebar = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  activeTab,
  setActiveTab,
  onLogout
}) => {
  return (
    <aside
      className="glass-panel sidebar-transition d-flex flex-column justify-content-between h-100 py-4 px-3"
      style={{
        width: isSidebarCollapsed ? '80px' : '280px',
        minWidth: isSidebarCollapsed ? '80px' : '280px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRight: '1px solid rgba(13, 110, 253, 0.15)',
        zIndex: 100
      }}
    >
      <div>
        {/* Header & Logo */}
        <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">
          {!isSidebarCollapsed ? (
            <div className="d-flex align-items-center gap-2">
              <div className="position-relative">
                <span className="material-symbols-outlined text-primary fs-3 animate-pulse-cyber">psychology</span>
                <span className="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle" style={{ width: '10px', height: '10px' }}></span>
              </div>
              <div>
                <span className="text-white fw-bold d-block leading-none fs-6">SKY MIND</span>
                <span className="text-secondary small tracking-wider uppercase font-semibold" style={{ fontSize: '0.65rem' }}>ADMIN DECK</span>
              </div>
            </div>
          ) : (
            <span className="material-symbols-outlined text-primary fs-3 mx-auto animate-pulse-cyber">psychology</span>
          )}
          
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="btn btn-sm btn-outline-secondary p-1 border-0 d-none d-lg-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined text-secondary fs-5">
              {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex flex-column gap-2">
          {[
            { id: 'overview', label: 'Overview Deck', icon: 'dashboard' },
            { id: 'intel', label: 'Market Intel', icon: 'analytics' },
            { id: 'synthesizer', label: 'AI Synthesizer', icon: 'terminal' },
            { id: 'nodes', label: 'System Node Grid', icon: 'lan' },
            { id: 'reports', label: 'Reports compiler', icon: 'download' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <a
                key={tab.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.id);
                }}
                className={`sidebar-link ${isActive ? 'active' : ''} d-flex align-items-center gap-3`}
                title={tab.label}
              >
                <span className="material-symbols-outlined fs-5">{tab.icon}</span>
                {!isSidebarCollapsed && <span className="small">{tab.label}</span>}
              </a>
            );
          })}
        </nav>
      </div>

      {/* User Block at bottom */}
      <div className="border-top border-secondary pt-3">
        <div className={`d-flex align-items-center ${isSidebarCollapsed ? 'justify-content-center' : 'justify-content-between'}`}>
          {!isSidebarCollapsed ? (
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-primary bg-opacity-25 border border-primary d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
                AD
              </div>
              <div>
                <h6 className="text-white mb-0 small fw-semibold">Admin Deck</h6>
                {/* <span className="text-neon-cyan" style={{ fontSize: '0.7rem' }}>Sysop Level 4</span> */}
              </div>
            </div>
          ) : (
            <div className="rounded-circle bg-primary bg-opacity-25 border border-primary d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
              AD
            </div>
          )}

          {!isSidebarCollapsed && (
            <button
              onClick={onLogout}
              className="btn btn-sm btn-outline-danger border-0 p-1 d-flex align-items-center justify-content-center"
              title="Logout System"
            >
              <span className="material-symbols-outlined fs-5">logout</span>
            </button>
          )}
        </div>
        {isSidebarCollapsed && (
          <button
            onClick={onLogout}
            className="btn btn-sm btn-outline-danger border-0 p-1 w-100 mt-2 d-flex align-items-center justify-content-center"
            title="Logout System"
          >
            <span className="material-symbols-outlined fs-5">logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
