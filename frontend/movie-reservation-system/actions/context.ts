"use client";
import { User } from "@/types/userTypes";
import { createContext } from "react";

export const AuthContext = createContext<User | undefined>(undefined);
