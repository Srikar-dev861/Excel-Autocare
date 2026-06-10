import { createFileRoute } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Excel Autocare - Authorized Maruti Suzuki Service Partner" },
      { name: "description", content: "Engineered for precision, driven by trust. Learn about our legacy and team." },
    ],
  }),
  component: () => <ScreenFrame src="/screens/4.html" title="About" />,
});
