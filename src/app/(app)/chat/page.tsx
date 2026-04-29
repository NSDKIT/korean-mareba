"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatBubble } from "@/components/chat/chat-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { scenarios } from "@/lib/data/scenarios";
import { useUserStore } from "@/stores/user-store";
import { ArrowLeft, Loader2 } from "lucide-react";

function ChatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get("scenario");
  const { user, setDailyCount } = useUserStore();

  const [isListening, setIsListening] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    body: {
      scenarioId,
      level: user?.level || 1,
    },
    onFinish: () => {
      // カウントを更新
      setDailyCount((user?.dailyCount || 0) + 1);
    },
  });

  const scenario = scenarioId ? scenarios[scenarioId] : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Web Speech API の初期化
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "ko-KR";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        append({ role: "user", content: transcript });
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [append]);

  const handleStartListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handlePlayAudio = async (messageContent: string, messageId: string) => {
    try {
      setPlayingMessageId(messageId);

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageContent,
          scenarioType: scenario?.scenarioType || "teacher",
        }),
      });

      if (!response.ok) throw new Error("TTS failed");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setPlayingMessageId(null);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
      setPlayingMessageId(null);
    }
  };

  const handleEndConversation = () => {
    // 実際はConversationを保存してからフィードバックへ
    router.push(`/feedback?scenario=${scenarioId}`);
  };

  if (!scenario) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="p-6">
          <p className="text-center">場面が見つかりません</p>
          <Button onClick={() => router.push("/scenarios")} className="mt-4">
            場面選択に戻る
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/scenarios")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          終了
        </Button>
        <div className="text-center">
          <h2 className="font-semibold">{scenario.name}</h2>
          <p className="text-xs text-muted-foreground">{scenario.nameKo}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEndConversation}
          disabled={messages.length < 2}
        >
          会話終了
        </Button>
      </div>

      {/* メッセージエリア */}
      <Card className="flex-1 overflow-y-auto p-4 mb-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                会話を始めましょう!
              </p>
              <p className="text-sm text-muted-foreground">
                挨拶から始めてみてください
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatBubble
            key={`${message.id}-${index}`}
            role={message.role as "user" | "assistant"}
            content={message.content}
            onPlayAudio={
              message.role === "assistant"
                ? () => handlePlayAudio(message.content, message.id)
                : undefined
            }
            isPlaying={playingMessageId === message.id}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">AIが考えています...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </Card>

      {/* 入力エリア */}
      <ChatInput
        onSend={(message) => append({ role: "user", content: message })}
        disabled={isLoading}
        isListening={isListening}
        onStartListening={handleStartListening}
        onStopListening={handleStopListening}
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>}>
      <ChatPageContent />
    </Suspense>
  );
}
