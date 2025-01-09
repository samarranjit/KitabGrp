import { useAuth } from '../../contexts/AuthContext'

const MyProfileStatus = () => {
    const user = useAuth();
    console.log(user?.user)
  return (
    <>

    </>
  )
}

export default MyProfileStatus