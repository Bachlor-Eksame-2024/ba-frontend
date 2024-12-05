import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';

interface EditProfileProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function EditProfile({ isOpen, onOpenChange }: EditProfileProps) {
  const [passwordError, setPasswordError] = useState('');
  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const old_password = formData.get('old_password');
    const new_password = formData.get('new_password');
    console.log(old_password);
    const confirm_password = formData.get('confirm_password');
    if (new_password !== confirm_password) {
      setPasswordError('Adgangskoderne er ikke ens');
      return;
    }
  };

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData);
  };

  return (
    <Modal className='dark' size='5xl' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className=' bg-default-50 text-white'>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Bruger Infomation</ModalHeader>
            <ModalBody className='grid sm:grid-cols-2'>
              <form onSubmit={handleUpdateProfile} className='grid gap-4'>
                <h3 className='text-md'>Opdater Personinfomation</h3>
                <Input type='text' label='Fornavn' />
                <Input type='text' label='Efternavn' />
                <Input type='email' label='Email' />
                <Input type='tel' label='Telefon' />
                <Input type='text' label='Center' />
                <Button type='submit' className='bg-secondary text-white py-6'>
                  Opdater Profile
                </Button>
              </form>
              <form onSubmit={handleChangePassword} className='flex flex-col gap-4 '>
                <h3 className='text-md'>Skift Din Adgangskode</h3>
                <span className='text-danger text-sm'>{passwordError}</span>
                <Input name='old_password' type='password' required label='Nuværende Adgangskode' />
                <Input name='new_password' type='password' required label='Nyt Adgangskode' />
                <Input
                  name='confirm_password'
                  type='password'
                  required
                  label='Gentage Adgangskode'
                />
                <Button type='submit' className='bg-secondary text-white py-6'>
                  Skift Adgangskode
                </Button>
              </form>
            </ModalBody>
            <ModalFooter>
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
