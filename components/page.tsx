import Image from "next/image";
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
  return (
    <div className="h-screen w-screen flex flex-col relative">
      <Header />
      
      {/* Login Button Positioned at the Top-Right Corner */}
      <Button className="absolute top-4 right-4">Login</Button>

      {/* Full-Screen Resizable Panel Group */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 w-full">
        <ResizablePanel className="h-full">
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel className="h-full"><Credits /></ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="h-full"><Debits /></ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="h-full"><Balance /></ResizablePanel>
      </ResizablePanelGroup>
      <Footer />
    </div>
  );
}
