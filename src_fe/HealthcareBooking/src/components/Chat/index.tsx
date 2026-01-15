import { useState, useRef, useEffect } from "react";
import { MessageCircleIcon, XIcon } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    // Hiển thị message user ngay
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // Tạo session ID duy nhất cho mỗi phiên chat
      // 1. Lấy hoặc Tạo Session ID
      let sessionId = localStorage.getItem("chat_session_id");
      if (!sessionId) {
          sessionId = uuidv4(); // Tạo chuỗi ngẫu nhiên kiểu: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
          localStorage.setItem("chat_session_id", sessionId);
      }
      const res = await fetch("http://127.0.0.1:8000/rag/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          session_id: sessionId, // Gửi kèm session ID để lưu lịch sử chat trong phiên đó
        }),
      });

      if (!res.ok) {
        throw new Error("API Error");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Có lỗi xảy ra khi gọi hệ thống RAG.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        <MessageCircleIcon className="w-6 h-6" />
      </button>

      {/* Chat box */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[360px] h-[500px] bg-white rounded-xl shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 border-b font-semibold">
            RAG Chatbot
            <button onClick={() => setOpen(false)}>
              <XIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm ${
                  m.role === "user" ? "text-right" : "text-left" // Tin nhắn từ user thì canh phải, từ assistant thì canh trái
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    m.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-400">Đang truy vấn dữ liệu...</div>
            )}

            <div ref={messageEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
              value={input}
              placeholder="Nhập câu hỏi..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};
