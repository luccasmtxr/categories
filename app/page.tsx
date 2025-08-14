import jsonData from '@/zendesk_mock_tickets_llm_flavor.json'
import  {categorizeTickets, countCategories, Ticket} from '@/utils/categories';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  TicketIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  TagIcon,
  TruckIcon
} from "lucide-react"

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Account Access / Login Issues":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "Returns / Exchanges":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Payment / Billing Issues":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Promo / Price Match":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Shipping / Delivery Delays":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "Order Changes / Cancellations":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Account Access / Login Issues":
      return <AlertCircleIcon className="h-4 w-4" />
    case "Returns / Exchanges":
      return <TrendingUpIcon className="h-4 w-4" />
    case "Payment / Billing Issues":
      return <CreditCardIcon className="h-4 w-4" />
    case "Promo / Price Match":
      return <TagIcon className="h-4 w-4" />
    case "Shipping / Delivery Delays":
      return <TruckIcon className="h-4 w-4" />
    case "Order Changes / Cancellations":
      return <ShoppingCartIcon className="h-4 w-4" />
    default:
      return <TicketIcon className="h-4 w-4" />
  }
}


export default function Home() {
  const tickets:Ticket[] = jsonData.tickets

  const categorized = categorizeTickets(tickets);
  const summary = countCategories(categorized);
  const totalTickets = tickets.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">📊 Support Ticket Dashboard</h1>
          <p className="text-muted-foreground">Real-time overview of customer support tickets and categories</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <TicketIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTickets}</div>
              <p className="text-xs text-muted-foreground">Active support requests</p>
            </CardContent>
          </Card>

          {Object.entries(summary)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([category, count]) => (
              <Card key={category}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{category}</CardTitle>
                  {getCategoryIcon(category)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                  <p className="text-xs text-muted-foreground">{((count / totalTickets) * 100).toFixed(0)}% of total</p>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Detailed Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>
              Showing {tickets.length} customer support tickets across {Object.keys(summary).length} categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categorized
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((ticket, i) => (
                    <TableRow key={i} className="hover:bg-muted/50">
                      <TableCell className="font-medium max-w-md">
                        <div className="truncate" title={ticket.subject}>
                          {ticket.subject}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{ticket.requester}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getCategoryColor(ticket.category)}>
                          {ticket.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}
