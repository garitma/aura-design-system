import React from "react";
import { ChevronDownIcon, CopyIcon,MenuIcon } from "../../icons";
import { SunIcon, ImageIcon } from "@radix-ui/react-icons";


export const Icon= () => <CopyIcon />;

export const IconSize = () => <CopyIcon className="h1" />;

export const WithExternalIcon = () => <SunIcon className="icon" />;

export const WithExternalIconSize = () => <ImageIcon className="icon h3" />;
