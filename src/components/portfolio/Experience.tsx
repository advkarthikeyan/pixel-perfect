import { useReveal } from "@/hooks/use-reveal";

const experiences = [
  {
    role: "Software Developer",
    company: "Cognizant Technology Solutions",
    location: "Coimbatore",
    period: "Jul 2023 — Present",
    projects: [
      {
        name: "Pearson VUE",
        stack: ["Angular 19", "SHIP 8", "Microservices", "JIRA", "Git"],
        bullets: [
          "Architected and maintained exam development applications utilizing a Microservices architecture to ensure scalable and modular system performance.",
          "Operated within an Agile framework, consistently delivering high-quality outputs through active participation in Sprint-based development cycles.",
          "Managed the end-to-end development lifecycle for assigned user stories and defects, taking full ownership from initial design through to final Git repository integration.",
          "Facilitated comprehensive workflow management by tracking project progress and status transitions across all developmental stages within JIRA.",
        ],
      },
      {
        name: "Microsoft",
        stack: ["SHIP 8", "Web API", "SQL", "Postman", "Swagger"],
        bullets: [
          "Engineered robust API controllers to manage comprehensive CRUD operations, ensuring seamless data orchestration and system reliability.",
          "Validated endpoint functionality and performance through rigorous testing using Swagger and Postman to ensure alignment with technical specifications.",
          "Resolved complex defects identified during the development phase, maintaining code integrity and optimizing application stability.",
          "Developed and executed unit test cases to ensure high code coverage and the long-term maintainability of API endpoints.",
          "Demonstrated a commitment to project timelines by consistently delivering high-quality solutions within strict Agile deadlines.",
        ],
      },
      {
        name: "Pacific Gas and Electric (PGE)",
        stack: ["SHIP 8", "Web API", "jQuery", "JavaScript", "SQL Server", "MVC"],
        bullets: [
          "Owned the complete SDLC for specialized utility applications focused on electric and gas line infrastructure.",
          "Delivered ongoing development and production support for business-critical systems.",
          "Drove applications from concept to production deployment with continuous post-launch support.",
        ],
      },
    ],
  },
  {
    role: "Senior Software Developer",
    company: "Aspire Systems India Pvt. Ltd.",
    location: "Chennai",
    period: "Dec 2021 — Jul 2023",
    projects: [
      {
        name: "TMRW Platform — GEMS Education",
        stack: ["SHIP Core 3.1", "Angular 12", "PostgreSQL", "MongoDB", "HTML"],
        bullets: [
          "Integrated modules connecting teachers, students, parents and administrators on a unified platform.",
          "Migrated manual academic workflows into the modern TMRW platform.",
          "Designed and developed features tightly aligned to client specifications.",
          "Prioritized client-reported issues with rapid bug-fixing and resolution.",
        ],
      },
    ],
  },
  {
    role: "Software Developer",
    company: "Sierra ODC Pvt. Ltd.",
    location: "Coimbatore",
    period: "Feb 2019 — Sep 2021",
    projects: [
      {
        name: "VWR — CBILL System",
        stack: ["C#", "ASP.SHIP MVC", "Oracle", "JavaScript", "jQuery", "HTML", "CSS", "Bootstrap", "Web API", "DevExpress"],
        bullets: [
          "Developed finance-oriented applications generating customized invoice reports for VWR International.",
          "Managed DevExpress XtraReports development and project release cycles.",
          "Addressed Web API bug fixes and client-reported issues end-to-end.",
        ],
      },
      {
        name: "Enterprise Facility Management System (eFACILITY)",
        stack: ["C#", "ASP.SHIP MVC", "Oracle", "JavaScript", "jQuery", "Bootstrap"],
        bullets: [
          "Assisted with resolving reported bugs in Time and Attendance, Project Management, and Help Desk modules.",
          "Engaged in development activities related to product enhancement for workforce operations.",
        ],
      },
    ],
  },
];

export const Experience = () => {
  const heading = useReveal<HTMLHeadingElement>();

  return (
    <section id="experience" className="py-24 md:py-32 bg-card/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-2s" }} />

      <div className="container relative">
        <p className="font-mono-tag mb-4 text-accent reveal-blur" style={{ transitionDelay: "0.1s" }}>
          // Experience
        </p>
        <h2
          ref={heading.ref}
          className={`font-display text-4xl md:text-6xl mb-16 max-w-3xl reveal ${heading.visible ? "is-visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          Seven years.<br />
          <span className="text-gradient italic animate-gradient">Three companies.</span> One craft.
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />
          <div className="absolute left-6 md:left-8 top-0 w-px bg-gradient-to-b from-primary via-accent to-primary animate-fill-bar" style={{ height: "100%", animationDuration: "2s" }} />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ exp, index }: { exp: typeof experiences[number]; index: number }) => {
  const { ref, visible } = useReveal<HTMLElement>();
  const isEven = index % 2 === 0;

  return (
    <article
      ref={ref}
      className={`relative pl-16 md:pl-20 group ${isEven ? "reveal-left" : "reveal-right"} ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-6 top-8 z-10">
        <div className="w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
        <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-pulse-ring" />
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-10 hover:border-primary/40 hover-lift hover-glow-border group relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl mb-1 group-hover:text-gradient transition-all duration-300">
              {exp.role}
            </h3>
            <p className="text-foreground/90">
              {exp.company} <span className="text-muted-foreground">· {exp.location}</span>
            </p>
          </div>
          <span className="font-mono-tag text-accent shrink-0">{exp.period}</span>
        </div>

        <div className="space-y-8">
          {exp.projects.map((proj, pi) => (
            <div key={pi} className={pi > 0 ? "pt-6 border-t border-border/50" : ""}>
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-mono-tag text-accent mr-2">PROJECT</span>
                {proj.name}
              </p>

              <ul className="space-y-2 mb-6">
                {proj.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {proj.stack.map((s, si) => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 hover-scale hover:bg-accent/20 hover:border-accent/40 transition-all duration-300"
                    style={{ transitionDelay: `${si * 50}ms` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Shimmer sweep on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer pointer-events-none" />
      </div>
    </article>
  );
};
