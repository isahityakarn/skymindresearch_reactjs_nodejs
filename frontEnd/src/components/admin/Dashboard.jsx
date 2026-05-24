import { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';

export default function Dashboard({ onLogout }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Live Activity Log State (for continuous simulated admin event streams)
  const [logs, setLogs] = useState([
    { id: 1, time: '18:54:12', msg: 'System integrity online. Cluster synchronization active.', type: 'info' },
    { id: 2, time: '18:54:28', msg: 'Intercepted encrypted data stream in SE-Asia segment.', type: 'warning' },
    { id: 3, time: '18:55:01', msg: 'AI Neural Node 04 allocated to defense intelligence synthesis.', type: 'success' },
  ]);

  // Notifications State for visual feedback
  const [notifications, setNotifications] = useState([]);

  // Add a dynamic notification helper
  const addNotification = (text, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  // Automatically append simulation logs in background to look alive
  useEffect(() => {
    const logPool = [
      { msg: 'Optimized neural grid pathways in North Atlantic sector.', type: 'success' },
      { msg: 'Threat monitor flagged unusual query rates on financial index APIs.', type: 'warning' },
      { msg: 'Compiled monthly sovereign debt risk summaries.', type: 'info' },
      { msg: 'Synchronized encrypted cold storage backup across decentralized grids.', type: 'info' },
      { msg: 'Purged system logs prior to 2026-05-01 successfully.', type: 'success' },
      { msg: 'Recalibrating high-frequency aerospace sentiment algorithms.', type: 'warning' },
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setLogs((prev) => [
        { id: Date.now(), time: timeStr, msg: randomLog.msg, type: randomLog.type },
        ...prev.slice(0, 15),
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // AI Synthesizer state
  const [synthesizerPrompt, setSynthesizerPrompt] = useState('');
  const [synthProgress, setSynthProgress] = useState(0);
  const [synthStatus, setSynthStatus] = useState('');
  const [compiledReport, setCompiledReport] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Simulated templates for the Synthesizer
  const synthTemplates = {
    sovereign: {
      title: 'Sovereign Intelligence Report - Cyber Warfare Matrix',
      content: `[CONFIDENTIAL SECURITY DOSSIER // EYES ONLY]
AUTHORITY: Sky Mind Research Intelligence Deck
DATE: May 24, 2026

1. EXECUTIVE SYNOPSIS
Multi-vector intrusion patterns in critical energy grids have risen by 34.2% over Q1. Signal attribution matches threat group code 'CHRONOS-7'.

2. THREAT MATRIX PROFILE
- Source Vectors: Edge IoT node exploitation, routing spoofing.
- Active Payload: Hexadecimal polymorphic decryptors designed to target SCADA control centers.
- Primary Objective: Surveillance, network mapping, pre-staged access for potential escalation.

3. PREVENTATIVE REMEDIATION
- Immediately deploy zero-trust cluster separation.
- Force roll keys across all active decentralized databases.
- Run hardware-enforced telemetry checks hourly.

STATUS: ALL REMEDIATION COMPLETED. MONITORED GRID RUNNING IN GREEN STATE.`
    },
    finance: {
      title: 'Financial System Volatility Forecast',
      content: `[MARKET ANALYSIS // RESTRICTED ACCESS]
AUTHORITY: Sky Mind Quantitative Modeling Division
DATE: May 24, 2026

1. SECTOR METRICS OVERVIEW
We trace structural shifts inside decentralized liquidity grids. High-frequency algorithms indicate arbitrage saturation near key currency barriers.

2. QUANTITATIVE MODELING PREDICTIONS
- Next 48 Hours: Sharp volatility surge in tech indices due to cross-border regulatory adjustments.
- Primary Resistance Layer: 18,450.
- Risk Factor Level: HIGH (0.87 / 1.0).

3. STRATEGIC DEPLOYMENT SUGGESTIONS
- Reallocate 15% capital exposure from long-duration infrastructure assets into short liquidity hedges.
- Leverage real-time neural triggers to hedge micro-swings.

STATUS: EXPORT INTEGRATION VERIFIED.`
    },
    defense: {
      title: 'Aerospace & Space Defense Assessment',
      content: `[DEFENSE DEPT ANALYTICAL BRIEFING]
AUTHORITY: Sky Mind Aerospace Assessment Unit
DATE: May 24, 2026

1. REGULATORY INTELLIGENCE SUMMARY
Low Earth Orbit (LEO) telecommunication constellations have experienced a high volume of directed radio-frequency jamming in orbital sectors 4 and 12.

2. DETAILED SIGNAL ANOMALY ANALYSIS
- Signature Frequency: 12.4 GHz - 14.8 GHz (modulated phase).
- Suspected Origin: Maritime naval platforms located in international neutral waters.
- Severity: Moderate. Signal loss limited to 120ms cycles.

3. STRATEGIC MITIGATION
- Apply active spectrum hopping using cryptographic key agreements.
- Re-route space relays via secondary satellite clusters.

STATUS: MITIGATION VECTOR READY FOR TEST INJECT.`
    }
  };

  const handleSynthesize = (templateKey) => {
    if (isSynthesizing) return;
    setIsSynthesizing(true);
    setSynthProgress(0);
    setCompiledReport('');
    setSynthesizerPrompt(templateKey);

    const stages = [
      { p: 10, status: 'Initializing Secure Session...' },
      { p: 30, status: 'Decrypting Satellite Intelligence Signals...' },
      { p: 55, status: 'Synthesizing Quantum Modeling Weights...' },
      { p: 80, status: 'Generating Interactive Analytical Dossier...' },
      { p: 100, status: 'Synthesis Completed.' }
    ];

    let currentStageIdx = 0;
    const interval = setInterval(() => {
      setSynthProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSynthesizing(false);
          setCompiledReport(synthTemplates[templateKey].content);
          addNotification(`Synthesized: ${synthTemplates[templateKey].title}`, 'success');
          return 100;
        }
        
        // Progress status updates
        const nextProgress = prev + 5;
        const matchingStage = stages.find(s => nextProgress >= s.p && nextProgress < s.p + 10);
        if (matchingStage) {
          setSynthStatus(matchingStage.status);
        }
        return nextProgress;
      });
    }, 150);
  };

  // Systems Control Deck Actions
  const [databaseOptimizing, setDatabaseOptimizing] = useState(false);
  const [dbProgress, setDbProgress] = useState(0);

  const handleDatabaseOptimize = () => {
    if (databaseOptimizing) return;
    setDatabaseOptimizing(true);
    setDbProgress(0);
    addNotification('Initiating admin database indexing and defragmentation...', 'info');

    const interval = setInterval(() => {
      setDbProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setDatabaseOptimizing(false);
          addNotification('All databases compiled & optimized. 12.8GB disk space recovered.', 'success');
          // Add to log
          const now = new Date();
          const timeStr = now.toTimeString().split(' ')[0];
          setLogs(prev => [
            { id: Date.now(), time: timeStr, msg: 'Admin DB Optimization complete. Restored 100% indexing speed.', type: 'success' },
            ...prev
          ]);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  // Node grids dynamic states (Admin can overclock clusters)
  const [nodes, setNodes] = useState([
    { name: 'AETHER-01', region: 'US-East', load: 45, status: 'Optimal', temp: 38 },
    { name: 'ZEPHYR-02', region: 'EU-West', load: 82, status: 'High Load', temp: 58 },
    { name: 'TITAN-03', region: 'APAC-South', load: 21, status: 'Idle', temp: 32 },
    { name: 'APEX-04', region: 'DECENTRALIZED', load: 60, status: 'Active Sync', temp: 44 }
  ]);

  const handleAdjustNodeLoad = (idx, newLoad) => {
    setNodes(prev => prev.map((node, i) => {
      if (i === idx) {
        let status = 'Optimal';
        if (newLoad > 80) status = 'Critical Load';
        else if (newLoad > 60) status = 'High Load';
        else if (newLoad < 30) status = 'Idle';
        return {
          ...node,
          load: newLoad,
          temp: Math.floor(30 + (newLoad * 0.4) + Math.random() * 5),
          status
        };
      }
      return node;
    }));
  };

  // Neural Topology State - Hovering on visual SVG nodes shows analytical detail
  const [activeNodeDetail, setActiveNodeDetail] = useState(null);
  const neuralNodes = [
    { id: 'N1', cx: 80, cy: 120, label: 'Sat-Com Feed', info: 'Live stream of military transponders', color: '#06b6d4' },
    { id: 'N2', cx: 180, cy: 70, label: 'Geo-Spatial Parser', info: 'Mapping port container movements in Singapore', color: '#10b981' },
    { id: 'N3', cx: 280, cy: 150, label: 'Sentiment AI Node', info: 'Analyzing sovereign bond public transcripts', color: '#a855f7' },
    { id: 'N4', cx: 150, cy: 220, label: 'Crypto Decryptor', info: 'Cracking anonymous transaction logs in cluster 3', color: '#f43f5e' },
    { id: 'N5', cx: 350, cy: 90, label: 'Macro Index Engine', info: 'Aggregating cross-border currency reserves', color: '#06b6d4' },
  ];

  // Market Intel View states (Search & filtering)
  const [intelSearch, setIntelSearch] = useState('');
  const [intelFilter, setIntelFilter] = useState('ALL');
  const marketIntelligenceData = [
    { id: 'INTEL-3920', sector: 'Defense', title: 'Maritime Border Patrol AI Deployment', risk: 'Medium', accuracy: '98.4%', trend: [5, 12, 18, 14, 25, 30] },
    { id: 'INTEL-9941', sector: 'Finance', title: 'Liquidity Pool Capital Drain Detection', risk: 'High', accuracy: '99.1%', trend: [40, 38, 30, 21, 15, 8] },
    { id: 'INTEL-1049', sector: 'Aerospace', title: 'Next-Gen Commercial Avionics Software Security', risk: 'Low', accuracy: '95.6%', trend: [10, 15, 12, 22, 24, 28] },
    { id: 'INTEL-7489', sector: 'Logistics', title: 'Global Port Congestion Cascade Analysis', risk: 'High', accuracy: '97.8%', trend: [12, 25, 45, 62, 50, 80] },
    { id: 'INTEL-4402', sector: 'Defense', title: 'Sub-Orbital Missile Telemetry Signals Intercept', risk: 'High', accuracy: '99.8%', trend: [95, 96, 98, 97, 99, 99] },
    { id: 'INTEL-8830', sector: 'Finance', title: 'Corporate Cyber Espionage Risk Indices', risk: 'Low', accuracy: '91.2%', trend: [8, 12, 10, 15, 13, 14] },
  ];

  // Report compiler state
  const [reportCheckedItems, setReportCheckedItems] = useState({
    defense: true,
    finance: false,
    space: true,
    nodes: false
  });
  const [isCompilingReport, setIsCompilingReport] = useState(false);
  const [reportCompileProgress, setReportCompileProgress] = useState(0);

  const handleCompileCustomReport = () => {
    if (isCompilingReport) return;
    setIsCompilingReport(true);
    setReportCompileProgress(0);
    addNotification('Configuring and signing custom PDF intelligence brief...', 'info');

    const interval = setInterval(() => {
      setReportCompileProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsCompilingReport(false);
          addNotification('Custom Brief compiled. Downloaded "SkyMind_IntelBrief_2026.pdf" successfully!', 'success');
          return 100;
        }
        return p + 20;
      });
    }, 250);
  };

  return (
    <div className="dashboard-container d-flex grid-matrix scanline-container">
      {/* Dynamic Visual Toast Notification System */}
      <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`toast show border border-opacity-50 border-${n.type === 'success' ? 'success' : n.type === 'warning' ? 'danger' : 'info'} bg-dark text-white shadow-lg mb-2`}
            style={{ minWidth: '250px' }}
          >
            <div className="toast-header bg-black text-white border-bottom border-secondary d-flex justify-content-between align-items-center py-1">
              <strong className="d-flex align-items-center gap-1">
                <span className={`material-symbols-outlined text-${n.type === 'success' ? 'success' : n.type === 'warning' ? 'danger' : 'info'} fs-6`}>
                  {n.type === 'success' ? 'check_circle' : n.type === 'warning' ? 'warning' : 'info'}
                </span>
                {n.type === 'success' ? 'Success Alert' : n.type === 'warning' ? 'Incident Alert' : 'System Notice'}
              </strong>
              <small className="text-secondary">Just now</small>
            </div>
            <div className="toast-body bg-black bg-opacity-75 py-2 small">
              {n.text}
            </div>
          </div>
        ))}
      </div>

      {/* 1. FUTURISTIC SIDE PANEL (SIDEBAR) */}
      <aside
        className={`glass-panel sidebar-transition d-flex flex-column justify-content-between h-100 py-4 px-3`}
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
                  <span className="text-neon-cyan" style={{ fontSize: '0.7rem' }}>Sysop Level 4</span>
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

      {/* Main Workspace Frame */}
      <main className="flex-grow-1 h-100 d-flex flex-column dashboard-scroll" style={{ backgroundColor: '#020617' }}>
        
        {/* Dynamic Header Strip with System Integrity Indicators */}
        <header className="border-bottom border-secondary py-3 px-4 px-md-5 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 bg-black bg-opacity-50" style={{ zIndex: 10 }}>
          <div>
            <h1 className="h4 text-white mb-1 fw-bold tracking-tight d-flex align-items-center gap-2">
              Sky Mind Analytical Dashboard
              <span className="badge badge-neon-cyan fs-7 text-uppercase font-semibold tracking-wider px-2 py-0.5" style={{ fontSize: '0.6rem' }}>operational</span>
            </h1>
            <p className="text-secondary small mb-0">Decentralized Intelligence Network. Terminal Session secure.</p>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            {/* Live Ticker Clock */}
            <div className="text-end d-none d-md-block">
              <span className="text-secondary small block font-mono">CYCLE TIME // 18:59:57</span>
              <div className="d-flex align-items-center gap-1.5 justify-content-end text-neon-emerald small font-semibold">
                <span className="position-relative d-inline-flex" style={{ width: '6px', height: '6px' }}>
                  <span className="animate-pulse-cyber absolute inline-flex h-full w-full rounded-full bg-emerald bg-opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald"></span>
                </span>
                LIVE SIGNAL SYNCED
              </div>
            </div>
            <button
              onClick={() => {
                addNotification('Refreshing real-time intelligence feeds...', 'info');
              }}
              className="btn btn-outline-secondary btn-sm rounded-3 p-2 d-flex align-items-center justify-content-center"
              title="Refresh Feeds"
            >
              <span className="material-symbols-outlined fs-5">sync</span>
            </button>
          </div>
        </header>

        {/* Global Live Metrics Strip */}
        <section className="row g-3 px-4 px-md-5 pt-4">
          <div className="col-12 col-md-6 col-xl-3">
            <div className="glass-card p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block">AI NODES ONLINE</span>
                <span className="h3 text-white fw-bold mb-0 text-neon-cyan">2,482 <span className="fs-6 text-secondary fw-normal">/ 2.5K</span></span>
              </div>
              <div className="p-3 bg-cyan bg-opacity-10 rounded-3 border border-cyan border-opacity-25 d-flex align-items-center justify-content-center text-neon-cyan">
                <span className="material-symbols-outlined fs-4">bolt</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="glass-card p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block">SIGNAL INTEGRITY</span>
                <span className="h3 text-neon-emerald fw-bold mb-0">99.98%</span>
              </div>
              <div className="p-3 bg-emerald bg-opacity-10 rounded-3 border border-emerald border-opacity-25 d-flex align-items-center justify-content-center text-neon-emerald">
                <span className="material-symbols-outlined fs-4">shield</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="glass-card p-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-secondary small tracking-wider text-uppercase fw-semibold">MEMORY POOL GRID</span>
                <span className="text-neon-purple small font-mono">68.4%</span>
              </div>
              <div className="progress bg-dark bg-opacity-50 border border-secondary border-opacity-25" style={{ height: '6px' }}>
                <div className="progress-bar progress-glow-purple" role="progressbar" style={{ width: '68.4%' }}></div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="glass-card p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block">ACTIVE OPERATIONS</span>
                <span className="h3 text-white fw-bold mb-0 text-neon-rose">14 <span className="fs-6 text-secondary fw-normal">Global</span></span>
              </div>
              <div className="p-3 bg-danger bg-opacity-10 rounded-3 border border-danger border-opacity-25 d-flex align-items-center justify-content-center text-neon-rose animate-pulse-cyber">
                <span className="material-symbols-outlined fs-4">warning</span>
              </div>
            </div>
          </div>
        </section>

        {/* View-Specific Content Panel */}
        <div className="flex-grow-1 p-4 p-md-5">
          
          {/* TAB 1: OVERVIEW DECK */}
          {activeTab === 'overview' && (
            <div className="row g-4">
              
              {/* Left Column: Interactive Topology + Systems Panel */}
              <div className="col-12 col-lg-8">
                
                {/* SVG Visual Network Topology Map */}
                <div className="glass-card p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="text-white h5 mb-1 fw-bold d-flex align-items-center gap-2">
                        Neural Topology Intelligence Map
                        <span className="badge badge-neon-cyan fs-8 text-uppercase px-2 py-0.5">dynamic</span>
                      </h4>
                      <p className="text-secondary small mb-0">Hover/click nodes to intercept secure communication logs in real time.</p>
                    </div>
                    <span className="material-symbols-outlined text-secondary fs-5">hub</span>
                  </div>

                  <div className="row g-3 align-items-center">
                    <div className="col-12 col-md-7 border-end border-secondary border-opacity-25">
                      <div className="bg-black bg-opacity-50 rounded-4 border border-secondary border-opacity-20 d-flex justify-content-center align-items-center p-2" style={{ minHeight: '300px' }}>
                        <svg viewBox="0 0 420 300" className="w-100 h-100" style={{ maxHeight: '280px' }}>
                          {/* Connections */}
                          <line x1="80" y1="120" x2="180" y2="70" stroke="rgba(13, 110, 253, 0.4)" strokeWidth="2" strokeDasharray="4,4" />
                          <line x1="180" y1="70" x2="280" y2="150" stroke="rgba(13, 110, 253, 0.4)" strokeWidth="2" />
                          <line x1="80" y1="120" x2="150" y2="220" stroke="rgba(13, 110, 253, 0.4)" strokeWidth="2" />
                          <line x1="150" y1="220" x2="280" y2="150" stroke="rgba(13, 110, 253, 0.4)" strokeWidth="2" strokeDasharray="3,3" />
                          <line x1="280" y1="150" x2="350" y2="90" stroke="rgba(13, 110, 253, 0.4)" strokeWidth="2" />
                          <line x1="180" y1="70" x2="350" y2="90" stroke="rgba(13, 110, 253, 0.2)" strokeWidth="1" />

                          {/* Glow nodes on hover */}
                          {neuralNodes.map((node) => (
                            <g
                              key={node.id}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setActiveNodeDetail(node);
                                addNotification(`Intercepted Node [${node.id}] feed successfully`, 'success');
                              }}
                              onMouseEnter={() => setActiveNodeDetail(node)}
                            >
                              <circle
                                cx={node.cx}
                                cy={node.cy}
                                r="12"
                                fill="rgba(2, 6, 23, 0.9)"
                                stroke={node.color}
                                strokeWidth="3"
                                className="sidebar-transition"
                                style={{
                                  filter: `drop-shadow(0 0 6px ${node.color})`,
                                  transformOrigin: `${node.cx}px ${node.cy}px`
                                }}
                              />
                              <circle cx={node.cx} cy={node.cy} r="4" fill={node.color} />
                              <text x={node.cx + 18} y={node.cy + 5} fill="#94a3b8" fontSize="10" fontWeight="600" fontFamily="monospace">
                                {node.id}
                              </text>
                            </g>
                          ))}
                        </svg>
                      </div>
                    </div>

                    <div className="col-12 col-md-5">
                      <div className="p-3 bg-black bg-opacity-40 rounded-3 h-100 border border-secondary border-opacity-15">
                        <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block mb-2 font-mono">NODE SPECTRAL READOUT</span>
                        {activeNodeDetail ? (
                          <div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span className="badge rounded-pill px-2" style={{ backgroundColor: activeNodeDetail.color, color: '#000' }}>
                                {activeNodeDetail.id}
                              </span>
                              <h5 className="text-white h6 mb-0 font-bold">{activeNodeDetail.label}</h5>
                            </div>
                            <p className="text-secondary small mb-3 leading-relaxed">{activeNodeDetail.info}</p>
                            <div className="bg-black bg-opacity-70 p-2 rounded border border-secondary border-opacity-20 font-mono" style={{ fontSize: '0.75rem' }}>
                              <span className="text-neon-cyan d-block">IP: 192.168.4.{Math.floor(Math.random() * 254)}</span>
                              <span className="text-neon-emerald d-block">LATENCY: {Math.floor(8 + Math.random() * 20)}ms</span>
                              <span className="text-neon-purple d-block">INTELLIGENCE LOAD: {Math.floor(20 + Math.random() * 80)}%</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-5 text-secondary">
                            <span className="material-symbols-outlined fs-2 mb-2 animate-pulse-cyber">sensors</span>
                            <p className="small mb-0">Hover or click on any node inside the topology model to begin active analytical parsing.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operations Control Deck */}
                <div className="glass-card p-4">
                  <h4 className="text-white h5 mb-3 fw-bold d-flex align-items-center gap-2">
                    Systems Control Deck
                    <span className="badge badge-neon-emerald fs-8 text-uppercase px-2 py-0.5">verified</span>
                  </h4>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="p-3 bg-black bg-opacity-40 rounded-4 border border-secondary border-opacity-20">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="text-white mb-0 fw-semibold small">Database Indexing Optimizer</h6>
                          <span className="material-symbols-outlined text-secondary fs-5">database</span>
                        </div>
                        <p className="text-secondary small mb-3">Runs low-level database defragging and clears old analytics caching logs.</p>
                        
                        {databaseOptimizing ? (
                          <div>
                            <div className="progress mb-2" style={{ height: '6px' }}>
                              <div className="progress-bar progress-bar-striped progress-bar-animated progress-glow-cyan" style={{ width: `${dbProgress}%` }}></div>
                            </div>
                            <span className="text-neon-cyan font-mono small d-block">COMPRESSING DB TABLES: {dbProgress}%</span>
                          </div>
                        ) : (
                          <Button variant="primary" size="sm" onClick={handleDatabaseOptimize} className="w-100 py-2 border-0">
                            Optimize System Indexing
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="p-3 bg-black bg-opacity-40 rounded-4 border border-secondary border-opacity-20">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="text-white mb-0 fw-semibold small">Decentralized Threat Firewall</h6>
                          <span className="material-symbols-outlined text-neon-rose fs-5">security</span>
                        </div>
                        <p className="text-secondary small mb-3">Engage absolute zero-trust quarantine protocols across all active telemetry clusters.</p>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            addNotification('ZERO-TRUST PROTOCOL: Global clusters locked and monitored.', 'warning');
                            const now = new Date();
                            const timeStr = now.toTimeString().split(' ')[0];
                            setLogs(prev => [
                              { id: Date.now(), time: timeStr, msg: 'WARNING: Zero-Trust quarantined active across APAC-04 and EU-02 clusters.', type: 'warning' },
                              ...prev
                            ]);
                          }}
                          className="w-100 py-2 btn btn-outline-danger border-danger border-opacity-50 text-danger"
                        >
                          Lockdown Secure Grid
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Event Stream Ticker */}
              <div className="col-12 col-lg-4">
                <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between" style={{ minHeight: '450px' }}>
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h4 className="text-white h5 mb-1 fw-bold d-flex align-items-center gap-2">
                          Live Intel Stream
                          <span className="position-relative d-inline-flex" style={{ width: '8px', height: '8px' }}>
                            <span className="animate-pulse-cyber absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-danger"></span>
                          </span>
                        </h4>
                        <p className="text-secondary small mb-0">Decoded administrative events feed.</p>
                      </div>
                      <span className="material-symbols-outlined text-secondary fs-5">terminal</span>
                    </div>

                    <div className="dashboard-scroll pe-1" style={{ maxHeight: '350px' }}>
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className="p-2 mb-2 bg-black bg-opacity-40 rounded border-start border-3 border-opacity-50 border-secondary font-mono"
                          style={{
                            fontSize: '0.75rem',
                            borderLeftColor: log.type === 'success' ? '#10b981' : log.type === 'warning' ? '#f43f5e' : '#0d6efd'
                          }}
                        >
                          <div className="d-flex justify-content-between mb-1">
                            <span className="text-secondary">[{log.time}]</span>
                            <span className={`text-${log.type === 'success' ? 'success' : log.type === 'warning' ? 'danger' : 'primary'} text-uppercase`} style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                              {log.type}
                            </span>
                          </div>
                          <span className="text-white">{log.msg}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-top border-secondary pt-3 mt-3">
                    <button
                      onClick={() => {
                        setLogs([
                          { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'Admin cleared telemetry event logs buffer.', type: 'info' }
                        ]);
                        addNotification('Logs buffer flushed.', 'info');
                      }}
                      className="btn btn-sm btn-outline-secondary w-100 py-2 rounded-3 border-secondary border-opacity-50"
                    >
                      Clear Terminal Buffer
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MARKET INTEL VIEW (ANALYTICS GRID) */}
          {activeTab === 'intel' && (
            <div className="glass-card p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                <div>
                  <h4 className="text-white h5 mb-1 fw-bold">Market Intelligence Databank</h4>
                  <p className="text-secondary small mb-0 font-sans">Query precise administrative intelligence folders compiled by AI nodes.</p>
                </div>
                
                {/* Search and Filters */}
                <div className="d-flex flex-wrap align-items-center gap-2 w-100 w-md-auto">
                  <input
                    type="text"
                    placeholder="Search titles or ID..."
                    value={intelSearch}
                    onChange={(e) => setIntelSearch(e.target.value)}
                    className="form-control bg-dark border-secondary border-opacity-50 text-white rounded-3 small py-1.5 px-3"
                    style={{ maxWidth: '220px' }}
                  />

                  <select
                    value={intelFilter}
                    onChange={(e) => setIntelFilter(e.target.value)}
                    className="form-select bg-dark border-secondary border-opacity-50 text-white rounded-3 small py-1.5"
                    style={{ width: '120px' }}
                  >
                    <option value="ALL">All Sectors</option>
                    <option value="Defense">Defense</option>
                    <option value="Finance">Finance</option>
                    <option value="Aerospace">Aerospace</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>
              </div>

              {/* Responsive Grid Table */}
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle border-secondary border-opacity-25 mb-0">
                  <thead>
                    <tr className="text-secondary small text-uppercase font-mono">
                      <th className="border-secondary border-opacity-20 py-3">Intel Identifier</th>
                      <th className="border-secondary border-opacity-20 py-3">Sector</th>
                      <th className="border-secondary border-opacity-20 py-3">Research Brief Title</th>
                      <th className="border-secondary border-opacity-20 py-3">Confidence Rating</th>
                      <th className="border-secondary border-opacity-20 py-3">Threat Index</th>
                      <th className="border-secondary border-opacity-20 py-3 text-center">Trend Indicator</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketIntelligenceData
                      .filter((item) => {
                        const matchesSearch = item.title.toLowerCase().includes(intelSearch.toLowerCase()) || item.id.toLowerCase().includes(intelSearch.toLowerCase());
                        const matchesSector = intelFilter === 'ALL' || item.sector === intelFilter;
                        return matchesSearch && matchesSector;
                      })
                      .map((item) => (
                        <tr key={item.id} className="border-secondary border-opacity-10">
                          <td className="font-mono text-neon-cyan py-3 small">{item.id}</td>
                          <td>
                            <span className={`badge ${item.sector === 'Defense' ? 'badge-neon-rose' : item.sector === 'Finance' ? 'badge-neon-cyan' : 'bg-secondary bg-opacity-25 text-white'} px-2.5 py-1 small rounded-3`}>
                              {item.sector}
                            </span>
                          </td>
                          <td className="text-white small fw-medium">{item.title}</td>
                          <td className="text-neon-emerald font-mono small">{item.accuracy}</td>
                          <td>
                            <span className={`text-uppercase font-bold small ${item.risk === 'High' ? 'text-neon-rose' : item.risk === 'Medium' ? 'text-warning' : 'text-secondary'}`}>
                              {item.risk}
                            </span>
                          </td>
                          <td className="text-center py-2">
                            {/* SVG Mini sparklines */}
                            <svg width="60" height="20" style={{ overflow: 'visible' }}>
                              <polyline
                                fill="none"
                                stroke={item.risk === 'High' ? '#f43f5e' : item.risk === 'Medium' ? '#f59e0b' : '#10b981'}
                                strokeWidth="2"
                                points={item.trend.map((val, idx) => `${idx * 10},${20 - (val / 100) * 18}`).join(' ')}
                              />
                              <circle
                                cx="50"
                                cy={20 - (item.trend[5] / 100) * 18}
                                r="2.5"
                                fill={item.risk === 'High' ? '#f43f5e' : item.risk === 'Medium' ? '#f59e0b' : '#10b981'}
                                className="animate-pulse-cyber"
                              />
                            </svg>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: AI SYNTHESIZER VIEW */}
          {activeTab === 'synthesizer' && (
            <div className="row g-4">
              
              {/* Prompt Options Side Panel */}
              <div className="col-12 col-lg-4">
                <div className="glass-card p-4 h-100">
                  <h4 className="text-white h5 mb-2 fw-bold">Neural Prompt Synthesizer</h4>
                  <p className="text-secondary small mb-4">Select custom intelligence protocols. The machine core will query secure nodes and type out verified intelligence briefings.</p>

                  <div className="d-flex flex-column gap-3">
                    {[
                      { key: 'sovereign', label: 'Sovereign Threat Matrix', icon: 'security', desc: 'SCADA grids & state intruder telemetry' },
                      { key: 'finance', label: 'Volatility Modeling Desk', icon: 'trending_up', desc: 'Macro currency reserves & algorithmic arbitrage flows' },
                      { key: 'defense', label: 'Aerospace Spectrum Jamming', icon: 'satellite_alt', desc: 'LEO network disruption & signal signatures' }
                    ].map((tpl) => (
                      <button
                        key={tpl.key}
                        onClick={() => handleSynthesize(tpl.key)}
                        disabled={isSynthesizing}
                        className={`btn text-start p-3 rounded-4 border transition-all ${
                          synthesizerPrompt === tpl.key 
                            ? 'bg-primary bg-opacity-20 border-primary text-white' 
                            : 'bg-black bg-opacity-40 border-secondary border-opacity-20 text-secondary hover-bg-opacity-50'
                        }`}
                      >
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className={`material-symbols-outlined ${synthesizerPrompt === tpl.key ? 'text-neon-cyan animate-pulse-cyber' : 'text-secondary'} fs-5`}>
                            {tpl.icon}
                          </span>
                          <span className="text-white fw-bold small">{tpl.label}</span>
                        </div>
                        <p className="mb-0 small text-secondary" style={{ fontSize: '0.75rem' }}>{tpl.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simulated Intelligence Screen */}
              <div className="col-12 col-lg-8">
                <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between" style={{ minHeight: '400px', backgroundColor: '#000000' }}>
                  
                  {/* Console Header */}
                  <div className="d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-30 pb-3 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="material-symbols-outlined text-neon-cyan fs-5 animate-pulse-cyber animate-spin">cyclone</span>
                      <span className="font-mono text-white small fw-bold">SKY MIND COLD COGNITION ENGINE // SESSION_SECURE</span>
                    </div>
                    <span className="badge badge-neon-rose font-mono px-2 py-0.5" style={{ fontSize: '0.65rem' }}>ENCRYPTED AES-256</span>
                  </div>

                  {/* Output Block */}
                  <div className="flex-grow-1 font-mono p-3 bg-black rounded-3 border border-secondary border-opacity-15 dashboard-scroll mb-3" style={{ maxHeight: '380px', minHeight: '260px' }}>
                    
                    {isSynthesizing && (
                      <div className="py-4 text-center">
                        <span className="material-symbols-outlined text-neon-cyan fs-1 animate-pulse-cyber mb-2">query_stats</span>
                        <p className="text-neon-cyan h6 mb-1">{synthStatus}</p>
                        <p className="text-secondary small mb-3 font-mono">Running synthesis matrix on targeted grids...</p>
                        <div className="progress mx-auto" style={{ width: '200px', height: '6px' }}>
                          <div className="progress-bar progress-bar-striped progress-bar-animated progress-glow-cyan" style={{ width: `${synthProgress}%` }}></div>
                        </div>
                      </div>
                    )}

                    {!isSynthesizing && compiledReport && (
                      <div className="text-start whitespace-pre-wrap small leading-relaxed text-light">
                        <span className="text-neon-emerald d-block mb-2">// COLD SIGNAL DECRYPTION COMPLETED SUCCESSFULLY:</span>
                        <pre className="text-light no-scrollbar" style={{ overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                          {compiledReport}
                        </pre>
                        <span className="terminal-cursor"></span>
                      </div>
                    )}

                    {!isSynthesizing && !compiledReport && (
                      <div className="text-center py-5 text-secondary">
                        <span className="material-symbols-outlined fs-1 mb-2">terminal</span>
                        <p className="small mb-0">Cognition Engine Idle. Select an analytical protocol template on the left panel to execute synthesis.</p>
                      </div>
                    )}

                  </div>

                  {/* Action row */}
                  <div className="d-flex justify-content-between align-items-center border-top border-secondary border-opacity-30 pt-3">
                    <span className="small text-secondary font-mono">NODE RECEPTORS: 4/4 RECEPTIVE</span>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={!compiledReport || isSynthesizing}
                      onClick={() => {
                        addNotification('Intelligence brief copied to secure clipboard.', 'success');
                      }}
                      className="px-3"
                    >
                      Copy Intelligence Brief
                    </Button>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SYSTEM NODE GRID */}
          {activeTab === 'nodes' && (
            <div>
              <div className="mb-4">
                <h4 className="text-white h5 mb-1 fw-bold">Active Cluster Node Deck</h4>
                <p className="text-secondary small">Review localized analytical engine telemetry servers. Adjust slider allocations to simulate overclocking AI computing power.</p>
              </div>

              <div className="row g-4">
                {nodes.map((node, idx) => (
                  <div key={node.name} className="col-12 col-md-6">
                    <div className="glass-card p-4">
                      
                      {/* Node Header */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined text-neon-cyan fs-5">dns</span>
                            <h5 className="text-white h6 mb-0 fw-bold">{node.name}</h5>
                          </div>
                          <span className="text-secondary small font-mono">{node.region}</span>
                        </div>
                        <span className={`badge ${node.status.includes('Critical') ? 'badge-neon-rose' : node.status.includes('High') ? 'bg-warning text-dark' : 'badge-neon-emerald'} px-2 py-0.5 small`}>
                          {node.status}
                        </span>
                      </div>

                      {/* Load Stat Progress Bar */}
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="text-secondary small font-semibold">OVERCLOCK WORKLOAD</span>
                          <span className={`font-mono small ${node.load > 80 ? 'text-neon-rose' : 'text-neon-cyan'}`}>{node.load}%</span>
                        </div>
                        <div className="progress bg-dark bg-opacity-50" style={{ height: '6px' }}>
                          <div
                            className={`progress-bar ${node.load > 80 ? 'progress-glow-rose bg-danger' : 'progress-glow-cyan bg-cyan'}`}
                            role="progressbar"
                            style={{ width: `${node.load}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Slider Allocator */}
                      <div className="mb-3 p-2 bg-black bg-opacity-40 rounded-3 border border-secondary border-opacity-10">
                        <label className="form-label text-secondary small font-mono d-flex justify-content-between align-items-center mb-1">
                          <span>Re-allocate Node Memory Grid</span>
                          <span className="text-white fw-bold">{node.load} GFLOPS</span>
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="95"
                          value={node.load}
                          onChange={(e) => handleAdjustNodeLoad(idx, parseInt(e.target.value))}
                          className="form-range"
                        />
                      </div>

                      {/* Micro specs */}
                      <div className="row g-2 font-mono" style={{ fontSize: '0.75rem' }}>
                        <div className="col-6 text-secondary">
                          TEMP STATUS: <span className={node.temp > 55 ? 'text-neon-rose' : 'text-white'}>{node.temp}°C</span>
                        </div>
                        <div className="col-6 text-secondary text-end">
                          LATENCY INDEX: <span className="text-neon-emerald">{12 + Math.floor(node.load / 10)}ms</span>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: REPORTS COMPILER */}
          {activeTab === 'reports' && (
            <div className="row g-4 justify-content-center">
              <div className="col-12 col-md-8 col-xl-6">
                <div className="glass-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-20">
                    <div>
                      <h4 className="text-white h5 mb-1 fw-bold">Dossier Brief Compiler</h4>
                      <p className="text-secondary small mb-0">Select database layers to build and sign custom analytical reports.</p>
                    </div>
                    <span className="material-symbols-outlined text-primary fs-4 animate-pulse-cyber">verified_user</span>
                  </div>

                  <form className="mb-4">
                    <div className="d-flex flex-column gap-3 mb-4">
                      
                      <label className="d-flex align-items-start gap-3 p-3 bg-black bg-opacity-40 rounded-4 border border-secondary border-opacity-15 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reportCheckedItems.defense}
                          onChange={(e) => setReportCheckedItems({ ...reportCheckedItems, defense: e.target.checked })}
                          className="form-check-input bg-transparent border-secondary mt-1"
                        />
                        <div>
                          <span className="text-white fw-bold d-block small">Maritime Sovereign Defense Records</span>
                          <span className="text-secondary small d-block" style={{ fontSize: '0.75rem' }}>Includes Sat-Com RF intercept feeds and ship telemetry.</span>
                        </div>
                      </label>

                      <label className="d-flex align-items-start gap-3 p-3 bg-black bg-opacity-40 rounded-4 border border-secondary border-opacity-15 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reportCheckedItems.finance}
                          onChange={(e) => setReportCheckedItems({ ...reportCheckedItems, finance: e.target.checked })}
                          className="form-check-input bg-transparent border-secondary mt-1"
                        />
                        <div>
                          <span className="text-white fw-bold d-block small">Quantitative Exchange Volatility Index</span>
                          <span className="text-secondary small d-block" style={{ fontSize: '0.75rem' }}>Includes high-frequency decentralized contract liquidity audits.</span>
                        </div>
                      </label>

                      <label className="d-flex align-items-start gap-3 p-3 bg-black bg-opacity-40 rounded-4 border border-secondary border-opacity-15 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reportCheckedItems.space}
                          onChange={(e) => setReportCheckedItems({ ...reportCheckedItems, space: e.target.checked })}
                          className="form-check-input bg-transparent border-secondary mt-1"
                        />
                        <div>
                          <span className="text-white fw-bold d-block small">LEO Satellite RF Spectrum Analysis</span>
                          <span className="text-secondary small d-block" style={{ fontSize: '0.75rem' }}>Includes zero-day signal jamming triggers.</span>
                        </div>
                      </label>

                      <label className="d-flex align-items-start gap-3 p-3 bg-black bg-opacity-40 rounded-4 border border-secondary border-opacity-15 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reportCheckedItems.nodes}
                          onChange={(e) => setReportCheckedItems({ ...reportCheckedItems, nodes: e.target.checked })}
                          className="form-check-input bg-transparent border-secondary mt-1"
                        />
                        <div>
                          <span className="text-white fw-bold d-block small">Local Hardware Engine Cluster Logs</span>
                          <span className="text-secondary small d-block" style={{ fontSize: '0.75rem' }}>Includes CPU temperatures and system latency tables.</span>
                        </div>
                      </label>

                    </div>

                    {isCompilingReport ? (
                      <div className="py-2">
                        <div className="progress mb-2" style={{ height: '6px' }}>
                          <div className="progress-bar progress-bar-striped progress-bar-animated progress-glow-cyan" style={{ width: `${reportCompileProgress}%` }}></div>
                        </div>
                        <span className="text-neon-cyan font-mono small d-block text-center">COMPILING BRIEF DIRECTORY: {reportCompileProgress}%</span>
                      </div>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleCompileCustomReport}
                        className="w-100 py-3 border-0 rounded-4 fw-bold shadow-lg"
                      >
                        Compile & Secure Sign intelligence Brief (.PDF)
                      </Button>
                    )}
                  </form>

                  <div className="p-3 bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-4 text-center">
                    <span className="text-neon-cyan small font-mono d-block mb-1">// DIGITAL SIGNATURE INTEGRITY: SECURE</span>
                    <span className="text-secondary small" style={{ fontSize: '0.7rem' }}>All PDFs are stamped with cryptographic proof from SkyMind Root Certificate Authority.</span>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>

        {/* Console Foot-Ticker */}
        <footer className="mt-auto border-top border-secondary py-2 px-4 px-md-5 d-flex justify-content-between align-items-center bg-black bg-opacity-50" style={{ zIndex: 10 }}>
          <span className="text-secondary font-mono" style={{ fontSize: '0.7rem' }}>SECURE ACCESS CONSOLE // ID: SK-9482 // OP: SHADOW</span>
          <span className="text-neon-cyan font-mono" style={{ fontSize: '0.7rem' }}>V2.6.5-PROD</span>
        </footer>

      </main>
    </div>
  );
}
