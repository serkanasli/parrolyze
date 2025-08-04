"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";

export default function FeedbackDialog() {
  const [feedbackType, setFeedbackType] = useState<"issue" | "idea">("issue");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Feedback submitted");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden sm:flex">
          <MessageSquareText />
          <span className="font-medium">Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>
              Send us your issues or ideas. Your feedback is valuable to us.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Feedback Type</Label>
              <RadioGroup
                defaultValue="issue"
                name="type"
                onValueChange={(value) => setFeedbackType(value as "issue" | "idea")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="issue" id="issue" />
                  <Label htmlFor="issue">Issue</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="idea" id="idea" />
                  <Label htmlFor="idea">Idea</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Your Email (optional)</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">
                {feedbackType === "idea" ? "What's your idea?" : "What's the issue?"}
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder={
                  feedbackType === "idea"
                    ? "Share your improvement suggestion..."
                    : "Describe the bug or issue..."
                }
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
