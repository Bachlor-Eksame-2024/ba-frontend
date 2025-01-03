function AdminCardStats({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full bg-default-100 rounded p-4 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>{children}</div>
    </div>
  );
}

export default AdminCardStats;
