import MainButton from "@/components/shared/mainButton";

export const BlogCard = () => {
  return (
    <>
      {blogData.map((blog) => (
        <article className="flex flex-col items-center rounded-lg">
          <h2>imagenN</h2>
          <h2>titulo</h2>
          <MainButton />
          <div>
            <p>DATE · ESTIMADO</p>
          </div>
        </article>
      ))}
    </>
  );
};
