'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RoleSwitchButton } from '@/components/RoleSwitchButton';
import { 
  ArrowRightLeft, 
  TrendingUp, 
  Users, 
  Building2, 
  Trophy, 
  Star,
  ChevronRight,
  Shield,
  Globe,
  Zap
} from 'lucide-react';
import { getFeaturedNews, getLeaderboard } from '@/data';

export default function Home() {
  const featuredNews = getFeaturedNews();
  const topDevelopers = getLeaderboard('market_value').slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <ArrowRightLeft className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              IT Transfer Market
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              The transparent marketplace where companies can transfer, loan, and discover 
              top software developers through an innovative talent exchange system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <RoleSwitchButton
                role="developer"
                userId="dev-1"
                href="/dashboard/developer"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Users className="mr-2 h-5 w-5" />
                Explore as Developer
              </RoleSwitchButton>
              
              <RoleSwitchButton
                role="company"
                userId="comp-1"
                href="/dashboard/company"
                size="lg"
                variant="outline"
              >
                <Building2 className="mr-2 h-5 w-5" />
                Browse as Company
              </RoleSwitchButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-muted-foreground">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">25+</div>
                <div className="text-sm text-muted-foreground">Transfers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Inspired by football transfers, our platform brings transparency and 
              efficiency to developer talent acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary">Step 1</Badge>
                </div>
                <CardTitle>Profile & Skills</CardTitle>
                <CardDescription>
                  Developers showcase their skills, achievements, and ratings from employers, 
                  AI analysis, and peer reviews.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Globe className="h-8 w-8 text-green-600" />
                  <Badge variant="secondary">Step 2</Badge>
                </div>
                <CardTitle>Transparent Discovery</CardTitle>
                <CardDescription>
                  Companies browse and discover talent through our transparent marketplace 
                  with detailed filtering and search capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Zap className="h-8 w-8 text-orange-600" />
                  <Badge variant="secondary">Step 3</Badge>
                </div>
                <CardTitle>Transfer & Negotiate</CardTitle>
                <CardDescription>
                  Initiate transfers or loans with built-in negotiation tools. 
                  Both parties must approve for successful completion.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Activity */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Market Activity
            </h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest transfers and market trends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Latest News */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Latest Transfer News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredNews.slice(0, 3).map((news) => (
                    <div key={news.id} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{news.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {news.description.substring(0, 100)}...
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          {news.timestamp.toLocaleDateString('en-US')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/news">
                    View All News
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Top Developers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Top Market Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDevelopers.map((entry, index) => (
                    <div key={entry.developerId} className="flex items-center space-x-3 pb-3 border-b last:border-b-0">
                      <div className="flex-shrink-0">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{entry.rank}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {entry.developer.firstName} {entry.developer.lastName}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {entry.developer.title}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">
                          ${(entry.value / 1000).toFixed(0)}k
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {entry.developer.ratings.overall.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/leaderboard">
                    View Leaderboard
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the future of developer talent acquisition. Whether you're a developer 
            looking for new opportunities or a company seeking top talent, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RoleSwitchButton
              role="developer"
              userId="dev-2"
              href="/dashboard/developer"
              size="lg"
              variant="secondary"
            >
              Join as Developer
            </RoleSwitchButton>
            
            <RoleSwitchButton
              role="company"
              userId="comp-2"
              href="/dashboard/company"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Start Hiring
            </RoleSwitchButton>
          </div>
        </div>
      </section>
    </div>
  );
}
