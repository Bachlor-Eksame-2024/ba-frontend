import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { Pagination } from '@nextui-org/pagination';
import { Select, SelectItem } from '@nextui-org/select';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useState } from 'react';
import useSWR from 'swr';
import { Boks, BoksData } from '../../types/AdminBoks';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Card, CardBody } from '@nextui-org/card';

const apiURL = import.meta.env.VITE_API_URL;

function AdminBokse() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedBoks, setSelectedBoks] = useState<BoksData | null>(null);
  const [updateArray, setUpdateArray] = useState([0, 10]);
  // the id need to come from userInfo when we have the login system ready
  const { data, error } = useSWR(apiURL + '/admin/get-boks?fitness_center_id=1');
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const variants = ['Book', 'Frigiv', 'Luk'];

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
      apiURL + '/admin/get-boks-avaliability-by-id?fitness_center_id=1&boks_id=' + boks,
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

  const TiderModal = () => {
    return (
      <Modal
        size='5xl'
        className='bg-default-800 text-white'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Boks {selectedBoks?.box_id} - Tider
              </ModalHeader>
              <ModalBody>
                <div className='flex w-full flex-col'>
                  <Tabs className='dark' aria-label='Options'>
                    {selectedBoks?.dates &&
                      Object.keys(selectedBoks.dates).map((date, index) => (
                        <Tab key={index} title={date}>
                          <Card className='dark'>
                            <CardBody>
                              <ul>
                                {Object.keys(selectedBoks.dates[date]).map((time, index) => (
                                  <li key={index}>{time} - Fri</li>
                                ))}
                              </ul>
                            </CardBody>
                          </Card>
                        </Tab>
                      ))}
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='secondary' onPress={onClose}>
                  Luk
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
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
            {data.boks.slice(updateArray[0], updateArray[1]).map((boks: Boks, index: number) => (
              <TableRow key={index}>
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
                    color={
                      boks.box_availability === 'available'
                        ? 'success'
                        : boks.box_availability === 'Booket'
                          ? 'warning'
                          : 'danger'
                    }
                    label={boks.box_availability}
                    defaultSelectedKeys={[boks.box_availability]}
                  >
                    {variants.map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant}
                      </SelectItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TiderModal />
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
