interface OtherWork {
  id: number;
  title: string;
  workText: string;
  buttonLink: string;
  buttonText: string;
  imagen?: File | null; // si no cambias la imagen, puede ir como null o no incluirse
}

const onPutOtherWork = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/put-other-work/${otherWork.id}`,
      {
        method: "PUT",

        body: otherWork,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating other work: ${error}`);
    return undefined;
  }
};
