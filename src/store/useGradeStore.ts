import { create } from 'zustand';

export interface Activity {
    id: string;
    name: string;
    grade: number;
    weight: number; // 0 to 1
}

export interface Bimester {
    id: 1 | 2;
    name: string;
    activities: Activity[];
}

export interface Config {
    approvalThreshold: number;
    examThreshold: number;
}

interface GradeStore {
    bimesters: Bimester[];
    config: Config;
    examGrade: number;

    addActivity: (bimesterId: 1 | 2) => void;
    removeActivity: (bimesterId: 1 | 2, activityId: string) => void;
    updateActivity: (bimesterId: 1 | 2, activityId: string, field: keyof Activity, value: any) => void;
    updateConfig: (field: keyof Config, value: number) => void;
    setExamGrade: (grade: number) => void;
}

const INITIAL_BIMESTERS: Bimester[] = [
    {
        id: 1,
        name: "1º Bimestre",
        activities: [
            { id: 'default-1', name: 'Prova', grade: 0, weight: 0.8 }
        ]
    },
    {
        id: 2,
        name: "2º Bimestre",
        activities: [
            { id: 'default-2', name: 'Prova', grade: 0, weight: 0.8 }
        ]
    }
];

export const useGradeStore = create<GradeStore>((set) => ({
    bimesters: INITIAL_BIMESTERS,
    config: {
        approvalThreshold: 6,
        examThreshold: 5
    },
    examGrade: 0,

    addActivity: (bimesterId) => set((state) => ({
        bimesters: state.bimesters.map((b) =>
            b.id === bimesterId
                ? { ...b, activities: [...b.activities, { id: crypto.randomUUID(), name: 'Nova Atividade', grade: 0, weight: 0.1 }] }
                : b
        )
    })),

    removeActivity: (bimesterId, activityId) => set((state) => ({
        bimesters: state.bimesters.map((b) =>
            b.id === bimesterId
                ? { ...b, activities: b.activities.filter((a) => a.id !== activityId) }
                : b
        )
    })),

    updateActivity: (bimesterId, activityId, field, value) => set((state) => ({
        bimesters: state.bimesters.map((b) =>
            b.id === bimesterId
                ? {
                    ...b,
                    activities: b.activities.map((a) =>
                        a.id === activityId ? { ...a, [field]: value } : a
                    )
                }
                : b
        )
    })),

    updateConfig: (field, value) => set((state) => ({
        config: { ...state.config, [field]: value }
    })),

    setExamGrade: (grade) => set({ examGrade: grade })
}));
