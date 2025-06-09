import { BoxReveal } from "@/components/magicui/box-reveal";

export function BoxRevealDemo() {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold">
          Sagara Daily CheckUp<span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          Travel Banyuwangi - Bali Terbaik{" "}
          <span className="text-[#5046e6]">Dapatkan Kenyamanan Bepergian</span>
        </h2>
      </BoxReveal>

    
    </div>
  );
}
