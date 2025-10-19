import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";

const calendarVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "bg-background border border-border rounded-lg",
        card: "bg-card border border-border rounded-lg shadow-sm",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg",
        premium: "bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl shadow-lg shadow-primary/10",
        featured: "bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl shadow-lg shadow-accent/10",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const calendarHeaderVariants = cva(
  "flex items-center justify-between",
  {
    variants: {
      size: {
        sm: "mb-3",
        md: "mb-4",
        lg: "mb-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const calendarGridVariants = cva(
  "grid gap-1",
  {
    variants: {
      size: {
        sm: "grid-cols-7 gap-1",
        md: "grid-cols-7 gap-2",
        lg: "grid-cols-7 gap-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const dayVariants = cva(
  "flex items-center justify-center text-sm font-medium transition-colors cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
      state: {
        default: "text-foreground hover:bg-muted",
        selected: "bg-primary text-primary-foreground hover:bg-primary/90",
        today: "bg-accent text-accent-foreground hover:bg-accent/90",
        otherMonth: "text-muted-foreground/50 hover:bg-muted/50",
        disabled: "text-muted-foreground/30 cursor-not-allowed hover:bg-transparent",
        hasEvent: "bg-primary/10 text-primary hover:bg-primary/20",
        weekend: "text-muted-foreground hover:bg-muted",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

const eventVariants = cva(
  "text-xs px-2 py-1 rounded-md truncate cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        success: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400",
        destructive: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
        accent: "bg-accent/10 text-accent hover:bg-accent/20",
      },
      size: {
        sm: "text-xs px-1 py-0.5",
        md: "text-xs px-2 py-1",
        lg: "text-sm px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  description?: string;
  location?: string;
  attendees?: number;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info' | 'accent';
  allDay?: boolean;
  metadata?: Record<string, any>;
}

export interface CalendarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calendarVariants> {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  showEvents?: boolean;
  showWeekends?: boolean;
  showTodayButton?: boolean;
  showNavigation?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  loading?: boolean;
  error?: string;
  emptyText?: string;
  locale?: string;
  firstDayOfWeek?: 0 | 1; // 0 = Sunday, 1 = Monday
  mode?: 'single' | 'range' | 'multiple';
  range?: { from: Date; to: Date };
  multiple?: Date[];
  onRangeChange?: (range: { from: Date; to: Date } | undefined) => void;
  onMultipleChange?: (dates: Date[]) => void;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar({
  value,
  defaultValue,
  onValueChange,
  events = [],
  onEventClick,
  onDateClick,
  showEvents = true,
  showWeekends = true,
  showTodayButton = true,
  showNavigation = true,
  minDate,
  maxDate,
  disabledDates = [],
  loading = false,
  error,
  emptyText = 'No events',
  locale = 'en-US',
  firstDayOfWeek = 0,
  mode = 'single',
  range,
  multiple = [],
  onRangeChange,
  onMultipleChange,
  variant,
  size,
  className,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState<Date>(value || defaultValue || new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
  const [selectedRange, setSelectedRange] = React.useState<{ from: Date; to: Date } | undefined>(range);
  const [selectedMultiple, setSelectedMultiple] = React.useState<Date[]>(multiple);

  React.useEffect(() => {
    if (value) {
      setCurrentDate(value);
      setSelectedDate(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (range) {
      setSelectedRange(range);
    }
  }, [range]);

  React.useEffect(() => {
    if (multiple) {
      setSelectedMultiple(multiple);
    }
  }, [multiple]);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn(calendarVariants({ variant, size, className }))}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn(calendarVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading calendar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(calendarVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-destructive">⚠️</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Calendar Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    onValueChange?.(today);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() - firstDayOfWeek + 7) % 7;

    const days = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isInRange: false,
        isWeekend: false,
        events: [],
      });
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter(event => 
        event.date.toDateString() === date.toDateString()
      );
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: selectedDate?.toDateString() === date.toDateString(),
        isInRange: selectedRange && date >= selectedRange.from && date <= selectedRange.to,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        events: dayEvents,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isInRange: false,
        isWeekend: false,
        events: [],
      });
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (mode === 'single') {
      setSelectedDate(date);
      onValueChange?.(date);
    } else if (mode === 'range') {
      if (!selectedRange?.from || (selectedRange.from && selectedRange.to)) {
        setSelectedRange({ from: date, to: date });
        onRangeChange?.({ from: date, to: date });
      } else {
        const newRange = {
          from: selectedRange.from,
          to: date,
        };
        setSelectedRange(newRange);
        onRangeChange?.(newRange);
      }
    } else if (mode === 'multiple') {
      const isSelected = selectedMultiple.some(d => d.toDateString() === date.toDateString());
      let newMultiple;
      if (isSelected) {
        newMultiple = selectedMultiple.filter(d => d.toDateString() !== date.toDateString());
      } else {
        newMultiple = [...selectedMultiple, date];
      }
      setSelectedMultiple(newMultiple);
      onMultipleChange?.(newMultiple);
    }
    
    onDateClick?.(date);
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(d => d.toDateString() === date.toDateString());
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className={cn(calendarVariants({ variant, size, className }))} {...props}>
      {/* Header */}
      <div className={cn(calendarHeaderVariants({ size }))}>
        <div className="flex items-center space-x-2">
          {showNavigation && (
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <h3 className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          {showNavigation && (
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {showTodayButton && (
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Today
          </button>
        )}
      </div>

      {/* Day names */}
      <div className={cn(calendarGridVariants({ size }))}>
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={cn(calendarGridVariants({ size }))}>
        {days.map((day, index) => {
          const isDisabled = isDateDisabled(day.date);
          const dayState = day.isOtherMonth ? 'otherMonth' :
                          day.isToday ? 'today' :
                          day.isSelected ? 'selected' :
                          day.isInRange ? 'selected' :
                          day.isWeekend && !showWeekends ? 'weekend' :
                          day.events.length > 0 ? 'hasEvent' :
                          isDisabled ? 'disabled' : 'default';

          return (
            <div key={index} className="relative">
              <button
                onClick={() => !isDisabled && handleDateClick(day.date)}
                disabled={isDisabled}
                className={cn(dayVariants({ size, state: dayState }))}
              >
                {day.date.getDate()}
              </button>
              
              {/* Events */}
              {showEvents && day.events.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 space-y-1 p-1">
                  {day.events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                      className={cn(eventVariants({ variant: event.variant, size }))}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Events list */}
      {showEvents && events.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-foreground">Upcoming Events</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 3)
              .map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    event.variant === 'success' && "bg-green-500",
                    event.variant === 'warning' && "bg-yellow-500",
                    event.variant === 'destructive' && "bg-red-500",
                    event.variant === 'info' && "bg-blue-500",
                    event.variant === 'accent' && "bg-accent",
                    !event.variant && "bg-primary"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{event.date.toLocaleDateString()}</span>
                      {event.startTime && (
                        <>
                          <Clock className="h-3 w-3" />
                          <span>{event.startTime}</span>
                        </>
                      )}
                      {event.location && (
                        <>
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </>
                      )}
                      {event.attendees && (
                        <>
                          <Users className="h-3 w-3" />
                          <span>{event.attendees}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {showEvents && events.length === 0 && (
        <div className="mt-4 text-center py-8">
          <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">{emptyText}</p>
        </div>
      )}
    </div>
  );
}

export { calendarVariants, calendarHeaderVariants, calendarGridVariants, dayVariants, eventVariants };
