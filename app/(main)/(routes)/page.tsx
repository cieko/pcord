import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="text-yellow-700">
      This is a protected route.
      <UserButton
        afterSignOutUrl="/"
      />
    </main>
  );
}
