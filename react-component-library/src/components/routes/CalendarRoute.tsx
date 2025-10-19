import { Suspense, useState } from 'react';
import { Calendar, CalendarEvent } from '../ui/calendar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
  Bell,
  Star,
  Heart,
  Zap,
  Target,
  Award,
  TrendingUp,
  DollarSign,
  BarChart3,
  Settings,
  User,
  Mail,
  Phone,
  Download,
  Upload,
  Share,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info
} from 'lucide-react';

// Sample events
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2024, 0, 15),
    startTime: '10:00',
    endTime: '11:00',
    description: 'Weekly team standup meeting',
    location: 'Conference Room A',
    attendees: 8,
    variant: 'primary',
  },
  {
    id: '2',
    title: 'Project Deadline',
    date: new Date(2024, 0, 20),
    description: 'Final project submission deadline',
    variant: 'destructive',
    allDay: true,
  },
  {
    id: '3',
    title: 'Client Presentation',
    date: new Date(2024, 0, 22),
    startTime: '14:00',
    endTime: '15:30',
    description: 'Present quarterly results to client',
    location: 'Client Office',
    attendees: 5,
    variant: 'info',
  },
  {
    id: '4',
    title: 'Birthday Party',
    date: new Date(2024, 0, 25),
    startTime: '18:00',
    endTime: '22:00',
    description: 'John\'s birthday celebration',
    location: 'Restaurant XYZ',
    attendees: 12,
    variant: 'success',
  },
  {
    id: '5',
    title: 'Training Session',
    date: new Date(2024, 0, 28),
    startTime: '09:00',
    endTime: '17:00',
    description: 'New technology training workshop',
    location: 'Training Center',
    attendees: 20,
    variant: 'warning',
  },
  {
    id: '6',
    title: 'Product Launch',
    date: new Date(2024, 1, 1),
    startTime: '10:00',
    endTime: '12:00',
    description: 'Launch of new product line',
    location: 'Main Auditorium',
    attendees: 50,
    variant: 'accent',
  },
];

const workEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Daily Standup',
    date: new Date(2024, 0, 15),
    startTime: '09:00',
    endTime: '09:30',
    description: 'Daily team synchronization',
    variant: 'primary',
  },
  {
    id: '2',
    title: 'Code Review',
    date: new Date(2024, 0, 15),
    startTime: '11:00',
    endTime: '12:00',
    description: 'Review pull requests',
    variant: 'info',
  },
  {
    id: '3',
    title: 'Sprint Planning',
    date: new Date(2024, 0, 16),
    startTime: '10:00',
    endTime: '12:00',
    description: 'Plan next sprint tasks',
    variant: 'warning',
  },
  {
    id: '4',
    title: 'Client Call',
    date: new Date(2024, 0, 17),
    startTime: '14:00',
    endTime: '15:00',
    description: 'Weekly client check-in',
    variant: 'success',
  },
];

const personalEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Gym Session',
    date: new Date(2024, 0, 15),
    startTime: '07:00',
    endTime: '08:00',
    description: 'Morning workout',
    location: 'Fitness Center',
    variant: 'success',
  },
  {
    id: '2',
    title: 'Doctor Appointment',
    date: new Date(2024, 0, 18),
    startTime: '15:00',
    endTime: '16:00',
    description: 'Annual health checkup',
    location: 'Medical Center',
    variant: 'info',
  },
  {
    id: '3',
    title: 'Dinner with Friends',
    date: new Date(2024, 0, 20),
    startTime: '19:00',
    endTime: '22:00',
    description: 'Catch up with college friends',
    location: 'Restaurant ABC',
    attendees: 4,
    variant: 'accent',
  },
];

export function CalendarRoute() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedRange, setSelectedRange] = useState<{ from: Date; to: Date } | undefined>();
  const [selectedMultiple, setSelectedMultiple] = useState<Date[]>([]);
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>(sampleEvents);

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
    // You can implement event details modal here
  };

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date);
    setSelectedDate(date);
  };

  return (
    <div className="space-y-8">
      {/* Calendar Types */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Calendar Types</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Single Date Selection</div>
            <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Calendar
                value={selectedDate}
                onValueChange={setSelectedDate}
                events={currentEvents}
                onEventClick={handleEventClick}
                onDateClick={handleDateClick}
                variant="card"
                size="lg"
                showEvents={true}
                showTodayButton={true}
                showNavigation={true}
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Date Range Selection</div>
            <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Calendar
                mode="range"
                range={selectedRange}
                onRangeChange={setSelectedRange}
                events={workEvents}
                onEventClick={handleEventClick}
                variant="premium"
                size="lg"
                showEvents={true}
                showTodayButton={true}
                showNavigation={true}
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Multiple Date Selection</div>
            <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Calendar
                mode="multiple"
                multiple={selectedMultiple}
                onMultipleChange={setSelectedMultiple}
                events={personalEvents}
                onEventClick={handleEventClick}
                variant="featured"
                size="lg"
                showEvents={true}
                showTodayButton={true}
                showNavigation={true}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Calendar Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Calendar Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Default Variant</div>
              <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={sampleEvents.slice(0, 3)}
                  variant="default"
                  size="md"
                  showEvents={true}
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Card Variant</div>
              <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={sampleEvents.slice(0, 3)}
                  variant="card"
                  size="md"
                  showEvents={true}
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Glass Variant</div>
              <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={sampleEvents.slice(0, 3)}
                  variant="glass"
                  size="md"
                  showEvents={true}
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Premium Variant</div>
              <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={sampleEvents.slice(0, 3)}
                  variant="premium"
                  size="md"
                  showEvents={true}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Calendar Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Small Size</div>
              <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={sampleEvents.slice(0, 2)}
                  variant="card"
                  size="sm"
                  showEvents={true}
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Medium Size</div>
              <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={sampleEvents.slice(0, 3)}
                  variant="card"
                  size="md"
                  showEvents={true}
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Large Size</div>
              <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={sampleEvents}
                  variant="card"
                  size="lg"
                  showEvents={true}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dashboard */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Interactive Dashboard</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Event Management Dashboard</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-blue-500" />
                    Work Calendar
                  </CardTitle>
                  <CardDescription>Professional events and meetings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Calendar
                      events={workEvents}
                      onEventClick={handleEventClick}
                      variant="default"
                      size="md"
                      showEvents={true}
                      showTodayButton={true}
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Personal Calendar
                  </CardTitle>
                  <CardDescription>Personal events and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Calendar
                      events={personalEvents}
                      onEventClick={handleEventClick}
                      variant="default"
                      size="md"
                      showEvents={true}
                      showTodayButton={true}
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-500" />
                    Project Timeline
                  </CardTitle>
                  <CardDescription>Project milestones and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Calendar
                      events={sampleEvents.filter(e => e.variant === 'destructive' || e.variant === 'warning')}
                      onEventClick={handleEventClick}
                      variant="default"
                      size="md"
                      showEvents={true}
                      showTodayButton={true}
                    />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Team Events
                  </CardTitle>
                  <CardDescription>Team meetings and social events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                    <Calendar
                      events={sampleEvents.filter(e => e.attendees && e.attendees > 5)}
                      onEventClick={handleEventClick}
                      variant="default"
                      size="md"
                      showEvents={true}
                      showTodayButton={true}
                    />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Calendar States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Loading State</div>
              <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={[]}
                  loading={true}
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Error State</div>
              <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={[]}
                  error="Failed to load calendar data"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Empty State</div>
              <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Calendar
                  events={[]}
                  emptyText="No events scheduled"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Event Management */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Event Management</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Event Actions</div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Event
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share Calendar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Events
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Event Categories</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Work</Badge>
              <Badge variant="secondary">Personal</Badge>
              <Badge variant="destructive">Deadline</Badge>
              <Badge variant="outline">Meeting</Badge>
              <Badge variant="success">Event</Badge>
              <Badge variant="warning">Reminder</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
