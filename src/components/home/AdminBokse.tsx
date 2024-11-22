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

function AdminBokse() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedBoks, setSelectedBoks] = useState<number | null>(null);
  // maks 10 bokse af gang vi henter bokse fra databasen ved hjælp af limit 10
  const fakeData = [
    { boks: 1, status: 'Ledig', tider: ['06:00 - 07:00', '07:00-08:00'] },
    { boks: 2, status: 'Booket', tider: ['10:00 - 12:00', '12:00-13:00'] },
    { boks: 3, status: 'Lukket', tider: ['14:00 - 16:00', '16:00-20:00'] },
  ];
  const variants = ['Book', 'Frigiv', 'Luk'];

  const TiderModal = () => {
    return (
      <Modal className='bg-default-800 text-white' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Tider</ModalHeader>
              <ModalBody>
                {fakeData
                  .find((boks) => boks.boks === selectedBoks)
                  ?.tider.map((tid, index) => <p key={index}>{tid}</p>)}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Action
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
            {fakeData.map((boks, index) => (
              <TableRow key={index}>
                <TableCell>{boks.boks}</TableCell>
                <TableCell>{boks.status}</TableCell>
                <TableCell
                  onClick={() => {
                    setSelectedBoks(boks.boks);
                    onOpen();
                  }}
                  className='cursor-pointer'
                >
                  Se Tider
                </TableCell>
                <TableCell>
                  <Select
                    color={
                      boks.status === 'Ledig'
                        ? 'success'
                        : boks.status === 'Booket'
                          ? 'warning'
                          : 'danger'
                    }
                    label='Handling'
                    defaultSelectedKeys={[boks.status]}
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
        <Pagination loop showControls color='secondary' total={5} initialPage={1} />
      </div>
    </section>
  );
}

export default AdminBokse;
