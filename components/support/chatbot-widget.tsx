"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Message = {
  role: "bot" | "user";
  text: string;
};

const quickPrompts = [
  "I cannot login",
  "Product page shows 404",
  "How do I download after purchase?",
  "How can I contact support?",
];

function getBotReply(input: string) {
  const text = input.toLowerCase();

  if (text.includes("login") || text.includes("password") || text.includes("sign in")) {
    return "Try password login first. If your account was created via magic link, use 'Use Magic Link Instead' on login. If still blocked, reset your password from auth settings in Supabase.";
  }

  if (text.includes("404") || text.includes("product") || text.includes("not found")) {
    return "If a product shows 404, verify the slug exists in the products table and matches the URL exactly. Also ensure the product route is /product/[slug] and the product has a non-empty slug.";
  }

  if (text.includes("download") || text.includes("file") || text.includes("purchase")) {
    return "After payment, a secure download link is generated. Check your success page and email inbox. Download links are time-limited for security.";
  }

  if (text.includes("admin") || text.includes("create product") || text.includes("new product")) {
    return "To add products, go to /admin/products/new. Your account must have is_admin = true in the users table.";
  }

  if (text.includes("support") || text.includes("help") || text.includes("contact")) {
    return "For support, include your email, product name, and issue steps. This helps resolve problems faster. You can also use the admin order list to verify payment details.";
  }

  return "I can help with login issues, product 404, checkout, downloads, or admin setup. Please describe what happened and what you expected.";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi, I am your DigitalMarket assistant. Ask me anything about login, products, checkout, or downloads.",
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  function sendMessage(text: string) {
    const userText = text.trim();
    if (!userText) return;

    const botReply = getBotReply(userText);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "bot", text: botReply },
    ]);

    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]" id="support-chat">
      {open ? (
        <div className="w-[22rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">DigitalMarket Support</p>
              <p className="text-xs text-cyan-100">Online assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md bg-white/15 px-2 py-1 text-xs hover:bg-white/25"
            >
              Close
            </button>
          </div>

          <div className="h-72 space-y-3 overflow-y-auto bg-slate-50 p-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                  message.role === "bot"
                    ? "bg-white text-slate-800 border border-slate-200"
                    : "ml-auto bg-blue-600 text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Describe your issue"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />
              <Button type="submit" size="sm" disabled={!canSend}>
                Send
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-cyan-700 hover:to-blue-800"
        >
          Chat Support
        </button>
      )}
    </div>
  );
}
