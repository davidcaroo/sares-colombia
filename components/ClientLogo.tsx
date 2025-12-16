import React from 'react';

interface ClientLogoProps {
  name: string;
  color?: string;
  logoUrl?: string | null;
  link?: string | null;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ name, color = 'text-gray-900', logoUrl, link }) => {
  const content = (
    <div className="flex items-center justify-center w-[200px] h-32 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 mx-4">
      {logoUrl ? (
        <img src={logoUrl} alt={name} className="max-h-16 w-auto object-contain px-4" loading="lazy" />
      ) : (
        <span className={`text-xl font-black ${color} text-center px-4 leading-tight`}>{name}</span>
      )}
    </div>
  );

  if (link) {
    const isExternal = link.startsWith('http');
    return (
      <a href={link} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>
        {content}
      </a>
    );
  }

  return content;
};

export default ClientLogo;