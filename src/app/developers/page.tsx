'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter,
  MapPin, 
  Star,
  Eye,
  UserPlus,
  TrendingUp,
  Code,
  Calendar,
  DollarSign,
  Users,
  HandCoins
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { mockDevelopers } from '@/data';
import { Developer } from '@/types';

export default function DevelopersPage() {
  const { currentUser, getFilteredDevelopers, setFilters, filters } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('market_value_desc');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');

  // Apply filters
  const filteredDevelopers = getFilteredDevelopers();
  
  // Apply search term
  const searchFilteredDevelopers = filteredDevelopers.filter(dev => 
    searchTerm === '' || 
    `${dev.firstName} ${dev.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.technicalSkills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    dev.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply availability filter
  const availabilityFilteredDevelopers = availabilityFilter === 'all' 
    ? searchFilteredDevelopers 
    : searchFilteredDevelopers.filter(dev => dev.availability === availabilityFilter);

  // Apply sorting
  const sortedDevelopers = [...availabilityFilteredDevelopers].sort((a, b) => {
    switch (sortBy) {
      case 'market_value_desc':
        return b.marketValue.current - a.marketValue.current;
      case 'market_value_asc':
        return a.marketValue.current - b.marketValue.current;
      case 'rating_desc':
        return b.ratings.overall - a.ratings.overall;
      case 'experience_desc':
        return b.experience - a.experience;
      case 'name_asc':
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      default:
        return 0;
    }
  });

  const handleMakeOffer = (developer: Developer) => {
    // Navigate to transfer wizard to make an offer to the developer's current company
    window.location.href = `/transfers/new?developerId=${developer.id}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Discover Developers</h1>
        <p className="text-muted-foreground">
          Browse and connect with talented developers from around the world
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Name, skills, title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Availability</label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Developers</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="on-loan">On Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market_value_desc">Market Value (High to Low)</SelectItem>
                  <SelectItem value="market_value_asc">Market Value (Low to High)</SelectItem>
                  <SelectItem value="rating_desc">Rating (High to Low)</SelectItem>
                  <SelectItem value="experience_desc">Experience (Most to Least)</SelectItem>
                  <SelectItem value="name_asc">Name (A to Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {sortedDevelopers.length} Developer{sortedDevelopers.length !== 1 ? 's' : ''} Found
          </h2>
          <Badge variant="secondary">
            {sortedDevelopers.filter(d => d.availability === 'available').length} Available
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          Sorted by {sortBy.replace('_', ' ')}
        </div>
      </div>

      {/* Developer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedDevelopers.map((developer) => (
          <Card key={developer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                  <AvatarFallback className="text-lg">
                    {developer.firstName[0]}{developer.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">
                      {developer.firstName} {developer.lastName}
                    </h3>
                    <Badge variant={developer.availability === 'available' ? 'default' : 'secondary'}>
                      {developer.availability}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-2">{developer.title}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {developer.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {developer.experience} years
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      {developer.ratings.overall.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Skills Preview */}
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  <Code className="h-4 w-4" />
                  <span className="text-sm font-medium">Top Skills</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {developer.technicalSkills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                  {developer.technicalSkills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{developer.technicalSkills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Market Value & Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Market Value</span>
                  </div>
                  <div className="text-lg font-bold">
                    ${(developer.marketValue.current / 1000).toFixed(0)}k
                  </div>
                </div>
                
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Achievements</span>
                  </div>
                  <div className="text-lg font-bold">
                    {developer.achievements.length}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/profile/${developer.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </Button>
                {currentUser.role === 'company' && (
                  <Button 
                    className="flex-1"
                    onClick={() => handleMakeOffer(developer)}
                  >
                    <HandCoins className="mr-2 h-4 w-4" />
                    Make an Offer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedDevelopers.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Developers Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters to find more developers.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setAvailabilityFilter('all');
              setSortBy('market_value_desc');
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {sortedDevelopers.length > 0 && sortedDevelopers.length >= 10 && (
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Developers
          </Button>
        </div>
      )}
    </div>
  );
}
