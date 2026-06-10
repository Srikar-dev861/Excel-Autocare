import { createFileRoute } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Excel Autocare | Your Trusted Maruti Suzuki Care Experts" },
      { name: "description", content: "Authorized Maruti Suzuki service partner offering master-class mechanical, aesthetic, and routine care." },
    ],
  }),
  component: () => <ScreenFrame src="/screens/1.html" title="Home" />,
});
