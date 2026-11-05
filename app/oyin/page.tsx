import type { Metadata } from "next";
import Effects from "../components/Effects";
import Quiz from "../components/Quiz";
import Toy from "../components/Toy";
import { Footer, Navbar } from "../components/Site";

export const metadata: Metadata = {
  title: "O‘yin",
  description: "Fizika viktorinasi va tortishish kuchi sinov maydoni: o‘ynab o‘rganing.",
};

export default function OyinPage() {
  return (
    <>
      <Effects />
      <Navbar active="oyin" />
      <main className="wrap">
        <div className="page-hero">
          <h1>Fizika o‘yinlari</h1>
          <p>Savollarga javob bering, sharlarni sakratib ko‘ring va ball to‘plang.</p>
        </div>
        <div style={{ marginTop: 10 }}>
          <Quiz />
        </div>
        <div className="sec" style={{ paddingBlock: "60px 0" }}>
          <Toy />
        </div>
      </main>
      <Footer />
    </>
  );
}
