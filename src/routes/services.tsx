import { createFileRoute } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Excel Autocare" },
      { name: "description", content: "Mechanical excellence, aesthetic restoration, and routine care for your Maruti Suzuki." },
    ],
  }),
  component: () => <ScreenFrame src="/screens/2.html" title="Services" />,
});
