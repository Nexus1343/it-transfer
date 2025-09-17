import Link from 'next/link';
import { ArrowRightLeft, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">IT Transfer Market</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The transparent marketplace for developer talent transfers and loans.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com" 
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link 
                href="https://twitter.com" 
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* For Developers */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">For Developers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/how-it-works" className="hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/profile-tips" className="hover:text-foreground">
                  Profile Tips
                </Link>
              </li>
              <li>
                <Link href="/career-growth" className="hover:text-foreground">
                  Career Growth
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-foreground">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* For Companies */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">For Companies</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/talent-acquisition" className="hover:text-foreground">
                  Talent Acquisition
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-foreground">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="hover:text-foreground">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-foreground">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 IT Transfer Market. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
            Prototype Version - Demo Data Only
          </p>
        </div>
      </div>
    </footer>
  );
}
