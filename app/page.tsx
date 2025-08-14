import jsonData from '@/zendesk_mock_tickets_llm_flavor.json'
import  {categorizeTickets, countCategories, Ticket} from '@/utils/categories';
export default function Home() {
  const tickets:Ticket[] = jsonData.tickets

  const categorized = categorizeTickets(tickets);
  const summary = countCategories(categorized);

  return (
<main style={{ padding: "2rem" }}>
      <h1>Ticket Categories</h1>

      <h2>Summary</h2>
      <ul>
        {Object.entries(summary).map(([category, count]) => (
          <li key={category}>
            <strong>{category}</strong>: {count}
          </li>
        ))}
      </ul>

      <h2>Detailed Tickets</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Requester</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {categorized.map((ticket, i) => (
            <tr key={i}>
              <td>{ticket.subject}</td>
              <td>{ticket.requester}</td>
              <td>{ticket.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
