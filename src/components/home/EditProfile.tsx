import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button, Input } from '@nextui-org/react';

interface EditProfileProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function EditProfile({ isOpen, onOpenChange }: EditProfileProps) {
  return (
    <Modal className='dark' size='5xl' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className=' bg-default-50 text-white'>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Bruger Infomation</ModalHeader>
            <ModalBody className='grid sm:grid-cols-2'>
              <div className='grid gap-4'>
                <h3 className='text-lg'>Opdater Personinfomation</h3>
                <Input type='text' label='Fornavn' />
                <Input type='text' label='Efternavn' />
                <Input type='email' label='Email' />
                <Input type='tel' label='Telefon' />
                <Input type='text' label='Center' />
              </div>
              <div className='flex flex-col gap-4 '>
                <h3 className='text-lg'>Skift Din Adgangskode</h3>
                <Input type='password' label='Nuværende Adgangskode' />
                <Input type='password' label='Nyt Adgangskode' />
                <Input type='password' label='Gentage Adgangskode' />
                <Button className='bg-secondary text-white py-6'>Skift Adgangskode</Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Luk
              </Button>
              <Button className='bg-secondary text-white' onPress={onClose}>
                Gem
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditProfile;
