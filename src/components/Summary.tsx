import { useGradeCalculations } from '@/hooks/useGradeCalculations';
import { useGradeStore } from '@/store/useGradeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Summary() {
  const { finalAverage, status, neededMessage } = useGradeCalculations();
  const { config, updateConfig } = useGradeStore();

  const getStatusColor = (s: string) => {
    if (s === 'Approved') return 'bg-green-500 hover:bg-green-600';
    if (s === 'Reprovado') return 'bg-red-500 hover:bg-red-600';
    return 'bg-yellow-500 hover:bg-yellow-600';
  };

  const getStatusText = (s: string) => {
    if (s === 'Approved') return 'Aprovado';
    if (s === 'Reprovado') return 'Reprovado';
    return 'Exame';
  };

  return (
    <Card className='w-full animate-in fade-in slide-in-from-bottom duration-700 delay-100'>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <span className='text-sm text-muted-foreground'>Média Final</span>
          <span className='text-4xl font-bold'>{finalAverage.toFixed(2)}</span>
          <Badge className={cn('text-lg px-4 py-1', getStatusColor(status))}>{getStatusText(status)}</Badge>
        </div>

        <div className='bg-muted/50 p-4 rounded-lg text-center'>
          <p className='text-sm font-medium'>{neededMessage}</p>
        </div>

        <div className='grid grid-cols-2 gap-4 pt-4 border-t'>
          <div>
            <Label className='text-xs text-muted-foreground'>Média para Aprovação</Label>
            <Input
              type='number'
              value={config.approvalThreshold}
              onChange={e => updateConfig('approvalThreshold', parseFloat(e.target.value) || 0)}
              step={0.1}
            />
          </div>
          <div>
            <Label className='text-xs text-muted-foreground'>Média para Exame</Label>
            <Input
              type='number'
              value={config.examThreshold}
              onChange={e => updateConfig('examThreshold', parseFloat(e.target.value) || 0)}
              step={0.1}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
