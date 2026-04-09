import { StackHandler } from "@stackframe/stack";
import BackHomeButton from "@/components/BackHome";

export default function Handler() {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: "url(/img/bg-home.jpeg)", }}>
      <div className="hero-overlay"></div>
      <div className="bg-gray-400  hero-content flex-col text-neutral-content text-center border-2 border-warning rounded-lg p-8 backdrop-blur-md">
        <StackHandler fullPage={false} />
        <BackHomeButton />
      </div>
    </div>
  )
}

