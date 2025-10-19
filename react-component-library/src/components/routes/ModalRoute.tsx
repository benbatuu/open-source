import React, { Suspense, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalTrigger } from '../ui/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function ModalRoute() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Modal Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Modal Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default Modal</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalTrigger asChild>
                  <Button>Open Default Modal</Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Default Modal</ModalTitle>
                    <ModalDescription>
                      This is a default modal with standard styling.
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
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success Modal</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Modal>
                <ModalTrigger asChild>
                  <Button variant="default">Open Success Modal</Button>
                </ModalTrigger>
                <ModalContent variant="success" showIcon>
                  <ModalHeader variant="success">
                    <ModalTitle>Success!</ModalTitle>
                    <ModalDescription>
                      Your action has been completed successfully.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Everything went smoothly. You can now proceed with your next steps.
                    </p>
                  </div>
                  <ModalFooter>
                    <Button variant="outline">Close</Button>
                    <Button>Continue</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Error Modal</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Modal>
                <ModalTrigger asChild>
                  <Button variant="destructive">Open Error Modal</Button>
                </ModalTrigger>
                <ModalContent variant="error" showIcon>
                  <ModalHeader variant="error">
                    <ModalTitle>Error Occurred</ModalTitle>
                    <ModalDescription>
                      Something went wrong with your request.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Please check your input and try again. If the problem persists, contact support.
                    </p>
                  </div>
                  <ModalFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Retry</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning Modal</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Modal>
                <ModalTrigger asChild>
                  <Button variant="outline">Open Warning Modal</Button>
                </ModalTrigger>
                <ModalContent variant="warning" showIcon>
                  <ModalHeader variant="warning">
                    <ModalTitle>Warning</ModalTitle>
                    <ModalDescription>
                      Please review your action before proceeding.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      This action cannot be undone. Make sure you want to continue.
                    </p>
                  </div>
                  <ModalFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Proceed</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info Modal</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Modal>
                <ModalTrigger asChild>
                  <Button variant="secondary">Open Info Modal</Button>
                </ModalTrigger>
                <ModalContent variant="info" showIcon>
                  <ModalHeader variant="info">
                    <ModalTitle>Information</ModalTitle>
                    <ModalDescription>
                      Here's some important information for you.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      This modal provides additional context and details about the current situation.
                    </p>
                  </div>
                  <ModalFooter>
                    <Button variant="outline">Close</Button>
                    <Button>Got it</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Modal Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Modal Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Small</div>
              <Modal>
                <ModalTrigger asChild>
                  <Button size="sm">Small Modal</Button>
                </ModalTrigger>
                <ModalContent size="sm">
                  <ModalHeader>
                    <ModalTitle>Small Modal</ModalTitle>
                    <ModalDescription>Compact modal for simple messages.</ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">This is a small modal.</p>
                  </div>
                  <ModalFooter>
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm">OK</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Medium</div>
              <Modal>
                <ModalTrigger asChild>
                  <Button>Medium Modal</Button>
                </ModalTrigger>
                <ModalContent size="md">
                  <ModalHeader>
                    <ModalTitle>Medium Modal</ModalTitle>
                    <ModalDescription>Standard size modal for most use cases.</ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">This is a medium-sized modal.</p>
                  </div>
                  <ModalFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Large</div>
              <Modal>
                <ModalTrigger asChild>
                  <Button size="lg">Large Modal</Button>
                </ModalTrigger>
                <ModalContent size="lg">
                  <ModalHeader>
                    <ModalTitle>Large Modal</ModalTitle>
                    <ModalDescription>Spacious modal for complex content.</ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">This is a large modal with more space for content.</p>
                  </div>
                  <ModalFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal Example */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Form Modal</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Contact Form Modal</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Modal open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
                <ModalTrigger asChild>
                  <Button>Open Contact Form</Button>
                </ModalTrigger>
                <ModalContent size="lg">
                  <ModalHeader>
                    <ModalTitle>Contact Us</ModalTitle>
                    <ModalDescription>
                      Fill out the form below and we'll get back to you soon.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="py-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message here..." rows={4} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter
                      </Label>
                    </div>
                  </div>
                  <ModalFooter>
                    <Button variant="outline" onClick={() => setIsFormModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsFormModalOpen(false)}>
                      Send Message
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Confirmation Modal</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Delete Confirmation</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Modal open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <ModalTrigger asChild>
                  <Button variant="destructive">Delete Item</Button>
                </ModalTrigger>
                <ModalContent variant="error" showIcon>
                  <ModalHeader variant="error">
                    <ModalTitle>Delete Item</ModalTitle>
                    <ModalDescription>
                      Are you sure you want to delete this item? This action cannot be undone.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      This will permanently remove the item from your account and cannot be recovered.
                    </p>
                  </div>
                  <ModalFooter>
                    <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => setIsConfirmModalOpen(false)}>
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
