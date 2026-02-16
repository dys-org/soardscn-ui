import { createFileRoute } from "@tanstack/react-router";
import { ComponentExample } from "@/app-components/component-example";

export const Route = createFileRoute("/")({ component: App });

function App() {
return (
  <ComponentExample />
);
}
