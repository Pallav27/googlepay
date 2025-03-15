"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Credits from "@/components/Credits";
import Debits from "@/components/Debits";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Balance from "@/components/Balance";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <Header />

      {/* Login Button Positioned at the Top-Right Corner */}
      <Button className="absolute top-4 right-4 flex" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button className="absolute right-0.5" onClick={() => router.push("/signup")}>
        Signup
      </Button>

      {/* Full-Screen Resizable Panel Group */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 w-full">
        <ResizablePanel className="h-full" defaultSize={50}>  {/* ✅ Added defaultSize */}
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel className="h-full" defaultSize={50}>  {/* ✅ Added defaultSize */}
              <Credits />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="h-full" defaultSize={50}>  {/* ✅ Added defaultSize */}
              <Debits />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="h-full" defaultSize={50}>  {/* ✅ Added defaultSize */}
          <Balance />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Footer />
    </div>
  );
}
