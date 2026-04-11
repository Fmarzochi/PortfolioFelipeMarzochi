'use client';

import { useState } from 'react';
import { User, Mail, Briefcase, MessageCircle, Video, Heart } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  email?: string;
  group: 'Me' | 'Família' | 'CatchUp Tech';
  avatarColor: string;
}

const contacts: Contact[] = [
  { id: '1', name: 'Felipe Marzochi', role: 'Founder & Software Engineer', email: 'fmarzochi@gmail.com', group: 'Me', avatarColor: 'bg-blue-600' },
  { id: '2', name: 'Matheus', role: 'Filho', group: 'Família', avatarColor: 'bg-red-500' },
  { id: '3', name: 'Matheus Fuentes', role: 'Desenvolvedor', group: 'CatchUp Tech', avatarColor: 'bg-green-500' },
  { id: '4', name: 'Igor Mendes', role: 'Desenvolvedor', group: 'CatchUp Tech', avatarColor: 'bg-purple-500' },
  { id: '5', name: 'Kimberly', role: 'Desenvolvedora', group: 'CatchUp Tech', avatarColor: 'bg-pink-500' },
  { id: '6', name: 'Vitor Hugo', role: 'Desenvolvedor', group: 'CatchUp Tech', avatarColor: 'bg-yellow-600' },
];

export const ContactsApp = () => {
  const [selectedId, setSelectedId] = useState<string>('1');

  const selectedContact = contacts.find(c => c.id === selectedId) || contacts[0];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const renderContactList = (groupName: string) => {
    const groupContacts = contacts.filter(c => c.group === groupName);
    if (groupContacts.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="mb-1 px-4 text-[11px] font-bold uppercase tracking-wider text-white/40">
          {groupName}
        </h3>
        <div className="flex flex-col px-2">
          {groupContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setSelectedId(contact.id)}
              className={`flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors ${
                selectedId === contact.id ? 'bg-blue-500/90 text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium text-white ${contact.avatarColor}`}>
                {getInitials(contact.name)}
              </div>
              <span className="truncate text-sm font-medium">{contact.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full bg-[#1e1e1e]/90 text-white/90 backdrop-blur-3xl">
      {/* Sidebar de Lista de Contatos */}
      <div className="w-[240px] flex-shrink-0 border-r border-white/10 bg-black/20 pt-4 overflow-y-auto">
        {renderContactList('Me')}
        {renderContactList('Família')}
        {renderContactList('CatchUp Tech')}
      </div>

      {/* Área Principal - Detalhes do Contato */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white/5 p-8">
        <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-black/20 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
          {/* Avatar Grande */}
          <div className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-lg ${selectedContact.avatarColor}`}>
            <span className="text-4xl font-bold text-white shadow-black/20 drop-shadow-md">
              {getInitials(selectedContact.name)}
            </span>
          </div>

          <h2 className="mb-1 text-2xl font-bold tracking-tight text-white">{selectedContact.name}</h2>
          <p className="mb-6 text-sm font-medium text-white/50">{selectedContact.role}</p>

          {/* Action Buttons */}
          <div className="mb-8 flex gap-4">
            <button className="flex flex-col items-center gap-1 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20">
              <MessageCircle size={18} className="text-blue-400" />
              <span className="text-xs text-white/70">Mensagem</span>
            </button>
            <button className="flex flex-col items-center gap-1 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20">
              <Video size={18} className="text-blue-400" />
              <span className="text-xs text-white/70">FaceTime</span>
            </button>
            <button className="flex flex-col items-center gap-1 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20">
              <Mail size={18} className="text-blue-400" />
              <span className="text-xs text-white/70">E-mail</span>
            </button>
          </div>

          {/* Detalhes Info Card */}
          <div className="w-full rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            {selectedContact.email && (
              <div className="mb-3 flex items-center gap-3 border-b border-white/5 pb-3">
                <Mail size={16} className="text-white/40" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-white/40">E-mail</span>
                  <span className="text-sm text-blue-400">{selectedContact.email}</span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              {selectedContact.group === 'Família' ? <Heart size={16} className="text-white/40" /> : <Briefcase size={16} className="text-white/40" />}
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-white/40">Grupo / Organização</span>
                <span className="text-sm">{selectedContact.group}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};