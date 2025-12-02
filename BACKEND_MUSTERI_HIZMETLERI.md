# Müşteri Hizmetleri Backend Entegrasyonu

## Frontend Tarafında Yapılanlar

1. **Support Data Layer** (`src/lib/data/support.ts`)
   - `submitSupportTicket`: Destek talebi gönderme fonksiyonu
   - `getUserSupportTickets`: Kullanıcı taleplerini getirme fonksiyonu
   - `initiateLiveChat`: Canlı destek başlatma (placeholder)

2. **Müşteri Hizmetleri Sayfası** (`src/app/[countryCode]/(main)/musteri-hizmetleri/page.tsx`)
   - İletişim bilgileri (E-posta, Telefon)
   - İletişim formu (backend entegreli)
   - Canlı destek bölümü (placeholder)
   - SSS linki

3. **Link Güncellemesi**
   - Account layout'taki müşteri hizmetleri linki güncellendi: `/musteri-hizmetleri`

## Backend Tarafında Yapılması Gerekenler (MedusaJS)

### 1. Support Tickets Entity Oluşturma

`src/models/support-ticket.ts`:
```typescript
import { BeforeInsert, Column, Entity } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/utils"

@Entity()
export class SupportTicket extends BaseEntity {
  @Column({ type: "varchar" })
  name: string

  @Column({ type: "varchar" })
  email: string

  @Column({ type: "varchar" })
  subject: string

  @Column({ type: "text" })
  message: string

  @Column({ type: "varchar", nullable: true })
  phone?: string

  @Column({
    type: "enum",
    enum: ["open", "in_progress", "resolved", "closed"],
    default: "open"
  })
  status: string

  @Column({ type: "varchar", nullable: true })
  customer_id?: string

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "suptkt")
  }
}
```

### 2. Support Tickets Repository

`src/repositories/support-ticket.ts`:
```typescript
import { SupportTicket } from "../models/support-ticket"
import { dataSource } from "@medusajs/medusa/dist/loaders/database"

export const SupportTicketRepository = dataSource
  .getRepository(SupportTicket)
  .extend({
    async findByEmail(email: string): Promise<SupportTicket[]> {
      return this.find({
        where: { email },
        order: { created_at: "DESC" },
      })
    },
  })

export default SupportTicketRepository
```

### 3. Support Tickets Service

`src/services/support-ticket.ts`:
```typescript
import { TransactionBaseService } from "@medusajs/medusa"
import { SupportTicket } from "../models/support-ticket"
import SupportTicketRepository from "../repositories/support-ticket"

type CreateSupportTicketInput = {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  customer_id?: string
}

class SupportTicketService extends TransactionBaseService {
  protected supportTicketRepository_: typeof SupportTicketRepository

  constructor(container) {
    super(container)
    this.supportTicketRepository_ = container.supportTicketRepository
  }

  async create(data: CreateSupportTicketInput): Promise<SupportTicket> {
    const supportTicketRepo = this.activeManager_.withRepository(
      this.supportTicketRepository_
    )

    const ticket = supportTicketRepo.create(data)
    const result = await supportTicketRepo.save(ticket)

    // Email gönderimi (opsiyonel)
    // await this.sendTicketConfirmationEmail(result)

    return result
  }

  async retrieve(id: string): Promise<SupportTicket> {
    const supportTicketRepo = this.activeManager_.withRepository(
      this.supportTicketRepository_
    )

    return await supportTicketRepo.findOne({ where: { id } })
  }

  async listByEmail(email: string): Promise<SupportTicket[]> {
    const supportTicketRepo = this.activeManager_.withRepository(
      this.supportTicketRepository_
    )

    return await supportTicketRepo.findByEmail(email)
  }

  async updateStatus(
    id: string,
    status: "open" | "in_progress" | "resolved" | "closed"
  ): Promise<SupportTicket> {
    const supportTicketRepo = this.activeManager_.withRepository(
      this.supportTicketRepository_
    )

    const ticket = await this.retrieve(id)
    ticket.status = status

    return await supportTicketRepo.save(ticket)
  }
}

export default SupportTicketService
```

### 4. API Endpoints

`src/api/store/support-tickets/route.ts`:
```typescript
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const supportTicketService = req.scope.resolve("supportTicketService")

  try {
    const { name, email, subject, message, phone } = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject, and message are required",
      })
    }

    const ticket = await supportTicketService.create({
      name,
      email,
      subject,
      message,
      phone,
    })

    res.json({ ticket })
  } catch (error) {
    res.status(500).json({
      message: "Failed to create support ticket",
      error: error.message,
    })
  }
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const supportTicketService = req.scope.resolve("supportTicketService")

  try {
    const { email } = req.query

    if (!email) {
      return res.status(400).json({
        message: "Email parameter is required",
      })
    }

    const tickets = await supportTicketService.listByEmail(email as string)

    res.json({ tickets })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch support tickets",
      error: error.message,
    })
  }
}
```

### 5. Admin API (Opsiyonel)

Admin panelinde destek taleplerini görmek için:

`src/api/admin/support-tickets/route.ts`:
```typescript
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const supportTicketService = req.scope.resolve("supportTicketService")

  try {
    const tickets = await supportTicketService.list()
    res.json({ tickets })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch support tickets",
      error: error.message,
    })
  }
}
```

`src/api/admin/support-tickets/[id]/route.ts`:
```typescript
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export async function PUT(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const supportTicketService = req.scope.resolve("supportTicketService")
  const { id } = req.params

  try {
    const { status } = req.body

    const ticket = await supportTicketService.updateStatus(id, status)
    res.json({ ticket })
  } catch (error) {
    res.status(500).json({
      message: "Failed to update support ticket",
      error: error.message,
    })
  }
}
```

### 6. Migration

Migration oluşturmak için:

```bash
npx medusa migrations create CreateSupportTicket
```

Migration dosyasında:
```typescript
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSupportTicket1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "support_ticket",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "subject",
            type: "varchar",
          },
          {
            name: "message",
            type: "text",
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status",
            type: "enum",
            enum: ["open", "in_progress", "resolved", "closed"],
            default: "'open'",
          },
          {
            name: "customer_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("support_ticket")
  }
}
```

Migration'ı çalıştırmak için:
```bash
npx medusa migrations run
```

### 7. Email Notification (Opsiyonel)

`src/subscribers/support-ticket.ts`:
```typescript
import { EventBusService } from "@medusajs/medusa"

type InjectedDependencies = {
  eventBusService: EventBusService
  sendgridService: any // veya kullandığınız email servisi
}

class SupportTicketSubscriber {
  protected readonly eventBus_: EventBusService
  protected readonly sendgridService_: any

  constructor({ eventBusService, sendgridService }: InjectedDependencies) {
    this.eventBus_ = eventBusService
    this.sendgridService_ = sendgridService

    this.eventBus_.subscribe(
      "support_ticket.created",
      this.handleTicketCreated
    )
  }

  handleTicketCreated = async (data) => {
    // Admin'e email gönder
    await this.sendgridService_.sendEmail({
      to: "admin@bangoo.com",
      from: "noreply@bangoo.com",
      subject: \`Yeni Destek Talebi: \${data.subject}\`,
      html: \`
        <h2>Yeni Destek Talebi</h2>
        <p><strong>İsim:</strong> \${data.name}</p>
        <p><strong>Email:</strong> \${data.email}</p>
        <p><strong>Telefon:</strong> \${data.phone || "Belirtilmemiş"}</p>
        <p><strong>Konu:</strong> \${data.subject}</p>
        <p><strong>Mesaj:</strong></p>
        <p>\${data.message}</p>
      \`,
    })

    // Kullanıcıya onay emaili gönder
    await this.sendgridService_.sendEmail({
      to: data.email,
      from: "noreply@bangoo.com",
      subject: "Destek Talebiniz Alındı - Bangoo",
      html: \`
        <h2>Merhaba \${data.name},</h2>
        <p>Destek talebiniz başarıyla alınmıştır.</p>
        <p><strong>Talep Numaranız:</strong> \${data.id}</p>
        <p><strong>Konu:</strong> \${data.subject}</p>
        <p>En kısa sürede size dönüş yapacağız.</p>
        <br>
        <p>Teşekkürler,</p>
        <p>Bangoo Müşteri Hizmetleri</p>
      \`,
    })
  }
}

export default SupportTicketSubscriber
```

## Canlı Destek Entegrasyonu (Gelecekte)

Canlı destek için önerilen çözümler:

1. **Tawk.to** (Ücretsiz)
2. **Intercom**
3. **Crisp**
4. **LiveChat**

Frontend'e entegre etmek için `src/app/[countryCode]/(main)/musteri-hizmetleri/page.tsx` dosyasındaki canlı destek bölümünü güncelleyip, tercih edilen servisin script'ini ekleyin.

## Test Etme

1. Frontend: `http://localhost:8000/musteri-hizmetleri`
2. Backend endpoint: `POST https://admin.bangoocyp.com/store/support-tickets`
3. Test request:
```json
{
  "name": "Test Kullanıcı",
  "email": "test@example.com",
  "subject": "Sipariş Takibi",
  "message": "Siparişim nerede?",
  "phone": "0555 123 45 67"
}
```
