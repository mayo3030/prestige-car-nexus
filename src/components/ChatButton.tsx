import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "👋 Welcome to Jersey Auto Lease! I'm your virtual assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

type ChatMessage = { role: "user" | "assistant"; content: string };

// Get or create session ID from localStorage
function getSessionId(): string {
  let sessionId = localStorage.getItem('chat_session');
  if (!sessionId) {
    sessionId = `session_${Date.now()}`;
    localStorage.setItem('chat_session', sessionId);
  }
  return sessionId;
}

async function sendChatMessage({
  messages,
  onResponse,
  onError,
}: {
  messages: ChatMessage[];
  onResponse: (text: string, metadata?: { needs_human?: boolean; intent?: string; priority?: string }) => void;
  onError: (error: string) => void;
}) {
  try {
    const lastMessage = messages[messages.length - 1];
    const sessionId = getSessionId();
    
    const { data, error } = await supabase.functions.invoke("chat", {
      body: {
        message: lastMessage.content,
        messages,
        session_id: sessionId,
        source: "website",
      },
    });

    if (error) throw error;

    const responseText =
      data?.response ||
      "Thanks for reaching out. A Jersey Auto Lease broker can help with inventory, payments, approval steps, or delivery.";
    onResponse(responseText, {
      needs_human: data?.needs_human,
      intent: data?.intent,
      priority: data?.priority,
    });
  } catch (error) {
    onError("Connection error. Please try again.");
  }
}

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const newChatHistory: ChatMessage[] = [
      ...chatHistory,
      { role: "user", content: inputValue },
    ];

    setMessages((prev) => [...prev, userMessage]);
    setChatHistory(newChatHistory);
    setInputValue("");
    setIsTyping(true);

    await sendChatMessage({
      messages: newChatHistory,
      onResponse: (text) => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: userMessage.id + 1,
            text: text,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: text },
        ]);
      },
      onError: (error) => {
        setIsTyping(false);
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        setMessages((prev) => [
          ...prev,
          {
            id: userMessage.id + 1,
            text: "I apologize, but I'm having trouble connecting right now. Please try again or call us directly for assistance.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        size="icon"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-card rounded-2xl shadow-2xl shadow-black/20 border border-border/50 overflow-hidden flex flex-col h-[550px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Jersey Auto Lease</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs">Online now</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 animate-fade-in ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      message.sender === "bot"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.sender === "bot" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    <span
                      className={`text-[10px] mt-1 block ${
                        message.sender === "user"
                          ? "text-primary-foreground/60"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && messages[messages.length - 1]?.sender === "user" && (
                <div className="flex items-end gap-2 animate-fade-in">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-background/50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50 rounded-full px-4"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                size="icon"
                aria-label="Send chat message"
                className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 shrink-0"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Powered by AI • Jersey Auto Lease
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
