import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  onPlayAudio?: () => void;
  isPlaying?: boolean;
}

export function ChatBubble({ role, content, onPlayAudio, isPlaying }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-2 mb-3 fade-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-[20px] px-4 py-3 shadow-[var(--sh-sm)]",
          isUser
            ? "bg-gradient-to-br from-[var(--plum)] to-[var(--plum-deep)] text-white"
            : "bg-white text-[var(--ink-1)]"
        )}
      >
        <div className="flex items-start gap-2">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{content}</p>
          {!isUser && onPlayAudio && (
            <button
              onClick={onPlayAudio}
              disabled={isPlaying}
              className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-[var(--bg-soft)] flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <Volume2 className={cn(
                "h-4 w-4 text-[var(--plum-deep)]",
                isPlaying && "pulse-ring"
              )} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
