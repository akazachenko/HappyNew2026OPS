export const getTotalWishes = async (): Promise<number | null> => {
  try {
    const response = await fetch('https://newyearmagic.site/api/click');
    if (response.ok) {
      const data = await response.json();
      return data.count;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return null;
  }
};

export const incrementWishCount = async (): Promise<void> => {
  try {
    await fetch('https://newyearmagic.site/api/click', {
      method: 'POST',
    });
  } catch (error) {
    console.error('Failed to increment stats:', error);
  }
};