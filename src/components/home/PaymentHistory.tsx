import { Card, CardBody } from '@nextui-org/card';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';

function PaymentHistory() {
  const transactions = [
    { id: 1, date: '2023-06-01', description: 'Coffee Shop', hours: 1, amount: 4.5 },
    { id: 2, date: '2023-06-02', description: 'Grocery Store', hours: 1, amount: 65.75 },
    { id: 3, date: '2023-06-03', description: 'Online Bookstore', hours: 1, amount: 29.99 },
    { id: 4, date: '2023-06-04', description: 'Gas Station', hours: 1, amount: 40.0 },
    { id: 5, date: '2023-06-05', description: 'Restaurant', hours: 1, amount: 55.2 },
  ];

  return (
    <Card shadow='none'>
      <CardBody>
        <Table removeWrapper aria-label='Example table with static content'>
          <TableHeader>
            <TableColumn>DATO</TableColumn>
            <TableColumn>BOKS</TableColumn>
            <TableColumn>ANTAL TIMER</TableColumn>
            <TableColumn>BELØB</TableColumn>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.hours}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default PaymentHistory;
