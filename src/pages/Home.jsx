import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const roles = [
    { label: 'Admin', icon: '👨‍💼' },
    { label: 'Investor', icon: '💰' },
    { label: 'Financial Advisor', icon: '📊' },
    { label: 'Data Analyst', icon: '📈' }
  ];

  const features = [
    {
      icon: '📱',
      title: 'Fund Search & Analytics',
      description: 'Search mutual funds and track historical NAV data with interactive charts'
    },
    {
      icon: '🔍',
      title: 'Fund Comparison',
      description: 'Compare funds side-by-side and analyze trends with actionable insights'
    },
    {
      icon: '📚',
      title: 'Educational Content',
      description: 'Comprehensive learning resources for advisors and new investors'
    },
    {
      icon: '📋',
      title: 'Report Generation',
      description: 'Generate analyst reports with live data and custom metrics'
    }
  ];

  return (
    <Box sx={{ minHeight: '100dvh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Hero Section */}
      <Box className="hero-section" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Stack spacing={4} className="hero-content" alignItems="center" textAlign="center">
            {/* Main Title */}
            <Box>
              <Typography
                variant="h2"
                className="hero-title"
                sx={{
                  fontWeight: 800,
                  color: 'white',
                  mb: 2,
                  lineHeight: 1.2
                }}
              >
                Investment Perception and Selection Behavior Towards Mutual Funds
              </Typography>
              <Typography
                variant="h5"
                className="hero-subtitle"
                sx={{
                  mb: 3,
                  fontWeight: 300
                }}
              >
                Master Mutual Fund Selection with Data-Driven Analytics
              </Typography>
            </Box>

            {/* Hero Image Gallery */}
            <Grid container spacing={3} sx={{ my: 2, maxWidth: 900, justifyContent: 'center' }}>
              {[
                {
                  title: 'Admin Workspace',
                  src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80',
                  alt: 'admin dashboard'
                },
                {
                  title: 'Investor Insights',
                  src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80',
                  alt: 'investor analytics'
                }
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} md={5} key={idx}>
                  <Box className="gallery-image">
                    <img src={item.src} alt={item.alt} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ mt: 2, color: 'white', fontWeight: 600, textAlign: 'center' }}>
                    {item.title}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Role Badges */}
            <Stack className="role-stack" direction="row" spacing={1.5} flexWrap="wrap" justifyContent="center" sx={{ mt: 3 }}>
              {roles.map((role, idx) => (
                <Chip
                  key={idx}
                  className="role-chip"
                  label={`${role.icon} ${role.label}`}
                />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, background: '#f8f9ff' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 6,
              color: '#333',
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            Powerful Features for Every Role
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card className="feature-card" sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '3rem', mb: 1.5 }}>{feature.icon}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Container maxWidth="md">
          <Card
            className="modern-card cta-card"
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)'
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: '1.05rem' }}>
                Join thousands of investors and advisors making informed decisions with our intelligent platform.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  component={RouterLink}
                  to="/login?mode=signin"
                  className="btn-modern"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem'
                  }}
                >
                  🚀 Sign In
                </Button>
                <Button
                  component={RouterLink}
                  to="/login?mode=signup"
                  className="btn-modern"
                  variant="outlined"
                  sx={{
                    borderColor: '#667eea',
                    color: '#667eea',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderColor: '#667eea'
                    }
                  }}
                >
                  ✨ Create Account
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
