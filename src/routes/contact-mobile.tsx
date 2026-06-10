import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-mobile")({
  beforeLoad: () => {
    throw redirect({ to: "/contact" });
  },
});
