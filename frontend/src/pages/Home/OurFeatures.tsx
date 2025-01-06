import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { Star, People, Cloud } from "@mui/icons-material";

const OurFeatures = () => {
  const features = [
    {
      icon: <Star color="primary" sx={{ fontSize: 40 }} />,
      title: "User-Friendly Design",
      description:
        "Our platform is designed to offer an intuitive and seamless experience, ensuring users can navigate with ease.",
    },
    {
      icon: <People color="primary" sx={{ fontSize: 40 }} />,
      title: "Community Building",
      description:
        "Connect with people like yourself who love to read books and get to know how different people view the same books differently.",
    },
    {
      icon: <Cloud color="primary" sx={{ fontSize: 40 }} />,
      title: "Cloud Integration",
      description:
        "Easily upload and access your content with our secure and scalable cloud-based infrastructure.",
    }
    
  ];

  return (
    <Box id="features" component="section" py={6} px={3} bgcolor="#f9f9f9" minHeight={"60vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
        Features That Make KitabKhana Stand Out
      </Typography>
      <Grid container spacing={4} justifyContent="center" minHeight={"100%"}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                p: 3,

              }}
            >
              <CardContent>
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurFeatures;
