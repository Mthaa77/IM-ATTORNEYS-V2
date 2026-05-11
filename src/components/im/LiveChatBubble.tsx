"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

// --- Types ---
interface ChatMessage {
  id: string;
  text: string;
  sender: "bot" | "user";
}

// --- Bot Response Map ---
const quickReplyResponses: Record<string, string> = {
  Services:
    "We specialise in Family Law, Wills & Estates, Claims Against the State, Criminal Law, Commercial Law, and General Litigation. Which area interests you?",
  "Book Consultation":
    "Great! You can book a free initial consultation by calling 081 248 8048 or scrolling down to our contact form. We're available Mon-Fri 08:00-17:00.",
  "Contact Info":
    "📞 Phone: 081 248 8048\n📧 Email: attorneys@iminc.co.za\n📍 Pegasus Building, 210 Amarand Avenue, Menlyn Maine, Pretoria",
};

const defaultBotResponse =
  "Thank you for your message! For detailed legal advice, please call us at 081 248 8048 or use the consultation form. Our team will respond within 2 hours.";

const quickReplies = ["Services", "Book Consultation", "Contact Info"];

// --- Framer Motion Variants ---
const panelVariants = {
  closed: { opacity: 0, y: 20, scale: 0.95 },
  open: { opacity: 1, y: 0, scale: 1 },
};

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function LiveChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Hello! 👋 I'm the IM Attorneys virtual assistant. How can I help you today? I can answer questions about our services, practice areas, or help you schedule a consultation.",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // --- Auto-scroll to bottom on new messages ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- Focus input when panel opens ---
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        chatInputRef.current?.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // --- Send message handler ---
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      text: text.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Quick replies use static responses
    if (quickReplyResponses[userMsg.text]) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            text: quickReplyResponses[userMsg.text],
            sender: "bot",
          },
        ]);
        setIsTyping(false);
      }, 800);
      return;
    }

    // User-typed messages: call AI backend
    try {
      const conversationHistory = messages
        .filter((m) => m.id !== "welcome")
        .concat(userMsg)
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      const botReply = data.reply || defaultBotResponse;

      setMessages((prev) => [
        ...prev,
        { id: generateId(), text: botReply, sender: "bot" },
      ]);
    } catch {
      // Fallback to default response on error
      setMessages((prev) => [
        ...prev,
        { id: generateId(), text: defaultBotResponse, sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- Submit handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  // --- Quick reply click handler ---
  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <>
      {/* ============ Floating Trigger Button ============ */}
      <motion.button
        type="button"
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-3 sm:right-6 z-50 flex items-center justify-center group"
        style={{ bottom: "max(3.5rem, calc(env(safe-area-inset-bottom, 1rem) + 3rem))" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Pulse ring */}
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              className="absolute inset-0 w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full bg-brand-gold"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </AnimatePresence>

        {/* Button circle — smaller on mobile */}
        <span
          className={`relative w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isOpen
              ? "bg-brand-dark text-white shadow-black/20"
              : "bg-brand-gold text-brand-dark shadow-brand-gold/30 group-hover:shadow-[0_0_20px_rgba(198,168,75,0.5)]"
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </span>

        {/* Tooltip — desktop only */}
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              className="absolute right-full mr-2.5 whitespace-nowrap bg-brand-dark text-white text-xs font-body font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none hidden sm:block"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
            >
              AI Chat
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-brand-dark rotate-45" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ============ Chat Panel ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-3 sm:right-6 z-[55] w-[calc(100vw-1.5rem)] sm:w-96 h-[60vh] sm:h-[480px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-brand-gold/20 flex flex-col overflow-hidden"
            style={{ bottom: "max(5.5rem, calc(env(safe-area-inset-bottom, 1rem) + 5rem))" }}
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            {/* --- Chat Header --- */}
            <div className="flex-shrink-0 bg-brand-dark px-4 py-3 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-white leading-tight">
                  IM Legal Assistant
                </h3>
                <p className="text-xs text-brand-gold mt-0.5 font-body">
                  Online • Typically replies instantly
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* --- Messages Area --- */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm font-body whitespace-pre-line leading-relaxed ${
                      msg.sender === "bot"
                        ? "bg-brand-parchment text-brand-dark rounded-2xl rounded-tl-sm"
                        : "bg-brand-gold text-white rounded-2xl rounded-tr-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="bg-brand-parchment text-brand-dark rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-brand-gold/60 animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-brand-gold/60 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-brand-gold/60 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick reply chips (only show before first user message) */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs px-3 py-1.5 rounded-full border border-brand-gold/30 text-brand-gold font-body font-medium hover:bg-brand-gold hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* --- Input Area --- */}
            <form
              onSubmit={handleSubmit}
              className="flex-shrink-0 px-3 py-2 border-t border-brand-gold/10 bg-white/50"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-brand-parchment/50 rounded-full px-4 py-2.5 text-sm font-body text-brand-dark placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all duration-200"
                  aria-label="Chat message input"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white hover:bg-brand-gold/90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* --- Footer Disclaimer --- */}
            <div className="flex-shrink-0 py-2 bg-brand-parchment/30 border-t border-brand-gold/5">
              <p className="text-xs text-muted-foreground text-center font-body">
                Powered by AI • Not a substitute for legal advice
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
