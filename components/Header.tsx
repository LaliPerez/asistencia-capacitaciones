import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
        Link Collector
      </h1>
      <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
        Create and share a list of links for your team or class to review.
      </p>
    </header>
  );
};

export default Header;
