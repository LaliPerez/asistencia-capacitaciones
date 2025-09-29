
import React from 'react';
import { type Link } from '../types';
import LinkItem from './LinkItem';

interface LinkListProps {
  links: Link[];
  onRemoveLink: (id: string) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, onRemoveLink }) => {
  if (links.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      {links.map(link => (
        <LinkItem key={link.id} link={link} onRemove={onRemoveLink} />
      ))}
    </div>
  );
};

export default LinkList;
