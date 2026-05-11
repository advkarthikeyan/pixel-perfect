import { useReveal } from "@/hooks/use-reveal";

const experiences = [
  {
    role: "Software Developer",
    company: "Cognizant Technology Solutions",
    location: "Coimbatore",
    period: "2023 — Present",
    projects: [
      {
        name: "Pearson VUE",
        stack: ["​Angular 19", ".NET 8", "Microservices", "JIRA"],
        bullets: [
          "Architected and maintained exam development applications utilizing Microservices architecture.",
          "Managed end-to-end development lifecycle for user stories from design to Git integration.",
        ],
      },
      {
        name: "Microsoft",
        stack: [".NET 8", "Web API", "SQL", "Postman", "Swagger"],
        bullets: [
          "Engineered robust API controllers for CRUD operations and validated via Swagger/Postman.",
          "Developed unit test cases to ensure high code coverage and long-term maintainability.",
        ],
      },
      {
        name: "Pacific Gas and Electric (PGE)",
        stack: [".NET 8", "Web API", "jQuery", "JavaScript", "SQL Server", "MVC"],
        bullets: [
          "Owned complete SDLC for utility applications focused on electric and gas infrastructure.",
          "Provided production support and drove applications from concept to deployment.",
        ],
      },
    ],
  },
  {
    role: "Senior Software Developer",
    company: "Aspire Systems India Pvt. Ltd.",
    location: "Chennai",
    period: "2021 — 2023",
    projects: [
      {
        name: "TMRW Platform — GEMS Education",
        stack: [".NET Core 3.1", "​Angular 12", "HTML", "PostgreSQL", "Putty", "MongoDB"],
        bullets: [
          "Integrated modules connecting teachers, students, and parents on a unified platform.",
          "Migrated manual academic workflows into the modern automated TMRW ecosystem.",
        ],
      },
    ],
  },
  {
    role: "Software Developer",
    company: "Sierra ODC Pvt. Ltd.",
    location: "Coimbatore",
    period: "2019 — 2021",
    projects: [
      {
        name: "VWR — CBILL System",
        stack: ["C#", "ASP.NET MVC", "Oracle", "Web API", "DevExpress"],
        bullets: [
          "Developed finance-oriented applications generating customized invoice reports via DevExpress.",
          "Addressed Web API bug fixes and managed project release cycles end-to-end.",
        ],
      },
      {
        name: "eFACILITY",
        stack: ["C#", "ASP.NET MVC", "Oracle", "JavaScript", "Bootstrap"],
        bullets: [
          "Resolved bugs in Time and Attendance, Project Management, and Help Desk modules.",
          "Engaged in product enhancement activities for facility management workforce operations.",
        ],
      },
    ],
  },
];

export const Experience = () => {
  const heading = useReveal<HTMLHeadingElement>();

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container relative">
        <header className="mb-24">
          <p className="font-mono-tag text-accent mb-4 tracking-widest text-pink">// PROFESSIONAL_JOURNEY</p>
          <h2
            ref={heading.ref}
            className={`font-display text-5xl md:text-7xl lg:text-8xl reveal ${heading.visible ? "is-visible" : ""}`}
          >
            Evolution of <br />
            <span className="text-gradient italic font-light animate-gradient">Experience.</span>
          </h2>
        </header>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className={`grid lg:grid-cols-[300px_1fr] gap-12 items-start py-24 ${
                i !== 0 ? "border-t border-border/40" : ""
              }`}
            >
              {/* Company Sidebar */}
              <div className="lg:sticky lg:top-32 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-accent/50" />
                  <span className="font-mono-tag text-rose-500">{exp.period}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display uppercase tracking-tighter leading-tight">
                  {exp.company}
                </h3>
                <p className="text-muted-foreground font-mono-tag text-xs uppercase tracking-widest">
                  {exp.role} <br /> 
                  <span className="opacity-60">{exp.location}</span>
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {exp.projects.map((proj, pi) => (
                  <ProjectCard key={pi} proj={proj} index={pi} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ proj, index }: { proj: any; index: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`glass-card group p-8 rounded-[2.5rem] border border-white/5 hover:border-accent/30 transition-all duration-500 reveal-scale ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10 group-hover:rotate-12 transition-all duration-500">
            <span className="font-mono text-accent text-sm">0{index + 1}</span>
          </div>
          <div className="flex gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          </div>
        </div>

        <h4 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors leading-snug">
          {proj.name}
        </h4>
        
        <ul className="space-y-4 mb-8 flex-grow">
          {proj.bullets.map((bullet: string, bi: number) => (
            <li key={bi} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
              <span className="text-accent/60 font-mono mt-0.5">/</span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-auto">
          {proj.stack.map((tech: string) => (
            <span 
              key={tech} 
              className="text-[10px] uppercase tracking-widest font-mono-tag px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg group-hover:border-accent/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] pointer-events-none" />
    </div>
  );
};