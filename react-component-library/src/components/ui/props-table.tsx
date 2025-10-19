import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';

export interface PropInfo {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

interface PropsTableProps {
  props: PropInfo[];
  componentName: string;
}

export function PropsTable({ props, componentName }: PropsTableProps) {
  return (
    <Card className="border-border/20 bg-background/50 backdrop-blur-sm shadow-xl shadow-primary/5">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          {componentName} Props
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground/80">
          Complete list of props available for the {componentName} component
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-4 px-6 font-bold text-sm text-foreground bg-gradient-to-r from-primary/5 to-accent/5">Prop</th>
                <th className="text-left py-4 px-6 font-bold text-sm text-foreground bg-gradient-to-r from-primary/5 to-accent/5">Type</th>
                <th className="text-left py-4 px-6 font-bold text-sm text-foreground bg-gradient-to-r from-primary/5 to-accent/5">Default</th>
                <th className="text-left py-4 px-6 font-bold text-sm text-foreground bg-gradient-to-r from-primary/5 to-accent/5">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr 
                  key={prop.name} 
                  className={`
                    transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5
                    ${index % 2 === 0 ? "bg-muted/20" : "bg-background/50"}
                  `}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <code className="text-sm font-mono bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1.5 rounded-lg text-foreground font-semibold">
                        {prop.name}
                      </code>
                      {prop.required && (
                        <Badge variant="destructive" className="text-xs px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                          Required
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                      {prop.type}
                    </code>
                  </td>
                  <td className="py-4 px-6">
                    {prop.default ? (
                      <code className="text-sm font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border/30">
                        {prop.default}
                      </code>
                    ) : (
                      <span className="text-sm text-muted-foreground/60 italic">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-foreground leading-relaxed">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
