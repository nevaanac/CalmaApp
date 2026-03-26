type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <div className="section-title">
    {eyebrow ? <span className="section-title__eyebrow">{eyebrow}</span> : null}
    <h2>{title}</h2>
    {description ? <p>{description}</p> : null}
  </div>
);
