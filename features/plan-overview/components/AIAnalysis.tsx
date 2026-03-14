"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles } from "lucide-react";

const INSIGHTS = [
  {
    icon: "🔥",
    title: "Thứ Sáu là ngày hiệu quả nhất",
    desc: "Trung bình 14 task hoàn thành mỗi thứ Sáu — cao hơn 40% so với các ngày còn lại.",
  },
  {
    icon: "⚠️",
    title: "Danh mục Gia đình cần chú ý",
    desc: "Tỉ lệ hoàn thành chỉ đạt 55% — thấp nhất trong tất cả danh mục.",
  },
  {
    icon: "📈",
    title: "Xu hướng tăng trưởng tốt",
    desc: "Tháng 9 & 12 đạt đỉnh hiệu suất. Bạn thường làm tốt hơn vào cuối quý.",
  },
  {
    icon: "💡",
    title: "Gợi ý cải thiện",
    desc: "Thứ 7 & Chủ Nhật có tỉ lệ skip cao — cân nhắc lên kế hoạch nhẹ hơn cho cuối tuần.",
  },
];

export default function AIAnalysis() {
  const [analysed, setAnalysed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyse = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalysed(true);
    }, 2200);
  };

  return (
    <Card className="shadow-none border-primary/20 rounded-2xl bg-primary/[0.02]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Bot size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Phân tích AI</p>
              <p className="text-[11px] text-muted-foreground">
                Dựa trên dữ liệu hoạt động của bạn
              </p>
            </div>
          </div>
          {!analysed && (
            <Button
              size="sm"
              onClick={handleAnalyse}
              disabled={loading}
              className="rounded-xl gap-2 h-8 text-xs"
            >
              {loading ? (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="animate-spin"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeOpacity="0.3"
                      strokeWidth="3"
                    />
                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Sparkles size={12} /> Phân tích ngay
                </>
              )}
            </Button>
          )}
        </div>

        {!analysed && !loading && (
          <div className="flex flex-col items-center justify-center py-10 border border-dashed border-primary/20 rounded-xl gap-3">
            <span className="text-4xl">🤖</span>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Nhấn <strong className="text-primary">Phân tích ngay</strong> để AI đưa ra nhận xét
              chi tiết về hiệu suất của bạn
            </p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col gap-3">
            {[100, 80, 90, 70].map((w, i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-muted animate-pulse"
                style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {analysed && (
          <div className="flex flex-col gap-3">
            {INSIGHTS.map((ins, i) => (
              <div
                key={i}
                className="flex gap-3 bg-background/60 border border-border/50 rounded-xl p-3.5 animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-xl shrink-0 mt-0.5">{ins.icon}</span>
                <div>
                  <p className="text-[13px] font-bold text-foreground mb-0.5">{ins.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{ins.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
