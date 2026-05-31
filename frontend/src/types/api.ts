export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
};

export type ContactResponse = {
  id: number;
  status: "received";
  message: string;
};

export type ApiError = {
  message: string;
  fieldErrors?: Record<string, string[]>;
  status?: number;
};

export type AnalyticsEventPayload = {
  event: "page_view" | "resume_download" | "project_view" | "contact_submit";
  path?: string;
  metadata?: Record<string, unknown>;
};
