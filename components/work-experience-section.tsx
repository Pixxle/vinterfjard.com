const workExperienceSummary = `
I have spent the last decade building software in environments where reliability, speed, and clarity all matter at the same time.

Most of my work has lived at the intersection of engineering leadership and hands-on building. I enjoy helping teams ship useful things quickly without letting systems turn into a mess over time.

I care a lot about simple architecture, practical automation, and creating engineering cultures where people can do their best work.
`.trim();

export default function WorkExperienceSection() {
  const paragraphs = workExperienceSummary.split('\n\n');

  return (
    <section className="mb-10">
      <div className="space-y-4 text-zinc-300">
        {paragraphs.map(paragraph => (
          <p key={paragraph} className="max-w-2xl leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
