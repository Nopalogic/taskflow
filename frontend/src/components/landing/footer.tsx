import { CheckSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <CheckSquare className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <p className="mb-4 max-w-xs text-muted-foreground">
              Streamline your workflow with the most intuitive task management
              platform designed for modern teams.
            </p>
            <div className="flex gap-4">
              <SocialIcon name="twitter" />
              <SocialIcon name="facebook" />
              <SocialIcon name="instagram" />
              <SocialIcon name="linkedin" />
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#">Integrations</FooterLink>
              <FooterLink href="#">What's New</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">Guides</FooterLink>
              <FooterLink href="#">API Reference</FooterLink>
              <FooterLink href="#">Community</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            <FooterLink href="#" className="text-sm">
              Privacy Policy
            </FooterLink>
            <FooterLink href="#" className="text-sm">
              Terms of Service
            </FooterLink>
            <FooterLink href="#" className="text-sm">
              Security
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li>
      <a
        href={href}
        className={`text-muted-foreground transition-colors hover:text-foreground ${className}`}
      >
        {children}
      </a>
    </li>
  );
}

function SocialIcon({ name }: { name: string }) {
  return (
    <a
      href="#"
      className="flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
    >
      <span className="sr-only">{name}</span>
      <div className="h-4 w-4" />
    </a>
  );
}
