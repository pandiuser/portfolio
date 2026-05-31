import { api } from "./api";
import type { ContactPayload, ContactResponse } from "@/types/api";

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const { data } = await api.post<ContactResponse>("/contact/", payload);
  return data;
}
