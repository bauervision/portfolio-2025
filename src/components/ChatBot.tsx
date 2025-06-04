import React, { useState } from 'react';

type Role = 'user' | 'assistant' | 'system';
type Message = { role: Role; content: string };

export default function ChatBot({
  input,
  setInput,
  minimal,
  onStart,
}: {
  input: string;
  setInput: (val: string) => void;
  minimal?: boolean;
  onStart?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  //   const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    if (onStart) onStart(); //trigger expansion
    const userMsg: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages }),
    });
    const data = await response.json();
    const aiMsg: Message = { role: 'assistant', content: data.reply };
    setMessages([...updatedMessages, aiMsg]);
    setLoading(false);
  }
  return (
    <div className='w-full mx-auto p-4 border rounded-xl bg-white shadow'>
      <h3 className='text-lg font-bold mb-2 text-slate-700'>
        Ask Mike’s AI Assistant
      </h3>
      {!minimal && (
        <div className='h-56 overflow-y-auto mb-2 bg-gray-50 p-2 rounded'>
          {messages
            .filter((msg) => msg.role !== 'system')
            .map((msg, i) => (
              <div
                key={i}
                className={`mb-2 text-sm ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-green-100 text-green-900'
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          {loading && <div className='text-gray-400'>Thinking...</div>}
        </div>
      )}
      {/* input container */}
      <div className='flex gap-2'>
        <input
          className='flex-1 p-2 rounded border text-blue-900'
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about Mike's experience..."
        />
        <button
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
