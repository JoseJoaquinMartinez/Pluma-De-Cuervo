interface HomeSectionComponent {
  title: string;
  content: React.ReactNode;
}

export const SectionComponent: React.FC<HomeSectionComponent> = ({
  title,
  content,
}) => {
  return (
    <div className="flex flex-col justify-start max-w-screen-xl gap-6">
      <h2 className="text-encabezados text-xl text-start text-bold">{title}</h2>
      <div className="bg-cardsBackground flex flex-col mlg:flex-row rounded-lg">
        {content}
      </div>
    </div>
  );
};
