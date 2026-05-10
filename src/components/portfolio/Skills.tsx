import { useReveal } from "@/hooks/use-reveal";

const groups: { title: string; color: string; items: string[] }[] = [
  {
    title: "Backend",
    color: "text-primary",
    items: ["​ship 8", "C#", "Web API", "Entity Framework", "ADO.NET", "MVC"],
  },
  {
    title: "Frontend",
    color: "text-accent",
    items: ["Angular 12", "JavaScript", "jQuery", "HTML", "CSS", "Bootstrap"],
  },
  {
    title: "Databases",
    color: "text-purple-400",
    items: ["SQL Server", "Oracle", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Tools & DevOps",
    color: "text-primary",
    items: ["Azure DevOps", "GitHub", "TFS", "DevExpress", "Putty"],
  },
];

export const Skills = () => {
  const heading = useReveal<HTMLHeadingElement>();

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-morph" />

      <div className="container relative">
        <p className="font-mono-tag mb-4 text-accent reveal-blur" style={{ transitionDelay: "0.1s" }}>
          // Skills
        </p>
        <h2
          ref={heading.ref}
          className={`font-display text-4xl md:text-6xl mb-16 max-w-3xl reveal ${heading.visible ? "is-visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          The <span className="text-gradient italic animate-gradient">stack</span> I ship with.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((g, i) => (
            <SkillCard key={g.title} group={g} index={i} />
          ))}
        </div>

        {/* Education */}
        <EducationCard />
      </div>
    </section>
  );
};

const EducationCard = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`mt-16 glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover-lift hover-glow-border group reveal-scale ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: "0.5s" }}
    >
      <div>
        <p className="font-mono-tag mb-2 text-accent">// Education</p>
        <h3 className="font-display text-2xl md:text-3xl group-hover:text-gradient transition-all duration-300">
          Master of Computer Applications (through BCA)
        </h3>
        <p className="text-muted-foreground mt-1">Bishop Heber College, Trichy, Tamil Nadu</p>
      </div>
      <span className="font-mono-tag text-accent animate-bounce-subtle">April 2018</span>
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer pointer-events-none" />
    </div>
  );
};

const SkillCard = ({ group: g, index }: { group: typeof groups[number]; index: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`glass-card rounded-3xl p-6 hover:border-primary/40 hover-lift hover-glow-border group relative overflow-hidden reveal-scale ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 100 + 300}ms` }}
    >
      <p className={`font-mono-tag mb-5 ${g.color}`}>{g.title}</p>
      <ul className="space-y-2.5">
        {g.items.map((it) => (
          <li key={it} className="text-foreground/90 flex items-center gap-2 transition-transform hover:translate-x-1 duration-200">
            <span className="w-1 h-1 rounded-full bg-foreground/40" />
            {it}
          </li>
        ))}
      </ul>
      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer pointer-events-none" />
    </div>
  );
};
