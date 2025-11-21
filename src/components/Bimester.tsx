import { type Bimester as BimesterType, useGradeStore } from '@/store/useGradeStore';
import { ActivityItem } from './ActivityItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useGradeCalculations } from '@/hooks/useGradeCalculations';
import { cn } from '@/lib/utils';

interface BimesterProps {
  bimester: BimesterType;
}

export function Bimester({ bimester }: BimesterProps) {
  const { addActivity, toggleBimesterConclusion } = useGradeStore();
  const { bimesterStats, isPossibleToPassWithoutExam, missingTotal } = useGradeCalculations();

  const stats = bimesterStats.find(s => s.id === bimester.id);
  const totalWeight = stats?.totalWeight || 0;
  const isWeightError = totalWeight > 1;
  const isConcluded = bimester.isConcluded;

  // Calculate remaining weight and potential score for this bimester
  const remainingWeight = Math.max(0, 1 - totalWeight);
  const potentialScore = remainingWeight * 10;

  return (
    <Card
      className={cn(
        'w-full animate-in fade-in slide-in-from-bottom duration-500',
        isConcluded && 'opacity-90 bg-muted/30'
      )}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div className='flex items-center gap-4'>
          <CardTitle className='text-lg font-bold'>{bimester.name}</CardTitle>
          <div className='flex items-center space-x-2'>
            <Switch
              id={`concluded-${bimester.id}`}
              checked={isConcluded}
              onCheckedChange={() => toggleBimesterConclusion(bimester.id)}
            />
            <Label htmlFor={`concluded-${bimester.id}`} className='text-xs text-muted-foreground'>
              {isConcluded ? 'Concluído' : 'Em andamento'}
            </Label>
          </div>
        </div>
        <div className={cn('text-sm font-medium', isWeightError ? 'text-destructive' : 'text-muted-foreground')}>
          Total Peso: {(totalWeight * 100).toFixed(0)}%
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn('space-y-2', isConcluded && 'pointer-events-none opacity-80')}>
          {bimester.activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} bimesterId={bimester.id} />
          ))}
        </div>

        <Button
          variant='outline'
          className='w-full mt-4 border-dashed'
          onClick={() => addActivity(bimester.id)}
          disabled={isConcluded}>
          <Plus className='mr-2 h-4 w-4' /> Adicionar Atividade
        </Button>

        <div className='mt-4 pt-4 border-t space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-muted-foreground'>Média do Bimestre:</span>
            <span className='text-xl font-bold'>{stats?.currentScore.toFixed(2)}</span>
          </div>

          {!isConcluded && (
            <div className='text-xs text-muted-foreground space-y-1 bg-muted/50 p-2 rounded'>
              <div className='flex justify-between'>
                <span>Peso Restante:</span>
                <span>{(remainingWeight * 100).toFixed(0)}%</span>
              </div>
              <div className='flex justify-between'>
                <span>Nota Potencial Restante:</span>
                <span>{potentialScore.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className='text-xs font-medium pt-2 border-t'>
            <div className='flex justify-between items-center mb-1'>
              <span>Possível passar sem exame?</span>
              <span className={isPossibleToPassWithoutExam ? 'text-green-600' : 'text-red-600'}>
                {isPossibleToPassWithoutExam ? 'Sim' : 'Não'}
              </span>
            </div>
            {missingTotal > 0 && (
              <div className='flex justify-between items-center'>
                <span>Faltam para aprovação:</span>
                <span>{missingTotal.toFixed(2)} pts</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
