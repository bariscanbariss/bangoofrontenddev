"use server"

import { sdk } from "@lib/config"

export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
}

export type SupportTicket = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  status: "open" | "in_progress" | "resolved" | "closed"
  created_at: string
  updated_at: string
}

/**
 * Backend'e destek talebi gönderir
 * MedusaJS'te custom endpoint olarak `/store/support-tickets` endpoint'ini kullanır
 */
export async function submitSupportTicket(
  _currentState: unknown,
  formData: FormData
) {
  const ticketData: ContactFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    phone: formData.get("phone") as string,
  }

  try {
    // Backend'e destek talebi gönder
    const response = await sdk.client.fetch<{ ticket: SupportTicket }>(
      `/store/support-tickets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      }
    )

    if (response.ticket) {
      return {
        success: true,
        message: "Destek talebiniz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
        ticketId: response.ticket.id,
      }
    }

    throw new Error("Ticket oluşturulamadı")
  } catch (error: any) {
    console.error("Support ticket error:", error)
    return {
      success: false,
      message: error.message || "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    }
  }
}

/**
 * Kullanıcının destek taleplerini getirir
 */
export async function getUserSupportTickets(
  email: string
): Promise<SupportTicket[]> {
  try {
    const response = await sdk.client.fetch<{ tickets: SupportTicket[] }>(
      `/store/support-tickets?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
      }
    )

    return response.tickets || []
  } catch (error) {
    console.error("Failed to fetch support tickets:", error)
    return []
  }
}

/**
 * Canlı destek oturumu başlatır (gelecekte kullanılacak)
 */
export async function initiateLiveChat(email: string, name: string) {
  try {
    // Burada canlı destek entegrasyonu yapılacak (Tawk.to, Intercom, vb.)
    // Şimdilik placeholder
    return {
      success: true,
      message: "Canlı destek yakında aktif olacak.",
    }
  } catch (error: any) {
    return {
      success: false,
      message: "Canlı destek şu anda kullanılamıyor.",
    }
  }
}
