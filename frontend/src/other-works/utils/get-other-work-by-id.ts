export const getOtherWorkById = async (id: number) => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/other-works/get-other-work/${id}`;
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const otherWork = await response.json();
    if (!otherWork) {
      throw new Error("Other work not found");
    }

    return otherWork;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};
