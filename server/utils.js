// Export a random dummy name
export const getRandomDummyName = () => {
  const dummyNames = ['Percival', 'H', '☺', '梅林', '莫德雷德'];
  return dummyNames[Math.floor(Math.random() * dummyNames.length)];
};

export const getRandomAvatarId = () => {
  return Math.floor(Math.random() * 12) + 1;
};
