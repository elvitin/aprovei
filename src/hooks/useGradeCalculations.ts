import { useGradeStore } from '@/store/useGradeStore';

export function useGradeCalculations() {
  const { bimesters, config, examGrade } = useGradeStore();

  const bimesterStats = bimesters.map(b => {
    const totalWeight = b.activities.reduce((acc, curr) => acc + curr.weight, 0);
    const currentScore = b.activities.reduce((acc, curr) => acc + curr.grade * curr.weight, 0);
    // If concluded, max possible is current score. If not, it's current + remaining weight * 10
    const maxPossibleScore = b.isConcluded ? currentScore : currentScore + (1 - totalWeight) * 10;

    return {
      id: b.id,
      name: b.name,
      totalWeight,
      currentScore,
      maxPossibleScore,
      isConcluded: b.isConcluded
    };
  });

  const finalAverage = (bimesterStats[0].currentScore + bimesterStats[1].currentScore) / 2;

  // Calculate max possible final average
  const maxPossibleFinal = (bimesterStats[0].maxPossibleScore + bimesterStats[1].maxPossibleScore) / 2;
  const isPossibleToPassWithoutExam = maxPossibleFinal >= config.approvalThreshold;

  let status: 'Approved' | 'Exam' | 'Reprovado' = 'Approved';
  let examResult: number | null = null;

  if (finalAverage >= config.approvalThreshold) {
    status = 'Approved';
  } else {
    status = 'Exam';
  }

  // If in Exam status, calculate potential exam result
  if (status === 'Exam') {
    examResult = (finalAverage + examGrade) / 2;
    if (examResult >= config.examThreshold) {
      status = 'Approved'; // Approved by exam
    } else {
      status = 'Reprovado';
    }
  }

  // Calculate needed score logic
  const targetTotal = config.approvalThreshold * 2;
  const currentTotal = bimesterStats[0].currentScore + bimesterStats[1].currentScore;
  const missingTotal = targetTotal - currentTotal;

  let neededMessage = '';

  // We need to check the *original* status before exam logic to give correct advice
  const isExamPhase = finalAverage < config.approvalThreshold;

  if (isExamPhase) {
    // In exam phase
    const neededExam = config.examThreshold * 2 - finalAverage;

    if (neededExam > 10) {
      neededMessage = 'Impossível aprovar no exame.';
    } else if (neededExam <= 0) {
      neededMessage = 'Aprovado independente da nota do exame (mas faça a prova!).';
    } else {
      neededMessage = `Precisa tirar ${neededExam.toFixed(2)} no exame.`;
    }
  } else {
    // Not in exam phase yet (or already passed)
    if (missingTotal <= 0) {
      neededMessage = 'Aprovado!';
    } else if (!isPossibleToPassWithoutExam) {
      neededMessage = `Impossível aprovar sem exame. Faltam ${missingTotal.toFixed(2)} pontos.`;
    } else {
      neededMessage = `Precisa de ${missingTotal.toFixed(2)} pontos no total para passar.`;
    }
  }

  return {
    bimesterStats,
    finalAverage,
    status,
    examResult,
    neededMessage,
    isPossibleToPassWithoutExam,
    missingTotal
  };
}
