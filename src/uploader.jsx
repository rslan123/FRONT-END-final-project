import React, { useState, useEffect, useRef } from 'react';
import './uploader.css';

const Uploader = ({ userRole, user }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [optimizedImages, setOptimizedImages] = useState(null);
  const [stats, setStats] = useState(null);

  const resultsRef = useRef(null);

  useEffect(() => {
    if (status === 'success' && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const handleReset = () => {
    setFile(null);
    setStatus('idle');
    setOptimizedImages(null);
    setStats(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpload = () => {
    if (!file) return;

    setStatus('uploading');

    // MOCK DELAY: Simulate the network
    setTimeout(() => {
      setStatus('processing');
      
      setTimeout(() => {
        // CREATE LOCAL PREVIEW URL
        const localUrl = URL.createObjectURL(file);

        // MOCK DATA: Showing the partner what it WOULD look like
        setStats({
          quality_used: 80,
          savings_percent: '65%',
          processing_time_ms: 450,
          original_size_kb: (file.size / 1024).toFixed(0),
          total_output_kb: (file.size / 1024 * 0.35).toFixed(0)
        });

        setOptimizedImages({
          thumbnail: localUrl,
          medium: localUrl,
          large: localUrl,
          original: localUrl
        });

        setStatus('success');
      }, 800);
    }, 600);
  };

  const startDrag = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) { setFile(e.dataTransfer.files[0]); }
  };

  return (
    <div className="uploader-container">
      <div className="pro-header">
        <h2 className="brand-title">Media Accelerator <span style={{color: 'orange'}}>(TEST MODE)</span></h2>
        <span className="api-badge-live">UI PLAYGROUND</span>
      </div>
      
      <div className={`upload-card ${file ? 'file-selected' : ''}`} onDragEnter={startDrag} onDragOver={startDrag} onDrop={handleDrop}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="file-input-hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="custom-file-label">
          {file ? <span className="file-name-display">📄 {file.name}</span> : <span><strong>Click to upload</strong> or drag and drop</span>}
        </label>
      </div>

      <button className="btn-primary" onClick={handleUpload} disabled={!file || status === 'uploading' || status === 'processing'}>
        {status === 'uploading' ? 'Uploading...' : status === 'processing' ? 'Processing...' : 'Test UI Generation'}
      </button>

      {status === 'success' && stats && (
        <div className="score-section" ref={resultsRef}>
          <div className="score-header">
            <span className="score-title">Efficiency ({stats.quality_used}%)</span>
            <span className="score-value">{stats.savings_percent}</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: stats.savings_percent }}></div>
          </div>
          <div className="score-footer">
            <span>Latency: <strong>{stats.processing_time_ms}ms</strong></span>
            <span>Reduced: <strong>{stats.original_size_kb - stats.total_output_kb} KB</strong></span>
          </div>
        </div>
      )}

      {status === 'success' && optimizedImages && (
        <div className="gallery-wrapper">
          <h3 className="section-label">Generated Assets (Local Previews)</h3>
          <div className="gallery-grid">
            <ImageItem label="Thumbnail" dim="150x150" url={optimizedImages.thumbnail} ratio="1:1" />
            <ImageItem label="Standard" dim="800x800" url={optimizedImages.medium} ratio="1:1" />
            <ImageItem label="Desktop" dim="1920x1080" url={optimizedImages.large} ratio="16:9" />
          </div>
          <button className="btn-secondary" onClick={handleReset}>Clear and Retry</button>
        </div>
      )}
    </div>
  );
};

const ImageItem = ({ label, dim, url, ratio }) => (
  <div className="asset-card">
    <div className="asset-meta"><span className="asset-dim">{dim}</span><span className="asset-ratio">{ratio}</span></div>
    <div className="img-preview-box"><img src={url} alt={label} /></div>
    <div className="asset-info">
      <span className="asset-name">{label}</span>
      <a href={url} target="_blank" rel="noreferrer" className="asset-link">View Full</a>
    </div>
  </div>
);

export default Uploader;