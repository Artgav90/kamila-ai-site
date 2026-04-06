import HomePhoneShell from "../components/home/HomePhoneShell";

function HomePage() {
  return (
    <section
      className="flex min-h-dvh flex-1 items-start justify-start p-0 sm:items-center sm:justify-center sm:p-8"
      style={{ background: "rgb(5, 5, 16)" }}
    >
      <HomePhoneShell />
    </section>
  );
}

export default HomePage;
