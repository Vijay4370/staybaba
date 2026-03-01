import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Sparkles, Copy, Trash2, 
  ThumbsUp, ThumbsDown, Loader2, Settings,
  MessageSquare, Cpu, Zap, Brain, ChevronDown,
  Mic, Image as ImageIcon, Paperclip, Phone
} from 'lucide-react';

const AI_RESPONSES = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! I'm here to assist you. What would you like to know?",
    "Greetings! How may I assist you today?"
  ],
  help: [
    "I can help you with: Answering questions, Writing code, Explaining concepts, Creative writing, And much more! Just ask.",
    "I'm here to help! You can ask me about: Study materials, Programming help, Content writing, Technical problems"
  ],
  default: [
    "That's an interesting question! Let me think about it... Based on my analysis, I recommend exploring this topic further. Would you like more details?",
    "Great question! Here's what I think: The best approach depends on your specific needs. Let me provide some options...",
    "I'd be happy to help with that! Here's my recommendation: Focus on understanding the core concepts first, then practice regularly."
  ],
  code: [
    "Here's a code example for you: const example = () => { return 'Hello, World!'; }; Let me know if you need any modifications!",
    "Here's a simple solution: def solve_problem(): # Your code here return result Feel free to ask for explanations!"
  ],
  study: [
    "For effective studying, I recommend: 1. Create a study schedule 2. Use active recall 3. Take regular breaks 4. Teach what you learn 5. Stay consistent!",
    "Study tips: Pomodoro Technique (25 min study, 5 min break), Mind mapping for concepts, Practice with past papers, Join study groups, Stay hydrated!"
  ]
};

const CATEGORIES = [
  { id: 'greeting', icon: Sparkles, label: 'Greeting', color: 'bg-purple-500' },
  { id: 'help', icon: Brain, label: 'Help', color: 'bg-blue-500' },
  { id: 'code', icon: Cpu, label: 'Coding', color: 'bg-green-500' },
  { id: 'study', icon: User, label: 'Study Tips', color: 'bg-yellow-500' },
  { id: 'default', icon: MessageSquare, label: 'General', color: 'bg-gray-500' }
];

function AiRecs() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: "Hello! I'm your AI Assistant. How can I help you today?", timestamp: new Date(), liked: null }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return AI_RESPONSES.greeting[Math.floor(Math.random() * AI_RESPONSES.greeting.length)];
    }
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return AI_RESPONSES.help[Math.floor(Math.random() * AI_RESPONSES.help.length)];
    }
    if (lowerInput.includes('code') || lowerInput.includes('programming') || lowerInput.includes('javascript') || lowerInput.includes('python')) {
      return AI_RESPONSES.code[Math.floor(Math.random() * AI_RESPONSES.code.length)];
    }
    if (lowerInput.includes('study') || lowerInput.includes('learn') || lowerInput.includes('exam')) {
      return AI_RESPONSES.study[Math.floor(Math.random() * AI_RESPONSES.study.length)];
    }
    return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { id: Date.now(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const assistantMessage = { id: Date.now() + 1, role: 'assistant', content: aiResponse, timestamp: new Date(), liked: null };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = CATEGORIES.find(c => c.id === categoryId);
    setInput("Tell me about " + category.label.toLowerCase() + "!");
  };

  const handleFeedback = (messageId, liked) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, liked } : msg));
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  const clearChat = () => {
    if (window.confirm('Clear all messages?')) {
      setMessages([{ id: 1, role: 'assistant', content: "Hello! I'm your AI Assistant. How can I help you today?", timestamp: new Date(), liked: null }]);
    }
  };

  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center animate-float backdrop-blur-sm">
          <Bot className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}>
          <Cpu className="w-6 h-6 text-pink-400 mx-auto mt-3" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-14 h-14 bg-purple-500/20 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
          <Brain className="w-7 h-7 text-purple-400 mx-auto mt-3" />
        </div>
      </div>

      <div className="relative z-10 flex h-screen">
        <aside className={`${showSidebar ? 'w-64' : 'w-0'} bg-white/10 backdrop-blur-lg border-r border-white/20 transition-all duration-300 overflow-hidden`}>
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white">AI Assistant</h1>
                <p className="text-xs text-white/60">Powered by React</p>
              </div>
            </div>

            <button onClick={clearChat} className="w-full bg-white/10 hover:bg-white/20 p-3 rounded-xl flex items-center justify-center gap-2 mb-6 transition-all duration-300 text-white border border-white/10">
              <Sparkles className="w-4 h-4" /> New Chat
            </button>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-white/60 uppercase mb-3">Quick Options</h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${selectedCategory === cat.id ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-white/80 hover:bg-white/10'}`}>
                    <cat.icon className={`w-5 h-5 ${cat.color} p-1 rounded`} />
                    <span className="text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/20">
              <button className="w-full p-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all duration-300 text-white">
                <Settings className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 text-white">
                <ChevronDown className={`w-5 h-5 transition ${showSidebar ? 'rotate-90' : ''}`} />
              </button>
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-purple-400" />
                <span className="font-semibold text-white">AI Chat Assistant</span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
            </span>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'assistant' ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-white/20'}`}>
                  {message.role === 'assistant' ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
                </div>
                <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-2xl ${message.role === 'user' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'}`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-white/40">{formatTime(message.timestamp)}</span>
                      <button onClick={() => copyMessage(message.content)} className="p-1.5 hover:bg-white/10 rounded-lg transition-all" title="Copy">
                        <Copy className="w-4 h-4 text-white/40" />
                      </button>
                      <button onClick={() => handleFeedback(message.id, true)} className={`p-1.5 rounded-lg transition-all ${message.liked === true ? 'bg-green-500/20' : 'hover:bg-white/10'}`}>
                        <ThumbsUp className={`w-4 h-4 ${message.liked === true ? 'text-green-400' : 'text-white/40'}`} />
                      </button>
                      <button onClick={() => handleFeedback(message.id, false)} className={`p-1.5 rounded-lg transition-all ${message.liked === false ? 'bg-red-500/20' : 'hover:bg-white/10'}`}>
                        <ThumbsDown className={`w-4 h-4 ${message.liked === false ? 'text-red-400' : 'text-white/40'}`} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-white">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white/10 backdrop-blur-lg border-t border-white/20">
            <div className="max-w-3xl mx-auto">
              <div className="relative" style={cardStyle}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your message here..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-24 py-4 focus:outline-none focus:border-purple-500 transition-all text-white placeholder-white/40" disabled={isLoading} />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-all"><ImageIcon className="w-5 h-5 text-white/40" /></button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-all"><Paperclip className="w-5 h-5 text-white/40" /></button>
                  <button onClick={handleSend} disabled={!input.trim() || isLoading} className={`p-2 rounded-lg transition-all ${input.trim() && !isLoading ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-white/10 cursor-not-allowed'}`}>
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 text-white" />}
                  </button>
                </div>
              </div>
              <p className="text-center text-xs text-white/40 mt-2">AI can make mistakes. Please verify important information.</p>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default AiRecs;
