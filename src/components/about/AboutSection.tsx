import AboutHero from "./AboutHero";
import FeatureGrid from "./FeatureGrid";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[var(--background)] py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-purple-50/30 to-white" />

      <div
        className="absolute -top-10 -right-10 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--primary-color) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-[600px] h-[600px] rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-2xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, var(--primary-color) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <AboutHero />
        <FeatureGrid />
      </div>
    </section>
  );
}
