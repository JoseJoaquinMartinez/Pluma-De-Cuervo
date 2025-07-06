export const getOtherWorks = async () => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/other-works/get-other-works`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const otherWorks = await response.json();

    if (otherWorks.length === 0) {
      return [];
    }
    return otherWorks;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};
