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
  isConcluded: boolean;
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
  toggleBimesterConclusion: (bimesterId: 1 | 2) => void;
}

export const useGradeStore = create<GradeStore>(set => ({
  bimesters: [
    {
      id: 1,
      name: '1º Bimestre',
      activities: [{ id: crypto.randomUUID(), name: 'Prova', grade: 0, weight: 0.8 }],
      isConcluded: false
    },
    {
      id: 2,
      name: '2º Bimestre',
      activities: [{ id: crypto.randomUUID(), name: 'Prova', grade: 0, weight: 0.8 }],
      isConcluded: false
    }
  ],
  config: {
    approvalThreshold: 6.0,
    examThreshold: 5.0
  },
  examGrade: 0,

  addActivity: bimesterId =>
    set(state => {
      const bimester = state.bimesters.find(b => b.id === bimesterId);
      if (bimester?.isConcluded) return state;

      return {
        bimesters: state.bimesters.map(b =>
          b.id === bimesterId
            ? {
                ...b,
                activities: [...b.activities, { id: crypto.randomUUID(), name: 'Nova Atividade', grade: 0, weight: 0 }]
              }
            : b
        )
      };
    }),

  removeActivity: (bimesterId, activityId) =>
    set(state => {
      const bimester = state.bimesters.find(b => b.id === bimesterId);
      if (bimester?.isConcluded) return state;

      return {
        bimesters: state.bimesters.map(b =>
          b.id === bimesterId ? { ...b, activities: b.activities.filter(a => a.id !== activityId) } : b
        )
      };
    }),

  updateActivity: (bimesterId, activityId, field, value) =>
    set(state => {
      const bimester = state.bimesters.find(b => b.id === bimesterId);
      if (bimester?.isConcluded) return state;

      return {
        bimesters: state.bimesters.map(b =>
          b.id === bimesterId
            ? {
                ...b,
                activities: b.activities.map(a => (a.id === activityId ? { ...a, [field]: value } : a))
              }
            : b
        )
      };
    }),

  updateConfig: (field, value) =>
    set(state => ({
      config: { ...state.config, [field]: value }
    })),

  setExamGrade: grade => set({ examGrade: grade }),

  toggleBimesterConclusion: bimesterId =>
    set(state => ({
      bimesters: state.bimesters.map(b => (b.id === bimesterId ? { ...b, isConcluded: !b.isConcluded } : b))
    }))
}));
