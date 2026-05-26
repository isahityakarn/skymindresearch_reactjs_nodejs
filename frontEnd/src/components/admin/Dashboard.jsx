import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Sidebar from './Sidebar';
import { getUser, removeToken, removeUser } from '../../utils/storage';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const currentUser = user?.name || 'Admin';

  // Navigation State (defaults to overview dashboard)
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Live Activity Log State (scrolling terminal feeds)
  const [logs, setLogs] = useState([
    { id: 1, time: '18:54:12', msg: 'System integrity online. Cluster synchronization active.', type: 'info' },
    { id: 2, time: '18:54:28', msg: 'Intercepted encrypted data stream in SE-Asia segment.', type: 'warning' },
    { id: 3, time: '18:55:01', msg: 'AI Neural Node 04 allocated to defense intelligence synthesis.', type: 'success' },
  ]);

  // Notifications State for dynamic toasts
  const [notifications, setNotifications] = useState([]);

  const addNotification = (text, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  // Logout handler
  const handleLogout = () => {
    removeToken();
    removeUser();
    addNotification('Logging out of Sky Mind secure terminal...', 'warning');
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  // Background Log Streamer Simulation
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
        ...prev.slice(0, 10),
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // TAB 1: OVERVIEW DASHBOARD DATA & ACTIONS
  // ==========================================
  const [databaseOptimizing, setDatabaseOptimizing] = useState(false);
  const [dbProgress, setDbProgress] = useState(0);
  const [activeNodeDetail, setActiveNodeDetail] = useState(null);

  const [nodes, setNodes] = useState([
    { name: 'AETHER-01', region: 'US-East', load: 45, status: 'Optimal', temp: 38 },
    { name: 'ZEPHYR-02', region: 'EU-West', load: 82, status: 'High Load', temp: 58 },
    { name: 'TITAN-03', region: 'APAC-South', load: 21, status: 'Idle', temp: 32 },
    { name: 'APEX-04', region: 'DECENTRALIZED', load: 60, status: 'Active Sync', temp: 44 }
  ]);

  const neuralNodes = [
    { id: 'N1', cx: 80, cy: 120, label: 'Sat-Com Feed', info: 'Live stream of military transponders', color: '#06b6d4' },
    { id: 'N2', cx: 180, cy: 70, label: 'Geo-Spatial Parser', info: 'Mapping port container movements in Singapore', color: '#10b981' },
    { id: 'N3', cx: 280, cy: 150, label: 'Sentiment AI Node', info: 'Analyzing sovereign bond public transcripts', color: '#a855f7' },
    { id: 'N4', cx: 150, cy: 220, label: 'Crypto Decryptor', info: 'Cracking anonymous transaction logs in cluster 3', color: '#f43f5e' },
    { id: 'N5', cx: 350, cy: 90, label: 'Macro Index Engine', info: 'Aggregating cross-border currency reserves', color: '#06b6d4' },
  ];

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
          setLogs(prev => [
            { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'Admin DB Optimization complete. Restored 100% indexing speed.', type: 'success' },
            ...prev
          ]);
          return 100;
        }
        return p + 20;
      });
    }, 200);
  };

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

  // ==========================================
  // TAB 2: SURVEY RECORD DATA & ACTIONS
  // ==========================================
  const [surveySearch, setSurveySearch] = useState('');
  const [surveyFilter, setSurveyFilter] = useState('ALL');
  const [surveyRecords, setSurveyRecords] = useState([
    { id: 'SR-9204', title: 'Cryptographic Signal Assessment', respondent: 'Dr. Evelyn Foster', date: '2026-05-24', completion: 100, status: 'Approved' },
    { id: 'SR-8103', title: 'Decentralized Node Audit', respondent: 'Aether Team', date: '2026-05-25', completion: 85, status: 'Under Review' },
    { id: 'SR-4029', title: 'Quantum Firewall Volatility', respondent: 'SecOps APAC', date: '2026-05-26', completion: 40, status: 'Flagged' },
    { id: 'SR-7731', title: 'LEO Telemetry Constellation Poll', respondent: 'Sovereign Lab', date: '2026-05-26', completion: 100, status: 'Approved' },
    { id: 'SR-5011', title: 'Cross-Border Exchange Assessment', respondent: 'Quant Modeling Team', date: '2026-05-23', completion: 92, status: 'Under Review' },
  ]);

  const handleUpdateSurveyStatus = (id, newStatus) => {
    setSurveyRecords(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    addNotification(`Survey [${id}] status updated to: ${newStatus}`, newStatus === 'Approved' ? 'success' : newStatus === 'Flagged' ? 'warning' : 'info');
  };

  // ==========================================
  // TAB 3: CHANGE PASSWORD DATA & ACTIONS
  // ==========================================
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRollingKeys, setIsRollingKeys] = useState(false);
  const [keyRollProgress, setKeyRollProgress] = useState(0);

  const getPasswordStrength = () => {
    if (!newPassword) return { label: 'Empty', color: 'text-secondary', width: '0%', class: 'bg-secondary' };
    let score = 0;
    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

    switch (score) {
      case 1: return { label: 'Weak', color: 'text-neon-rose', width: '25%', class: 'progress-glow-rose bg-danger' };
      case 2: return { label: 'Fair', color: 'text-warning', width: '50%', class: 'bg-warning' };
      case 3: return { label: 'Strong', color: 'text-neon-cyan', width: '75%', class: 'progress-glow-cyan bg-cyan' };
      case 4: return { label: 'Maximum Security', color: 'text-neon-emerald', width: '100%', class: 'bg-success' };
      default: return { label: 'Weak', color: 'text-neon-rose', width: '10%', class: 'bg-danger' };
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      addNotification('All security parameters are mandatory.', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      addNotification('New password parameters do not match.', 'warning');
      return;
    }
    addNotification('Password cryptographically updated.', 'success');
    setLogs(prev => [
      { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'Admin user password reset successfully. Keys cycled.', type: 'success' },
      ...prev
    ]);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleRollQuantumKeys = () => {
    if (isRollingKeys) return;
    setIsRollingKeys(true);
    setKeyRollProgress(0);
    addNotification('Rolling database quantum cryptographic salt vectors...', 'info');

    const interval = setInterval(() => {
      setKeyRollProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRollingKeys(false);
          addNotification('Quantum encryption salts rolled successfully.', 'success');
          setLogs(prev => [
            { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'SUCCESS: Quantum salt rollover completed across APAC-04, EU-02 and US-01 nodes.', type: 'success' },
            ...prev
          ]);
          return 100;
        }
        return p + 25;
      });
    }, 400);
  };

  // ==========================================
  // TAB 4: PROJECT DATA & ACTIONS
  // ==========================================
  const [projects, setProjects] = useState([
    { id: 'P-1', name: 'Project TITAN', description: 'Decentralized Core Database Encryption', progress: 74, status: 'Critical', leader: 'Dr. Evelyn Foster' },
    { id: 'P-2', name: 'AETHER Sync', description: 'Satellite Spectrum Disruption Jamming Restoration', progress: 38, status: 'High', leader: 'Agent Vance' },
    { id: 'P-3', name: 'Project CHRONOS', description: 'Polymorphic Threat Geolocation Scanning', progress: 92, status: 'Optimal', leader: 'Sysop Shadow' },
    { id: 'P-4', name: 'Quantum Ledger', description: 'Cross-Border Reserve Volatility Arbitrage', progress: 15, status: 'Idle', leader: 'Analyst Rose' },
  ]);

  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectName) return;
    const newProj = {
      id: `P-${projects.length + 1}`,
      name: newProjectName,
      description: newProjectDesc || 'No description provided.',
      progress: Math.floor(Math.random() * 50) + 10,
      status: 'Optimal',
      leader: currentUser,
    };
    setProjects(prev => [...prev, newProj]);
    addNotification(`Project "${newProjectName}" initiated.`, 'success');
    setLogs(prev => [
      { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: `INITIATED: ${newProjectName} - Cluster allocations assigned.`, type: 'info' },
      ...prev
    ]);
    setNewProjectName('');
    setNewProjectDesc('');
  };

  const handleOverclockProject = (id) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const nextProgress = Math.min(p.progress + 15, 100);
        addNotification(`Overclocked ${p.name}. Progress is now ${nextProgress}%.`, 'success');
        return { ...p, progress: nextProgress, status: nextProgress >= 100 ? 'Completed' : 'Critical' };
      }
      return p;
    }));
  };

  // ==========================================
  // TAB 5: USER DATA & ACTIONS
  // ==========================================
  const [users, setUsers] = useState([
    { id: 'U-102', name: 'Sysop Shadow', role: 'Superuser', ip: '192.168.4.12', status: 'Active', securityLevel: 'Level 5' },
    { id: 'U-405', name: 'Dr. Evelyn Foster', role: 'Researcher', ip: '192.168.4.89', status: 'Active', securityLevel: 'Level 4' },
    { id: 'U-819', name: 'Agent Vance', role: 'SecOps Analyst', ip: '192.168.4.142', status: 'On Mission', securityLevel: 'Level 4' },
    { id: 'U-032', name: 'Analyst Rose', role: 'Signal Operator', ip: '10.0.8.21', status: 'Offline', securityLevel: 'Level 3' },
  ]);

  const handleToggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Deactivated' : 'Active';
        addNotification(`User ${u.name} status updated to: ${newStatus}`, newStatus === 'Active' ? 'success' : 'warning');
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  // ==========================================
  // TAB 6: VENDOR DATA & ACTIONS
  // ==========================================
  const [vendors, setVendors] = useState([
    { id: 'V-1', name: 'Orbital Data Corp', pipeline: '4.8 GB/s', rating: '98.4%', status: 'Linked' },
    { id: 'V-2', name: 'Quantum Finance Labs', pipeline: '12.2 GB/s', rating: '99.1%', status: 'Linked' },
    { id: 'V-3', name: 'Zero-Trust Infrastructure', pipeline: '0.0 GB/s', rating: '95.6%', status: 'Quarantined' },
    { id: 'V-4', name: 'Logistics Cascade Group', pipeline: '1.2 GB/s', rating: '97.8%', status: 'Offline' },
  ]);

  const handleToggleVendor = (id) => {
    setVendors(prev => prev.map(v => {
      if (v.id === id) {
        const newStatus = v.status === 'Linked' ? 'Quarantined' : 'Linked';
        const newPipeline = newStatus === 'Linked' ? `${(Math.random() * 10 + 2).toFixed(1)} GB/s` : '0.0 GB/s';
        addNotification(`Vendor ${v.name} status changed to ${newStatus}.`, newStatus === 'Linked' ? 'success' : 'warning');
        setLogs(prevLog => [
          { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: `VENDOR PIPELINE: ${v.name} is now [${newStatus.toUpperCase()}].`, type: newStatus === 'Linked' ? 'success' : 'warning' },
          ...prevLog
        ]);
        return { ...v, status: newStatus, pipeline: newPipeline };
      }
      return v;
    }));
  };

  // ==========================================
  // TAB 7: VENDOR SURVEY DATA & ACTIONS
  // ==========================================
  const [vendorSurveys, setVendorSurveys] = useState([
    { id: 'VS-01', vendor: 'Orbital Data Corp', title: 'Q2 Sat-Com Spectrum Audit', responseRate: 100, score: '94/100' },
    { id: 'VS-02', vendor: 'Quantum Finance Labs', title: 'Decentralized Vault Isolation Survey', responseRate: 80, score: '99/100' },
    { id: 'VS-03', vendor: 'Zero-Trust Infrastructure', title: 'Hardware Defrag Security Integrity', responseRate: 20, score: 'Pending' },
  ]);

  const [deployVendor, setDeployVendor] = useState('V-1');
  const [deploySurveyTitle, setDeploySurveyTitle] = useState('');

  const handleDeploySurvey = (e) => {
    e.preventDefault();
    if (!deploySurveyTitle) return;
    const vendorName = vendors.find(v => v.id === deployVendor)?.name || 'External Vendor';
    const newSurvey = {
      id: `VS-0${vendorSurveys.length + 1}`,
      vendor: vendorName,
      title: deploySurveyTitle,
      responseRate: 0,
      score: 'Pending',
    };
    setVendorSurveys(prev => [...prev, newSurvey]);
    addNotification(`Security Survey deployed to ${vendorName}.`, 'success');
    setLogs(prev => [
      { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: `SURVEY DEPLOYED: Deployed Security Briefing to ${vendorName}.`, type: 'info' },
      ...prev
    ]);
    setDeploySurveyTitle('');
  };


  return (
    <div className="dashboard-container d-flex grid-matrix scanline-container">
      {/* Dynamic Toast Notification HUD */}
      <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`toast show border border-opacity-50 border-${n.type === 'success' ? 'success' : n.type === 'warning' ? 'danger' : 'info'} bg-dark text-white shadow-lg mb-2`}
            style={{ minWidth: '260px', backdropFilter: 'blur(10px)' }}
          >
            <div className="toast-header bg-black text-white border-bottom border-secondary d-flex justify-content-between align-items-center py-1.5 px-3">
              <strong className="d-flex align-items-center gap-1.5 small text-uppercase font-mono">
                <span className={`material-symbols-outlined text-${n.type === 'success' ? 'success' : n.type === 'warning' ? 'danger' : 'info'} fs-6`}>
                  {n.type === 'success' ? 'check_circle' : n.type === 'warning' ? 'warning' : 'info'}
                </span>
                {n.type === 'success' ? 'Verified Feed' : n.type === 'warning' ? 'Security Alert' : 'System Log'}
              </strong>
              <small className="text-secondary font-mono" style={{ fontSize: '0.65rem' }}>Just now</small>
            </div>
            <div className="toast-body bg-black bg-opacity-80 py-2.5 px-3 small font-sans text-light">
              {n.text}
            </div>
          </div>
        ))}
      </div>

      {/* FUTURISTIC SIDE PANEL */}
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        userName={currentUser}
      />

      {/* Main Workspace Frame */}
      <main className="flex-grow-1 h-100 d-flex flex-column dashboard-scroll" style={{ backgroundColor: '#020617' }}>
        
        {/* Dynamic Header Strip with Access Level Indicators */}
        <header className="border-bottom border-secondary border-opacity-20 py-3 px-4 px-md-5 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 bg-black bg-opacity-40" style={{ zIndex: 10 }}>
          <div>
            <h1 className="h4 text-white mb-1 fw-bold tracking-tight d-flex align-items-center gap-2">
              Sky Mind Analytical Dashboard
              <span className="badge badge-neon-cyan fs-8 text-uppercase tracking-wider px-2 py-0.5" style={{ fontSize: '0.6rem' }}>Level 5 Access</span>
            </h1>
            <p className="text-secondary small mb-0 font-mono" style={{ fontSize: '0.75rem' }}>Decentralized Terminal. Session Cryptographically Secured.</p>
          </div>
        </header>

        {/* Global Live Metrics Strip */}
        <section className="row g-3 px-4 px-md-5 pt-4">
          <div className="col-12 col-md-6 col-xl-3">
            <div className="glass-card p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>AI NODES ONLINE</span>
                <span className="h3 text-white fw-bold mb-0 text-neon-cyan font-mono">2,482 <span className="fs-6 text-secondary fw-normal">/ 2.5K</span></span>
              </div>
              <div className="p-2.5 bg-cyan bg-opacity-10 rounded-3 border border-cyan border-opacity-25 d-flex align-items-center justify-content-center text-neon-cyan">
                <span className="material-symbols-outlined fs-4">bolt</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="glass-card p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>SIGNAL INTEGRITY</span>
                <span className="h3 text-neon-emerald fw-bold mb-0 font-mono">99.98%</span>
              </div>
              <div className="p-2.5 bg-emerald bg-opacity-10 rounded-3 border border-emerald border-opacity-25 d-flex align-items-center justify-content-center text-neon-emerald">
                <span className="material-symbols-outlined fs-4">shield</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="glass-card p-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-secondary small tracking-wider text-uppercase fw-semibold" style={{ fontSize: '0.65rem' }}>MEMORY POOL GRID</span>
                <span className="text-neon-purple small font-mono">68.4%</span>
              </div>
              <div className="progress bg-dark bg-opacity-50 border border-secondary border-opacity-20" style={{ height: '6px' }}>
                <div className="progress-bar progress-glow-purple" role="progressbar" style={{ width: '68.4%' }}></div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="glass-card p-3 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>ACTIVE ALERTS</span>
                <span className="h3 text-white fw-bold mb-0 text-neon-rose font-mono">14 <span className="fs-6 text-secondary fw-normal">Global</span></span>
              </div>
              <div className="p-2.5 bg-danger bg-opacity-10 rounded-3 border border-danger border-opacity-25 d-flex align-items-center justify-content-center text-neon-rose animate-pulse-cyber">
                <span className="material-symbols-outlined fs-4">warning</span>
              </div>
            </div>
          </div>
        </section>

        {/* View-Specific Content Panel */}
        <div className="flex-grow-1 p-4 p-md-5">

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="row g-4">
              {/* Left: Interactive Topology SVG + Core controls */}
              <div className="col-12 col-lg-8">
                
                {/* SVG Visual Network Topology Map */}
                <div className="glass-card p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="text-white h5 mb-1 fw-bold d-flex align-items-center gap-2">
                        Neural Topology Intelligence Map
                        <span className="badge badge-neon-cyan fs-8 text-uppercase px-2 py-0.5">dynamic</span>
                      </h4>
                      <p className="text-secondary small mb-0">Hover or click nodes to intercept secure communication logs in real time.</p>
                    </div>
                    <span className="material-symbols-outlined text-secondary fs-5">hub</span>
                  </div>

                  <div className="row g-3 align-items-center">
                    <div className="col-12 col-md-7 border-end border-secondary border-opacity-15">
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
                                addNotification(`Intercepted Node [${node.id}] feed successfully.`, 'success');
                              }}
                              onMouseEnter={() => setActiveNodeDetail(node)}
                            >
                              <circle
                                cx={node.cx}
                                cy={node.cy}
                                r="12"
                                fill="rgba(2, 6, 23, 0.95)"
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
                        <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block mb-2 font-mono" style={{ fontSize: '0.65rem' }}>NODE SPECTRAL READOUT</span>
                        {activeNodeDetail ? (
                          <div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span className="badge rounded-pill px-2.5 py-0.5" style={{ backgroundColor: activeNodeDetail.color, color: '#000', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                {activeNodeDetail.id}
                              </span>
                              <h5 className="text-white h6 mb-0 fw-bold">{activeNodeDetail.label}</h5>
                            </div>
                            <p className="text-secondary small mb-3 leading-relaxed" style={{ fontSize: '0.8rem' }}>{activeNodeDetail.info}</p>
                            <div className="bg-black bg-opacity-70 p-2.5 rounded border border-secondary border-opacity-15 font-mono" style={{ fontSize: '0.75rem' }}>
                              <span className="text-neon-cyan d-block">IP: 192.168.4.{activeNodeDetail.id === 'N1' ? '12' : activeNodeDetail.id === 'N2' ? '89' : '204'}</span>
                              <span className="text-neon-emerald d-block">LATENCY: {12 + Math.floor(Math.random() * 8)}ms</span>
                              <span className="text-neon-purple d-block">SIGNAL READOUT: SECURE</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-5 text-secondary">
                            <span className="material-symbols-outlined fs-2 mb-2 animate-pulse-cyber">sensors</span>
                            <p className="small mb-0">Hover or click on any node inside the topology map to intercept telemetry metrics.</p>
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
                    <span className="badge badge-neon-emerald fs-8 text-uppercase px-2 py-0.5">Active</span>
                  </h4>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="p-3 bg-black bg-opacity-40 rounded-4 border border-secondary border-opacity-15">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="text-white mb-0 fw-bold small">Database Indexing Optimizer</h6>
                          <span className="material-symbols-outlined text-secondary fs-5">database</span>
                        </div>
                        <p className="text-secondary small mb-3" style={{ fontSize: '0.8rem' }}>Runs low-level database defragging and clears old analytical cache indexes.</p>
                        
                        {databaseOptimizing ? (
                          <div>
                            <div className="progress mb-2 bg-dark" style={{ height: '6px' }}>
                              <div className="progress-bar progress-bar-striped progress-bar-animated progress-glow-cyan" style={{ width: `${dbProgress}%` }}></div>
                            </div>
                            <span className="text-neon-cyan font-mono small d-block" style={{ fontSize: '0.75rem' }}>COMPRESSING GRID BLOCKS: {dbProgress}%</span>
                          </div>
                        ) : (
                          <Button variant="primary" size="sm" onClick={handleDatabaseOptimize} className="w-100 py-2 border-0 small">
                            Optimize System Indexing
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="p-3 bg-black bg-opacity-40 rounded-4 border border-secondary border-opacity-15">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="text-white mb-0 fw-bold small">Decentralized Threat Firewall</h6>
                          <span className="material-symbols-outlined text-neon-rose fs-5">security</span>
                        </div>
                        <p className="text-secondary small mb-3" style={{ fontSize: '0.8rem' }}>Engage instant absolute zero-trust quarantine protocols across active nodes.</p>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            addNotification('ZERO-TRUST PROTOCOL: Global clusters locked & monitored.', 'warning');
                            setLogs(prev => [
                              { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'WARNING: Zero-Trust quarantined active across APAC-04, EU-02 and US-01 nodes.', type: 'warning' },
                              ...prev
                            ]);
                          }}
                          className="w-100 py-2 btn btn-outline-danger border-danger border-opacity-40 text-danger small hover-bg-opacity-10"
                        >
                          Lockdown Secure Grid
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right: Live Event Stream Terminal Ticker */}
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
                        <p className="text-secondary small mb-0">Decoded administrative event telemetry feed.</p>
                      </div>
                      <span className="material-symbols-outlined text-secondary fs-5">terminal</span>
                    </div>

                    <div className="dashboard-scroll pe-1" style={{ maxHeight: '350px' }}>
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className="p-2 mb-2 bg-black bg-opacity-50 rounded border-start border-3 border-opacity-50 border-secondary font-mono"
                          style={{
                            fontSize: '0.75rem',
                            borderLeftColor: log.type === 'success' ? '#10b981' : log.type === 'warning' ? '#f43f5e' : '#0d6efd'
                          }}
                        >
                          <div className="d-flex justify-content-between mb-1">
                            <span className="text-secondary">[{log.time}]</span>
                            <span className={`text-${log.type === 'success' ? 'success' : log.type === 'warning' ? 'danger' : 'primary'} text-uppercase`} style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                              {log.type}
                            </span>
                          </div>
                          <span className="text-white leading-relaxed">{log.msg}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-top border-secondary border-opacity-15 pt-3 mt-3">
                    <button
                      onClick={() => {
                        setLogs([
                          { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'Admin cleared terminal event logs buffer.', type: 'info' }
                        ]);
                        addNotification('Logs buffer flushed successfully.', 'info');
                      }}
                      className="btn btn-sm btn-outline-secondary w-100 py-2 rounded-3 border-secondary border-opacity-40 small font-mono"
                    >
                      Flush Event Buffer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SURVEY RECORD */}
          {activeTab === 'survey_record' && (
            <div className="glass-card p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                <div>
                  <h4 className="text-white h5 mb-1 fw-bold">Telemetry Survey Archives</h4>
                  <p className="text-secondary small mb-0">Query and moderate custom research surveys submitted by satellite nodes and researchers.</p>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-2 w-100 w-md-auto">
                  <input
                    type="text"
                    placeholder="Filter by title..."
                    value={surveySearch}
                    onChange={(e) => setSurveySearch(e.target.value)}
                    className="form-control bg-black border-secondary border-opacity-30 text-white rounded-3 small py-1.5 px-3"
                    style={{ maxWidth: '200px', fontSize: '0.85rem' }}
                  />

                  <select
                    value={surveyFilter}
                    onChange={(e) => setSurveyFilter(e.target.value)}
                    className="form-select bg-black border-secondary border-opacity-30 text-white rounded-3 small py-1.5"
                    style={{ width: '130px', fontSize: '0.85rem' }}
                  >
                    <option value="ALL">All Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Flagged">Flagged</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                  <thead>
                    <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                      <th className="border-secondary border-opacity-10 py-3">Survey ID</th>
                      <th className="border-secondary border-opacity-10 py-3">Survey Brief Title</th>
                      <th className="border-secondary border-opacity-10 py-3">Submitting Operator</th>
                      <th className="border-secondary border-opacity-10 py-3">Timestamp</th>
                      <th className="border-secondary border-opacity-10 py-3">Completeness</th>
                      <th className="border-secondary border-opacity-10 py-3">Status</th>
                      <th className="border-secondary border-opacity-10 py-3 text-end">Action Deck</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveyRecords
                      .filter((s) => {
                        const matchesSearch = s.title.toLowerCase().includes(surveySearch.toLowerCase());
                        const matchesFilter = surveyFilter === 'ALL' || s.status === surveyFilter;
                        return matchesSearch && matchesFilter;
                      })
                      .map((s) => (
                        <tr key={s.id} className="border-secondary border-opacity-10">
                          <td className="font-mono text-neon-cyan py-3 small" style={{ fontSize: '0.8rem' }}>{s.id}</td>
                          <td className="text-white small fw-semibold" style={{ fontSize: '0.85rem' }}>{s.title}</td>
                          <td className="text-light small" style={{ fontSize: '0.85rem' }}>{s.respondent}</td>
                          <td className="text-secondary font-mono small" style={{ fontSize: '0.75rem' }}>{s.date}</td>
                          <td style={{ width: '130px' }}>
                            <div className="d-flex align-items-center gap-2">
                              <span className="small text-white font-mono" style={{ fontSize: '0.75rem' }}>{s.completion}%</span>
                              <div className="progress bg-black flex-grow-1" style={{ height: '5px' }}>
                                <div
                                  className={`progress-bar ${s.completion === 100 ? 'bg-success' : s.completion > 60 ? 'bg-cyan progress-glow-cyan' : 'bg-danger'}`}
                                  style={{ width: `${s.completion}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${
                              s.status === 'Approved' ? 'badge-neon-emerald' : s.status === 'Flagged' ? 'badge-neon-rose' : 'bg-secondary bg-opacity-25 text-white'
                            } px-2.5 py-1 small rounded-3`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-1.5">
                              <button
                                onClick={() => handleUpdateSurveyStatus(s.id, 'Approved')}
                                className="btn btn-sm btn-outline-success px-2 py-0.5"
                                style={{ fontSize: '0.75rem' }}
                                title="Approve"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleUpdateSurveyStatus(s.id, 'Flagged')}
                                className="btn btn-sm btn-outline-danger px-2 py-0.5"
                                style={{ fontSize: '0.75rem' }}
                                title="Flag"
                              >
                                Flag
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CHANGE PASSWORD */}
          {activeTab === 'change_password' && (
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div className="glass-card p-4">
                  <h4 className="text-white h5 mb-3 fw-bold d-flex align-items-center gap-2">
                    Security Credentials Deck
                    <span className="material-symbols-outlined text-neon-rose fs-5">lock</span>
                  </h4>
                  <p className="text-secondary small mb-4">Cycle cryptographic password access variables. All keys are hashed via low-level zero-knowledge proof protocols.</p>

                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-3">
                      <label className="form-label text-secondary small font-mono">Current Sysop Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                        placeholder="••••••••••••"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-secondary small font-mono">New Sysop Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                        placeholder="••••••••••••"
                        style={{ fontSize: '0.85rem' }}
                      />
                      
                      {/* Password strength visual readout */}
                      {newPassword && (
                        <div className="mt-2.5">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="text-secondary small font-mono" style={{ fontSize: '0.7rem' }}>Complexity Index:</span>
                            <span className={`small fw-bold font-mono ${getPasswordStrength().color}`} style={{ fontSize: '0.7rem' }}>
                              {getPasswordStrength().label}
                            </span>
                          </div>
                          <div className="progress bg-black" style={{ height: '4px' }}>
                            <div
                              className={`progress-bar ${getPasswordStrength().class}`}
                              style={{ width: getPasswordStrength().width }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-secondary small font-mono">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                        placeholder="••••••••••••"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-100 py-2.5 border-0 rounded-3 small fw-semibold shadow-lg">
                      Lock Secure Credentials
                    </Button>
                  </form>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="glass-card p-4">
                  <h4 className="text-white h5 mb-3 fw-bold d-flex align-items-center gap-2">
                    Quantum Cryptography Key Rollover
                    <span className="material-symbols-outlined text-neon-cyan fs-5">vpn_key</span>
                  </h4>
                  <p className="text-secondary small mb-4">Roll database encryption salt vectors. This will force re-indexing of all decentralized storage grids to secure against post-quantum decryption threats.</p>

                  <div className="p-3 bg-black bg-opacity-50 rounded-4 border border-secondary border-opacity-15 mb-4">
                    <span className="text-neon-cyan font-mono small d-block mb-1">// CRYPTOGRAPHIC ROOT: SECURITY PROTOCOL</span>
                    <span className="text-secondary d-block mb-2" style={{ fontSize: '0.75rem' }}>Active nodes APAC-04 and ZEPHYR-02 are synced on SHA-512 salting cycles.</span>
                    <div className="d-flex align-items-center justify-content-between text-secondary font-mono" style={{ fontSize: '0.7rem' }}>
                      <span>ROOT CERTIFICATE: SHADOW-CA</span>
                      <span className="text-neon-emerald">STATUS: ACTIVE</span>
                    </div>
                  </div>

                  {isRollingKeys ? (
                    <div className="py-2.5">
                      <div className="progress mb-2 bg-dark" style={{ height: '6px' }}>
                        <div className="progress-bar progress-bar-striped progress-bar-animated progress-glow-cyan" style={{ width: `${keyRollProgress}%` }}></div>
                      </div>
                      <span className="text-neon-cyan font-mono small d-block text-center" style={{ fontSize: '0.75rem' }}>RE-SALTING DISTRIBUTED VOLUMES: {keyRollProgress}%</span>
                    </div>
                  ) : (
                    <Button variant="secondary" onClick={handleRollQuantumKeys} className="w-100 py-2.5 rounded-3 btn btn-outline-light small fw-bold">
                      Force Roll Encryption Keys
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECT */}
          {activeTab === 'project' && (
            <div>
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                <div>
                  <h4 className="text-white h5 mb-1 fw-bold">Active Tactical Project Grid</h4>
                  <p className="text-secondary small mb-0">Deconstruct strategic neural mapping assignments and monitor task completions.</p>
                </div>
              </div>

              <div className="row g-4">
                {/* Add project panel */}
                <div className="col-12 col-md-4">
                  <div className="glass-card p-4 h-100">
                    <h5 className="text-white h6 mb-3 fw-bold d-flex align-items-center gap-2">
                      Initiate Cyber Project
                      <span className="material-symbols-outlined text-neon-cyan fs-5">add_circle</span>
                    </h5>
                    <form onSubmit={handleAddProject}>
                      <div className="mb-3">
                        <label className="form-label text-secondary small font-mono">Project Identifier Name</label>
                        <input
                          type="text"
                          value={newProjectName}
                          onChange={(e) => setNewProjectName(e.target.value)}
                          className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                          placeholder="e.g. Project VULCAN"
                          style={{ fontSize: '0.85rem' }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-secondary small font-mono">Dossier Objectives</label>
                        <textarea
                          value={newProjectDesc}
                          onChange={(e) => setNewProjectDesc(e.target.value)}
                          className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                          rows="4"
                          placeholder="Outline specific node mapping details..."
                          style={{ fontSize: '0.85rem' }}
                        ></textarea>
                      </div>
                      <Button type="submit" variant="primary" className="w-100 py-2.5 border-0 rounded-3 small fw-bold shadow-lg">
                        Publish Project Directives
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Projects grid */}
                <div className="col-12 col-md-8">
                  <div className="row g-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="col-12 col-md-6">
                        <div className="glass-card p-3.5 h-100 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <h5 className="text-white h6 mb-0.5 fw-bold font-sans">{proj.name}</h5>
                                <span className="text-secondary small font-mono" style={{ fontSize: '0.7rem' }}>ID: {proj.id}</span>
                              </div>
                              <span className={`badge ${
                                proj.status === 'Critical' ? 'badge-neon-rose' : proj.status === 'High' ? 'bg-warning text-dark' : 'badge-neon-emerald'
                              } px-2 py-0.5 small`}>
                                {proj.status}
                              </span>
                            </div>
                            <p className="text-secondary small leading-relaxed mb-3" style={{ fontSize: '0.8rem', minHeight: '38px' }}>
                              {proj.description}
                            </p>
                          </div>

                          <div>
                            <div className="mb-3">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="text-secondary small font-semibold" style={{ fontSize: '0.7rem' }}>GRID INTEGRATION WORK</span>
                                <span className="text-neon-cyan font-mono small" style={{ fontSize: '0.7rem' }}>{proj.progress}%</span>
                              </div>
                              <div className="progress bg-black bg-opacity-50" style={{ height: '5px' }}>
                                <div
                                  className="progress-bar bg-cyan progress-glow-cyan"
                                  style={{ width: `${proj.progress}%` }}
                                ></div>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center border-top border-secondary border-opacity-10 pt-2.5">
                              <span className="text-secondary font-mono" style={{ fontSize: '0.65rem' }}>LEAD: {proj.leader}</span>
                              <button
                                onClick={() => handleOverclockProject(proj.id)}
                                className="btn btn-sm btn-outline-cyan px-2 py-0.5 font-mono text-neon-cyan d-flex align-items-center gap-1"
                                style={{ fontSize: '0.7rem' }}
                                disabled={proj.progress >= 100}
                              >
                                <span className="material-symbols-outlined" style={{ fontSize: '0.8rem' }}>bolt</span>
                                Overclock Node
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: USER */}
          {activeTab === 'user' && (
            <div className="glass-card p-4">
              <div className="mb-4">
                <h4 className="text-white h5 mb-1 fw-bold">Operator Telemetry Registry</h4>
                <p className="text-secondary small mb-0">Deconstruct authorized system operator roles and monitor network location metrics.</p>
              </div>

              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                  <thead>
                    <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                      <th className="border-secondary border-opacity-10 py-3">Operator ID</th>
                      <th className="border-secondary border-opacity-10 py-3">Name</th>
                      <th className="border-secondary border-opacity-10 py-3">Assigned Role</th>
                      <th className="border-secondary border-opacity-10 py-3">Active Terminal IP</th>
                      <th className="border-secondary border-opacity-10 py-3">Access Clearance</th>
                      <th className="border-secondary border-opacity-10 py-3">System status</th>
                      <th className="border-secondary border-opacity-10 py-3 text-end">Action Gate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-secondary border-opacity-10">
                        <td className="font-mono text-neon-cyan py-3 small" style={{ fontSize: '0.8rem' }}>{u.id}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="rounded-circle bg-primary bg-opacity-25 border border-primary d-flex align-items-center justify-content-center text-white fw-bold"
                              style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}
                            >
                              {u.name.split(' ').map(p => p[0]).join('')}
                            </div>
                            <span className="text-white small fw-bold" style={{ fontSize: '0.85rem' }}>{u.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${
                            u.role === 'Superuser' ? 'badge-neon-rose' : u.role === 'Researcher' ? 'badge-neon-cyan' : 'bg-dark border border-secondary text-secondary'
                          } px-2 py-0.5`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="text-secondary font-mono small" style={{ fontSize: '0.75rem' }}>{u.ip}</td>
                        <td className="text-light small font-mono" style={{ fontSize: '0.8rem' }}>{u.securityLevel}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1.5">
                            <span className={`position-relative d-inline-flex`} style={{ width: '8px', height: '8px' }}>
                              <span className={`animate-pulse-cyber absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                u.status === 'Active' ? 'bg-success' : u.status === 'On Mission' ? 'bg-cyan' : 'bg-secondary'
                              }`}></span>
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                u.status === 'Active' ? 'bg-success' : u.status === 'On Mission' ? 'bg-cyan' : 'bg-secondary'
                              }`}></span>
                            </span>
                            <span className="small text-secondary" style={{ fontSize: '0.8rem' }}>{u.status}</span>
                          </div>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => handleToggleUserStatus(u.id)}
                            className={`btn btn-sm ${u.status === 'Active' ? 'btn-outline-danger' : 'btn-outline-success'} px-2.5 py-0.5`}
                            style={{ fontSize: '0.75rem' }}
                          >
                            {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: VENDOR */}
          {activeTab === 'vendor' && (
            <div className="glass-card p-4">
              <div className="mb-4">
                <h4 className="text-white h5 mb-1 fw-bold">Decentralized Vendor Pipeline Directory</h4>
                <p className="text-secondary small mb-0">Deconstruct authorized system integration vendors. Quarantine pipelines instantly to prevent cross-border zero-day hacks.</p>
              </div>

              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                  <thead>
                    <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                      <th className="border-secondary border-opacity-10 py-3">Vendor ID</th>
                      <th className="border-secondary border-opacity-10 py-3">Vendor Facility Name</th>
                      <th className="border-secondary border-opacity-10 py-3">Active Data Flow</th>
                      <th className="border-secondary border-opacity-10 py-3">Performance Audit</th>
                      <th className="border-secondary border-opacity-10 py-3">Pipeline Status</th>
                      <th className="border-secondary border-opacity-10 py-3 text-end">Action Deck</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((v) => (
                      <tr key={v.id} className="border-secondary border-opacity-10">
                        <td className="font-mono text-neon-cyan py-3 small" style={{ fontSize: '0.8rem' }}>{v.id}</td>
                        <td className="text-white small fw-bold" style={{ fontSize: '0.85rem' }}>{v.name}</td>
                        <td className="text-light font-mono small" style={{ fontSize: '0.8rem' }}>{v.pipeline}</td>
                        <td className="text-neon-emerald font-mono small" style={{ fontSize: '0.8rem' }}>{v.rating}</td>
                        <td>
                          <span className={`badge ${
                            v.status === 'Linked' ? 'badge-neon-emerald' : v.status === 'Quarantined' ? 'badge-neon-rose' : 'bg-secondary bg-opacity-25 text-white'
                          } px-2.5 py-1 small rounded-3`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => handleToggleVendor(v.id)}
                            className={`btn btn-sm ${v.status === 'Linked' ? 'btn-outline-danger' : 'btn-outline-cyan'} px-2.5 py-0.5 font-mono`}
                            style={{ fontSize: '0.75rem' }}
                          >
                            {v.status === 'Linked' ? 'Engage Quarantine' : 'Link Pipeline'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: VENDOR SURVEY */}
          {activeTab === 'vendor_survey' && (
            <div className="row g-4">
              <div className="col-12 col-md-5">
                <div className="glass-card p-4 h-100">
                  <h5 className="text-white h6 mb-3 fw-bold d-flex align-items-center gap-2">
                    Deploy Security Questionnaires
                    <span className="material-symbols-outlined text-neon-cyan fs-5">forward_to_inbox</span>
                  </h5>
                  <p className="text-secondary small mb-4">Broadcast custom security metrics to active vendor data grids. Vendors are forced to respond within a 12-hour decrypt window.</p>

                  <form onSubmit={handleDeploySurvey}>
                    <div className="mb-3">
                      <label className="form-label text-secondary small font-mono">Select Target Vendor</label>
                      <select
                        value={deployVendor}
                        onChange={(e) => setDeployVendor(e.target.value)}
                        className="form-select bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                        style={{ fontSize: '0.85rem' }}
                      >
                        {vendors.map(v => (
                          <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-secondary small font-mono">Survey Dossier Title</label>
                      <input
                        type="text"
                        value={deploySurveyTitle}
                        onChange={(e) => setDeploySurveyTitle(e.target.value)}
                        className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                        placeholder="e.g. Isolation Vault Security Audit"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-100 py-2.5 border-0 rounded-3 small fw-bold shadow-lg">
                      Deploy Questionnaire Feed
                    </Button>
                  </form>
                </div>
              </div>

              <div className="col-12 col-md-7">
                <div className="glass-card p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4 className="text-white h5 mb-1 fw-bold">Active Survey Audits</h4>
                      <p className="text-secondary small mb-0">Deconstruct active questionnaire metrics returned by third-party suppliers.</p>
                    </div>
                  </div>

                  <div className="table-responsive mb-4">
                    <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                      <thead>
                        <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                          <th className="border-secondary border-opacity-10 py-2">Survey ID</th>
                          <th className="border-secondary border-opacity-10 py-2">Target Vendor</th>
                          <th className="border-secondary border-opacity-10 py-2">Questionnaire Topic</th>
                          <th className="border-secondary border-opacity-10 py-2">Response rate</th>
                          <th className="border-secondary border-opacity-10 py-2 text-end">Telemetry Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorSurveys.map((vs) => (
                          <tr key={vs.id} className="border-secondary border-opacity-10">
                            <td className="font-mono text-neon-cyan py-2 small" style={{ fontSize: '0.75rem' }}>{vs.id}</td>
                            <td className="text-white small fw-bold" style={{ fontSize: '0.8rem' }}>{vs.vendor}</td>
                            <td className="text-light small" style={{ fontSize: '0.8rem' }}>{vs.title}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <span className="small text-secondary font-mono" style={{ fontSize: '0.7rem' }}>{vs.responseRate}%</span>
                                <div className="progress bg-black" style={{ width: '60px', height: '4px' }}>
                                  <div
                                    className={`progress-bar ${vs.responseRate === 100 ? 'bg-success' : 'bg-warning'}`}
                                    style={{ width: `${vs.responseRate}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="text-end font-mono text-neon-emerald small" style={{ fontSize: '0.8rem' }}>
                              {vs.score}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Dynamic Audit Completion Visual Progress Grid */}
                  <div className="p-3 bg-black bg-opacity-50 rounded-4 border border-secondary border-opacity-15">
                    <span className="text-neon-cyan font-mono small d-block mb-1">// SECURE SYSTEM FEED: COMPLIANCE RATINGS</span>
                    <span className="text-secondary small d-block mb-3" style={{ fontSize: '0.75rem' }}>Decentralized Vendor Compliance sits at a cumulative 92.4% integrity score.</span>
                    <div className="progress bg-dark" style={{ height: '8px' }}>
                      <div className="progress-bar progress-bar-striped progress-glow-cyan bg-cyan" style={{ width: '92.4%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Console Foot-Ticker */}
        <footer className="mt-auto border-top border-secondary border-opacity-10 py-2 px-4 px-md-5 d-flex justify-content-between align-items-center bg-black bg-opacity-50" style={{ zIndex: 10 }}>
          <span className="text-secondary font-mono" style={{ fontSize: '0.7rem' }}>SECURE ACCESS CONSOLE // ID: SK-9482 // OP: SHADOW</span>
          <span className="text-neon-cyan font-mono" style={{ fontSize: '0.7rem' }}>V2.6.5-PROD</span>
        </footer>

      </main>
    </div>
  );
}
