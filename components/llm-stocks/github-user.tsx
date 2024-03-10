"use client";

import { useId, useState } from "react";
import { useActions, useAIState, useUIState } from "ai/rsc";

import type { AI } from "../../app/action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GithubIcon, UsersIcon } from "../github-user-icons";
import { Button } from "../ui/button";

export function GithubUser({
  name,
  avatar,
  followers,
  repositories,
}: {
  name: string;
  avatar: string;
  followers: number;
  repositories: number;
}) {
  const [purchasingUI, setPurchasingUI] = useState<null | React.ReactNode>(
    null
  );
  const [history, setHistory] = useAIState<typeof AI>();
  const [, setMessages] = useUIState<typeof AI>();
  const { selectUser } = useActions<typeof AI>();

  // Unique identifier for this UI component.
  const id = useId();

  return (
    <Card className="w-full max-w-48">
      <CardHeader className="flex items-start gap-4">
        <div className="rounded-full overflow-hidden border-2 border-white">
          <img
            alt="Avatar"
            className="border-gray-200"
            height={64}
            src={avatar}
            style={{
              aspectRatio: "64/64",
              objectFit: "cover",
            }}
            width={64}
          />
        </div>
        <div className="space-y-1.5">
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            Beautifully designed components that you can copy and paste into
            your apps.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center space-x-2">
          <UsersIcon className="w-4 h-4" />
          <div className="text-sm font-medium">{followers} followers</div>
        </div>
        <div className="flex items-center space-x-2">
          <GithubIcon className="w-4 h-4" />
          <div className="text-sm font-medium">{repositories} repositories</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={async () => {
            const response = await selectUser(name);
            setPurchasingUI(response.purchasingUI);

            // Insert a new system message to the UI.
            setMessages((currentMessages: any) => [
              ...currentMessages,
              response.newMessage,
            ]);
          }}
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  );
}
