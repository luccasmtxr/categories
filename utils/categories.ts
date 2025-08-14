
export type Ticket = {
  subject: string;
  requester: {
    name: string;
    email: string;
  };
  created_at: string;
  comment: {
    body: string;
    public: boolean;
  };
};

export type CategorizedTicket = {
  subject: string;
  requester: string;
  category: string;
  created_at: string;
};

const categories: Record<string, string[]> = {
  "Account Access / Login Issues": [
    "account locked",
    "password reset",
    "2fa",
    "locked out"
  ],
  "Returns / Exchanges": [
    "return",
    "exchange",
    "rma label",
    "refund",
    "didn't fit"
  ],
  "Payment / Billing Issues": [
    "store credit",
    "payment failed",
    "charge pending",
    "duplicate authorization",
    "gift card",
    "charge"
  ],
  "Damaged / Missing Items": [
    "damaged",
    "scratched",
    "missing",
    "wrong item",
    "defective"
  ],
  "Order Changes / Cancellations": [
    "cancel order",
    "add item",
    "update address",
    "change address"
  ],
  "Promo / Price Match": [
    "promo code",
    "price match",
    "price dropped",
    "discount"
  ],
  "Shipping / Delivery Delays": [
    "tracking",
    "delayed",
    "no movement",
    "carrier"
  ]
};

function categorizeTicket(subject: string, body: string): string {
  const text = `${subject} ${body}`.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }
  return "Other / Uncategorized";
}

export function categorizeTickets(tickets: Ticket[]): CategorizedTicket[] {
  return tickets.map(ticket => ({
    subject: ticket.subject,
    requester: ticket.requester?.name ?? "",
    category: categorizeTicket(ticket.subject, ticket.comment?.body ?? ""),
    created_at: ticket.created_at
  }));
}

export function countCategories(categorized: CategorizedTicket[]): Record<string, number> {
  return categorized.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});
}