import { Avatar, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import BookIcon from "@mui/icons-material/Book";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import PeopleIcon from "@mui/icons-material/People";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const cardData = [
  {
    icon: <BookIcon fontSize="large" style={{ color: "#005B96" }} />,
    title: "Browse Reviews",
    description: "Discover honest and insightful reviews posted by a passionate community of readers.",
  },
  {
    icon: <ThumbUpAltIcon fontSize="large" style={{ color: "#F2994A" }} />,
    title: "Like Reviews",
    description: "Engage with the community by liking reviews that resonate with you.",
  },
  {
    icon: <EmojiPeopleIcon fontSize="large" style={{ color: "#00A6D6" }} />,
    title: "Post Reviews",
    description: "Share your thoughts about books and help others find their next read.",
  },
  {
    icon: <PeopleIcon fontSize="large" style={{ color: "#007C92" }} />,
    title: "Your Profile",
    description: "Manage your profile, followers, and keep track of your interactions.",
  },
];

const Features = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      <Grid container spacing={4}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card elevation={3} sx={{ textAlign: "center", padding: "1rem" }}>
                <Avatar
                  sx={{
                    margin: "0 auto",
                    bgcolor: "#F9F9F9",
                    width: 60,
                    height: 60,
                  }}
                >
                  {card.icon}
                </Avatar>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
