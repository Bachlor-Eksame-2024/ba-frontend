import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';
import { useState } from 'react';
import useUserStore from '../stores/UserStore';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/react';
import UserChartMobile from '../components/home/UserChartMobile';

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
export default function UserProfile() {
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

  return (
    <div className='max-w-7xl min-h-screen mx-auto mt-14 md:p-8 max-md:p-4 pb-8 w-full px-4 flex flex-wrap gap-8 justify-center items-start h-full'>
      <div className='flex max-lg:flex-col gap-8 max-lg:items-center '>
        <Card className='max-w-[400px] min-w-60 w-80 max-sm:w-full bg-default-100 rounded-md'>
          <CardHeader className='flex gap-3'>
            <div className='flex flex-col'>
              <p className='text-md'>{userInfo?.first_name + ' ' + userInfo?.last_name}</p>
              <p className='text-small text-default-500'>Medlemskab</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className='flex gap-4 justify-between'>
              <div className='grid gap-4 text-sm text-gray-300'>
                <span>Dit center</span>
                <span>Medlemstype</span>
                <span>Medlemskab</span>
              </div>
              <div className='grid gap-4 text-right text-base mb-2'>
                <span>{userInfo?.fitness_center}</span>
                <span>{userInfo?.is_member ? 'Fri trænning' : 'Løbende'}</span>
                <span>{userInfo?.is_member ? '299,- md.' : '50,- pr.'}</span>
              </div>
            </div>
            <Divider className='mb-2' />
            <UserChartMobile />
          </CardBody>
        </Card>
        <Card className='flex gap-4 w-fit bg-default-100 rounded-md'>
          <CardBody className='grid md:grid-cols-2 w-fit gap-4'>
            <form onSubmit={handleUpdateProfile} className='grid gap-4 min-w-60 w-80'>
              <Input
                className='bg-zinc-900 rounded-small'
                radius='sm'
                name='first_name'
                type='text'
                size='md'
                label='Fornavn'
                variant='bordered'
                defaultValue={userInfo?.first_name}
              />

              <Input
                className='bg-zinc-900 rounded-small'
                radius='sm'
                name='last_name'
                type='text'
                size='md'
                label='Efternavn'
                variant='bordered'
                defaultValue={userInfo?.last_name}
              />

              <Input
                className='bg-zinc-900 rounded-small'
                radius='sm'
                name='email'
                type='email'
                label='Email'
                defaultValue={userInfo?.email}
                variant='bordered'
              />

              <Input
                className='bg-zinc-900 rounded-small'
                radius='sm'
                variant='bordered'
                name='phone'
                type='tel'
                label='Telefon'
                defaultValue={userInfo?.user_phone}
              />
              <Select
                radius='sm'
                size='md'
                name='fitness_center'
                labelPlacement='outside'
                label='Nuværende center'
                variant='bordered'
                placeholder='Vælg et fitness center'
                defaultSelectedKeys={userInfo?.fitness_center_id.toString()}
                className='max-w-full bg-zinc-900 rounded-small h-fit'
              >
                {centers.map((center) => (
                  <SelectItem key={center.key}>{center.label}</SelectItem>
                ))}
              </Select>
              <span
                className={`${profileError === 'Bruger opdateret' ? 'text-success' : 'text-danger'} text-sm`}
              >
                {profileError}
              </span>
              <Button type='submit' className='bg-secondary text-white py-6 rounded-md'>
                Opdater Profile
              </Button>
            </form>
            <form onSubmit={handleChangePassword} className='flex flex-col gap-4 min-w-60 w-80'>
              <Input
                className='bg-zinc-900 rounded-small'
                radius='sm'
                variant='bordered'
                name='old_password'
                type='password'
                size='md'
                required
                label='Nuværende Adgangskode'
              />
              <Input
                className='bg-zinc-900 rounded-small'
                radius='sm'
                variant='bordered'
                name='new_password'
                type='password'
                size='md'
                required
                label='Nyt Adgangskode'
              />
              <Input
                className='bg-zinc-900 rounded-small'
                variant='bordered'
                radius='sm'
                name='confirm_password'
                type='password'
                size='md'
                required
                label='Gentage Adgangskode'
              />
              <span
                className={`${passwordError === 'Adgangskode er skiftet' ? 'text-success' : 'text-danger'} text-sm`}
              >
                {passwordError}
              </span>
              <Button
                isLoading={loading}
                type='submit'
                className='bg-secondary text-white py-6 rounded-md'
              >
                Skift Adgangskode
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
