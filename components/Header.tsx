import React from 'react';

interface HeaderProps {
  view: 'admin' | 'attendance' | 'report';
}

const Header: React.FC<HeaderProps> = ({ view }) => {
  const titles = {
    admin: 'Carga de Capacitaciones',
    attendance: 'Asistencia a Capacitación',
    report: 'Reporte de Asistencia'
  };

  const subtitles = {
    admin: 'Arrastra y suelta un archivo de texto con enlaces o agrégalos uno por uno.',
    attendance: 'Completa tus datos y haz clic en cada enlace para registrar tu asistencia.',
    report: 'Tu asistencia ha sido registrada. Puedes descargar el comprobante en PDF.'
  }

  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
        {titles[view]}
      </h1>
      <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
        {subtitles[view]}
      </p>
    </header>
  );
};

export default Header;