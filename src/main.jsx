import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('Lingoza render error:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <main dir="rtl" style={{minHeight:"100vh",padding:"28px",fontFamily:"Arial,sans-serif",background:"#f6f8fc",color:"#182338"}}>
          <h2>حدث خطأ أثناء تشغيل Lingoza</h2>
          <p>هذه رسالة تشخيصية لمساعدتنا على إصلاح المشكلة:</p>
          <pre dir="ltr" style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere",background:"#fff",padding:"16px",borderRadius:"10px",border:"1px solid #ddd"}}>{String(this.state.error?.stack || this.state.error)}</pre>
          <p>أرسل لنا صورة لهذه الرسالة.</p>
        </main>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <AppErrorBoundary><React.StrictMode><App /></React.StrictMode></AppErrorBoundary>
);
