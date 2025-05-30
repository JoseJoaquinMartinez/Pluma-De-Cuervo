interface HomeSectionComponent {
  title: string;
  content: React.ReactNode;
}

export const SectionComponent: React.FC<HomeSectionComponent> = ({
  title,
  content,
}) => {
  return (
    <div className="flex flex-col w-full max-w-screen-xl gap-6 mt-10">
      <h2 className="text-encabezados text-2xl  text-center md:text-start font-semibold">
        {title}
      </h2>
      <div className="flex flex-col mlg:flex-row gap-6">{content}</div>
    </div>
  );
};
