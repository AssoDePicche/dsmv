// unique([1,2,2]) → [1,2]
export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

// groupBy([{tipo:'A'},{tipo:'B'}],'tipo') → {A:[…], B:[…]}
export const groupBy = <T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> => {
  return arr.reduce((acc, obj) => {
    const group = String(obj[key]);

    acc[group] = acc[group] || [];

    acc[group].push(obj);

    return acc;
  }, {} as Record<string, T[]>);
};

// sumBy([{valor:10},{valor:5}], 'valor') → 15
export const sumBy = <T>(arr: T[], key: keyof T): number => {
  return arr.reduce((total, obj) => {
    const value = obj[key];

    return total + (typeof value === 'number' ? value : 0);
  }, 0);
};
