import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  Search, 
  ArrowLeft,
  Users,
  Building2,
  HelpCircle
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-muted-foreground/20 mb-4">404</div>
          <HelpCircle className="h-24 w-24 text-muted-foreground mx-auto" />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Where would you like to go?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-16 flex-col">
                <Link href="/">
                  <Home className="h-6 w-6 mb-2" />
                  <span>Home Page</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-16 flex-col">
                <Link href="/developers">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Browse Developers</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-16 flex-col">
                <Link href="/leaderboard">
                  <Search className="h-6 w-6 mb-2" />
                  <span>Leaderboard</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-16 flex-col">
                <Link href="/news">
                  <Building2 className="h-6 w-6 mb-2" />
                  <span>Transfer News</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Home
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            If you think this is an error, please contact our support team or 
            try refreshing the page. You can also use the search functionality 
            to find what you're looking for.
          </p>
        </div>
      </div>
    </div>
  );
}
