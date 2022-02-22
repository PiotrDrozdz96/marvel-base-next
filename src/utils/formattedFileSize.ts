const units = ['B', 'KB', 'MB', 'GB'];

const formattedFileSize = (sizeInBytes: number): string => {
  let unitIndex = 0;
  let overallSize: string | number = sizeInBytes;

  while (overallSize / 1024 >= 1) {
    overallSize /= 1024;
    unitIndex += 1;
  }

  overallSize = (Math.round(overallSize * 100) / 100).toFixed(2);

  return `${overallSize} ${units[unitIndex]}`;
};

export default formattedFileSize;
