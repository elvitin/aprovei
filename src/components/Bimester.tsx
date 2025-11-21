import { type Bimester as BimesterType, useGradeStore } from "@/store/useGradeStore";
import { ActivityItem } from "./ActivityItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useGradeCalculations } from "@/hooks/useGradeCalculations";
import { cn } from "@/lib/utils";

interface BimesterProps {
    bimester: BimesterType;
}

export function Bimester({ bimester }: BimesterProps) {
    const { addActivity } = useGradeStore();
    const { bimesterStats } = useGradeCalculations();

    const stats = bimesterStats.find(s => s.id === bimester.id);
    const totalWeight = stats?.totalWeight || 0;
    const isWeightError = totalWeight > 1;

    return (
        <Card className="w-full animate-in fade-in slide-in-from-bottom duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">{bimester.name}</CardTitle>
                <div className={cn("text-sm font-medium", isWeightError ? "text-destructive" : "text-muted-foreground")}>
                    Total Peso: {(totalWeight * 100).toFixed(0)}%
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {bimester.activities.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} bimesterId={bimester.id} />
                    ))}
                </div>

                <Button
                    variant="outline"
                    className="w-full mt-4 border-dashed"
                    onClick={() => addActivity(bimester.id)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Atividade
                </Button>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Média do Bimestre:</span>
                    <span className="text-xl font-bold">{stats?.currentScore.toFixed(2)}</span>
                </div>
            </CardContent>
        </Card>
    );
};
