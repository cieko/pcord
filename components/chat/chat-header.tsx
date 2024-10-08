import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 bg-amber-950/75 text-amber-700 border-amber-950 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <Hash className="w-5 h-5 ml-5 mr-1" />}
      {type === "conversation" && <UserAvatar src={imageUrl} className="h-6 w-6 md:h-8 md:w-8 ml-5 mr-3" />}
      <p className={`font-semibold text-md`}>{name}</p>

      <div className="ml-auto flex items-center">
        {type === 'conversation' && (
          <ChatVideoButton />
        )}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
