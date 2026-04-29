"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scenarios } from "@/lib/data/scenarios";
import { useUserStore } from "@/stores/user-store";
import { Coffee, Users, Briefcase, GraduationCap, Hotel } from "lucide-react";

const iconMap = {
  cafe: Coffee,
  friend: Users,
  business: Briefcase,
  teacher: GraduationCap,
  hotel: Hotel,
};

export default function ScenariosPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const userLevel = user?.level || 1;

  const scenarioList = Object.values(scenarios);

  const handleScenarioClick = (scenarioId: string) => {
    router.push(`/preview?id=${scenarioId}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">場面を選ぶ</h1>
        <p className="text-muted-foreground">
          練習したい場面を選んでください
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {scenarioList.map((scenario) => {
          const Icon = iconMap[scenario.scenarioType as keyof typeof iconMap];
          const isAccessible = userLevel >= scenario.minLevel;
          const isRecommended =
            userLevel >= scenario.minLevel && userLevel <= scenario.maxLevel;

          return (
            <Card
              key={scenario.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                !isAccessible ? "opacity-50 cursor-not-allowed" : ""
              } ${isRecommended ? "border-primary" : ""}`}
              onClick={() => isAccessible && handleScenarioClick(scenario.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{scenario.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {scenario.nameKo}
                      </p>
                    </div>
                  </div>
                  {isRecommended && (
                    <Badge variant="default">おすすめ</Badge>
                  )}
                  {!isAccessible && (
                    <Badge variant="outline">Lv.{scenario.minLevel}〜</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{scenario.description}</CardDescription>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>対象レベル:</span>
                  <Badge variant="secondary" className="text-xs">
                    Lv.{scenario.minLevel} - Lv.{scenario.maxLevel}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* レベル制限の説明 */}
      {scenarioList.some((s) => userLevel < s.minLevel) && (
        <Card className="border-muted bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">💡 ヒント</CardTitle>
            <CardDescription>
              一部の場面は特定のレベル以上でないと練習できません。
              プレースメントテストを受けるか、他の場面で練習を重ねてレベルアップしましょう。
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
