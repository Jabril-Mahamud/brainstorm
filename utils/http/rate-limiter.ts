import { NextRequest, NextResponse } from "next/server";
import { RateLimitConfig, RateLimitRecord } from "./types";

export class RateLimiter {
  private static rateLimitMap = new Map<string, RateLimitRecord>();

  private static cleanupOldRecords() {
    const now = Date.now();
    Array.from(this.rateLimitMap.keys()).forEach(key => {
      const record = this.rateLimitMap.get(key);
      if (record && now > record.resetTime) {
        this.rateLimitMap.delete(key);
      }
    });
  }

  private static getClientIdentifier(request: NextRequest): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : request.ip;
    return `${clientIp}-${request.nextUrl.pathname}`;
  }

  static middleware(config: RateLimitConfig) {
    return async (request: NextRequest) => {
      this.cleanupOldRecords();
      const clientId = this.getClientIdentifier(request);
      const now = Date.now();

      let record = this.rateLimitMap.get(clientId);

      if (!record || now > record.resetTime) {
        record = {
          count: 1,
          resetTime: now + config.windowMs
        };
        this.rateLimitMap.set(clientId, record);
        return NextResponse.next();
      }

      record.count++;

      if (record.count > config.maxRequests) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000);
        
        return NextResponse.json(
          {
            error: 'Too many requests',
            retryAfter
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': config.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': Math.ceil(record.resetTime / 1000).toString()
            }
          }
        );
      }

      this.rateLimitMap.set(clientId, record);

      const response = NextResponse.next();
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', (config.maxRequests - record.count).toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000).toString());

      return response;
    };
  }
}