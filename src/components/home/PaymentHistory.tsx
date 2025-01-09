import { Card, CardBody } from '@nextui-org/card';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import useSWR from 'swr';
import useUserStore from '../../stores/UserStore';

interface Payment {
  payment_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_intent_id: string;
  created_at: string;
  updated_at: string | null;
}

function PaymentHistory() {
  const { userInfo } = useUserStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, error } = useSWR(apiUrl + '/payment/' + userInfo?.user_id);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const transactions = data.payments;

  return (
    <Card shadow='none'>
      <CardBody>
        <Table removeWrapper aria-label='Example table with static content'>
          <TableHeader>
            <TableColumn>DATO</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>BELØB</TableColumn>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction: Payment) => (
              <TableRow key={transaction.payment_id}>
                <TableCell>
                  {new Date(transaction.created_at).toISOString().slice(0, 16).replace('T', '-')}
                </TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  {(transaction.amount / 1000).toFixed(2)} {transaction.currency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default PaymentHistory;
