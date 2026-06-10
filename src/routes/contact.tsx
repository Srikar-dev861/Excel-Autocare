import { createFileRoute } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Excel Autocare" },
      { name: "description", content: "Get in touch with Excel Autocare for precision support." },
    ],
  }),
  component: () => <ScreenFrame src="/screens/6.html" title="Contact" />,
});
