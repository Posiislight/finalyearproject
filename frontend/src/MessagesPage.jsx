import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmployerSidebar from './EmployerSidebar';
import JobSeekerBottomNav from './JobSeekerBottomNav';
import { messagingService } from './services/messagingService';
import BlockLoader from './components/ui/block-loader';

const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#f59e0b', '#0891b2', '#6366f1', '#ec4899'];

const MessagesPage = () => {
    const location = useLocation();
    const isEmployer = location.pathname.includes('employer');
    const [threads, setThreads] = useState([]);
    const [activeThreadId, setActiveThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showChatPanel, setShowChatPanel] = useState(false);
    const [loadingThreads, setLoadingThreads] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Fetch threads
    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const data = await messagingService.getThreads();
                setThreads(data);
                // Auto-select thread if passed via navigation state
                const stateThreadId = location.state?.threadId;
                if (stateThreadId && data.some(t => t.id === stateThreadId)) {
                    setActiveThreadId(stateThreadId);
                    setShowChatPanel(true);
                } else if (data.length > 0 && !activeThreadId) {
                    setActiveThreadId(data[0].id);
                }
            } catch (err) {
                console.error('Failed to fetch threads:', err);
            } finally {
                setLoadingThreads(false);
            }
        };
        fetchThreads();
    }, []);

    // Fetch messages when active thread changes
    useEffect(() => {
        if (!activeThreadId) return;
        const fetchMessages = async () => {
            setLoadingMessages(true);
            try {
                const data = await messagingService.getMessages(activeThreadId);
                setMessages(data);
                // Mark messages as read
                await messagingService.markRead(activeThreadId);
                // Update unread count in thread list
                setThreads(prev => prev.map(t =>
                    t.id === activeThreadId ? { ...t, unread_count: 0 } : t
                ));
            } catch (err) {
                console.error('Failed to fetch messages:', err);
            } finally {
                setLoadingMessages(false);
            }
        };
        fetchMessages();
    }, [activeThreadId]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!newMessage.trim() || !activeThreadId) return;
        try {
            const sent = await messagingService.sendMessage(activeThreadId, newMessage.trim());
            setMessages(prev => [...prev, sent]);
            setNewMessage('');
            // Update latest message in thread list
            setThreads(prev => prev.map(t =>
                t.id === activeThreadId
                    ? { ...t, latest_message: sent }
                    : t
            ));
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const selectChat = (id) => {
        setActiveThreadId(id);
        setShowChatPanel(true);
    };

    const activeThread = threads.find(t => t.id === activeThreadId);
    const avatarColor = activeThread ? AVATAR_COLORS[activeThread.id % AVATAR_COLORS.length] : '#2563eb';

    const filteredThreads = searchQuery.trim()
        ? threads.filter(t => t.other_user_name.toLowerCase().includes(searchQuery.toLowerCase()))
        : threads;

    const conversationListContent = (
        <div className={`${showChatPanel ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-80 xl:w-96 h-full bg-white/5 border-r border-white/10 shrink-0`}>
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-bold text-[#f9fafb] mb-3">Messages</h2>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#9ca3af] text-xl">search</span>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full h-10 rounded-xl bg-black border border-white/10 text-[#f9fafb] pl-10 pr-4 text-sm placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition"
                    />
                </div>
            </div>
            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
                {loadingThreads ? (
                    <div className="flex items-center justify-center py-16">
                        <BlockLoader size={24} gap={3} />
                    </div>
                ) : filteredThreads.length === 0 ? (
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-3xl text-white/20 mb-2">chat_bubble</span>
                        <p className="text-sm text-[#9ca3af]">No conversations yet</p>
                    </div>
                ) : filteredThreads.map((thread) => {
                    const color = AVATAR_COLORS[thread.id % AVATAR_COLORS.length];
                    return (
                        <button
                            key={thread.id}
                            onClick={() => selectChat(thread.id)}
                            className={`w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-white/5 ${activeThreadId === thread.id ? 'bg-[#2563eb]/10 border-l-2 border-[#2563eb]' : 'border-l-2 border-transparent'}`}
                        >
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: color }}>
                                    {thread.other_user_initials}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-sm font-semibold text-[#f9fafb] truncate">{thread.other_user_name}</span>
                                    <span className="text-[10px] text-[#9ca3af] shrink-0 ml-2">
                                        {thread.latest_message ? new Date(thread.latest_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                                <p className="text-xs text-[#9ca3af] mb-1">{thread.other_user_role}</p>
                                <p className="text-xs text-[#9ca3af] truncate">
                                    {thread.latest_message?.content || 'No messages yet'}
                                </p>
                            </div>
                            {thread.unread_count > 0 && (
                                <div className="bg-[#2563eb] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1">
                                    {thread.unread_count}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const chatPanelContent = (
        <div className={`${showChatPanel ? 'flex' : 'hidden lg:flex'} flex-col flex-1 h-full bg-black`}>
            {activeThread ? (
                <>
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 p-4 bg-white/5 border-b border-white/10 shrink-0">
                        <button
                            onClick={() => setShowChatPanel(false)}
                            className="lg:hidden w-9 h-9 rounded-full bg-black border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[#9ca3af] text-lg">arrow_back</span>
                        </button>
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: avatarColor }}>
                                {activeThread.other_user_initials}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#f9fafb] truncate">{activeThread.other_user_name}</p>
                            <p className="text-xs text-[#9ca3af]">{activeThread.other_user_role}</p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {loadingMessages ? (
                            <div className="flex items-center justify-center py-16">
                                <BlockLoader size={24} gap={3} />
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-sm text-[#9ca3af]">No messages yet. Say hello!</p>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.is_mine ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%]`}>
                                            {!msg.is_mine && (
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[8px]" style={{ backgroundColor: avatarColor }}>
                                                        {activeThread.other_user_initials}
                                                    </div>
                                                    <span className="text-[10px] text-[#9ca3af] font-medium">{msg.sender_name}</span>
                                                </div>
                                            )}
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                                msg.is_mine
                                                    ? 'bg-[#2563eb] text-white rounded-br-md'
                                                    : 'bg-white/10 text-[#f9fafb] border border-white/10 rounded-bl-md'
                                            }`}>
                                                {msg.content}
                                            </div>
                                            <p className={`text-[10px] text-[#9ca3af] mt-1 ${msg.is_mine ? 'text-right' : 'text-left'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                {msg.is_mine && msg.is_read && (
                                                    <span className="material-symbols-outlined text-[#2563eb] text-[10px] ml-1 inline-block align-middle">done_all</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className={`p-4 bg-white/5 border-t border-white/10 shrink-0 ${!isEmployer ? 'mb-14' : ''}`}>
                        <div className="flex items-end gap-2">
                            <div className="flex-1 relative">
                                <textarea
                                    ref={textareaRef}
                                    value={newMessage}
                                    onChange={(e) => {
                                        setNewMessage(e.target.value);
                                        // Auto-resize
                                        if (textareaRef.current) {
                                            textareaRef.current.style.height = 'auto';
                                            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
                                        }
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    rows={2}
                                    className="w-full rounded-xl bg-black border border-white/10 text-[#f9fafb] px-4 py-2.5 text-sm placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition resize-none"
                                    style={{ minHeight: '44px', maxHeight: '120px' }}
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!newMessage.trim()}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                                    newMessage.trim()
                                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-lg shadow-[#2563eb]/30'
                                        : 'bg-black border border-white/10 text-[#9ca3af]'
                                }`}
                            >
                                <span className="material-symbols-outlined text-xl">send</span>
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <span className="material-symbols-outlined text-5xl text-white/20 mb-3">forum</span>
                        <p className="text-sm text-[#9ca3af]">Select a conversation to start messaging</p>
                    </div>
                </div>
            )}
        </div>
    );

    const mainContent = (
        <div className="flex flex-1 h-full overflow-hidden">
            {conversationListContent}
            {chatPanelContent}
        </div>
    );

    if (isEmployer) {
        return (
            <div className="bg-black text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
                <EmployerSidebar />
                {mainContent}
            </div>
        );
    }

    return (
        <div className="bg-black text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {mainContent}
            <JobSeekerBottomNav />
        </div>
    );
};

export default MessagesPage;
