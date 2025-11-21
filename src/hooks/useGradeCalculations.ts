import { useGradeStore } from "@/store/useGradeStore";

export function useGradeCalculations() {
    const { bimesters, config, examGrade } = useGradeStore();

    const bimesterStats = bimesters.map((b) => {
        const totalWeight = b.activities.reduce((acc, curr) => acc + curr.weight, 0);
        const currentScore = b.activities.reduce((acc, curr) => acc + (curr.grade * curr.weight), 0);
        const maxPossibleScore = currentScore + ((1 - totalWeight) * 10);

        return {
            id: b.id,
            name: b.name,
            totalWeight,
            currentScore,
            maxPossibleScore
        };
    });

    const finalAverage = (bimesterStats[0].currentScore + bimesterStats[1].currentScore) / 2;

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
    const remainingWeightTotal = (1 - bimesterStats[0].totalWeight) + (1 - bimesterStats[1].totalWeight);

    let neededMessage = "";

    // We need to check the *original* status before exam logic to give correct advice
    const isExamPhase = finalAverage < config.approvalThreshold;

    if (isExamPhase) {
        // In exam phase
        const neededExam = (config.examThreshold * 2) - finalAverage;
        if (neededExam > 10) {
            neededMessage = "Impossível aprovar no exame.";
        } else if (neededExam <= 0) {
            neededMessage = "Aprovado independente da nota do exame (mas faça a prova!).";
        } else {
            neededMessage = `Precisa tirar ${neededExam.toFixed(2)} no exame.`;
        }
    } else {
        // Not in exam phase yet (or already passed)
        // Check if it's possible to pass without exam
        if (missingTotal <= 0) {
            neededMessage = "Aprovado!";
        } else if (remainingWeightTotal <= 0.001) {
            neededMessage = "Vai para o exame.";
        } else {
            const neededAvg = missingTotal / remainingWeightTotal;
            if (neededAvg > 10) {
                neededMessage = `Impossível aprovar sem exame. Faltam ${missingTotal.toFixed(2)} pontos.`;
            } else {
                neededMessage = `Precisa média ${neededAvg.toFixed(2)} no restante (${(remainingWeightTotal * 100).toFixed(0)}% de peso).`;
            }
        }
    }

    return {
        bimesterStats,
        finalAverage,
        status,
        examResult,
        neededMessage
    };
};
