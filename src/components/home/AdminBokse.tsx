import { useDisclosure } from '@nextui-org/modal';
import { Pagination } from '@nextui-org/pagination';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { Boks, BoksData } from '../../types/AdminBoks';
import AdminBoksPopup from './AdminBoksPopup';
import useUserStore from '../../stores/UserStore';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';

const apiURL = import.meta.env.VITE_API_URL;

function AdminBokse() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userInfo } = useUserStore();
  const [selectedBoks, setSelectedBoks] = useState<BoksData | null>(null);
  const [updateArray, setUpdateArray] = useState([0, 10]);
  const { mutate } = useSWRConfig();
  // the id need to come from userInfo when we have the login system ready
  const { data, error } = useSWR(
    // /api/admin/box/{fitness_center_id}
    apiURL + '/admin/box/' + userInfo?.fitness_center_id
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const variants = ['booket', 'Ledigt', 'Lukket: 1t', 'Lukket: 2t', 'Lukket: 3t', 'Lukket: 4t'];

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
    key: { currentKey: string },
    boks_id: number,
    fitness_center_id: number
  ) => {
    // /api/admin/box-status
    await fetch(apiURL + '/admin/box-status', {
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
    mutate(apiURL + '/admin/box/' + userInfo?.fitness_center_id);
  };

  return (
    <section className='w-full'>
      <div className=' grid gap-4 justify-items-center w-full'>
        <Table aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>BOKS</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn align='center'>TIDER</TableColumn>
            <TableColumn>HANDLING</TableColumn>
          </TableHeader>
          <TableBody>
            {data.boks
              .sort((a: Boks, b: Boks) => a.box_id - b.box_id)
              .slice(updateArray[0], updateArray[1])
              .map((boks: Boks) => (
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
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          color={
                            boks.box_availability === 'Ledigt'
                              ? 'success'
                              : boks.box_availability === 'booket'
                                ? 'warning'
                                : 'danger'
                          }
                          size='sm'
                          variant='bordered'
                        >
                          {boks.box_availability}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label='Static Actions'>
                        {variants.map((variant) => (
                          <DropdownItem
                            key={variant}
                            value={variant}
                            isDisabled={variant === 'booket'}
                            onClick={() =>
                              handleBoksStatusChange(
                                { currentKey: variant },
                                boks.box_id,
                                boks.fitness_center_fk
                              )
                            }
                          >
                            {variant}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
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
