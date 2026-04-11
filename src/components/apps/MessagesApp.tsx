'use client';

import { useState } from 'react';
import { Send, Phone, Video, Info, CheckCheck, Mail, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'felipe';
  time: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Bem-vindo ao meu Web OS.',
    sender: 'felipe',
    time: '10:00'
  },
  {
    id: '2',
    text: 'Sinta-se à vontade para explorar a arquitetura e o código-fonte.',
    sender: 'felipe',
    time: '10:01'
  },
  {
    id: '3',
    text: 'Se quiser bater um papo sobre desenvolvimento, alta performance ou oportunidades, é só mandar uma mensagem abaixo!',
    sender: 'felipe',
    time: '10:01'
  }
];

export const MessagesApp = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Substitua pelos seus dados reais depois
  const WHATSAPP_NUMBER = '5500000000000';
  const EMAIL = 'fmarzochi@gmail.com';

  const handleSendWhatsApp = () => {
    if (!messageText.trim()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
    addMockMessage();
  };

  const handleSendEmail = () => {
    if (!messageText.trim()) return;
    const subject = encodeURIComponent('Contato via Web OS Portfólio');
    const body = encodeURIComponent(messageText);
    const url = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = url;
    addMockMessage();
  };

  const addMockMessage = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'me',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#1e1e1e]/90 text-white/90 backdrop-blur-3xl">
      {/* Sidebar de Conversas */}
      <div className="w-full max-h-[35vh] md:max-h-none md:w-[260px] flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 pt-4 overflow-y-auto">
        <div className="mb-4 flex items-center justify-between px-4">
          <h2 className="text-sm font-bold tracking-wide text-white/80">Mensagens</h2>
          <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-blue-500 transition-colors hover:bg-blue-400">
            <MessageSquare size={12} className="text-white" />
          </div>
        </div>

        <div className="flex flex-col px-2">
          <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-blue-500/20 p-2 ring-1 ring-blue-500/50">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg">
              FM
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Felipe Marzochi</span>
                <span className="text-[10px] text-white/40">Agora</span>
              </div>
              <span className="truncate text-xs text-white/60">
                Se quiser bater um papo...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Área do Chat */}
      <div className="flex flex-1 flex-col bg-[#0a0a0a]/40 relative">
        {/* Header do Chat */}
        <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/10 bg-white/5 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Felipe Marzochi</span>
              <span className="text-[10px] text-blue-400">Online</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <Phone size={18} className="cursor-not-allowed hover:text-white" />
            <Video size={18} className="cursor-not-allowed hover:text-white" />
            <Info size={18} className="cursor-not-allowed hover:text-white" />
          </div>
        </div>

        {/* Histórico de Mensagens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col gap-1 max-w-[70%]">
                <div
                  className={`px-4 py-2 text-sm shadow-md ${
                    msg.sender === 'me'
                    ? 'rounded-2xl rounded-tr-sm bg-blue-600 text-white'
                    : 'rounded-2xl rounded-tl-sm bg-white/10 text-white/90 ring-1 ring-white/10 backdrop-blur-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`flex items-center gap-1 text-[10px] text-white/40 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {msg.time}
                  {msg.sender === 'me' && <CheckCheck size={12} className="text-blue-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="mt-auto p-4 bg-white/5 border-t border-white/10 backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            <div className="flex items-center rounded-full bg-black/40 ring-1 ring-white/10 focus-within:ring-blue-500/50 pr-1">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendWhatsApp();
                }}
                placeholder="Digite sua mensagem para o Felipe..."
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleSendEmail}
                disabled={!messageText.trim()}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail size={14} /> E-mail
              </button>
              <button
                onClick={handleSendWhatsApp}
                disabled={!messageText.trim()}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                <Send size={14} /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};