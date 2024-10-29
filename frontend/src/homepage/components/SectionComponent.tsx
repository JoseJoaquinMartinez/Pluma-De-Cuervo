interface HomeSectionComponent {
  title: string;
  content: React.ReactNode;
}

export const SectionComponent: React.FC<HomeSectionComponent> = ({
  title,
  content,
}) => {
  return (
    <section>
      <h2>{title}</h2>
      <div>{content}</div>
    </section>
  );
};
