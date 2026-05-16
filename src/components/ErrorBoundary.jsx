import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="section-pad text-center text-slate-400">
          <p className="text-sm">This section encountered an error. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
