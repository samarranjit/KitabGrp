import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { BookInfo } from '../../contexts/BooksInfoContext'

interface BookCardProps extends BookInfo {}


const BookCard = (props: BookCardProps) => {
  return (
    <Box className="" display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <Card sx={{ maxWidth: 345, width: "100%" }}>
          <CardMedia
            sx={{ height: 140 }}
            image={(props?.Book.coverImage)?(props?.Book.coverImage):"https://i.fbcd.co/products/resized/resized-750-500/ae2d64e634f5beaa6f0e867d529ece28f0504e9e24fc4d5e0d6fd21f0a05df7f.jpg"}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props?.Book.title}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              ✍️:{props?.Book.reviewerName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {props?.Book.review}
              </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Link to={`/`}>
            <Button size="small">Learn More</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
  )
}

export default BookCard