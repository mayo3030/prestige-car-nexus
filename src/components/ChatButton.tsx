import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHATBOT_URL = "https://opal.google/?flow=drive:/1XF0wQUk2Pwp6lD3teDoUHD9EEXxPJqSF&shared&mode=app";

export function ChatButton() {
  const handleClick = () => {
    window.open(CHATBOT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
      size="icon"
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
}
