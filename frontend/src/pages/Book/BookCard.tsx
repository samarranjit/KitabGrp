import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const BookCard = () => {
  return (
    <Box className="">
        <Card sx={{ maxWidth: 345, width: "100%" }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica.
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