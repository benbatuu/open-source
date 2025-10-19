import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalTrigger } from '../components/ui/modal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ThemeProvider } from '../components/providers/ThemeProvider';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  return (
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">React Component Library</h1>
          <p className="text-muted-foreground">
            A comprehensive React component library with modern design system
          </p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input fields and labels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Select Option</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Checkbox 
                checked={checkboxChecked} 
                onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                label="I agree to the terms and conditions"
              />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status indicators and labels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Avatars */}
        <Card>
          <CardHeader>
            <CardTitle>Avatars</CardTitle>
            <CardDescription>User profile images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Notification messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Modal Example */}
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
            <CardDescription>Modal dialog component</CardDescription>
          </CardHeader>
          <CardContent>
            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
              <ModalTrigger asChild>
                <Button>Open Modal</Button>
              </ModalTrigger>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Example Modal</ModalTitle>
                  <ModalDescription>
                    This is an example modal dialog with various features.
                  </ModalDescription>
                </ModalHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    You can add any content here. This modal includes a header, content area, and footer.
                  </p>
                </div>
                <ModalFooter>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsModalOpen(false)}>
                    Confirm
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </CardContent>
        </Card>

        {/* Tooltip Example */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltips</CardTitle>
            <CardDescription>Contextual information tooltips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Top tooltip</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Tooltip on top</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Right tooltip</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tooltip on right</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Bottom tooltip</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tooltip on bottom</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-muted-foreground">
          <p>Built with ❤️ using React, TypeScript, Tailwind CSS, and shadcn/ui</p>
        </div>
        </div>
      </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
