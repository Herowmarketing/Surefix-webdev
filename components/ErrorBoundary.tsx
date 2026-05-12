import { Component, ErrorInfo, ReactNode } from 'react';

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-8">
          <p style={{ fontFamily: 'Figtree, sans-serif' }}>Something went wrong. Please refresh.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
