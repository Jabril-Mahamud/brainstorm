import { NextRequest } from "next/server";

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  endpoint: string;
}

export interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export interface RedirectOptions {
  type: "error" | "success";
  path: string;
  message: string;
}