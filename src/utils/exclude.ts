const exclude = <T extends string>(array: T[], remove: T[]): T[] => array.filter((el) => !remove.includes(el));

export default exclude;
