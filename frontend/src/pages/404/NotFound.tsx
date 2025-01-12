import { Box, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <>
      <Box alignContent={"center"} justifyContent={"center"} padding={'2rem'} bottom={'0'}>
        <Typography textAlign={"center"}>
          Bruh, You seem Lost!
        </Typography>
        <Typography variant='h3' fontWeight={"bold"} textAlign={"center"}>
            404 Not Found!
        </Typography>
        <Box display={"flex"} alignContent={"center"} justifyContent={"center"} width={'50%'} alignItems={"center"} margin={'0 auto'} bottom={'0'}>
        <img src="/Static_Images/NotFoundImg.jpg" alt="" height={'10%'} />

        </Box>
      </Box>
    </>
  )
}

export default NotFound