import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services-mobile")({
  beforeLoad: () => {
    throw redirect({ to: "/services" });
  },
});
