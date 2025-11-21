import { useGradeCalculations } from '@/hooks/useGradeCalculations';
import { useGradeStore } from '@/store/useGradeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Exam() {
  const { status, examResult } = useGradeCalculations();
  const { examGrade, setExamGrade } = useGradeStore();

  // Logic for visibility: Show if in Exam mode (not approved by normal means)
  const { finalAverage } = useGradeCalculations();
  const { config } = useGradeStore();

  const isExamMode = finalAverage < config.approvalThreshold;

  if (!isExamMode) return null;

  const getResultColor = (s: string) => {
    if (s === 'Approved') return 'bg-green-500';
    if (s === 'Reprovado') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  return (
    <Card className='w-full border-orange-200 bg-orange-50/50 dark:bg-orange-950/10 animate-in zoom-in duration-300'>
      <CardHeader>
        <CardTitle className='text-orange-700 dark:text-orange-400'>Exame Final</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <Label>Nota da Prova de Exame</Label>
          <Input
            type='number'
            value={examGrade}
            onChange={e => setExamGrade(parseFloat(e.target.value) || 0)}
            min={0}
            max={10}
            step={0.1}
            className='text-lg font-bold'
          />
        </div>

        {examResult !== null && (
          <div className='flex flex-col items-center justify-center p-4 bg-background rounded-lg border'>
            <span className='text-sm text-muted-foreground'>Média Pós-Exame</span>
            <span className='text-3xl font-bold'>{examResult.toFixed(2)}</span>
            <Badge className={cn('mt-2', getResultColor(status))}>
              {status === 'Approved' ? 'Aprovado no Exame' : 'Reprovado'}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
