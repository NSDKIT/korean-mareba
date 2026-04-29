"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isListening?: boolean;
  onStartListening?: () => void;
  onStopListening?: () => void;
}

export function ChatInput({
  onSend,
  disabled,
  isListening,
  onStartListening,
  onStopListening,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleMicClick = () => {
    if (isListening && onStopListening) {
      onStopListening();
    } else if (onStartListening) {
      onStartListening();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="メッセージを入力..."
        disabled={disabled || isListening}
        className="flex-1"
      />

      {onStartListening && (
        <Button
          type="button"
          size="icon"
          variant={isListening ? "destructive" : "outline"}
          onClick={handleMicClick}
          disabled={disabled}
          className={cn(
            isListening && "animate-pulse"
          )}
        >
          <Mic className="h-4 w-4" />
        </Button>
      )}

      <Button
        type="submit"
        size="icon"
        disabled={disabled || !input.trim() || isListening}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
