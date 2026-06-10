import { createFileRoute } from "@tanstack/react-router";
import { ScreenFrame } from "@/components/ScreenFrame";

export const Route = createFileRoute("/process")({
  head: () => ({ meta: [{ title: "Our Process | Excel Autocare" }] }),
  component: () => <ScreenFrame src="/screens/5.html" title="Our Process" />,
});
