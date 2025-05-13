export default async function Home() {
  return (
    <section className="container mx-auto grid items-center gap-6 py-8">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl leading-tight font-extrabold tracking-tighter md:text-4xl">
          Welcome to MySettr
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">
          The landing page content starts here.
        </p>
      </div>
    </section>
  );
}
