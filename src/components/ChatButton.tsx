import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CHATBOT_URL = "https://opal.google/?flow=drive:/1SyXIgHkIISLWFwHDlQno0uuifmkTlzU3&shared&mode=app";

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
        size="icon"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Chat Assistant</DialogTitle>
          </VisuallyHidden>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </Button>
          <iframe
            src={CHATBOT_URL}
            className="w-full h-full border-0"
            title="Chat Assistant"
            allow="microphone; camera"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
