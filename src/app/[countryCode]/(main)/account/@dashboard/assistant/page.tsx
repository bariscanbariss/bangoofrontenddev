"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, Sparkles, HelpCircle, Package, Truck, CreditCard, RotateCcw } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const FAQ_ITEMS = [
  {
    icon: Package,
    question: "Siparisimi nasil takip edebilirim?",
    answer: "Siparislerinizi 'Siparislerim' sayfasindan takip edebilirsiniz. Kargo takip numaraniz siparis onaylandiginda size e-posta ile gonderilir.",
  },
  {
    icon: RotateCcw,
    question: "Iade islemini nasil yapabilirim?",
    answer: "Urun teslim tarihinden itibaren 14 gun icinde iade basvurusu yapabilirsiniz. 'Siparislerim' sayfasindan ilgili siparisi secin ve 'Iade Basvurusu' butonuna tiklayin.",
  },
  {
    icon: Truck,
    question: "Kargo suresi ne kadar?",
    answer: "KKTC ici teslimatlar genellikle 1-3 is gunu icerisinde yapilmaktadir. Turkiye'den gelen siparisler 5-7 is gunu surer.",
  },
  {
    icon: CreditCard,
    question: "Hangi odeme yontemlerini kullanabilirim?",
    answer: "Kredi karti, banka karti, havale/EFT ve kapida odeme seceneklerimiz mevcuttur.",
  },
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Merhaba! Ben Bangoo Asistan. Size nasil yardimci olabilirim? Asagidaki sik sorulan sorulara goz atabilir veya dogrudan soru sorabilirsiniz.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAutoResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const getAutoResponse = (question: string): string => {
    const q = question.toLowerCase()
    if (q.includes("siparis") || q.includes("takip")) {
      return FAQ_ITEMS[0].answer
    }
    if (q.includes("iade") || q.includes("geri")) {
      return FAQ_ITEMS[1].answer
    }
    if (q.includes("kargo") || q.includes("teslimat")) {
      return FAQ_ITEMS[2].answer
    }
    if (q.includes("odeme") || q.includes("kredi") || q.includes("kart")) {
      return FAQ_ITEMS[3].answer
    }
    return "Sorunuzu anladim. Daha detayli yardim icin musteri hizmetlerimizle iletisime gecebilirsiniz: destek@bangoo.com veya 0392 XXX XX XX numarali telefondan bize ulasabilirsiniz."
  }

  const handleFaqClick = (faq: typeof FAQ_ITEMS[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: faq.question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: faq.answer,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="w-full" data-testid="assistant-page">
      <div className="mb-6 flex flex-col gap-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl-semi">Bangoo Asistan</h1>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Cevrimici
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Chips */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {FAQ_ITEMS.map((faq, idx) => {
            const Icon = faq.icon
            return (
              <button
                key={idx}
                onClick={() => handleFaqClick(faq)}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-xl hover:shadow-md hover:border-violet-200 transition-all text-left group"
              >
                <div className="p-2 bg-violet-100 rounded-lg group-hover:bg-violet-200 transition-colors">
                  <Icon className="w-5 h-5 text-violet-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {faq.question}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Messages */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 mb-4 h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-violet-500 to-purple-600"
                    : "bg-gradient-to-br from-gray-600 to-gray-700"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  msg.role === "assistant"
                    ? "bg-white border border-gray-100 text-gray-700"
                    : "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.role === "assistant" ? "text-gray-400" : "text-white/70"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Sorunuzu yazin..."
          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}
