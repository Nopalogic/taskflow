import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (isAuthenticated) {
      return navigate("/u");
    }

    return navigate("/auth/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">TaskFlow</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Button variant="secondary" onClick={handleSignIn}>
            Sign In
          </Button>
          <Link to="/auth/register">
            <Button>Get Started</Button>
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-16 border-b bg-background py-4 shadow-md md:hidden">
            <nav className="container flex flex-col space-y-3 px-4">
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button className="w-full justify-start">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
