import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import useUserStore from '../../stores/UserStore';

interface EditProfileProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const centers = [
  { key: '1', label: 'Fitness X' },
  { key: '2', label: 'SATS' },
  { key: '3', label: 'Puregym' },
  { key: '4', label: 'Fit & Sund' },
  { key: '5', label: 'Loop Fitness' },
  { key: '6', label: 'Copenhagen Gym' },
  { key: '7', label: 'Power House' },
  { key: '8', label: 'Ground' },
];

function EditProfile({ isOpen, onOpenChange }: EditProfileProps) {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const ApiKey = import.meta.env.VITE_API_KEY;
  const [passwordError, setPasswordError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userInfo, setUser } = useUserStore();
  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const old_password = formData.get('old_password');
    const new_password = formData.get('new_password');
    const confirm_password = formData.get('confirm_password');

    if (new_password !== confirm_password) {
      setPasswordError('Adgangskoderne er ikke ens');
      return;
    }
    setPasswordError('');

    const repsonse = await fetch(ApiUrl + '/profile/change-password', {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ApiKey,
      },
      body: JSON.stringify({
        user_id: userInfo?.user_id.toString(),
        old_password,
        new_password,
        confirm_password,
      }),
    });
    const data = await repsonse.json();
    if (data.detail) {
      setPasswordError('Forkert adgangskode');
      setLoading(false);
    } else {
      setPasswordError('Adgangskode er skiftet');
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const email = formData.get('email');
    const phone = formData.get('phone')?.toString();
    const center = formData.get('fitness_center')?.toString();
    console.log(first_name, last_name, email, phone, center);
    const response = await fetch(ApiUrl + '/profile/update-profile', {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ApiKey,
      },
      body: JSON.stringify({
        user_id: userInfo?.user_id.toString(),
        first_name: first_name || userInfo?.first_name,
        last_name: last_name || userInfo?.last_name,
        email: email || userInfo?.email,
        phone: phone || userInfo?.user_phone,
        fitness_center_id: center || userInfo?.fitness_center_id.toString(),
      }),
    });
    const data = await response.json();
    if (data.user) {
      setProfileError('Bruger opdateret');
      setUser(data.user);
    }
    if (data.detail) {
      setProfileError(data.detail);
    }
  };
  console.log(userInfo);

  return (
    <Modal className='dark' size='5xl' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className=' bg-default-50 text-white'>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Bruger Infomation</ModalHeader>
            <ModalBody className='grid sm:grid-cols-2'>
              <form onSubmit={handleUpdateProfile} className='grid gap-4'>
                <h3 className='text-md'>Opdater Personinfomation</h3>
                <span
                  className={`${profileError === 'Bruger opdateret' ? 'text-success' : 'text-danger'} text-sm`}
                >
                  {profileError}
                </span>
                <Input
                  name='first_name'
                  type='text'
                  label='Fornavn'
                  defaultValue={userInfo?.first_name}
                />
                <Input
                  name='last_name'
                  type='text'
                  label='Efternavn'
                  defaultValue={userInfo?.last_name}
                />
                <Input name='email' type='email' label='Email' defaultValue={userInfo?.email} />
                <Input
                  name='phone'
                  type='tel'
                  label='Telefon'
                  defaultValue={userInfo?.user_phone}
                />
                <Select
                  radius='sm'
                  name='fitness_center'
                  labelPlacement='outside'
                  label='Nuværende center'
                  placeholder='Vælg et fitness center'
                  defaultSelectedKeys={userInfo?.fitness_center_id.toString()}
                  className='max-w-full pb-4'
                >
                  {centers.map((center) => (
                    <SelectItem key={center.key}>{center.label}</SelectItem>
                  ))}
                </Select>
                <Button type='submit' className='bg-secondary text-white py-6'>
                  Opdater Profile
                </Button>
              </form>
              <form onSubmit={handleChangePassword} className='flex flex-col gap-4 '>
                <h3 className='text-md'>Skift Din Adgangskode</h3>
                <span
                  className={`${passwordError === 'Adgangskode er skiftet' ? 'text-success' : 'text-danger'} text-sm`}
                >
                  {passwordError}
                </span>
                <Input name='old_password' type='password' required label='Nuværende Adgangskode' />
                <Input name='new_password' type='password' required label='Nyt Adgangskode' />
                <Input
                  name='confirm_password'
                  type='password'
                  required
                  label='Gentage Adgangskode'
                />
                <Button isLoading={loading} type='submit' className='bg-secondary text-white py-6'>
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
