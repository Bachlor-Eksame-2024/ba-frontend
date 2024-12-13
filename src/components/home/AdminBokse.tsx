import { useDisclosure } from '@nextui-org/modal';
import { Pagination } from '@nextui-org/pagination';
import { Select, SelectItem } from '@nextui-org/select';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useState } from 'react';
import useSWR from 'swr';
import { Boks, BoksData } from '../../types/AdminBoks';
import AdminBoksPopup from './AdminBoksPopup';
import useUserStore from '../../stores/UserStore';
import { SharedSelection } from '@nextui-org/system';

const apiURL = import.meta.env.VITE_API_URL;

function AdminBokse() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userInfo } = useUserStore();
  const [selectedBoks, setSelectedBoks] = useState<BoksData | null>(null);
  const [updateArray, setUpdateArray] = useState([0, 10]);
  // the id need to come from userInfo when we have the login system ready
  const { data, error } = useSWR(
    // /api/admin/box/{fitness_center_id}
    apiURL + '/admin/box/' + userInfo?.fitness_center_id
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const variants = ['Booket', 'Ledigt', 'Lukket: 1t', 'Lukket: 2:t', 'Lukket 3:t', 'Lukket 4:t'];

  const changePage = (page: number) => {
    if (page === 1) {
      setUpdateArray([0, 10]);
    }
    if (page === 2) {
      setUpdateArray([10, 20]);
    }
    if (page === 3) {
      setUpdateArray([20, 30]);
    }
  };

  const getBoksTimes = async (boks: number) => {
    const response = await fetch(
      apiURL +
        // /api/admin/available-box/{fitness_center_id}/{boks_id}
        '/admin/available-box/' +
        userInfo?.fitness_center_id +
        '/' +
        boks,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_API_KEY as string,
        },
      }
    );
    const data = await response.json();
    setSelectedBoks(data);
  };

  const handleBoksStatusChange = async (
    key: SharedSelection,
    boks_id: number,
    fitness_center_id: number
  ) => {
    // /api/admin/box-status
    const response = await fetch(apiURL + '/admin/box-status', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': import.meta.env.VITE_API_KEY as string,
      },
      body: JSON.stringify({
        user_id: userInfo?.user_id.toString(),
        fitness_center_id: fitness_center_id.toString(),
        boks_id: boks_id.toString(),
        boks_availability: key.currentKey ? key.currentKey : 'Ledigt',
      }),
    });
    const data = await response.json();
    if (data.status === 'success') {
      alert('Boks status er opdateret');
    }
  };

  return (
    <section className='w-full'>
      <div className=' grid gap-4 justify-items-center w-full'>
        <Table aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>BOKS</TableColumn>
            <TableColumn>TIDER</TableColumn>
            <TableColumn align='center'>STATUS</TableColumn>
            <TableColumn>HANDLING</TableColumn>
          </TableHeader>
          <TableBody>
            {data.boks.slice(updateArray[0], updateArray[1]).map((boks: Boks) => (
              <TableRow key={boks.box_id}>
                <TableCell>Nr. {boks.box_number}</TableCell>
                <TableCell>{boks.box_availability}</TableCell>
                <TableCell
                  onClick={() => {
                    getBoksTimes(boks.box_number);
                    onOpen();
                  }}
                  className='cursor-pointer'
                >
                  Se Tider
                </TableCell>
                <TableCell>
                  <Select
                    onSelectionChange={(key) =>
                      handleBoksStatusChange(key, boks.box_id, boks.fitness_center_fk)
                    }
                    size='sm'
                    color={
                      boks.box_availability === 'Ledigt'
                        ? 'success'
                        : boks.box_availability === 'Booket'
                          ? 'warning'
                          : 'danger'
                    }
                    defaultSelectedKeys={[boks.box_availability]}
                  >
                    {variants.map((variant) => (
                      <SelectItem key={variant} value={variant} isDisabled={variant === 'Booket'}>
                        {variant}
                      </SelectItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AdminBoksPopup selectedBoks={selectedBoks} isOpen={isOpen} onOpenChange={onOpenChange} />
        <span className='text-sm text-gray-300'>Bokse total: {data.boks.length}</span>
        <Pagination
          onChange={(page) => changePage(page)}
          loop
          showControls
          color='secondary'
          total={3}
          initialPage={1}
        />
      </div>
    </section>
  );
}

export default AdminBokse;
