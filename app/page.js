import Image from "next/image";
import Form from "./components/Form";
import FAQ from "./components/FAQ";
import FaqSection from "./components/FAQ";
import GridPlusBackground from "./components/Grid";

export default function Home() {
  return (
    <div className="">
      <Form/>
      <FaqSection/>
      <GridPlusBackground/>

    </div>
  );
}
