const bio = `
As a VP of Engineering in Stockholm, leadership, code, and product all blur together in my work — I've never really wanted them separate.

A lot of teams talk about great culture, but they still rely on 'heroics' to stay afloat. That's not a badge of honor; it's a leadership failure.

I like building stuff that doesn't scare people. Deployments should be boring. Debugging shouldn't feel like an archaeological dig. And changing one line of code shouldn't break three unrelated things.

We waste too much time dancing around bad decisions made five years ago by people who don't even work here anymore. I prefer to step in, face the mess, and actually fix it.
`.trim();

export default function BioSection() {
  const paragraphs = bio.split('\n\n');

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
