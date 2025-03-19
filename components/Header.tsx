import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full p-4 bg-amber-300 text-amber-900 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Google Webpay</h1>
      <nav>
        {/* This is a placeholder for navigation items in the future */}
        <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
      </nav>
    </header>
  );
}
