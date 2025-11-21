import { type Activity, useGradeStore } from "@/store/useGradeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ActivityItemProps {
    activity: Activity;
    bimesterId: 1 | 2;
}

export const ActivityItem = ({ activity, bimesterId }: ActivityItemProps) => {
    const { updateActivity, removeActivity } = useGradeStore();

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            updateActivity(bimesterId, activity.id, 'weight', val / 100);
        }
    };

    return (
        <div className="flex items-end gap-2 mb-4">
            <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Atividade</Label>
                <Input
                    value={activity.name}
                    onChange={(e) => updateActivity(bimesterId, activity.id, 'name', e.target.value)}
                    placeholder="Nome da atividade"
                />
            </div>
            <div className="w-20">
                <Label className="text-xs text-muted-foreground">Nota</Label>
                <Input
                    type="number"
                    value={activity.grade}
                    onChange={(e) => updateActivity(bimesterId, activity.id, 'grade', parseFloat(e.target.value) || 0)}
                    min={0}
                    max={10}
                    step={0.1}
                />
            </div>
            <div className="w-20">
                <Label className="text-xs text-muted-foreground">Peso %</Label>
                <Input
                    type="number"
                    value={Math.round(activity.weight * 100)}
                    onChange={handleWeightChange}
                    min={0}
                    max={100}
                />
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => removeActivity(bimesterId, activity.id)}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};
