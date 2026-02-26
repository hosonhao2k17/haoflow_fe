"use client"

import { useState, useRef, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const AiSheetChatBox = ({ open, setOpen }: Props) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI reply
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Tôi đã nhận được tin nhắn của bạn. Đây là phản hồi demo!",
          timestamp: new Date(),
        },
      ])
    }, 1200)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-[420px] p-0 bg-primary flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-zinc-800/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <SheetTitle className="text-sm font-semibold text-zinc-100">Sơn Hào AI</SheetTitle>
              <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Online
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center pb-10">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <p className="text-sm text-primary-foreground">Bắt đầu cuộc trò chuyện với AI</p>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.role === "user"
            return (
              <div key={msg.id} className={cn("flex gap-2.5", isUser && "flex-row-reverse")}>
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    isUser ? "bg-violet-600" : "bg-zinc-700"
                  )}
                >
                  {isUser
                    ? <User className="w-3.5 h-3.5 text-white" />
                    : <Bot className="w-3.5 h-3.5 text-zinc-300" />
                  }
                </div>
                <div className={cn("flex flex-col gap-1", isUser && "items-end")}>
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed max-w-[280px]",
                      isUser
                        ? "bg-violet-600 text-white rounded-tr-sm"
                        : "bg-zinc-800 text-zinc-200 rounded-tl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-zinc-600 px-1">
                    {msg.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-zinc-300" />
              </div>
              <div className="bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-zinc-800/60 shrink-0">
          <div className="flex items-center gap-2 bg-primary-foreground rounded-xl px-3 py-2 focus-within:border-violet-500/50 transition-colors">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhắn tin..."
              className="border-0 bg-transparent text-sm p-0 focus-visible:ring-0 h-auto"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-7 h-7 rounded-lg bg-primary  shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default AiSheetChatBox
