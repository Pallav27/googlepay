export default function Footer() {
    return (
      <footer className="w-full p-4 bg-amber-300 text-amber-900 text-center shadow-md">
        <p className="text-sm">&copy; {new Date().getFullYear()} Payment Wallet. All rights reserved.</p>
      </footer>
    );
  }
  