import { Box, Typography } from '@mui/material'

const MyReviews = () => {
  return (
    <Box component="section" p={2}>
        <div className="border-t-2 border-blue-700 border-opacity-10 my-5"></div>
        <Typography variant="h6" mb={2}>
      My Book Reviews:
    </Typography>
    </Box>
  )
}

export default MyReviews